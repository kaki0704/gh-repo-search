"use client";

import { Button } from "@heroui/react";
import Link from "next/link";

export default function RepositoryError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto grid min-h-[60dvh] w-full max-w-2xl place-items-center px-4 py-12 sm:px-6">
      <section className="w-full text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          リポジトリ情報を取得できませんでした
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted">
          GitHub APIの利用上限または一時的な通信エラーの可能性があります。
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button onPress={reset}>再試行</Button>
          <Link className="pagination-link" href="/">
            検索画面へ
          </Link>
        </div>
      </section>
    </main>
  );
}
