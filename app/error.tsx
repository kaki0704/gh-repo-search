"use client";

import { Button } from "@heroui/react";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto grid min-h-[60dvh] w-full max-w-2xl place-items-center px-4 py-12 sm:px-6">
      <section className="w-full text-center">
        <h1 className="text-2xl font-semibold tracking-tight">ページを表示できませんでした</h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted">
          一時的な問題が発生しました。時間をおいて再度お試しください。
        </p>
        <Button className="mt-6" onPress={reset}>
          再試行
        </Button>
      </section>
    </main>
  );
}
