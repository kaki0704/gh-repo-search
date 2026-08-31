import type { RepositoryGateway } from "@/lib/gateways/repository-gateway";
import type { Repository } from "@/lib/types/repository";

export async function getRepository(
  gateway: RepositoryGateway,
  owner: string,
  name: string,
): Promise<Repository | null> {
  const normalizedOwner = owner.trim();
  const normalizedName = name.trim();

  if (!normalizedOwner || !normalizedName) {
    return null;
  }

  return gateway.findByName(normalizedOwner, normalizedName);
}
