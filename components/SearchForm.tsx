"use client";

import { IconSearch } from "@tabler/icons-react";
import { Button, Label, SearchField } from "@heroui/react";

export function SearchForm({ defaultQuery = "" }: { defaultQuery?: string }) {
  return (
    <form action="/" className="mt-6" method="get" role="search">
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <SearchField className="min-w-0 flex-1" defaultValue={defaultQuery} fullWidth name="q">
          <Label className="sr-only">検索キーワード</Label>
          <SearchField.Group className="min-h-12">
            <SearchField.SearchIcon />
            <SearchField.Input autoComplete="off" maxLength={256} placeholder="リポジトリを検索" />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
        <Button className="min-h-12 w-full shrink-0 gap-2 px-7 sm:w-auto" type="submit">
          <IconSearch aria-hidden="true" size={18} stroke={1.75} />
          <span>検索</span>
        </Button>
      </div>
    </form>
  );
}
