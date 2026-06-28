"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Leaf,
  TestTube2,
  Microscope,
  FlaskConical,
  Dna,
  Database,
  Beaker,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { getBrandConfig } from "@/lib/brand";

interface Stage {
  id: string;
  icon: typeof Leaf;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  description: string;
  descriptionEn: string;
  aiCapabilities: string[];
  aiCapabilitiesEn: string[];
  color: string;
}

const stages: Stage[] = [
  {
    id: "sampling",
    icon: Leaf,
    title: "采样规划",
    titleEn: "Sampling Planning",
    subtitle: "AI优化采样策略",
    subtitleEn: "AI-Optimized Sampling Strategy",
    description:
      "基于目标生境和研究目的，智能规划采样位点、样本量和采样方法，最大化样本代表性和微生物多样性。",
    descriptionEn:
      "Intelligently plan sampling sites, sample size, and methods based on target habitat and research objectives.",
    aiCapabilities: [
      "生境适宜性分析",
      "采样位点优化推荐",
      "样本量统计学计算",
      "采样方案智能生成",
    ],
    aiCapabilitiesEn: [
      "Habitat suitability analysis",
      "Sampling site optimization",
      "Statistical sample size calculation",
      "Intelligent protocol generation",
    ],
    color: "emerald",
  },
  {
    id: "isolation",
    icon: TestTube2,
    title: "分离培养",
    titleEn: "Isolation & Culture",
    subtitle: "智能培养基推荐",
    subtitleEn: "Smart Media Recommendation",
    description:
      "根据目标菌群特性，智能推荐分离培养基、培养条件和纯化策略，提高目标菌株分离成功率。",
    descriptionEn:
      "Intelligently recommend isolation media, culture conditions, and purification strategies based on target microbiota.",
    aiCapabilities: [
      "培养基配方优化",
      "培养条件预测",
      "分离策略推荐",
      "纯化方案设计",
    ],
    aiCapabilitiesEn: [
      "Media formulation optimization",
      "Culture condition prediction",
      "Isolation strategy recommendation",
      "Purification protocol design",
    ],
    color: "blue",
  },
  {
    id: "primary-screening",
    icon: Microscope,
    title: "初筛分析",
    titleEn: "Primary Screening",
    subtitle: "高通量筛选辅助",
    subtitleEn: "High-Throughput Screening Aid",
    description:
      "智能分析初筛数据，快速识别有潜力的候选菌株，降低后续实验工作量，提高筛选效率。",
    descriptionEn:
      "Intelligently analyze primary screening data to quickly identify promising candidate strains.",
    aiCapabilities: [
      "数据自动质控",
      "阳性菌株智能识别",
      "多维度聚类分析",
      "候选菌株排序推荐",
    ],
    aiCapabilitiesEn: [
      "Automated data QC",
      "Positive strain identification",
      "Multi-dimensional clustering",
      "Candidate ranking",
    ],
    color: "cyan",
  },
  {
    id: "secondary-screening",
    icon: FlaskConical,
    title: "复筛优化",
    titleEn: "Secondary Screening",
    subtitle: "多目标优化算法",
    subtitleEn: "Multi-Objective Optimization",
    description:
      "采用多目标优化算法，针对产量、活性、稳定性等多个指标进行菌株性能综合评估和优化。",
    descriptionEn:
      "Multi-objective optimization for comprehensive strain performance evaluation across yield, activity, stability.",
    aiCapabilities: [
      "多目标性能评估",
      "培养条件优化",
      "响应面分析预测",
      "最优菌株遴选",
    ],
    aiCapabilitiesEn: [
      "Multi-objective evaluation",
      "Culture condition optimization",
      "Response surface prediction",
      "Optimal strain selection",
    ],
    color: "violet",
  },
  {
    id: "identification",
    icon: Dna,
    title: "菌种鉴定",
    titleEn: "Strain Identification",
    subtitle: "分子生物学辅助",
    subtitleEn: "Molecular Biology Aid",
    description:
      "基于16S rRNA、全基因组测序等分子生物学数据，智能辅助菌种分类鉴定和功能基因预测。",
    descriptionEn:
      "AI-assisted taxonomic identification and functional gene prediction from 16S rRNA and whole genome data.",
    aiCapabilities: [
      "物种分类鉴定",
      "功能基因注释",
      "进化树构建辅助",
      "新种可能性评估",
    ],
    aiCapabilitiesEn: [
      "Taxonomic identification",
      "Functional gene annotation",
      "Phylogenetic tree assistance",
      "Novel species assessment",
    ],
    color: "pink",
  },
  {
    id: "preservation",
    icon: Database,
    title: "保藏管理",
    titleEn: "Preservation Management",
    subtitle: "全生命周期管理",
    subtitleEn: "Full Lifecycle Management",
    description:
      "菌株全生命周期数字化管理，智能推荐保藏方式、传代周期和质量控制方案。",
    descriptionEn:
      "Digital lifecycle management with intelligent recommendations for preservation methods and QC schedules.",
    aiCapabilities: [
      "保藏方案推荐",
      "传代周期智能提醒",
      "活性衰减预测",
      "质量控制方案",
    ],
    aiCapabilitiesEn: [
      "Preservation recommendation",
      "Smart passage reminders",
      "Viability decay prediction",
      "QC protocols",
    ],
    color: "amber",
  },
  {
    id: "scaleup",
    icon: Beaker,
    title: "工艺放大",
    titleEn: "Process Scale-up",
    subtitle: "发酵工艺优化",
    subtitleEn: "Fermentation Optimization",
    description:
      "从实验室到工业化生产的工艺放大支持，智能优化发酵参数，降低放大风险，缩短产业化周期。",
    descriptionEn:
      "Process scale-up support from lab to industrial production with intelligent fermentation optimization.",
    aiCapabilities: [
      "发酵参数优化",
      "放大效应预测",
      "成本效益分析",
      "工艺稳定性评估",
    ],
    aiCapabilitiesEn: [
      "Fermentation parameter optimization",
      "Scale-up effect prediction",
      "Cost-benefit analysis",
      "Process stability assessment",
    ],
    color: "orange",
  },
];

export default function RdAssistantPage() {
  const brand = getBrandConfig();
  const isCn = brand.brand === "cn";
  const [activeStage, setActiveStage] = useState<string>(stages[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<string | null>(null);

  const activeStageData = stages.find((s) => s.id === activeStage)!;

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedResult(null);

    const delay = 1500 + Math.random() * 1500;
    await new Promise((resolve) => setTimeout(resolve, delay));

    const templates = isCn
      ? [
          `根据您的研究需求，AI已为您生成${activeStageData.title}方案建议：\n\n1. **方案概述**：基于目标菌株特性和实验室条件，推荐采用分步优化策略，预计可将效率提升30-40%。\n\n2. **关键参数**：\n   - 核心变量：温度、pH、接种量\n   - 优化目标：产量最大化 + 稳定性提升\n   - 预计周期：7-10天\n\n3. **注意事项**：\n   - 建议设置3个生物学重复\n   - 注意无菌操作规范\n   - 及时记录过程数据\n\n4. **下一步建议**：先进行小试验证，再逐步放大。`,
          `AI智能分析完成，为您推荐以下${activeStageData.title}优化方案：\n\n**推荐方案A（高效型）**\n- 优势：时间短、效率高\n- 适用：快速筛选阶段\n- 预计成功率：约75%\n\n**推荐方案B（稳健型）**\n- 优势：结果稳定、可重复性好\n- 适用：正式实验阶段\n- 预计成功率：约90%\n\n**建议**：根据您的实验阶段，推荐先使用方案A快速缩小范围，再用方案B验证。`,
        ]
      : [
          `Based on your research needs, AI has generated ${activeStageData.titleEn} recommendations:\n\n1. **Overview**: Stepwise optimization strategy recommended, expected 30-40% efficiency improvement.\n\n2. **Key Parameters**:\n   - Core variables: Temperature, pH, inoculum size\n   - Optimization goals: Max yield + stability\n   - Expected timeline: 7-10 days\n\n3. **Notes**:\n   - 3 biological replicates recommended\n   - Maintain sterile technique\n   - Document process data promptly\n\n4. **Next steps**: Validate at small scale first, then scale up gradually.`,
        ];

    const result = templates[Math.floor(Math.random() * templates.length)];
    setGeneratedResult(result);
    setIsGenerating(false);
  };

  const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
    emerald: {
      bg: "from-emerald-500/20 to-teal-500/10",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
    },
    blue: {
      bg: "from-blue-500/20 to-cyan-500/10",
      border: "border-blue-500/30",
      text: "text-blue-400",
    },
    cyan: {
      bg: "from-cyan-500/20 to-teal-500/10",
      border: "border-cyan-500/30",
      text: "text-cyan-400",
    },
    violet: {
      bg: "from-violet-500/20 to-purple-500/10",
      border: "border-violet-500/30",
      text: "text-violet-400",
    },
    pink: {
      bg: "from-pink-500/20 to-rose-500/10",
      border: "border-pink-500/30",
      text: "text-pink-400",
    },
    amber: {
      bg: "from-amber-500/20 to-orange-500/10",
      border: "border-amber-500/30",
      text: "text-amber-400",
    },
    orange: {
      bg: "from-orange-500/20 to-red-500/10",
      border: "border-orange-500/30",
      text: "text-orange-400",
    },
  };

  const activeColor = colorClasses[activeStageData.color];

  return (
    <div className="flex min-h-screen flex-col">
      <Header brand={brand} />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-400">
              <Sparkles className="h-3.5 w-3.5" />
              {isCn ? "全链路 AI 研发助手" : "Full-Stack AI R&D Assistant"}
            </div>
            <h1 className="text-3xl font-bold text-zinc-100 sm:text-4xl">
              {isCn ? "农业微生物研发全流程 AI 助手" : "Agricultural Microbial R&D AI Assistant"}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-slate-400">
              {isCn
                ? "覆盖从采样到工艺放大的7大研发环节，每个环节都有专业AI向导辅助决策"
                : "Covers 7 R&D stages from sampling to scale-up, each with a specialized AI guide"}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-1">
                {stages.map((stage, index) => {
                  const color = colorClasses[stage.color];
                  const isActive = activeStage === stage.id;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => {
                        setActiveStage(stage.id);
                        setGeneratedResult(null);
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all ${
                        isActive
                          ? `${color.border} bg-gradient-to-r ${color.bg}`
                          : "border-transparent hover:border-slate-800 hover:bg-slate-900/50"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md ${
                          isActive ? `bg-slate-900/80 ${color.text}` : "bg-slate-900 text-slate-500"
                        }`}
                      >
                        <stage.icon className="h-4.5 w-4.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-medium ${
                              isActive ? "text-zinc-100" : "text-slate-300"
                            }`}
                          >
                            {isCn ? stage.title : stage.titleEn}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          {isCn ? stage.subtitle : stage.subtitleEn}
                        </p>
                      </div>
                      <ChevronRight
                        className={`h-4 w-4 flex-shrink-0 ${
                          isActive ? color.text : "text-slate-600"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-3">
              <Card className={`border ${activeColor.border} bg-gradient-to-b ${activeColor.bg}`}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-lg bg-slate-900/80 ${activeColor.text}`}
                    >
                      <activeStageData.icon className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                        {isCn ? activeStageData.subtitle : activeStageData.subtitleEn}
                      </p>
                      <CardTitle className="mt-1 text-2xl">
                        {isCn ? activeStageData.title : activeStageData.titleEn}
                      </CardTitle>
                      <CardDescription className="mt-2 max-w-2xl">
                        {isCn ? activeStageData.description : activeStageData.descriptionEn}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="mb-3 text-sm font-medium text-zinc-200">
                      {isCn ? "AI 能力" : "AI Capabilities"}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {(isCn
                        ? activeStageData.aiCapabilities
                        : activeStageData.aiCapabilitiesEn
                      ).map((cap) => (
                        <div
                          key={cap}
                          className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2"
                        >
                          <CheckCircle2 className={`h-4 w-4 ${activeColor.text}`} />
                          <span className="text-sm text-slate-300">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-6">
                    <h3 className="mb-4 text-sm font-medium text-zinc-200">
                      {isCn ? "智能方案生成" : "Intelligent Protocol Generation"}
                    </h3>

                    {generatedResult ? (
                      <div className="space-y-4">
                        <div className="rounded-md border border-slate-800 bg-slate-900/50 p-4">
                          <div className="mb-3 flex items-center gap-2">
                            <Sparkles className={`h-4 w-4 ${activeColor.text}`} />
                            <span className="text-sm font-medium text-zinc-200">
                              {isCn ? "AI 生成方案" : "AI-Generated Protocol"}
                            </span>
                          </div>
                          <div className="whitespace-pre-wrap text-sm text-slate-300">
                            {generatedResult}
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleGenerate}
                            disabled={isGenerating}
                          >
                            {isGenerating ? (
                              <>
                                <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                                {isCn ? "重新生成中..." : "Regenerating..."}
                              </>
                            ) : (
                              <>
                                <Sparkles className="mr-2 h-3.5 w-3.5" />
                                {isCn ? "重新生成" : "Regenerate"}
                              </>
                            )}
                          </Button>
                          <Button size="sm" className={activeColor.text.replace("text", "bg") + " text-slate-950 hover:opacity-90"}>
                            {isCn ? "导出方案" : "Export Protocol"}
                            <ArrowRight className="ml-2 h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-sm text-slate-400">
                          {isCn
                            ? "输入您的实验需求和条件，AI 将为您生成个性化的实验方案建议"
                            : "Input your experimental needs and conditions. AI will generate personalized protocol recommendations."}
                        </p>
                        <textarea
                          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-zinc-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                          rows={4}
                          placeholder={
                            activeStage === "sampling"
                              ? isCn
                                ? "例如：我想采集东北黑土样本，用于分离固氮菌，样本量约20份，需要覆盖不同作物轮作区..."
                                : "e.g., I want to collect black soil samples from Northeast China for nitrogen-fixing bacteria isolation, ~20 samples, covering different crop rotation areas..."
                              : activeStage === "isolation"
                              ? isCn
                                ? "例如：从大豆根瘤中分离根瘤菌，需要在无氮培养基上培养，目标菌株固氮酶活性要达到30 nmol C2H4/mg/h..."
                                : "e.g., Isolating rhizobia from soybean nodules, using nitrogen-free medium, target nitrogenase activity ≥30 nmol C2H4/mg/h..."
                              : activeStage === "primary-screening"
                              ? isCn
                                ? "例如：分离得到80株候选菌株，需要筛选解磷能力，请帮我设计一个高效的高通量筛选方案..."
                                : "e.g., Got 80 candidate strains, need to screen for phosphorus solubilization, help design an efficient high-throughput screening..."
                              : activeStage === "secondary-screening"
                              ? isCn
                                ? "例如：复筛得到5株高效解磷菌，需要优化培养条件，同时考虑成本和产率，目标是最大化解磷效率..."
                                : "e.g., 5 efficient phosphorus-solubilizing strains from secondary screening, optimize culture conditions considering cost and yield..."
                              : activeStage === "identification"
                              ? isCn
                                ? "例如：有一株菌株16S序列与已知种相似度为97%，需要判断是否是新种，请帮我分析基因组特征..."
                                : "e.g., A strain shows 97% 16S similarity to known species, need to determine if it's a new species, help analyze genome features..."
                              : activeStage === "preservation"
                              ? isCn
                                ? "例如：我有10株珍贵的生防菌株，需要设计一个长期保藏方案，要求活性保存5年以上，同时保持功能稳定性..."
                                : "e.g., I have 10 precious biocontrol strains, need long-term preservation plan, viability ≥5 years, maintain functional stability..."
                              : activeStage === "scaleup"
                              ? isCn
                                ? "例如：实验室发酵条件是500mL摇瓶，温度30℃，pH 7.0，现在要放大到100L发酵罐，请预测可能的放大效应..."
                                : "e.g., Lab fermentation: 500mL flask, 30℃, pH 7.0, need to scale up to 100L fermenter, predict scale-up effects..."
                              : isCn
                              ? "例如：我想从水稻根际土壤中分离固氮菌，样本量约50份，实验室有常规分离培养基..."
                              : "e.g., I want to isolate nitrogen-fixing bacteria from rice rhizosphere soil, ~50 samples..."
                          }
                        />
                        <Button
                          onClick={handleGenerate}
                          disabled={isGenerating}
                          className={`w-full ${activeColor.text.replace("text", "bg")} text-slate-950 hover:opacity-90`}
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              {isCn ? "AI 方案生成中..." : "AI Generating Protocol..."}
                            </>
                          ) : (
                            <>
                              <Sparkles className="mr-2 h-4 w-4" />
                              {isCn ? "生成实验方案" : "Generate Protocol"}
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer brand={brand} />
    </div>
  );
}
