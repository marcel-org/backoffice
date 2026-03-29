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
      className="h-11 w-11 rounded-2xl border border-white/10 bg-white/6 p-0 text-stone-200 transition-all duration-300 hover:border-[hsl(var(--primary))/0.4] hover:bg-white/10 hover:text-[hsl(var(--primary))]"
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
