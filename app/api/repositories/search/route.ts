import { NextResponse } from "next/server";

import { RepositoryDataError } from "@/lib/errors/repository-data-error";
import { createRepositoryGateway } from "@/lib/gateways/create-repository-gateway";
import { searchRepositories } from "@/lib/services/search-repositories";
import type { RepositorySearchApiResponse } from "@/lib/types/repository-search-api";

const MAX_SEARCH_PAGE = 100;

function parsePage(value: string | null): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) ? Math.min(MAX_SEARCH_PAGE, Math.max(1, parsed)) : 1;
}

function errorStatus(error: RepositoryDataError): number {
  switch (error.kind) {
    case "invalid-query":
      return 422;
    case "rate-limit":
      return 429;
    case "not-found":
      return 404;
    case "unavailable":
      return 503;
  }
}

export async function GET(request: Request): Promise<NextResponse<RepositorySearchApiResponse>> {
  const parameters = new URL(request.url).searchParams;
  const query = parameters.get("q")?.trim() ?? "";
  const page = parsePage(parameters.get("page"));

  if (!query) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          message: "検索キーワードを入力してください。",
          resetAt: null,
        },
      },
      { status: 400 },
    );
  }

  try {
    const result = await searchRepositories(createRepositoryGateway(), { query, page });
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    if (!(error instanceof RepositoryDataError)) {
      throw error;
    }

    return NextResponse.json(
      {
        ok: false,
        error: {
          message: error.message,
          resetAt: error.resetAt?.toISOString() ?? null,
        },
      },
      { status: errorStatus(error) },
    );
  }
}
