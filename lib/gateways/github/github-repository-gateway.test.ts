import { describe, expect, it, vi } from "vitest";

import type { GitHubRepositoryDto } from "@/lib/gateways/github/github-api-types";
import { GitHubRepositoryGateway } from "@/lib/gateways/github/github-repository-gateway";

const repositoryDto: GitHubRepositoryDto = {
  id: 12,
  name: "next.js",
  full_name: "vercel/next.js",
  description: "The React Framework",
  owner: {
    login: "vercel",
    avatar_url: "https://avatars.githubusercontent.com/u/14985020",
    html_url: "https://github.com/vercel",
  },
  language: "JavaScript",
  stargazers_count: 140_000,
  watchers_count: 140_000,
  forks_count: 29_000,
  open_issues_count: 3_100,
  html_url: "https://github.com/vercel/next.js",
  updated_at: "2026-08-24T01:00:00Z",
};

function jsonResponse(body: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    ...init,
    headers: {
      "content-type": "application/json",
      ...init.headers,
    },
  });
}

describe("GitHubRepositoryGateway", () => {
  it("Search APIのURLを構築しドメインモデルへ変換する", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
      jsonResponse({
        total_count: 1_503,
        incomplete_results: false,
        items: [repositoryDto],
      }),
    );
    const gateway = new GitHubRepositoryGateway({ fetcher });

    const result = await gateway.search({ query: "next js", page: 2, pageSize: 10 });

    expect(fetcher).toHaveBeenCalledOnce();
    const requestedUrl = String(fetcher.mock.calls[0]?.[0]);
    expect(requestedUrl).toBe(
      "https://api.github.com/search/repositories?q=next+js&page=2&per_page=10",
    );
    expect(result.repositories[0]).toMatchObject({
      fullName: "vercel/next.js",
      watchersCount: 140_000,
    });
    expect(result.totalCount).toBe(1_503);
    expect(result.totalPages).toBe(100);
  });

  it("詳細APIのレスポンスとバージョンヘッダーを処理する", async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(jsonResponse({ ...repositoryDto, subscribers_count: 1_240 }));
    const gateway = new GitHubRepositoryGateway({ fetcher });

    const repository = await gateway.findByName("vercel", "next.js");

    const requestInit = fetcher.mock.calls[0]?.[1];
    const headers = new Headers(requestInit?.headers);
    expect(headers.get("authorization")).toBeNull();
    expect(headers.get("x-github-api-version")).toBe("2026-03-10");
    expect(repository?.watchersCount).toBe(1_240);
  });

  it("存在しない詳細リポジトリはnullを返す", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
      jsonResponse(
        { message: "Not Found" },
        {
          status: 404,
        },
      ),
    );
    const gateway = new GitHubRepositoryGateway({ fetcher });

    await expect(gateway.findByName("missing", "repository")).resolves.toBeNull();
  });

  it("Rate Limitをアプリケーション共通エラーへ変換する", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
      jsonResponse(
        { message: "rate limit exceeded" },
        {
          status: 403,
          headers: {
            "x-ratelimit-remaining": "0",
            "x-ratelimit-reset": "1800000000",
          },
        },
      ),
    );
    const gateway = new GitHubRepositoryGateway({ fetcher });

    await expect(gateway.search({ query: "react", page: 1, pageSize: 10 })).rejects.toMatchObject({
      kind: "rate-limit",
      resetAt: new Date(1_800_000_000_000),
    });
  });

  it("通信失敗を利用者向けエラーへ変換する", async () => {
    const fetcher = vi.fn<typeof fetch>().mockRejectedValue(new TypeError("network error"));
    const gateway = new GitHubRepositoryGateway({ fetcher });

    await expect(gateway.findByName("vercel", "next.js")).rejects.toMatchObject({
      kind: "unavailable",
    });
  });
});
