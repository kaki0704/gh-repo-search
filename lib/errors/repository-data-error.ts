export type RepositoryDataErrorKind = "invalid-query" | "rate-limit" | "not-found" | "unavailable";

export class RepositoryDataError extends Error {
  readonly kind: RepositoryDataErrorKind;
  readonly resetAt: Date | null;

  constructor(kind: RepositoryDataErrorKind, message: string, resetAt: Date | null = null) {
    super(message);
    this.name = "RepositoryDataError";
    this.kind = kind;
    this.resetAt = resetAt;
  }
}
