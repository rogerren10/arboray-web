"use client"

import { useTranslations } from "next-intl"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Shield, 
  Lock, 
  Server, 
  FileCheck, 
  Database,
  Key,
  Eye,
  Network,
  CheckCircle2,
  ArrowRight
} from "lucide-react"

export default function TrustCenterPage() {
  const t = useTranslations("trustCenter")

  const securityPillars = [
    {
      icon: Server,
      title: t("pillars.dataLocalization.title"),
      description: t("pillars.dataLocalization.description"),
      features: t.raw("pillars.dataLocalization.features")
    },
    {
      icon: Key,
      title: t("pillars.lora.title"),
      description: t("pillars.lora.description"),
      features: t.raw("pillars.lora.features")
    },
    {
      icon: FileCheck,
      title: t("pillars.compliance.title"),
      description: t("pillars.compliance.description"),
      features: t.raw("pillars.compliance.features")
    }
  ]

  const securityFeatures = [
    {
      icon: Lock,
      title: t("features.encryption.title"),
      description: t("features.encryption.description")
    },
    {
      icon: Eye,
      title: t("features.audit.title"),
      description: t("features.audit.description")
    },
    {
      icon: Network,
      title: t("features.isolation.title"),
      description: t("features.isolation.description")
    },
    {
      icon: Database,
      title: t("features.backup.title"),
      description: t("features.backup.description")
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                <Shield className="mr-2 h-3 w-3" />
                {t("badge")}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground text-balance">
                {t("title")}
                <span className="text-gradient-cyan"> {t("titleHighlight")}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Security Pillars */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground text-balance">
                {t("pillarsTitle")}<span className="text-gradient-cyan">{t("pillarsHighlight")}</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("pillarsSubtitle")}
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {securityPillars.map((pillar, index) => (
                <Card key={index} className="bg-background border-border card-professional">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <pillar.icon className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-foreground">{pillar.title}</CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                      {pillar.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {pillar.features.map((feature: string, featureIndex: number) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Security Features */}
        <section className="py-24 bg-secondary/40">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground text-balance">
                {t("featuresTitle")}<span className="text-gradient-cyan">{t("featuresHighlight")}</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {securityFeatures.map((feature, index) => (
                <Card key={index} className="bg-background border-border text-center card-professional">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Architecture Diagram */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-background border-border overflow-hidden">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-foreground">{t("architectureTitle")}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {t("architectureSubtitle")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg border border-border bg-secondary/30">
                        <div className="text-center mb-4">
                          <Badge variant="outline">{t("architecture.client")}</Badge>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="p-2 rounded bg-background border border-border">{t("architecture.webApp")}</div>
                          <div className="p-2 rounded bg-background border border-border">{t("architecture.apiClient")}</div>
                          <div className="p-2 rounded bg-background border border-border">{t("architecture.lims")}</div>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg border-2 border-primary bg-primary/5">
                        <div className="text-center mb-4">
                          <Badge className="bg-primary text-primary-foreground">{t("architecture.security")}</Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="p-2 rounded bg-primary/10 text-primary font-medium">{t("architecture.waf")}</div>
                          <div className="p-2 rounded bg-primary/10 text-primary font-medium">{t("architecture.auth")}</div>
                          <div className="p-2 rounded bg-primary/10 text-primary font-medium">{t("architecture.access")}</div>
                          <div className="p-2 rounded bg-primary/10 text-primary font-medium">{t("architecture.gateway")}</div>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg border border-border bg-secondary/30">
                        <div className="text-center mb-4">
                          <Badge variant="outline">{t("architecture.data")}</Badge>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="p-2 rounded bg-background border border-border">{t("architecture.tenantStorage")}</div>
                          <div className="p-2 rounded bg-background border border-border">{t("architecture.vectorDB")}</div>
                          <div className="p-2 rounded bg-background border border-border">{t("architecture.localAI")}</div>
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:flex absolute top-1/2 left-[33%] w-[34%] h-0.5 -translate-y-1/2">
                      <div className="w-full h-full bg-gradient-to-r from-border via-primary to-border" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto bg-background border-border">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground text-balance">
                  {t("cta.title")}
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  {t("cta.subtitle")}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    {t("cta.downloadWhitepaper")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    {t("cta.scheduleMeeting")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
