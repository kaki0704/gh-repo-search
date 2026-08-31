import type { RepositorySearchResult } from "@/lib/types/repository";

export type RepositorySearchApiError = Readonly<{
  message: string;
  resetAt: string | null;
}>;

export type RepositorySearchApiResponse =
  | Readonly<{
      ok: true;
      result: RepositorySearchResult;
    }>
  | Readonly<{
      ok: false;
      error: RepositorySearchApiError;
    }>;
