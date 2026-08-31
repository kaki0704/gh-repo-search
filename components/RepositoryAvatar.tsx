import { Avatar } from "@heroui/react";

type RepositoryAvatarProps = Readonly<{
  owner: string;
  src: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}>;

export function RepositoryAvatar({ owner, src, size = "md", className }: RepositoryAvatarProps) {
  return (
    <Avatar className={className} size={size} variant="soft">
      <Avatar.Image alt={`${owner}のアバター`} loading="lazy" src={src} />
      <Avatar.Fallback>{owner.slice(0, 2).toUpperCase()}</Avatar.Fallback>
    </Avatar>
  );
}
