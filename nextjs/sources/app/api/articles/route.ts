import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { db } from "@/libs/db";

import type { GetListResponse } from "@/features/articles";

export async function GET(
  _request: NextRequest,
): Promise<NextResponse<GetListResponse>> {
  const articles = await db.article.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      updated_at: true,
    },
  });

  return NextResponse.json({
    data: articles,
  });
}
