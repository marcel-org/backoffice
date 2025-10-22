"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  HomeBold,
  LogoutBold
} from "solar-icon-set";
import { logout } from "@/lib/auth";
import { ThemeToggle } from "@/components/theme-toggle";
import { ShapeElement } from "@/components/shape-element";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeBold },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex h-20 items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700">
        <div className="frowc gap-3">
          <div className="relative transform rotate-3 hover-glow transition-all-smooth">
            <ShapeElement
              shape="pentagon"
              color="#FF9500"
              width={40}
              height={40}
              className="drop-shadow-md"
              blink={true}
            />
          </div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Marcel Admin</h1>
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all-smooth group relative overflow-hidden",
                  isActive
                    ? "bg-[#FF9500] text-white shadow-lg hover:bg-[#FF7A00] hover:scale-105 hover:-translate-y-0.5"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                <Icon className="h-5 w-5 relative z-10" />
                <span className="relative z-10">{item.name}</span>
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF9500] to-[#FF7A00] opacity-10"></div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-3">
        <div className="px-3">
          <ThemeToggle />
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all-smooth group"
        >
          <LogoutBold className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}