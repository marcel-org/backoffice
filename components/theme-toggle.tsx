"use client";

import { MoonBold, SunBold } from "solar-icon-set";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-10 w-10 rounded-full p-0 text-stone-500 transition-all duration-300 hover:bg-stone-200/70 hover:text-[hsl(var(--primary))] dark:text-stone-300 dark:hover:bg-white/10"
      onClick={() => mounted && setTheme(theme === "dark" ? "light" : "dark")}
    >
      {mounted && theme === "dark" ? (
        <SunBold className="h-4 w-4" />
      ) : (
        <MoonBold className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
