import axios from "axios";

import { HttpNotFound } from "./exceptions";

import type { AxiosError } from "axios";

const client = axios.create({
  baseURL: process.env.APP_URL,
});

export const get = async <U extends { data: unknown }>(
  path: string,
): Promise<U["data"] | null> => {
  return await client
    .get<U>(path)
    .then((response) => response.data.data)
    .catch((error: AxiosError) => {
      if (error.response && error.response.status === 404) {
        throw new HttpNotFound(error.response);
      }

      throw error;
    });
};
