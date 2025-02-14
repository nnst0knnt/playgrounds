import { HEADLINES, Welcome } from "@/features/home";
import { db } from "@/libs/db";

export default async function Page() {
  const headlines = await getHeadlines();

  return <Welcome headlines={headlines ?? []} />;
}

export const getHeadlines = async () =>
  await db.article.findMany({
    take: HEADLINES,
    orderBy: { created_at: "desc" },
    select: {
      id: true,
      title: true,
      content: true,
    },
  });
