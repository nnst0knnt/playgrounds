import { ArticleList } from "@/features/articles";
import { get } from "@/libs/http";

import type { GetListResponse } from "@/features/articles";

/**
 * skip prerendering
 */
export const dynamic = "force-dynamic";

export default async function Page() {
  const articles = await getArticles();

  return <ArticleList articles={articles ?? []} />;
}

export const getArticles = async () => {
  const articles = await get<GetListResponse>("/api/articles");

  return articles ?? null;
};
