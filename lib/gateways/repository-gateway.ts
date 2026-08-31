import type { Repository, RepositorySearchResult } from "@/lib/types/repository";

export type RepositorySearchCriteria = Readonly<{
  query: string;
  page: number;
  pageSize: number;
}>;

export interface RepositoryGateway {
  search(criteria: RepositorySearchCriteria): Promise<RepositorySearchResult>;
  findByName(owner: string, name: string): Promise<Repository | null>;
}
