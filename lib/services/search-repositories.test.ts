import { describe, expect, it, vi } from "vitest";

import type { RepositoryGateway } from "@/lib/gateways/repository-gateway";
import { REPOSITORIES_PER_PAGE, searchRepositories } from "@/lib/services/search-repositories";
import type { RepositorySearchResult } from "@/lib/types/repository";

const emptyResult: RepositorySearchResult = {
  repositories: [],
  totalCount: 0,
  page: 1,
  pageSize: REPOSITORIES_PER_PAGE,
  totalPages: 0,
  incomplete: false,
};

function createGateway(): RepositoryGateway {
  return {
    search: vi.fn().mockResolvedValue(emptyResult),
    findByName: vi.fn().mockResolvedValue(null),
  };
}

describe("searchRepositories", () => {
  it("検索語を正規化して既定件数でGatewayを呼び出す", async () => {
    const gateway = createGateway();

    await searchRepositories(gateway, { query: "  next.js  ", page: 2.8 });

    expect(gateway.search).toHaveBeenCalledWith({
      query: "next.js",
      page: 2,
      pageSize: REPOSITORIES_PER_PAGE,
    });
  });

  it("空の検索語では外部APIを呼び出さない", async () => {
    const gateway = createGateway();

    const result = await searchRepositories(gateway, { query: "   " });

    expect(gateway.search).not.toHaveBeenCalled();
    expect(result).toEqual(emptyResult);
  });

  it("ページ番号の下限を1に補正する", async () => {
    const gateway = createGateway();

    await searchRepositories(gateway, { query: "react", page: -5 });

    expect(gateway.search).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 1,
      }),
    );
  });
});
