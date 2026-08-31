import { Chip, Link as HeroLink } from "@heroui/react";
import Link from "next/link";

import { RepositoryAvatar } from "@/components/RepositoryAvatar";
import { RepositoryStats } from "@/components/RepositoryStats";
import type { Repository } from "@/lib/types/repository";
import { formatDate } from "@/lib/utils/format";

export function RepositoryDetail({
  repository,
  backHref,
}: {
  repository: Repository;
  backHref: string;
}) {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <Link className="back-link" href={backHref}>
        <span aria-hidden="true">←</span>
        検索結果へ戻る
      </Link>

      <article className="mt-6">
        <div className="grid gap-5 border-b border-separator pb-8 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start sm:gap-6">
          <RepositoryAvatar
            className="size-14 sm:size-16"
            owner={repository.owner.login}
            size="lg"
            src={repository.owner.avatarUrl}
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-muted">{repository.owner.login}</p>
            <h1 className="mt-1 break-words text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
              {repository.name}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
              {repository.description ?? "このリポジトリには説明が登録されていません。"}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Chip size="sm" variant="soft">
                <Chip.Label>{repository.language ?? "言語未設定"}</Chip.Label>
              </Chip>
              <span className="text-sm text-muted">更新 {formatDate(repository.updatedAt)}</span>
            </div>
            <HeroLink className="mt-5" href={repository.htmlUrl} target="_blank">
              GitHubで開く
              <HeroLink.Icon />
            </HeroLink>
          </div>
        </div>

        <section aria-labelledby="metrics-heading" className="mt-8">
          <h2 className="sr-only" id="metrics-heading">
            リポジトリ指標
          </h2>
          <RepositoryStats repository={repository} />
        </section>
      </article>
    </main>
  );
}
