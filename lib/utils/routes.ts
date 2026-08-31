type SearchLocation = Readonly<{
  query?: string;
}>;

export function searchHref({ query }: SearchLocation = {}): string {
  const parameters = new URLSearchParams();

  if (query?.trim()) {
    parameters.set("q", query.trim());
  }

  const search = parameters.toString();
  return search ? `/?${search}` : "/";
}

export function repositoryHref(owner: string, name: string, location: SearchLocation = {}): string {
  const path = `/repositories/${encodeURIComponent(owner)}/${encodeURIComponent(name)}`;
  const backLocation = searchHref(location);
  const search = backLocation.slice(2);

  return search ? `${path}?${search}` : path;
}
