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
        "flex h-full flex-col border-r border-white/10 bg-[rgba(9,9,12,0.82)] backdrop-blur-xl",
        compact ? "w-[19rem]" : "sticky top-0 h-screen w-72"
      )}
    >
      <div className="p-6">
        <h1 className="text-xl font-semibold tracking-[-0.03em] text-stone-100">
          Marcel Admin
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
                      ? "border-[hsl(var(--primary))/0.35] bg-white/10 text-stone-50 shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
                      : "border-transparent bg-transparent text-stone-400 hover:border-white/10 hover:bg-white/5 hover:text-stone-100"
                  )}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/6">
                    <Icon className="h-5 w-5" />
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10 p-4">
        <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-stone-200">Theme</p>
              <p className="mt-1 text-xs text-stone-500">
                Light or dark
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>

        <button
          onClick={logout}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-rose-400/20 bg-rose-400/10 px-5 py-3 text-sm font-medium text-rose-100 transition-all duration-300 hover:bg-rose-400/16"
        >
          <LogoutBold className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
