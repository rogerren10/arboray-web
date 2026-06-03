"use client"

import { useTranslations } from "next-intl"
import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Calculator, TrendingUp, Clock, DollarSign } from "lucide-react"

export function ROICalculator() {
  const t = useTranslations("roi")
  const [strainCount, setStrainCount] = useState([5000])
  const [rdBudget, setRdBudget] = useState([500000])

  const calculations = useMemo(() => {
    const strains = strainCount[0]
    const budget = rdBudget[0]
    
    // ROI calculation logic
    const activationRate = 0.35 // 35% dormant strain activation
    const cycleReduction = 0.40 // 40% R&D cycle reduction
    const costPerStrain = budget / strains
    const wetLabCostSaved = strains * activationRate * costPerStrain * 0.6
    
    return {
      activatedStrains: Math.round(strains * activationRate),
      cycleReduction: Math.round(cycleReduction * 100),
      costSaved: Math.round(wetLabCostSaved),
      roiMultiplier: (wetLabCostSaved / (budget * 0.05)).toFixed(1),
    }
  }, [strainCount, rdBudget])

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return `$${value}`
  }

  const formatNumber = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`
    }
    return value.toString()
  }

  return (
    <section id="roi-calculator" className="py-24 bg-slate-dark text-slate-dark-foreground">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/10">
            <Calculator className="mr-2 h-3 w-3" />
            {t("badge")}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-slate-dark-foreground">
            {t("title")}<span className="text-gradient-cyan">{t("titleHighlight")}</span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Controls */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-dark-foreground">{t("inputs.strainCount")}</CardTitle>
              <CardDescription className="text-slate-400">
                {t("inputs.rdBudget")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Strain Count Slider */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-300">{t("inputs.strainCount")}</label>
                  <span className="text-2xl font-bold text-gradient-cyan">
                    {formatNumber(strainCount[0])}
                  </span>
                </div>
                <Slider
                  value={strainCount}
                  onValueChange={setStrainCount}
                  min={1000}
                  max={100000}
                  step={1000}
                  className="w-full [&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>1,000</span>
                  <span>100,000</span>
                </div>
              </div>

              {/* R&D Budget Slider */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-300">{t("inputs.rdBudget")}</label>
                  <span className="text-2xl font-bold text-gradient-cyan">
                    {formatCurrency(rdBudget[0])}
                  </span>
                </div>
                <Slider
                  value={rdBudget}
                  onValueChange={setRdBudget}
                  min={100000}
                  max={5000000}
                  step={50000}
                  className="w-full [&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>$100K</span>
                  <span>$5M</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Display */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <Badge className="bg-primary/20 text-primary border-primary/30">+35%</Badge>
                </div>
                <div className="text-3xl font-bold text-slate-dark-foreground mb-1">
                  {formatNumber(calculations.activatedStrains)}
                </div>
                <p className="text-sm text-slate-400">{t("results.activated")}</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <Badge className="bg-accent/20 text-accent border-accent/30">-40%</Badge>
                </div>
                <div className="text-3xl font-bold text-slate-dark-foreground mb-1">
                  {calculations.cycleReduction}%
                </div>
                <p className="text-sm text-slate-400">{t("results.cycleReduction")}</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 col-span-2">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-emerald-400" />
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    {calculations.roiMultiplier}x ROI
                  </Badge>
                </div>
                <div className="text-4xl font-bold text-gradient-cyan mb-1">
                  {formatCurrency(calculations.costSaved)}
                </div>
                <p className="text-sm text-slate-400">{t("results.costSaved")}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-sm text-slate-500 mt-8 max-w-2xl mx-auto">
          {t("disclaimer")}
        </p>
      </div>
    </section>
  )
}
