import { Skeleton } from "@heroui/react";

export function SearchPageSkeleton() {
  return (
    <main
      aria-busy="true"
      aria-label="検索結果を読み込み中"
      className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14"
    >
      <section>
        <Skeleton className="h-8 max-w-sm rounded-lg" />
        <Skeleton className="mt-3 h-5 max-w-xl rounded-lg" />
        <Skeleton className="mt-6 h-11 w-full rounded-xl" />
      </section>
      <div className="mt-8 border-y border-separator">
        {Array.from({ length: 4 }, (_, index) => (
          <div className="flex gap-4 border-b border-separator py-5 last:border-b-0" key={index}>
            <Skeleton className="size-8 shrink-0 rounded-full" />
            <div className="w-full">
              <Skeleton className="h-5 max-w-sm rounded-md" />
              <Skeleton className="mt-3 h-4 max-w-xl rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
