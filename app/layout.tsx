import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Providers } from "@/app/providers";
import { AppHeader } from "@/components/AppHeader";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "GitHubリポジトリ検索",
    template: "%s | GitHubリポジトリ検索",
  },
  description: "キーワードからGitHubの公開リポジトリを検索できます。",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <Providers>
          <div className="min-h-[100dvh]">
            <AppHeader />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
