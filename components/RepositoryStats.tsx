import type { Repository } from "@/lib/types/repository";
import { formatCount } from "@/lib/utils/format";

export function RepositoryStats({ repository }: { repository: Repository }) {
  const metrics = [
    { label: "Star", value: repository.stargazersCount },
    { label: "Watcher", value: repository.watchersCount },
    { label: "Fork", value: repository.forksCount },
    { label: "Open Issue", value: repository.openIssuesCount },
  ];

  return (
    <dl className="grid grid-cols-2 border-y border-separator sm:grid-cols-4">
      {metrics.map((metric) => (
        <div className="metric-cell" key={metric.label}>
          <dt className="text-xs font-medium text-muted">{metric.label}</dt>
          <dd className="mt-2 truncate font-mono text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {formatCount(metric.value)}
          </dd>
        </div>
      ))}
    </dl>
  );
}
