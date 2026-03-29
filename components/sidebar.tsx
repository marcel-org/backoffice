"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  GraphUpBold,
  HomeBold,
  LogoutBold,
  ShieldCheckBold,
} from "solar-icon-set";
import { logout } from "@/lib/auth";
import { ThemeToggle } from "@/components/theme-toggle";

const navigation = [
  { name: "Overview", href: "/", icon: HomeBold },
  { name: "Analytics", href: "/analytics", icon: GraphUpBold },
  { name: "Operations", href: "/operations", icon: ShieldCheckBold },
];

export function Sidebar({
  compact = false,
  onNavigate,
}: {
  compact?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-stone-200/80 bg-[rgba(250,248,244,0.92)] backdrop-blur-xl dark:border-white/10 dark:bg-[rgba(9,9,12,0.82)]",
        compact ? "w-[19rem]" : "h-screen w-72"
      )}
    >
      <div className="p-6">
        <h1 className="text-xl font-semibold tracking-[-0.03em] text-stone-900 dark:text-stone-100">
          Marcel Backoffice
        </h1>
      </div>

      <div className="flex-1 px-4 pb-4">
        <div>
          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 rounded-[1.35rem] border px-4 py-3 text-sm font-medium transition-all duration-300",
                    isActive
                      ? "border-[hsl(var(--primary))/0.35] bg-white text-stone-950 shadow-[0_18px_40px_rgba(0,0,0,0.08)] dark:bg-white/10 dark:text-stone-50 dark:shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
                      : "border-transparent bg-transparent text-stone-500 hover:border-stone-200 hover:bg-stone-200/60 hover:text-stone-900 dark:text-stone-400 dark:hover:border-white/10 dark:hover:bg-white/5 dark:hover:text-stone-100"
                  )}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 dark:border-white/10 dark:bg-white/6 dark:text-inherit">
                    <Icon className="h-5 w-5" />
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="border-t border-stone-200/80 p-4 dark:border-white/10">
        <div className="flex items-center justify-end">
          <ThemeToggle />
        </div>

        <button
          onClick={logout}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-rose-300/40 bg-rose-100 px-5 py-3 text-sm font-medium text-rose-700 transition-all duration-300 hover:bg-rose-200 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-100 dark:hover:bg-rose-400/16"
        >
          <LogoutBold className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
