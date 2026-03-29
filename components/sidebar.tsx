"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ChartSquareBold,
  HomeBold,
  LayersBold,
  LogoutBold,
  ShieldCheckBold,
} from "solar-icon-set";
import { logout } from "@/lib/auth";
import { ThemeToggle } from "@/components/theme-toggle";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeBold },
];

const sections = [
  { name: "Overview", href: "#overview", icon: LayersBold },
  { name: "Analytics", href: "#analytics", icon: ChartSquareBold },
  { name: "Operations", href: "#operations", icon: ShieldCheckBold },
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
        <div className="rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.32)]">
          <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
            Backoffice
          </p>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-[1.35rem] border border-white/10 bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary-soft)))] shadow-[0_18px_40px_rgba(193,154,107,0.3)]">
              <ChartSquareBold className="h-7 w-7 text-[#120f0a]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-[-0.03em] text-stone-100">
                Marcel
              </h1>
              <p className="mt-1 text-sm text-stone-400">
                Admin control panel
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-8 px-4 pb-4">
        <div>
          <p className="px-3 text-xs uppercase tracking-[0.22em] text-stone-500">
            Pages
          </p>
          <nav className="mt-3 space-y-2">
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

        <div>
          <p className="px-3 text-xs uppercase tracking-[0.22em] text-stone-500">
            Sections
          </p>
          <div className="mt-3 space-y-2">
            {sections.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className="flex items-center gap-3 rounded-[1.25rem] border border-transparent px-4 py-3 text-sm font-medium text-stone-400 transition-all duration-300 hover:border-white/10 hover:bg-white/5 hover:text-stone-100"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/6">
                    <Icon className="h-5 w-5" />
                  </span>
                  {item.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 p-4">
        <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-stone-200">Theme</p>
              <p className="mt-1 text-xs text-stone-500">
                Switch light or dark mode
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
