import type { Article as PrismaArticle } from "@prisma/client";

export type Article = Omit<PrismaArticle, "created_at" | "updated_at">;
