import "server-only";

import { GitHubRepositoryGateway } from "@/lib/gateways/github/github-repository-gateway";
import type { RepositoryGateway } from "@/lib/gateways/repository-gateway";

export function createRepositoryGateway(): RepositoryGateway {
  return new GitHubRepositoryGateway();
}
