import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-[60dvh] w-full max-w-2xl place-items-center px-4 py-12 sm:px-6">
      <section className="w-full text-center">
        <p className="font-mono text-sm text-muted">404</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">
          リポジトリが見つかりませんでした
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted">
          削除または非公開になった可能性があります。検索画面から別のリポジトリをお探しください。
        </p>
        <Link className="pagination-link mt-6" href="/">
          検索画面へ戻る
        </Link>
      </section>
    </main>
  );
}
