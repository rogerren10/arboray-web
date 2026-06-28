"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sparkles,
  FlaskConical,
  Beaker,
  TestTube2,
  Microscope,
  Leaf,
  Dna,
  ArrowRight,
  ChevronRight,
  Zap,
  Database,
  Clock,
  Target,
} from "lucide-react";
import type { BrandConfig } from "@/lib/brand";

interface HomePageProps {
  brand: BrandConfig;
}

export function HomePage({ brand }: HomePageProps) {
  const isCn = brand.brand === "cn";

  const stats = [
    {
      value: "12,000+",
      label: isCn ? "菌株资产" : "Strain Assets",
      icon: Database,
    },
    {
      value: "85%",
      label: isCn ? "筛选效率提升" : "Screening Efficiency",
      icon: Zap,
    },
    {
      value: "6 个月 → 7 天",
      label: isCn ? "研发周期缩短" : "R&D Cycle Reduction",
      icon: Clock,
    },
    {
      value: "98.2%",
      label: isCn ? "匹配准确率" : "Matching Accuracy",
      icon: Target,
    },
  ];

  const threeLayers = [
    {
      title: isCn ? "菌株发现层" : "Strain Discovery",
      subtitle: isCn ? "核心差异化能力" : "Core Differentiation",
      description: isCn
        ? "AI驱动的菌株挖掘引擎，从海量休眠菌株资产中精准匹配功能需求，唤醒沉睡的生物多样性宝库。"
        : "AI-powered strain mining engine that precisely matches functional requirements from vast dormant strain assets.",
      icon: Dna,
      features: isCn
        ? ["智能功能匹配", "多维度性状预测", "Top-K推荐排序", "可解释性评分"]
        : ["Intelligent Function Matching", "Multi-dimensional Trait Prediction", "Top-K Ranking", "Explainable Scoring"],
      href: brand.routes.strainDiscovery,
      accent: "from-emerald-500/20 to-teal-500/10",
      borderColor: "border-emerald-500/30",
      iconColor: "text-emerald-400",
    },
    {
      title: isCn ? "研发流程层" : "R&D Process",
      subtitle: isCn ? "全链路AI助手" : "Full-Stack AI Assistant",
      description: isCn
        ? "覆盖采样规划、分离培养、初筛复筛、菌种鉴定、保藏管理、工艺放大7大研发环节，全程AI赋能。"
        : "Covers 7 R&D stages: sampling, isolation, screening, identification, preservation, and scale-up - all AI-powered.",
      icon: FlaskConical,
      features: isCn
        ? ["7大研发环节", "实验方案智能生成", "数据结构化分析", "知识图谱关联"]
        : ["7 R&D Stages", "Intelligent Protocol Generation", "Structured Data Analysis", "Knowledge Graph"],
      href: brand.routes.rdAssistant,
      accent: "from-blue-500/20 to-cyan-500/10",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-400",
    },
    {
      title: isCn ? "工艺放大层" : "Process Scale-up",
      subtitle: isCn ? "农业场景化优化" : "Agricultural Optimization",
      description: isCn
        ? "针对堆肥、青贮、菌剂发酵等农业场景，提供碳氮比、含水率、温度等关键参数的智能优化方案。"
        : "Intelligent optimization for composting, silage, and microbial fermentation with key agricultural parameters.",
      icon: Beaker,
      features: isCn
        ? ["农业场景适配", "参数动态优化", "曲线模拟预测", "成本效益分析"]
        : ["Agricultural Scenarios", "Dynamic Parameter Optimization", "Curve Simulation", "Cost-Benefit Analysis"],
      href: brand.routes.processOptimization,
      accent: "from-amber-500/20 to-orange-500/10",
      borderColor: "border-amber-500/30",
      iconColor: "text-amber-400",
    },
  ];

  const rdStages = [
    { icon: Leaf, title: isCn ? "采样规划" : "Sampling", desc: isCn ? "AI优化采样策略" : "AI-optimized sampling" },
    { icon: TestTube2, title: isCn ? "分离培养" : "Isolation", desc: isCn ? "智能培养基推荐" : "Smart media recommendation" },
    { icon: Microscope, title: isCn ? "初筛分析" : "Primary Screening", desc: isCn ? "高通量筛选辅助" : "High-throughput screening aid" },
    { icon: FlaskConical, title: isCn ? "复筛优化" : "Secondary Screening", desc: isCn ? "多目标优化算法" : "Multi-objective optimization" },
    { icon: Dna, title: isCn ? "菌种鉴定" : "Identification", desc: isCn ? "分子生物学辅助" : "Molecular biology aid" },
    { icon: Database, title: isCn ? "保藏管理" : "Preservation", desc: isCn ? "菌株全生命周期" : "Full lifecycle management" },
    { icon: Beaker, title: isCn ? "工艺放大" : "Scale-up", desc: isCn ? "发酵工艺优化" : "Fermentation optimization" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.06),transparent_50%)]" />
        
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-1.5 text-xs text-slate-400">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              <span>{isCn ? "AI 驱动的农业微生物创新平台" : "AI-Powered Agricultural Microbial Innovation"}</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl lg:text-6xl">
              {isCn ? "用 AI 唤醒" : "Awaken "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                {isCn ? "休眠菌株资产" : "Dormant Strain Assets"}
              </span>
            </h1>
            
            <p className="mt-6 text-lg leading-8 text-slate-400">
              {isCn
                ? "分布式菌株深度挖掘与复用平台，将6个月的湿实验筛选周期缩短至数天。从菌株发现到工艺放大，全流程AI赋能。"
                : "Distributed strain deep mining and reuse platform. Reduce 6-month wet lab screening to days. Full-stack AI from discovery to scale-up."}
            </p>
            
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-emerald-500 text-slate-950 hover:bg-emerald-400">
                <Link href={brand.routes.strainDiscovery}>
                  {isCn ? "立即体验菌株挖掘" : "Try Strain Discovery"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={brand.routes.rdAssistant}>
                  {isCn ? "了解研发助手" : "Explore R&D Assistant"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-slate-800/80 bg-slate-950/50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900">
                  <stat.icon className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-zinc-100">{stat.value}</div>
                <div className="mt-1 text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three-Layer Value System */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
              {isCn ? "三层价值体系" : "Three-Layer Value System"}
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              {isCn
                ? "从菌株发现到工艺放大，构建农业微生物研发全链路AI能力"
                : "From strain discovery to process scale-up - building full-stack AI for agricultural microbial R&D"}
            </p>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {threeLayers.map((layer) => (
              <Card
                key={layer.title}
                className={`group relative overflow-hidden border ${layer.borderColor} bg-gradient-to-b ${layer.accent} transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20`}
              >
                <CardHeader>
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900/80 ${layer.iconColor}`}>
                    <layer.icon className="h-6 w-6" />
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    {layer.subtitle}
                  </p>
                  <CardTitle className="text-xl">{layer.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {layer.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {layer.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                        <ChevronRight className={`h-4 w-4 ${layer.iconColor}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="ghost" className="mt-6 w-full group hover:bg-slate-800/50">
                    <Link href={layer.href}>
                      {isCn ? "了解更多" : "Learn More"}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* R&D Full-Link Assistant */}
      <section className="border-y border-slate-800/80 bg-slate-950/50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                {isCn ? "研发全链路 AI 助手" : "Full-Link R&D AI Assistant"}
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                {isCn
                  ? "覆盖农业微生物研发7大核心环节，每个环节都有专业AI向导辅助决策，让科研效率倍增。"
                  : "Covers 7 core stages of agricultural microbial R&D. Each stage has a specialized AI guide to assist decision-making."}
              </p>
              <Button asChild className="mt-8">
                <Link href={brand.routes.rdAssistant}>
                  {isCn ? "体验研发助手" : "Try R&D Assistant"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-4">
              {rdStages.map((stage, index) => (
                <div
                  key={stage.title}
                  className="group rounded-lg border border-slate-800 bg-slate-900/50 p-4 transition-all hover:border-emerald-500/30 hover:bg-slate-900"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-slate-950 text-emerald-400 group-hover:text-emerald-300">
                    <stage.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-medium text-zinc-200">{stage.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">{stage.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Young Scientist Program CTA */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Card className="overflow-hidden border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent">
            <div className="grid gap-8 p-8 md:p-12 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  {isCn ? "青年科学家启航计划" : "Young Scientist Program"}
                </div>
                <h3 className="text-2xl font-bold text-zinc-100 sm:text-3xl">
                  {isCn
                    ? "助力学术科研，免费算力配额"
                    : "Empowering Academic Research - Free Compute Quota"}
                </h3>
                <p className="mt-4 text-slate-400">
                  {isCn
                    ? "为高校和科研机构的青年学者提供免费学术算力配额，支持菌株挖掘、数据分析等科研工作。加入计划，加速您的微生物研究。"
                    : "Free academic compute quota for young researchers in universities and research institutions. Accelerate your microbial research."}
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {isCn ? "免费学术配额" : "Free Academic Quota"}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {isCn ? "优先技术支持" : "Priority Support"}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {isCn ? "合作发表机会" : "Collaboration Opportunities"}
                  </div>
                </div>
                <Button asChild className="mt-8 bg-emerald-500 text-slate-950 hover:bg-emerald-400">
                  <Link href={brand.routes.youngScientist}>
                    {isCn ? "立即申请" : "Apply Now"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative hidden lg:block">
                <div className="absolute -right-4 -top-4 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl" />
                <div className="absolute -bottom-4 -right-12 h-32 w-32 rounded-full bg-teal-500/20 blur-3xl" />
                <div className="relative rounded-lg border border-slate-700/50 bg-slate-900/80 p-6 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20">
                      <FlaskConical className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-zinc-200">
                        {isCn ? "学术算力配额" : "Academic Compute Quota"}
                      </div>
                      <div className="text-xs text-slate-500">
                        {isCn ? "每月更新" : "Monthly Renewal"}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>{isCn ? "已使用" : "Used"}</span>
                      <span className="text-emerald-400">32%</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-slate-800">
                      <div className="h-full w-[32%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="rounded-md bg-slate-950/50 p-2">
                      <div className="font-mono text-sm text-zinc-300">50K</div>
                      <div className="text-slate-500">{isCn ? "Tokens" : "Tokens"}</div>
                    </div>
                    <div className="rounded-md bg-slate-950/50 p-2">
                      <div className="font-mono text-sm text-zinc-300">100</div>
                      <div className="text-slate-500">{isCn ? "分析次数" : "Analyses"}</div>
                    </div>
                    <div className="rounded-md bg-slate-950/50 p-2">
                      <div className="font-mono text-sm text-zinc-300">∞</div>
                      <div className="text-slate-500">{isCn ? "菌株查询" : "Queries"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-slate-800/80 bg-slate-950/50 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            {isCn ? "开启您的 AI 菌株发现之旅" : "Start Your AI Strain Discovery Journey"}
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            {isCn
              ? "立即体验菌株挖掘沙盒，感受AI驱动的微生物研发新范式"
              : "Experience the strain discovery sandbox and feel the new paradigm of AI-driven microbial R&D"}
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-emerald-500 text-slate-950 hover:bg-emerald-400">
              <Link href={brand.routes.strainDiscovery}>
                {isCn ? "免费开始使用" : "Get Started Free"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
