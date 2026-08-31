import { describe, expect, it } from "vitest";

import { repositoryHref, searchHref } from "@/lib/utils/routes";

describe("repository routes", () => {
  it("検索条件を共有可能なURLへ変換する", () => {
    expect(searchHref({ query: "next js" })).toBe("/?q=next+js");
  });

  it("詳細URLへ検索元の情報を引き継ぐ", () => {
    expect(repositoryHref("owner name", "repo/name", { query: "react" })).toBe(
      "/repositories/owner%20name/repo%2Fname?q=react",
    );
  });
});
