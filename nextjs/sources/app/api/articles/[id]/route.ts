import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { db } from "@/libs/db";

import type { GetOneResponse } from "@/features/articles";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<GetOneResponse | null>> {
  const id = Number((await params).id);

  if (Number.isNaN(id)) {
    return NextResponse.json(null, { status: 400 });
  }

  const article = await db.article.findUnique({ where: { id } });

  if (article === null) {
    return NextResponse.json(null, { status: 404 });
  }

  return NextResponse.json({
    data: article,
  });
}
