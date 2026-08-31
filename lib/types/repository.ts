export type RepositoryOwner = Readonly<{
  login: string;
  avatarUrl: string;
  profileUrl: string;
}>;

export type Repository = Readonly<{
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  owner: RepositoryOwner;
  language: string | null;
  stargazersCount: number;
  watchersCount: number;
  forksCount: number;
  openIssuesCount: number;
  htmlUrl: string;
  updatedAt: string;
}>;

export type RepositorySearchResult = Readonly<{
  repositories: readonly Repository[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  incomplete: boolean;
}>;
