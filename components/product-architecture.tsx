"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Database, Cpu, Webhook, ArrowRight, Check } from "lucide-react"

export function ProductArchitecture() {
  const t = useTranslations("product")

  const products = [
    {
      tier: t("products.saas.tier"),
      icon: Database,
      title: t("products.saas.title"),
      description: t("products.saas.description"),
      iconColor: "text-primary",
      iconBg: "bg-primary/10",
      features: t.raw("products.saas.features"),
      pricing: t("products.saas.pricing"),
      cta: t("products.saas.cta"),
    },
    {
      tier: t("products.ai.tier"),
      icon: Cpu,
      title: t("products.ai.title"),
      description: t("products.ai.description"),
      iconColor: "text-accent",
      iconBg: "bg-accent/10",
      features: t.raw("products.ai.features"),
      pricing: t("products.ai.pricing"),
      cta: t("products.ai.cta"),
      popular: true,
    },
    {
      tier: t("products.enterprise.tier"),
      icon: Webhook,
      title: t("products.enterprise.title"),
      description: t("products.enterprise.description"),
      iconColor: "text-indigo-500",
      iconBg: "bg-indigo-500/10",
      features: t.raw("products.enterprise.features"),
      pricing: t("products.enterprise.pricing"),
      cta: t("products.enterprise.cta"),
    },
  ]

  return (
    <section id="platform" className="py-24 bg-secondary/40">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            {t("badge")}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground text-balance">
            {t("title")}<span className="text-gradient-cyan">{t("titleHighlight")}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Product Cards - Perfectly aligned grid */}
        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <Card 
              key={index} 
              className={`relative bg-background border-border card-professional ${product.popular ? 'ring-2 ring-primary' : ''}`}
            >
              {product.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">{t("popular")}</Badge>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-lg ${product.iconBg} flex items-center justify-center`}>
                    <product.icon className={`h-6 w-6 ${product.iconColor}`} />
                  </div>
                  <Badge variant="outline" className="text-xs">{product.tier}</Badge>
                </div>
                <CardTitle className="text-xl text-foreground">{product.title}</CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                  {product.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Features - Aligned list */}
                <ul className="space-y-3">
                  {product.features.map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className={`h-5 w-5 ${product.iconColor} shrink-0 mt-0.5`} />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Pricing */}
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("pricing")}：<span className="font-medium text-foreground">{product.pricing}</span>
                  </p>
                  <Button 
                    className={`w-full ${product.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}
                    variant={product.popular ? "default" : "outline"}
                  >
                    {product.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Integration logos */}
        <div className="mt-20 text-center">
          <p className="text-sm text-muted-foreground mb-8">{t("partners")}</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {["BASF", "Novozymes", "DSM", "Evonik", "Kemin"].map((company, index) => (
              <div key={index} className="text-lg font-semibold tracking-wider text-muted-foreground/60 hover:text-muted-foreground transition-colors">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
