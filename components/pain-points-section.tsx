"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Target, CheckCircle2 } from "lucide-react"

export function PainPointsSection() {
  const t = useTranslations("painPoints")

  const painPoints = [
    {
      icon: AlertTriangle,
      title: t("points.dataSilos.title"),
      description: t("points.dataSilos.description"),
    },
    {
      icon: AlertTriangle,
      title: t("points.lowEfficiency.title"),
      description: t("points.lowEfficiency.description"),
    },
    {
      icon: AlertTriangle,
      title: t("points.knowledgeGap.title"),
      description: t("points.knowledgeGap.description"),
    },
  ]

  return (
    <section id="pain-points" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground text-balance">
            {t("title")}<span className="text-gradient-cyan">{t("titleHighlight")}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Pain Points in contained box */}
        <div className="bg-secondary/60 rounded-2xl p-8 md:p-12 mb-16">
          <h3 className="text-xl font-semibold text-foreground mb-8 text-center">{t("whyChooseUs")}</h3>
          
          {/* 3-column grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((point, index) => (
              <Card key={index} className="bg-background border-border card-professional">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                    <point.icon className="h-6 w-6 text-destructive" />
                  </div>
                  <CardTitle className="text-lg text-foreground">{point.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground">
                    {point.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* PoC Framework */}
        <Card className="bg-background border-border max-w-4xl mx-auto">
          <CardHeader className="text-center pb-2">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Target className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="text-2xl md:text-3xl text-foreground">{t("poc.title")}</CardTitle>
            <CardDescription className="text-lg max-w-2xl mx-auto text-muted-foreground">
              {t("poc.subtitle")}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-gradient-cyan mb-2">1,000+</div>
                <p className="text-muted-foreground">{t("poc.dataCount")}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gradient-cyan mb-2">{t("poc.aiPredict")}</div>
                <p className="text-muted-foreground">{t("poc.aiPredict")}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gradient-cyan mb-2">{">"}80%</div>
                <p className="text-muted-foreground">{t("poc.matchRate")}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-10 p-4 rounded-lg bg-accent/10 max-w-md mx-auto">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              <span className="text-accent font-medium">{t("poc.guarantee")}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
