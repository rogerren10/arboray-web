"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BrandConfig } from "@/lib/brand";
import { getBrandConfig } from "@/lib/brand";
import { LoginModal } from "./LoginModal";
import { Menu, X, Globe, GraduationCap } from "lucide-react";

interface HeaderProps {
  brand: BrandConfig;
}

export function Header({ brand: initialBrand }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brand, setBrand] = useState<BrandConfig>(initialBrand);
  const [showLangMenu, setShowLangMenu] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("v32_language");
    if (stored === "en") {
      import("@/lib/brand/config.en").then((m) => {
        setBrand(m.enConfig);
      });
    }
  }, []);

  const switchLanguage = (lang: "cn" | "en") => {
    localStorage.setItem("v32_language", lang);
    const config = getBrandConfig();
    if (lang === "en") {
      import("@/lib/brand/config.en").then((m) => {
        setBrand(m.enConfig);
      });
    } else {
      import("@/lib/brand/config.cn").then((m) => {
        setBrand(m.cnConfig);
      });
    }
    setShowLangMenu(false);
    router.refresh();
  };

  const isCn = brand.brand === "cn";

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/tongguang-logo.png"
                alt={brand.brandName}
                width={140}
                height={40}
                className="h-10 w-auto"
              />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {brand.navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href.split("#")[0]);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-sm px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "text-zinc-100"
                        : "text-slate-400 hover:text-zinc-200"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={brand.routes.youngScientist}
              className="hidden items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 transition-all hover:bg-emerald-500/20 md:inline-flex"
            >
              <GraduationCap className="h-3.5 w-3.5" />
              {isCn ? "青年科学家计划" : "Young Scientist"}
            </Link>

            <div className="relative hidden md:block">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-400 transition-colors hover:border-slate-600 hover:text-zinc-300"
              >
                <Globe className="h-3.5 w-3.5" />
                {isCn ? "中文" : "EN"}
              </button>
              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-28 overflow-hidden rounded-md border border-slate-700 bg-slate-900 shadow-xl">
                  <button
                    onClick={() => switchLanguage("cn")}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-xs transition-colors ${
                      isCn ? "bg-emerald-500/10 text-emerald-300" : "text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <span className="text-sm">🇨🇳</span>
                    中文
                  </button>
                  <button
                    onClick={() => switchLanguage("en")}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-xs transition-colors ${
                      !isCn ? "bg-emerald-500/10 text-emerald-300" : "text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <span className="text-sm">🇺🇸</span>
                    English
                  </button>
                </div>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setLoginOpen(true)}
              className="hidden border-zinc-700 bg-slate-900 text-zinc-200 hover:bg-slate-800 hover:text-zinc-100 md:inline-flex"
            >
              {brand.consoleButtonText}
            </Button>
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-zinc-200 lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-slate-800/80 bg-slate-950 lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col px-6 py-4">
              {brand.navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href.split("#")[0]);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "rounded-sm px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "text-zinc-100"
                        : "text-slate-400 hover:text-zinc-200"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href={brand.routes.youngScientist}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 inline-flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-400"
              >
                <GraduationCap className="h-4 w-4" />
                {isCn ? "青年科学家启航计划" : "Young Scientist Program"}
              </Link>
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => switchLanguage("cn")}
                  className={`flex-1 rounded-md border px-3 py-2 text-xs ${
                    isCn
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      : "border-slate-700 bg-slate-900 text-slate-400"
                  }`}
                >
                  🇨🇳 中文
                </button>
                <button
                  onClick={() => switchLanguage("en")}
                  className={`flex-1 rounded-md border px-3 py-2 text-xs ${
                    !isCn
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      : "border-slate-700 bg-slate-900 text-slate-400"
                  }`}
                >
                  🇺🇸 English
                </button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLoginOpen(true);
                }}
                className="mt-3 border-zinc-700 bg-slate-900 text-zinc-200 hover:bg-slate-800 hover:text-zinc-100"
              >
                {brand.consoleButtonText}
              </Button>
            </nav>
          </div>
        )}
      </header>
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} brand={brand} />
    </>
  );
}
