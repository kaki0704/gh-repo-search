import { RepositoryErrorAlert } from "@/components/RepositoryErrorAlert";
import { RepositoryList } from "@/components/RepositoryList";
import { SearchForm } from "@/components/SearchForm";
import { RepositoryDataError } from "@/lib/errors/repository-data-error";
import { createRepositoryGateway } from "@/lib/gateways/create-repository-gateway";
import { searchRepositories } from "@/lib/services/search-repositories";

type HomePageProps = Readonly<{
  searchParams: Promise<{
    q?: string | string[];
  }>;
}>;

function firstValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const parameters = await searchParams;
  const query = firstValue(parameters.q).trim();
  let results = null;
  let searchError: unknown = null;

  if (query) {
    try {
      results = await searchRepositories(createRepositoryGateway(), { query });
    } catch (error) {
      if (!(error instanceof RepositoryDataError)) {
        throw error;
      }
      searchError = error;
    }
  }

  const isInitialView = !query;

  return (
    <main
      className={`mx-auto w-full max-w-4xl px-4 sm:px-6 ${
        isInitialView
          ? "flex min-h-[calc(100dvh-3.5rem)] items-center py-10 sm:py-14"
          : "py-10 sm:py-14"
      }`}
    >
      <section
        aria-labelledby="search-heading"
        className={isInitialView ? "mx-auto w-full max-w-2xl" : undefined}
      >
        <h1
          className={`font-semibold tracking-tight text-foreground ${
            isInitialView ? "text-center text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
          }`}
          id="search-heading"
        >
          GitHubリポジトリ検索
        </h1>
        <SearchForm key={query} defaultQuery={query} />
      </section>

      {searchError ? <RepositoryErrorAlert error={searchError} /> : null}
      {results ? <RepositoryList key={query} query={query} result={results} /> : null}
    </main>
  );
}
