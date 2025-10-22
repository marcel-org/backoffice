"use client";

import { Sidebar } from "@/components/sidebar";
import { useEffect, useState } from "react";
import { checkAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { HamburgerMenuBold, CloseCircleBold } from "solar-icon-set";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth().then((admin) => {
      if (!admin) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 bg-[#FF9500] rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 animate-bounce-in">
              <img
                src="/marcel-logo.png"
                alt="Marcel"
                className="h-10 w-10"
              />
            </div>
          </div>
          <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden animate-slide-up">
            <Sidebar />
          </div>
        </>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all-smooth"
            >
              {mobileMenuOpen ? (
                <CloseCircleBold className="h-6 w-6" />
              ) : (
                <HamburgerMenuBold className="h-6 w-6" />
              )}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#FF9500] rounded-lg flex items-center justify-center shadow-md transform rotate-3">
                <img
                  src="/marcel-logo.png"
                  alt="Marcel"
                  className="h-5 w-5"
                />
              </div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Marcel Admin</h1>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}