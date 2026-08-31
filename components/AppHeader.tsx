import { ThemeToggle } from "@/components/ThemeToggle";

export function AppHeader() {
  return (
    <header className="border-b border-separator">
      <div className="mx-auto flex h-14 w-full max-w-4xl items-center justify-end px-4 sm:px-6">
        <ThemeToggle />
      </div>
    </header>
  );
}
