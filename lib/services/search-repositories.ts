import type { RepositoryGateway } from "@/lib/gateways/repository-gateway";
import type { RepositorySearchResult } from "@/lib/types/repository";

export const REPOSITORIES_PER_PAGE = 10;

export type SearchRepositoriesInput = Readonly<{
  query: string;
  page?: number;
}>;

const emptyResult = (page: number): RepositorySearchResult => ({
  repositories: [],
  totalCount: 0,
  page,
  pageSize: REPOSITORIES_PER_PAGE,
  totalPages: 0,
  incomplete: false,
});

export async function searchRepositories(
  gateway: RepositoryGateway,
  input: SearchRepositoriesInput,
): Promise<RepositorySearchResult> {
  const query = input.query.trim();
  const page = Math.max(1, Math.floor(input.page ?? 1));

  if (!query) {
    return emptyResult(page);
  }

  return gateway.search({
    query,
    page,
    pageSize: REPOSITORIES_PER_PAGE,
  });
}
