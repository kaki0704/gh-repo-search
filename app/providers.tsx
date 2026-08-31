"use client";

import { I18nProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange enableSystem>
      <I18nProvider locale="ja-JP">{children}</I18nProvider>
    </ThemeProvider>
  );
}
