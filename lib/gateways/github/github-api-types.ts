export type GitHubRepositoryDto = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  language: string | null;
  stargazers_count: number;
  watchers_count: number;
  subscribers_count?: number;
  forks_count: number;
  open_issues_count: number;
  html_url: string;
  updated_at: string;
};

export type GitHubSearchResponseDto = {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubRepositoryDto[];
};
