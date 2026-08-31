import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RepositoryDetail } from "@/components/RepositoryDetail";
import { createRepositoryGateway } from "@/lib/gateways/create-repository-gateway";
import { getRepository } from "@/lib/services/get-repository";
import { searchHref } from "@/lib/utils/routes";

type RepositoryPageProps = Readonly<{
  params: Promise<{ owner: string; repo: string }>;
  searchParams: Promise<{ q?: string | string[] }>;
}>;

function firstValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

export async function generateMetadata({ params }: RepositoryPageProps): Promise<Metadata> {
  const { owner, repo } = await params;
  return {
    title: `${owner}/${repo}`,
    description: `${owner}/${repo}のGitHubリポジトリ詳細`,
  };
}

export default async function RepositoryPage({ params, searchParams }: RepositoryPageProps) {
  const [{ owner, repo }, queryParameters] = await Promise.all([params, searchParams]);
  const repository = await getRepository(createRepositoryGateway(), owner, repo);

  if (!repository) {
    notFound();
  }

  const query = firstValue(queryParameters.q);

  return <RepositoryDetail backHref={searchHref({ query })} repository={repository} />;
}
