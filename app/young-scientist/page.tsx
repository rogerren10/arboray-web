"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getBrandConfig } from "@/lib/brand";
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  FlaskConical,
  Database,
  Users,
  Sprout,
  Wheat,
  Leaf,
  Bug,
  Send,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function YoungScientistPage() {
  const brand = getBrandConfig();
  const isCn = brand.brand === "cn";
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    title: "",
    email: "",
    researchMicrobe: "",
    dataScale: "",
    hasStrainCollection: "no",
    aiDirections: [] as string[],
    motivation: "",
  });

  const benefits = [
    {
      icon: Database,
      title: isCn ? "万级菌株库访问" : "10K+ Strain Library Access",
      desc: isCn
        ? "免费解锁完整菌株资源库"
        : "Free full strain library access",
    },
    {
      icon: Sparkles,
      title: isCn ? "AI4S 算力配额" : "AI4S Compute Quota",
      desc: isCn
        ? "课题联合申报支持"
        : "Joint project application support",
    },
    {
      icon: Users,
      title: isCn ? "数据完全归属" : "Full Data Ownership",
      desc: isCn
        ? "课题组拥有完整数据主权"
        : "Research group has full data sovereignty",
    },
  ];

  const titleOptions = [
    { value: "professor", label: isCn ? "教授/研究员" : "Professor / Researcher" },
    { value: "associate", label: isCn ? "副教授/副研究员" : "Associate Professor" },
    { value: "pi", label: isCn ? "独立 PI" : "Independent PI" },
    { value: "senior_engineer", label: isCn ? "高级工程师" : "Senior Engineer" },
    { value: "postdoc", label: isCn ? "博士后" : "Postdoc" },
    { value: "phd", label: isCn ? "博士研究生" : "PhD Student" },
  ];

  const dataScaleOptions = [
    { value: "lt10", label: isCn ? "10 批次以下" : "Less than 10 batches" },
    { value: "10-50", label: isCn ? "10-50 批次" : "10-50 batches" },
    { value: "gt50", label: isCn ? "50 批次以上" : "More than 50 batches" },
  ];

  const researchDirectionOptions = [
    { value: "nitrogen_fixation", label: isCn ? "固氮微生物研究" : "Nitrogen-fixing Microbes", highlight: true },
    { value: "phosphorus_solubilization", label: isCn ? "解磷解钾菌" : "Phosphorus/Potassium Solubilizing Bacteria", highlight: true },
    { value: "biocontrol", label: isCn ? "生物防治 / 抗病促生" : "Biocontrol / Disease Resistance", highlight: true },
    { value: "plant_growth", label: isCn ? "植物根际促生菌 (PGPR)" : "Plant Growth Promoting Rhizobacteria" },
    { value: "soil_microbiome", label: isCn ? "土壤微生物组" : "Soil Microbiome" },
    { value: "compost", label: isCn ? "堆肥 / 有机废弃物腐熟" : "Composting / Organic Waste Degradation" },
    { value: "silage", label: isCn ? "青贮发酵" : "Silage Fermentation" },
    { value: "endophyte", label: isCn ? "内生菌研究" : "Endophyte Research" },
    { value: "other", label: isCn ? "其他（请在下方说明）" : "Other (please specify below)" },
  ];

  const aiDirectionOptions = [
    { value: "strain_mining", label: isCn ? "智能菌株挖掘与匹配" : "Intelligent Strain Mining & Matching", highlight: true },
    { value: "function_prediction", label: isCn ? "功能性状预测" : "Functional Trait Prediction", highlight: true },
    { value: "genome_analysis", label: isCn ? "基因组分析与注释" : "Genome Analysis & Annotation", highlight: true },
    { value: "fermentation_optimization", label: isCn ? "发酵工艺优化" : "Fermentation Process Optimization" },
    { value: "compost_simulation", label: isCn ? "堆肥过程模拟" : "Composting Process Simulation" },
    { value: "microbiome_analysis", label: isCn ? "微生物组数据分析" : "Microbiome Data Analysis" },
  ];

  const toggleAiDirection = (value: string) => {
    const current = formData.aiDirections;
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setFormData({ ...formData, aiDirections: next });
  };

  const toggleResearchDirection = (label: string) => {
    const current = formData.researchMicrobe;
    const items = current
      ? current
          .split(";")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    const idx = items.indexOf(label);
    let next: string[];
    if (idx >= 0) {
      next = items.filter((_, i) => i !== idx);
    } else {
      next = [...items, label];
    }
    setFormData({ ...formData, researchMicrobe: next.join("; ") });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.organization || !formData.title || !formData.email || !formData.researchMicrobe || !formData.dataScale || formData.aiDirections.length === 0) {
      setError(isCn ? "请填写所有必填项" : "Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/young-scientist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setError(isCn ? "提交失败，请稍后重试" : "Submission failed, please try again later");
      }
    } catch {
      setError(isCn ? "网络错误，请稍后重试" : "Network error, please try again later");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header brand={brand} />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-slate-800/80 py-12">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-sm border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                <GraduationCap className="h-3.5 w-3.5" />
                {isCn ? "青年科学家启航计划" : "Young Scientist Program"}
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">
                {isCn ? "农业微生物学术合作算力配额申请" : "Agricultural Microbiology Academic Collaboration Compute Application"}
              </h1>
              <p className="mt-4 text-base text-slate-400">
                {isCn
                  ? "开放万级菌株资源库与AI4S算力工具，助力青年科研工作者加速从菌株发现到农业应用的转化"
                  : "Open 10K+ strain library and AI4S compute tools to accelerate young researchers from strain discovery to agricultural applications"}
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12">
          <div className="mx-auto max-w-3xl px-6">
            <div className="mb-10 grid gap-4 md:grid-cols-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-sm border border-slate-800 bg-slate-900/40 p-5 transition-colors hover:border-emerald-500/30"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-emerald-500/10 text-emerald-400">
                    <benefit.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-zinc-200">{benefit.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">{benefit.desc}</p>
                </div>
              ))}
            </div>

            {/* Application Form */}
            {submitted ? (
              <Card className="border-slate-800 bg-slate-900/40">
                <CardContent className="flex flex-col items-center p-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-zinc-100">
                    {isCn ? "申请已提交" : "Application Submitted"}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
                    {isCn
                      ? "感谢您的申请。我们的学术合作团队将在 3 个工作日内与您联系，确认算力配额与 Demo 安排。"
                      : "Thank you for your application. Our academic collaboration team will contact you within 3 business days to confirm compute quota and Demo arrangement."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="flex items-center gap-2 rounded-sm border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                {/* Step 1: Basic Info */}
                <Card className="border-slate-800 bg-slate-900/40">
                  <CardHeader className="border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-zinc-100 text-slate-900">
                        <span className="text-sm font-bold">1</span>
                      </div>
                      <div>
                        <CardTitle className="text-base">
                          {isCn ? "基础信息" : "Basic Information"}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {isCn ? "科研主导人 / 课题组负责人" : "Research Lead / PI"}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-5 p-6">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          {isCn ? "姓名" : "Name"}{" "}
                          <span className="text-red-400">*</span>
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={isCn ? "请输入姓名" : "Enter your name"}
                          className="border-slate-700 bg-slate-900"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="organization">
                          {isCn ? "依托科研院所/高校名称" : "Institution / University"}{" "}
                          <span className="text-red-400">*</span>
                        </Label>
                        <Input
                          id="organization"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          placeholder={isCn ? "请输入单位名称" : "Enter institution name"}
                          className="border-slate-700 bg-slate-900"
                        />
                      </div>
                    </div>
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>
                          {isCn ? "职称/职务" : "Title / Position"}{" "}
                          <span className="text-red-400">*</span>
                        </Label>
                        <select
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-900 px-3 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                        >
                          <option value="">
                            {isCn ? "请选择职称" : "Select your title"}
                          </option>
                          {titleOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          {isCn ? "联系邮箱" : "Contact Email"}{" "}
                          <span className="text-red-400">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder={isCn ? "请使用单位/学校域名邮箱" : "Use institutional email"}
                          className="border-slate-700 bg-slate-900"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Step 2: Research Direction */}
                <Card className="border-slate-800 bg-slate-900/40">
                  <CardHeader className="border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-zinc-100 text-slate-900">
                        <span className="text-sm font-bold">2</span>
                      </div>
                      <div>
                        <CardTitle className="text-base">
                          {isCn ? "研究方向与资产现状" : "Research Direction & Assets"}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {isCn ? "帮助我们了解您的研究基础" : "Help us understand your research foundation"}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-5 p-6">
                    <div className="space-y-2">
                      <Label>
                        {isCn ? "核心研究微生物方向" : "Core Research Microbe Direction"}{" "}
                        <span className="text-red-400">*</span>
                      </Label>
                      <div className="mb-2 text-[11px] text-slate-500">
                        {isCn
                          ? "可多选，我们在农业微生物全链条拥有完整算力支持"
                          : "Multi-select available. We provide full compute support for agricultural microbiology"}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {researchDirectionOptions.map((opt) => {
                          const isSelected = formData.researchMicrobe.includes(opt.label);
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => toggleResearchDirection(opt.label)}
                              className={`rounded-sm border px-2.5 py-1 text-[11px] transition-colors ${
                                isSelected
                                  ? opt.highlight
                                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                                    : "border-slate-600 bg-slate-700/40 text-zinc-200"
                                  : opt.highlight
                                  ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-400/80 hover:bg-emerald-500/10"
                                  : "border-slate-700 bg-slate-800/30 text-slate-400 hover:border-slate-600 hover:text-slate-300"
                              }`}
                            >
                              {opt.highlight && <span className="mr-1">◆</span>}
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                      <Input
                        value={formData.researchMicrobe}
                        onChange={(e) => setFormData({ ...formData, researchMicrobe: e.target.value })}
                        placeholder={
                          isCn
                            ? "或输入自定义研究方向，多个方向用分号分隔"
                            : "Or enter custom directions, separated by semicolons"
                        }
                        className="mt-2 border-slate-700 bg-slate-900"
                      />
                    </div>
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>
                          {isCn ? "现有实验数据规模" : "Existing Experimental Data Scale"}{" "}
                          <span className="text-red-400">*</span>
                        </Label>
                        <select
                          value={formData.dataScale}
                          onChange={(e) => setFormData({ ...formData, dataScale: e.target.value })}
                          className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-900 px-3 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                        >
                          <option value="">
                            {isCn ? "请选择数据规模" : "Select data scale"}
                          </option>
                          {dataScaleOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label>
                          {isCn ? "是否自有菌株保藏库" : "Have Your Own Strain Collection?"}{" "}
                          <span className="text-red-400">*</span>
                        </Label>
                        <div className="flex flex-row gap-6 pt-2">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="hasStrainCollection"
                              value="yes"
                              checked={formData.hasStrainCollection === "yes"}
                              onChange={(e) => setFormData({ ...formData, hasStrainCollection: e.target.value })}
                              className="h-4 w-4 border-slate-600 bg-slate-900 text-emerald-500 focus:ring-emerald-500/50"
                            />
                            <span className="text-sm text-slate-300">{isCn ? "是" : "Yes"}</span>
                          </label>
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="hasStrainCollection"
                              value="no"
                              checked={formData.hasStrainCollection === "no"}
                              onChange={(e) => setFormData({ ...formData, hasStrainCollection: e.target.value })}
                              className="h-4 w-4 border-slate-600 bg-slate-900 text-emerald-500 focus:ring-emerald-500/50"
                            />
                            <span className="text-sm text-slate-300">{isCn ? "否" : "No"}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Step 3: Collaboration Requirements */}
                <Card className="border-slate-800 bg-slate-900/40">
                  <CardHeader className="border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-zinc-100 text-slate-900">
                        <span className="text-sm font-bold">3</span>
                      </div>
                      <div>
                        <CardTitle className="text-base">
                          {isCn ? "合作诉求" : "Collaboration Requirements"}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {isCn ? "选择您期望的 AI4S 算力方向" : "Select your desired AI4S compute directions"}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-5 p-6">
                    <div className="space-y-2">
                      <Label>
                        {isCn ? "预期申请的 AI4S 算力方向" : "Expected AI4S Compute Directions"}{" "}
                        <span className="text-red-400">*</span>
                      </Label>
                      <div className="mb-1 text-[11px] text-slate-500">
                        {isCn
                          ? "菌株挖掘与工艺优化均覆盖，可多选"
                          : "Both strain mining and process optimization covered, multi-select available"}
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {aiDirectionOptions.map((opt) => {
                          const isSelected = formData.aiDirections.includes(opt.value);
                          return (
                            <div
                              key={opt.value}
                              onClick={() => toggleAiDirection(opt.value)}
                              className={`cursor-pointer rounded-sm border p-4 transition-colors ${
                                isSelected
                                  ? opt.highlight
                                    ? "border-emerald-500/60 bg-emerald-500/15 ring-1 ring-emerald-500/30"
                                    : "border-emerald-500/50 bg-emerald-500/10"
                                  : opt.highlight
                                  ? "border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10"
                                  : "border-slate-700 bg-slate-800/30 hover:border-slate-600"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className={`mt-0.5 flex h-4 w-4 items-center justify-center rounded-sm border ${
                                    isSelected
                                      ? "border-emerald-500 bg-emerald-500"
                                      : "border-slate-600 bg-slate-900"
                                  }`}
                                >
                                  {isSelected && (
                                    <CheckCircle2 className="h-3 w-3 text-slate-900" />
                                  )}
                                </div>
                                <div>
                                  <span
                                    className={`text-sm ${
                                      opt.highlight
                                        ? "text-zinc-100 font-medium"
                                        : "text-zinc-200"
                                    }`}
                                  >
                                    {opt.label}
                                  </span>
                                  {opt.highlight && (
                                    <div className="mt-1">
                                      <span className="rounded-sm bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-emerald-400">
                                        {isCn ? "核心能力" : "Core Capability"}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motivation">
                        {isCn ? "申请动机 / 研究计划（选填）" : "Motivation / Research Plan (Optional)"}
                      </Label>
                      <Textarea
                        id="motivation"
                        value={formData.motivation}
                        onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                        rows={4}
                        placeholder={
                          isCn
                            ? "简单描述您的研究方向以及希望如何使用我们的平台..."
                            : "Briefly describe your research and how you plan to use our platform..."
                        }
                        className="border-slate-700 bg-slate-900"
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="bg-emerald-500 text-slate-900 hover:bg-emerald-400"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {isCn ? "提交中..." : "Submitting..."}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {isCn
                          ? "提交学术合作申请并预约在线demo"
                          : "Submit Academic Collaboration Application & Book Online Demo"}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer brand={brand} />
    </div>
  );
}
