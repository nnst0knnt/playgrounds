import { NotFound } from "@/libs/exceptions/NotFound";

import type { AxiosResponse } from "axios";

export type HttpNotFoundConfig = {
  name: string;
  message: string;
  url?: string;
};

export class HttpNotFound extends NotFound {
  message: string;
  url?: string;

  constructor(response: AxiosResponse) {
    super(response.statusText);
    this.message = response.statusText;
    this.url = response.config.url;
  }
  serialize(): HttpNotFoundConfig {
    return {
      name: "HTTP_NOT_FOUND",
      message: this.message,
      url: this.url,
    };
  }
}
