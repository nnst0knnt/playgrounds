import { notFound } from "next/navigation";

import { ArticleContent } from "@/features/articles";
import { NotFound } from "@/libs/exceptions";
import { get } from "@/libs/http";

import type { GetOneResponse } from "@/features/articles";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) notFound();

  const article = await getArticle(id);

  if (article === null) notFound();

  return <ArticleContent article={article} />;
}

export const getArticle = async (rawId: string) => {
  try {
    const id = Number(rawId);

    if (Number.isNaN(id)) {
      throw new NotFound();
    }

    const article = await get<GetOneResponse>(`/api/articles/${id}`);

    return article ?? null;
  } catch (e) {
    console.error(e);

    return null;
  }
};
