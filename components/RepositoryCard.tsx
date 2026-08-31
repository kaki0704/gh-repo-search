import Link from "next/link";

import { RepositoryAvatar } from "@/components/RepositoryAvatar";
import type { Repository } from "@/lib/types/repository";
import { formatCount, formatDate } from "@/lib/utils/format";
import { repositoryHref } from "@/lib/utils/routes";

type RepositoryCardProps = Readonly<{
  repository: Repository;
  query: string;
}>;

export function RepositoryCard({ repository, query }: RepositoryCardProps) {
  return (
    <li className="border-b border-separator last:border-b-0">
      <Link
        className="repo-row group grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 px-1 py-4 outline-none sm:gap-4 sm:px-2 sm:py-5"
        href={repositoryHref(repository.owner.login, repository.name, { query })}
      >
        <RepositoryAvatar
          owner={repository.owner.login}
          size="sm"
          src={repository.owner.avatarUrl}
        />
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-foreground group-hover:text-accent sm:text-base">
            {repository.fullName}
          </span>
          <span className="mt-1 line-clamp-2 block text-sm leading-5 text-muted">
            {repository.description ?? "説明は登録されていません。"}
          </span>
          <span className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
            {repository.language ? <span>{repository.language}</span> : null}
            <span>Star {formatCount(repository.stargazersCount)}</span>
            <span>更新 {formatDate(repository.updatedAt)}</span>
          </span>
        </span>
      </Link>
    </li>
  );
}
