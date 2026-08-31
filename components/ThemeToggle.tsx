"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { Button } from "@heroui/react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      aria-label="カラーテーマを切り替える"
      className="theme-toggle"
      isIconOnly
      size="sm"
      variant="ghost"
      onPress={toggleTheme}
    >
      <IconMoon aria-hidden="true" className="dark:hidden" size={18} stroke={1.75} />
      <IconSun aria-hidden="true" className="hidden dark:block" size={18} stroke={1.75} />
    </Button>
  );
}
