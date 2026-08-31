import { Alert } from "@heroui/react";

import { RepositoryDataError } from "@/lib/errors/repository-data-error";
import { formatDateTime } from "@/lib/utils/format";

export function RepositoryErrorAlert({ error }: { error: unknown }) {
  const repositoryError = error instanceof RepositoryDataError ? error : null;
  const description = repositoryError?.message ?? "予期しないエラーが発生しました。";

  return (
    <Alert className="mt-8" status="danger">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>検索結果を取得できませんでした</Alert.Title>
        <Alert.Description>
          {description}
          {repositoryError?.resetAt
            ? ` 再試行の目安は ${formatDateTime(repositoryError.resetAt)} です。`
            : null}
        </Alert.Description>
      </Alert.Content>
    </Alert>
  );
}
