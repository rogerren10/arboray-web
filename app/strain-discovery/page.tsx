"use client";

import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { getBrandConfig } from "@/lib/brand";
import { strainLibrary, matchStrains, type Strain } from "@/lib/data/strains";
import {
  Sparkles,
  Search,
  Loader2,
  Dna,
  Leaf,
  Shield,
  Thermometer,
  CheckCircle2,
  Lock,
  ArrowRight,
  X,
} from "lucide-react";
import ReactECharts from "echarts-for-react";

const USAGE_LIMIT = 5;
const STORAGE_KEY = "v32_strain_discovery_usage";

export default function StrainDiscoveryPage() {
  const brand = getBrandConfig();
  const isCn = brand.brand === "cn";

  const [requirements, setRequirements] = useState("");
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>([]);
  const [results, setResults] = useState<Strain[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [showLimitDialog, setShowLimitDialog] = useState(false);
  const [selectedStrain, setSelectedStrain] = useState<Strain | null>(null);

  const chartRef = useRef<ReactECharts>(null);

  const functionOptions = [
    { value: "生物固氮", label: isCn ? "生物固氮" : "Nitrogen Fixation" },
    { value: "解磷", label: isCn ? "解磷" : "Phosphorus Solubilization" },
    { value: "解钾", label: isCn ? "解钾" : "Potassium Solubilization" },
    { value: "生物防治", label: isCn ? "生物防治" : "Biocontrol" },
    { value: "促生长", label: isCn ? "促生长" : "Growth Promotion" },
    { value: "耐逆", label: isCn ? "耐逆" : "Stress Tolerance" },
  ];

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setUsageCount(parseInt(stored, 10) || 0);
    }
  }, []);

  const handleSearch = async () => {
    if (usageCount >= USAGE_LIMIT) {
      setShowLimitDialog(true);
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    const delay = 1200 + Math.random() * 1600;
    await new Promise((resolve) => setTimeout(resolve, delay));

    const matched = matchStrains(requirements, selectedFunctions);
    setResults(matched);

    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem(STORAGE_KEY, newCount.toString());

    setIsSearching(false);

    if (newCount >= USAGE_LIMIT) {
      setTimeout(() => setShowLimitDialog(true), 800);
    }
  };

  const toggleFunction = (func: string) => {
    setSelectedFunctions((prev) =>
      prev.includes(func) ? prev.filter((f) => f !== func) : [...prev, func]
    );
  };

  const getRadarOption = (strain: Strain) => ({
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(15, 23, 42, 0.9)",
      borderColor: "rgba(51, 65, 85, 0.5)",
      textStyle: { color: "#e4e4e7", fontSize: 12 },
    },
    radar: {
      indicator: [
        { name: isCn ? "固氮能力" : "N Fixation", max: 100 },
        { name: isCn ? "解磷能力" : "P Solubilization", max: 100 },
        { name: isCn ? "解钾能力" : "K Solubilization", max: 100 },
        { name: isCn ? "抗病能力" : "Disease Resistance", max: 100 },
        { name: isCn ? "促生能力" : "Growth Promotion", max: 100 },
        { name: isCn ? "抗逆能力" : "Stress Tolerance", max: 100 },
      ],
      shape: "polygon",
      splitNumber: 4,
      axisName: {
        color: "#71717a",
        fontSize: 11,
      },
      splitLine: {
        lineStyle: { color: "rgba(51, 65, 85, 0.5)" },
      },
      splitArea: {
        areaStyle: {
          color: ["rgba(15, 23, 42, 0.3)", "rgba(15, 23, 42, 0.5)"],
        },
      },
      axisLine: {
        lineStyle: { color: "rgba(51, 65, 85, 0.6)" },
      },
    },
    series: [
      {
        type: "radar",
        data: [
          {
            value: [
              strain.traits.nitrogenFixation,
              strain.traits.phosphorusSolubilization,
              strain.traits.potassiumSolubilization,
              strain.traits.diseaseResistance,
              strain.traits.growthPromotion,
              strain.traits.stressTolerance,
            ],
            name: isCn ? strain.name : strain.nameEn,
            areaStyle: {
              color: "rgba(16, 185, 129, 0.2)",
            },
            lineStyle: {
              color: "#10b981",
              width: 2,
            },
            itemStyle: {
              color: "#10b981",
            },
          },
        ],
      },
    ],
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header brand={brand} />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400">
              <Dna className="h-3.5 w-3.5" />
              {isCn ? "AI 菌株挖掘引擎" : "AI Strain Mining Engine"}
            </div>
            <h1 className="text-3xl font-bold text-zinc-100 sm:text-4xl">
              {isCn ? "智能菌株挖掘沙盒" : "Intelligent Strain Discovery Sandbox"}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-slate-400">
              {isCn
                ? "输入您的功能需求，AI将从万级菌株库中精准匹配，推荐最优菌株组合"
                : "Input your functional requirements, AI will precisely match from 10K+ strain library"}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-emerald-400" />
                    {isCn ? "功能需求描述" : "Functional Requirements"}
                  </CardTitle>
                  <CardDescription>
                    {isCn
                      ? "描述您需要的菌株功能，越详细匹配越精准"
                      : "Describe your desired strain functions"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="requirements">
                      {isCn ? "需求描述" : "Requirement Description"}
                    </Label>
                    <Textarea
                      id="requirements"
                      placeholder={
                        isCn
                          ? "例如：我需要一株能在盐碱地生长、具有固氮和解磷功能、同时对水稻纹枯病有防治效果的菌株..."
                          : "e.g., I need a strain that grows in saline-alkali soil, fixes nitrogen, solubilizes phosphorus..."
                      }
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      rows={5}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>{isCn ? "核心功能标签" : "Core Function Tags"}</Label>
                    <div className="flex flex-wrap gap-2">
                      {functionOptions.map((func) => (
                        <button
                          key={func.value}
                          onClick={() => toggleFunction(func.value)}
                          className={`rounded-full border px-3 py-1 text-xs transition-all ${
                            selectedFunctions.includes(func.value)
                              ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300"
                              : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600 hover:text-slate-300"
                          }`}
                        >
                          {func.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">
                        {isCn ? "剩余使用次数" : "Remaining Uses"}
                      </span>
                      <span className="text-sm font-medium text-zinc-200">
                        {Math.max(0, USAGE_LIMIT - usageCount)} / {USAGE_LIMIT}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all"
                        style={{
                          width: `${Math.max(0, ((USAGE_LIMIT - usageCount) / USAGE_LIMIT) * 100)}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-slate-500">
                      {isCn
                        ? "沙盒体验限制，申请青年科学家计划解锁更多"
                        : "Sandbox limit. Apply for Young Scientist Program to unlock more."}
                    </p>
                  </div>

                  <Button
                    onClick={handleSearch}
                    disabled={isSearching || (!requirements.trim() && selectedFunctions.length === 0)}
                    className="w-full bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {isCn ? "AI 匹配中..." : "AI Matching..."}
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        {isCn ? "开始智能匹配" : "Start Intelligent Matching"}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              {!hasSearched ? (
                <Card className="flex h-full min-h-[400px] items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-900">
                      <Dna className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-medium text-zinc-200">
                      {isCn ? "输入需求开始挖掘" : "Enter Requirements to Start"}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-slate-500">
                      {isCn
                        ? "描述您需要的菌株功能，或选择核心功能标签，AI将从菌株库中智能匹配最优菌株"
                        : "Describe your needs or select function tags. AI will match optimal strains from the library."}
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-3 text-left">
                      {[
                        { icon: Dna, text: isCn ? "12,000+ 菌株" : "12,000+ Strains" },
                        { icon: Leaf, text: isCn ? "6 大功能维度" : "6 Function Dimensions" },
                        { icon: Shield, text: isCn ? "安全评级认证" : "Safety Certified" },
                        { icon: Sparkles, text: isCn ? "AI 智能排序" : "AI Smart Ranking" },
                      ].map((item) => (
                        <div
                          key={item.text}
                          className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2"
                        >
                          <item.icon className="h-4 w-4 text-emerald-400" />
                          <span className="text-xs text-slate-400">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-zinc-100">
                      {isCn
                        ? `匹配结果（Top ${results.length}）`
                        : `Match Results (Top ${results.length})`}
                    </h2>
                    <span className="text-xs text-slate-500">
                      {isCn ? "按综合匹配度排序" : "Sorted by match score"}
                    </span>
                  </div>
                  {results.map((strain, index) => (
                    <Card
                      key={strain.id}
                      className="group cursor-pointer transition-all hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5"
                      onClick={() => setSelectedStrain(strain)}
                    >
                      <CardContent className="p-5">
                        <div className="flex gap-5">
                          <div className="flex-shrink-0">
                            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-slate-900">
                              <span className="font-mono text-sm font-bold text-emerald-400">
                                {index + 1}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-base font-semibold text-zinc-100">
                                  {isCn ? strain.name : strain.nameEn}
                                </h3>
                                <p className="text-xs italic text-slate-500">
                                  {strain.latinName}
                                </p>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400">
                                  {isCn ? strain.category : strain.categoryEn}
                                </span>
                              </div>
                            </div>
                            <p className="mt-2 text-sm text-slate-400 line-clamp-2">
                              {isCn ? strain.description : strain.descriptionEn}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {(isCn ? strain.functions : strain.functionsEn).map((func) => (
                                <span
                                  key={func}
                                  className="rounded-md bg-slate-900 px-2 py-0.5 text-xs text-slate-400"
                                >
                                  {func}
                                </span>
                              ))}
                            </div>
                            <div className="mt-4 h-40 w-full">
                              <ReactECharts
                                option={getRadarOption(strain)}
                                style={{ height: "100%", width: "100%" }}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Dialog open={!!selectedStrain} onOpenChange={(open) => !open && setSelectedStrain(null)}>
        <DialogContent className="sm:max-w-2xl">
          {selectedStrain && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
                    <Dna className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl">{isCn ? selectedStrain.name : selectedStrain.nameEn}</DialogTitle>
                    <p className="text-xs italic text-slate-500">{selectedStrain.latinName}</p>
                  </div>
                </div>
              </DialogHeader>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-sm font-medium text-zinc-200">
                    {isCn ? "功能性状雷达图" : "Functional Traits Radar"}
                  </h4>
                  <div className="h-64 w-full rounded-lg border border-slate-800 bg-slate-900/50 p-2">
                    <ReactECharts
                      option={getRadarOption(selectedStrain)}
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-zinc-200">
                      {isCn ? "菌株简介" : "Strain Description"}
                    </h4>
                    <p className="text-sm text-slate-400">{isCn ? selectedStrain.description : selectedStrain.descriptionEn}</p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-zinc-200">
                      {isCn ? "核心功能" : "Core Functions"}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {(isCn ? selectedStrain.functions : selectedStrain.functionsEn).map((func) => (
                        <span
                          key={func}
                          className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400"
                        >
                          {func}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-zinc-200">
                      {isCn ? "应用场景" : "Applications"}
                    </h4>
                    <ul className="space-y-1">
                      {(isCn ? selectedStrain.applications : selectedStrain.applicationsEn).map((app) => (
                        <li key={app} className="flex items-center gap-2 text-sm text-slate-400">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Shield className="h-4 w-4" />
                        {isCn ? "安全等级" : "Safety Level"}
                      </div>
                      <div className="mt-1 font-medium text-zinc-200">
                        {isCn ? selectedStrain.safetyLevel : selectedStrain.safetyLevelEn}
                      </div>
                    </div>
                    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Thermometer className="h-4 w-4" />
                        {isCn ? "保藏条件" : "Storage"}
                      </div>
                      <div className="mt-1 text-xs text-zinc-200">
                        {isCn ? selectedStrain.storageConditions : selectedStrain.storageConditionsEn}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedStrain(null)}>
                  {isCn ? "关闭" : "Close"}
                </Button>
                <Button className="bg-emerald-500 text-slate-950 hover:bg-emerald-400">
                  {isCn ? "申请菌株使用" : "Request Strain Access"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showLimitDialog} onOpenChange={setShowLimitDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
              <Lock className="h-8 w-8 text-emerald-400" />
            </div>
            <DialogTitle className="text-center text-xl">
              {isCn ? "沙盒体验次数已用完" : "Sandbox Quota Exceeded"}
            </DialogTitle>
            <DialogDescription className="text-center">
              {isCn
                ? "感谢您的体验！为保障系统稳定，每位访客可免费体验5次智能匹配。"
                : "Thank you for trying! Each visitor gets 5 free matches to ensure system stability."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <h4 className="font-medium text-emerald-300">
                {isCn ? "🎓 青年科学家启航计划" : "🎓 Young Scientist Program"}
              </h4>
              <p className="mt-2 text-sm text-slate-400">
                {isCn
                  ? "高校师生、科研机构研究人员可申请学术配额，免费获得更多菌株挖掘次数、研发助手权限及技术支持。"
                  : "University faculty, students, and researchers can apply for academic quota with free extended access."}
              </p>
              <Button className="mt-3 w-full bg-emerald-500 text-slate-950 hover:bg-emerald-400">
                {isCn ? "立即申请学术配额" : "Apply for Academic Quota"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
              <h4 className="font-medium text-zinc-200">
                {isCn ? "🏢 企业定制方案" : "🏢 Enterprise Solution"}
              </h4>
              <p className="mt-2 text-sm text-slate-400">
                {isCn
                  ? "企业用户可申请定制化菌株筛选服务，对接专属菌株库，获得专业技术团队支持。"
                  : "Enterprise users can request customized strain screening services with dedicated support."}
              </p>
              <Button variant="outline" className="mt-3 w-full">
                {isCn ? "联系商务团队" : "Contact Sales"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer brand={brand} />
    </div>
  );
}
