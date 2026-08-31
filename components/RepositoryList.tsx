"use client";

import { Button } from "@heroui/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { RepositoryCard } from "@/components/RepositoryCard";
import type { Repository, RepositorySearchResult } from "@/lib/types/repository";
import type { RepositorySearchApiResponse } from "@/lib/types/repository-search-api";
import { formatCount } from "@/lib/utils/format";

export function RepositoryList({
  result,
  query,
}: {
  result: RepositorySearchResult;
  query: string;
}) {
  const [repositories, setRepositories] = useState<readonly Repository[]>(result.repositories);
  const [page, setPage] = useState(result.page);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || page >= result.totalPages) {
      return;
    }

    setIsLoading(true);
    setLoadError(null);

    try {
      const parameters = new URLSearchParams({
        q: query,
        page: String(page + 1),
      });
      const response = await fetch(`/api/repositories/search?${parameters}`);
      const payload = (await response.json()) as RepositorySearchApiResponse;

      if (!payload.ok) {
        setLoadError(payload.error.message);
        return;
      }

      setRepositories((current) => {
        const loadedIds = new Set(current.map((repository) => repository.id));
        const nextRepositories = payload.result.repositories.filter(
          (repository) => !loadedIds.has(repository.id),
        );
        return [...current, ...nextRepositories];
      });
      setPage(payload.result.page);
    } catch {
      setLoadError("次の検索結果を取得できませんでした。");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, page, query, result.totalPages]);

  useEffect(() => {
    const target = loadMoreRef.current;

    if (!target || isLoading || loadError || page >= result.totalPages) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void loadMore();
        }
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [isLoading, loadError, loadMore, page, result.totalPages]);

  if (result.repositories.length === 0) {
    return (
      <section className="mt-8 border-t border-separator pt-6" aria-live="polite">
        <p className="font-semibold text-foreground">一致するリポジトリがありません</p>
        <p className="mt-2 text-sm leading-6 text-muted">
          キーワードを短くするか、別の表記で検索してください。
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="results-heading" className="mt-8">
      <div className="mb-3">
        <h2 className="font-semibold tracking-tight text-foreground" id="results-heading">
          検索結果
        </h2>
        <p aria-live="polite" className="mt-1 text-sm text-muted">
          「{query}」に {formatCount(result.totalCount)} 件
        </p>
      </div>
      {result.incomplete ? (
        <p className="mb-4 rounded-lg border border-warning/40 bg-warning-soft px-4 py-3 text-sm text-warning-soft-foreground">
          GitHubの検索が時間内に完了しなかったため、結果の一部を表示しています。
        </p>
      ) : null}
      <ul className="border-y border-separator">
        {repositories.map((repository) => (
          <RepositoryCard key={repository.id} query={query} repository={repository} />
        ))}
      </ul>
      {page < result.totalPages ? (
        <div
          ref={loadMoreRef}
          aria-live="polite"
          className="flex min-h-20 items-center justify-center py-5"
        >
          {isLoading ? <p className="text-sm text-muted">読み込み中...</p> : null}
          {loadError ? (
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="text-sm text-danger">{loadError}</p>
              <Button size="sm" onPress={() => void loadMore()}>
                再試行
              </Button>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="py-6 text-center text-xs text-muted">すべての結果を表示しました</p>
      )}
    </section>
  );
}
