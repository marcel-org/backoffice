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
      <div className="flex min-h-screen items-center justify-center bg-[hsl(var(--background))] px-6">
        <div className="rounded-[2rem] border border-white/10 bg-white/6 px-8 py-10 text-center shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="mx-auto mb-5 h-16 w-16 rounded-[1.35rem] border border-white/10 bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary-soft)))] shadow-[0_20px_40px_rgba(148,163,184,0.2)]" />
          <p className="text-sm uppercase tracking-[0.24em] text-stone-500">
            Marcel
          </p>
          <p className="mt-2 text-lg font-semibold text-stone-100">
            Loading backoffice
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-[-18rem] h-[36rem] bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.14),transparent_58%)]" />
        <div className="absolute right-[-10rem] top-32 h-[24rem] w-[24rem] rounded-full bg-[rgba(148,163,184,0.08)] blur-3xl" />
        <div className="absolute left-[-10rem] bottom-20 h-[20rem] w-[20rem] rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        <div className="fixed inset-y-0 left-0 z-20 hidden xl:block">
          <Sidebar />
        </div>

        {mobileMenuOpen && (
          <>
            <button
              className="fixed inset-0 z-40 bg-black/60 xl:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation"
            />
            <div className="fixed inset-y-0 left-0 z-50 xl:hidden">
              <Sidebar compact onNavigate={() => setMobileMenuOpen(false)} />
            </div>
          </>
        )}

        <div className="flex min-w-0 flex-1 flex-col xl:pl-72">
          <header className="sticky top-0 z-30 border-b border-white/10 bg-[rgba(9,9,12,0.72)] px-4 py-4 backdrop-blur-xl xl:hidden">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                  Backoffice
                </p>
                <h1 className="mt-1 text-lg font-semibold text-stone-100">
                  Marcel
                </h1>
              </div>
              <button
                onClick={() => setMobileMenuOpen((value) => !value)}
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-stone-200 transition-all duration-300 hover:border-[hsl(var(--primary))/0.45] hover:text-[hsl(var(--primary))]"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? (
                  <CloseCircleBold className="h-6 w-6" />
                ) : (
                  <HamburgerMenuBold className="h-6 w-6" />
                )}
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-[1700px] px-4 py-4 sm:px-6 sm:py-6 xl:px-8 xl:py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
