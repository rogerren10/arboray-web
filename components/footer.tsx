"use client"

import { useTranslations } from "next-intl"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  const t = useTranslations("footer")

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8">
                <svg viewBox="0 0 32 32" className="w-8 h-8" aria-label="Arboray Logo">
                  <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
                  <circle cx="16" cy="16" r="4" className="fill-primary" />
                  <circle cx="16" cy="6" r="2" className="fill-accent" />
                  <circle cx="24" cy="12" r="2" className="fill-accent" />
                  <circle cx="24" cy="22" r="2" className="fill-accent" />
                  <circle cx="16" cy="26" r="2" className="fill-accent" />
                  <circle cx="8" cy="22" r="2" className="fill-accent" />
                  <circle cx="8" cy="12" r="2" className="fill-accent" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-foreground">Arboray</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              {t("description")}
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t("solutions")}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/#industries" className="hover:text-foreground transition-colors">动物营养</Link></li>
              <li><Link href="/#industries" className="hover:text-foreground transition-colors">植物保护</Link></li>
              <li><Link href="/#industries" className="hover:text-foreground transition-colors">动物健康</Link></li>
              <li><Link href="/#roles" className="hover:text-foreground transition-colors">研发总监</Link></li>
              <li><Link href="/#roles" className="hover:text-foreground transition-colors">学术 PI</Link></li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t("platform")}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/#platform" className="hover:text-foreground transition-colors">菌株数据库</Link></li>
              <li><Link href="/#platform" className="hover:text-foreground transition-colors">AI Agent</Link></li>
              <li><Link href="/#platform" className="hover:text-foreground transition-colors">API 网关</Link></li>
              <li><Link href="/trust-center" className="hover:text-foreground transition-colors">信任中心</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t("company")}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">{t("aboutUs")}</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">{t("news")}</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">{t("careers")}</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">{t("contact")}</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="font-semibold mb-4 text-foreground">{t("newsletter")}</h4>
            <p className="text-sm text-muted-foreground mb-4">
              {t("newsletterDesc")}
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder={t("emailPlaceholder")} 
                type="email"
                className="bg-background border-border"
              />
              <Button size="default" className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90">
                {t("subscribe")}
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>
            &copy; {new Date().getFullYear()} Arboray. {t("allRightsReserved")}
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">{t("privacy")}</Link>
            <Link href="#" className="hover:text-foreground transition-colors">{t("terms")}</Link>
            <Link href="#" className="hover:text-foreground transition-colors">{t("cookies")}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
