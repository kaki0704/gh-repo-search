import { Skeleton } from "@heroui/react";

export default function RepositoryLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="リポジトリ詳細を読み込み中"
      className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12"
    >
      <Skeleton className="h-5 w-36 rounded-md" />
      <div className="mt-6 border-b border-separator pb-8">
        <div className="flex gap-5 sm:gap-6">
          <Skeleton className="size-14 shrink-0 rounded-full sm:size-16" />
          <div className="w-full">
            <Skeleton className="h-5 w-32 rounded-md" />
            <Skeleton className="mt-3 h-9 max-w-xl rounded-lg" />
            <Skeleton className="mt-4 h-5 max-w-2xl rounded-md" />
          </div>
        </div>
      </div>
      <Skeleton className="mt-8 h-24 w-full rounded-lg" />
    </main>
  );
}
