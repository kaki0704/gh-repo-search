import { RepositoryDataError } from "@/lib/errors/repository-data-error";
import type {
  GitHubRepositoryDto,
  GitHubSearchResponseDto,
} from "@/lib/gateways/github/github-api-types";
import type {
  RepositoryGateway,
  RepositorySearchCriteria,
} from "@/lib/gateways/repository-gateway";
import type { Repository, RepositorySearchResult } from "@/lib/types/repository";

const DEFAULT_BASE_URL = "https://api.github.com";
const GITHUB_API_VERSION = "2026-03-10";
const SEARCH_RESULT_LIMIT = 1_000;

type GitHubRepositoryGatewayOptions = Readonly<{
  fetcher?: typeof fetch;
  baseUrl?: string;
}>;

function toRepository(repository: GitHubRepositoryDto): Repository {
  return {
    id: repository.id,
    name: repository.name,
    fullName: repository.full_name,
    description: repository.description?.trim() || null,
    owner: {
      login: repository.owner.login,
      avatarUrl: repository.owner.avatar_url,
      profileUrl: repository.owner.html_url,
    },
    language: repository.language,
    stargazersCount: repository.stargazers_count,
    watchersCount: repository.subscribers_count ?? repository.watchers_count,
    forksCount: repository.forks_count,
    openIssuesCount: repository.open_issues_count,
    htmlUrl: repository.html_url,
    updatedAt: repository.updated_at,
  };
}

function getRateLimitReset(response: Response): Date | null {
  const reset = Number(response.headers.get("x-ratelimit-reset"));
  return Number.isFinite(reset) && reset > 0 ? new Date(reset * 1_000) : null;
}

export class GitHubRepositoryGateway implements RepositoryGateway {
  private readonly fetcher: typeof fetch;
  private readonly baseUrl: string;

  constructor(options: GitHubRepositoryGatewayOptions = {}) {
    this.fetcher = options.fetcher ?? fetch;
    this.baseUrl = options.baseUrl ?? DEFAULT_BASE_URL;
  }

  async search(criteria: RepositorySearchCriteria): Promise<RepositorySearchResult> {
    const parameters = new URLSearchParams({
      q: criteria.query,
      page: String(criteria.page),
      per_page: String(criteria.pageSize),
    });
    const response = await this.request(`/search/repositories?${parameters}`, 60);
    const payload = (await response.json()) as GitHubSearchResponseDto;
    const reachableCount = Math.min(payload.total_count, SEARCH_RESULT_LIMIT);

    return {
      repositories: payload.items.map(toRepository),
      totalCount: payload.total_count,
      page: criteria.page,
      pageSize: criteria.pageSize,
      totalPages: Math.ceil(reachableCount / criteria.pageSize),
      incomplete: payload.incomplete_results,
    };
  }

  async findByName(owner: string, name: string): Promise<Repository | null> {
    const path = `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(name)}`;
    const response = await this.request(path, 300, true);

    if (!response) {
      return null;
    }

    return toRepository((await response.json()) as GitHubRepositoryDto);
  }

  private async request(path: string, revalidate: number): Promise<Response>;
  private async request(
    path: string,
    revalidate: number,
    allowNotFound: true,
  ): Promise<Response | null>;
  private async request(
    path: string,
    revalidate: number,
    allowNotFound = false,
  ): Promise<Response | null> {
    let response: Response;

    try {
      response = await this.fetcher(`${this.baseUrl}${path}`, {
        headers: this.headers(),
        next: { revalidate },
      });
    } catch {
      throw new RepositoryDataError(
        "unavailable",
        "GitHub APIへ接続できませんでした。時間をおいて再度お試しください。",
      );
    }

    if (response.ok) {
      return response;
    }

    if (allowNotFound && response.status === 404) {
      return null;
    }

    if (response.status === 422) {
      throw new RepositoryDataError(
        "invalid-query",
        "検索条件を解釈できませんでした。別のキーワードでお試しください。",
      );
    }

    const isRateLimited =
      response.status === 429 ||
      (response.status === 403 && response.headers.get("x-ratelimit-remaining") === "0");

    if (isRateLimited) {
      throw new RepositoryDataError(
        "rate-limit",
        "GitHub APIの利用上限に達しました。しばらく待ってからお試しください。",
        getRateLimitReset(response),
      );
    }

    throw new RepositoryDataError("unavailable", "GitHub APIから検索結果を取得できませんでした。");
  }

  private headers(): Headers {
    return new Headers({
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": GITHUB_API_VERSION,
    });
  }
}
