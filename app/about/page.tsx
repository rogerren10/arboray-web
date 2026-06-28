"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getBrandConfig } from "@/lib/brand";
import { Users, Target, Lightbulb, Globe, Database, Sparkles } from "lucide-react";

export default function AboutPage() {
  const brand = getBrandConfig();
  const isCn = brand.brand === "cn";
  const contactEmail = isCn ? "contact@tongguangai.cn" : "contact@arboray.tech";

  const features = [
    {
      icon: Database,
      title: isCn ? "海量菌株资源" : "Extensive Strain Resources",
      desc: isCn
        ? "整合万级农业微生物菌株资源，覆盖固氮、解磷、抗病等多个功能类别"
        : "Integrated 10K+ agricultural microorganism strain resources, covering nitrogen fixation, phosphorus solubilization, disease resistance and other functional categories",
    },
    {
      icon: Sparkles,
      title: isCn ? "AI驱动发现" : "AI-Powered Discovery",
      desc: isCn
        ? "运用机器学习算法，从海量菌株中精准匹配目标功能，加速研发进程"
        : "Using machine learning algorithms to precisely match target functions from massive strains, accelerating R&D progress",
    },
    {
      icon: Globe,
      title: isCn ? "农业场景适配" : "Agricultural Scenario Adaptation",
      desc: isCn
        ? "针对堆肥、青贮、生物防治等农业场景提供定制化解决方案"
        : "Providing customized solutions for agricultural scenarios such as composting, silage, and biological control",
    },
    {
      icon: Users,
      title: isCn ? "学术合作赋能" : "Academic Collaboration",
      desc: isCn
        ? "开放学术算力配额，支持青年科学家开展前沿研究"
        : "Open academic compute quota to support young scientists in cutting-edge research",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header brand={brand} />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-slate-800/80 bg-gradient-to-b from-slate-950 to-slate-900/50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">
                {isCn ? "关于桐光智能" : "About Tongguang AI"}
              </h1>
              <p className="mt-4 text-base text-slate-400">
                {isCn
                  ? "用AI唤醒沉睡的微生物资产，赋能农业微生物产业升级"
                  : "Waking dormant microbial assets with AI to empower agricultural microbiology industry upgrade"}
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                  <Target className="h-3.5 w-3.5" />
                  {isCn ? "我们的使命" : "Our Mission"}
                </div>
                <h2 className="text-2xl font-bold text-zinc-100">
                  {isCn ? "让每一株菌株都发挥价值" : "Unlocking the Value of Every Strain"}
                </h2>
                <p className="mt-4 text-slate-400">
                  {isCn
                    ? "在农业微生物领域，大量珍贵的菌株资源沉睡在保藏库中，未能充分发挥其潜力。桐光智能致力于运用人工智能技术，从海量菌株资产中精准挖掘匹配目标功能需求的菌株，将传统的6个月筛选周期缩短至数天，大幅提升研发效率。"
                    : "In the field of agricultural microbiology, a large number of precious strain resources lie dormant in preservation libraries, failing to fully realize their potential. Tongguang AI is committed to using artificial intelligence technology to precisely mine and match strains from massive strain assets that meet target functional requirements, shortening the traditional 6-month screening cycle to a few days, significantly improving R&D efficiency."}
                </p>
                <p className="mt-4 text-slate-400">
                  {isCn
                    ? "我们相信，通过AI技术与微生物学的深度融合，可以为农业绿色发展、化肥减量增效、土壤健康修复提供强有力的技术支撑。"
                    : "We believe that through deep integration of AI technology and microbiology, we can provide strong technical support for green agricultural development, chemical fertilizer reduction and efficiency increase, and soil health restoration."}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900/50 p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <img
                        src="/qrcode.png"
                        alt={isCn ? "企业微信" : "WeChat Work QR Code"}
                        className="h-64 w-64 object-contain"
                      />
                    </div>
                    <p className="text-sm text-slate-400">
                      {isCn ? "扫码关注企业微信" : "Scan to follow our WeChat Work"}
                    </p>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="mt-2 text-sm text-emerald-400 hover:text-emerald-300"
                    >
                      {contactEmail}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="border-t border-slate-800/80 bg-slate-950/30 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-sm border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                <Lightbulb className="h-3.5 w-3.5" />
                {isCn ? "核心价值" : "Core Values"}
              </div>
              <h2 className="text-2xl font-bold text-zinc-100">
                {isCn ? "为什么选择我们" : "Why Choose Us"}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="border-slate-800 bg-slate-900/50">
                  <CardHeader>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-sm bg-emerald-500/10">
                      <feature.icon className="h-5 w-5 text-emerald-400" />
                    </div>
                    <CardTitle className="text-base">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">{feature.desc}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-slate-800/80 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-lg border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-transparent p-8 text-center">
              <h3 className="text-xl font-bold text-zinc-100">
                {isCn ? "开始您的AI菌株发现之旅" : "Start Your AI Strain Discovery Journey"}
              </h3>
              <p className="mt-2 text-slate-400">
                {isCn
                  ? "立即体验菌株挖掘沙盒，感受AI驱动的微生物研发新范式"
                  : "Experience the strain mining sandbox now and feel the new paradigm of AI-driven microbiological R&D"}
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <a
                  href={brand.routes.strainDiscovery}
                  className="rounded-md bg-emerald-500 px-6 py-2 text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400"
                >
                  {isCn ? "立即体验" : "Try Now"}
                </a>
                <a
                  href={brand.routes.youngScientist}
                  className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-6 py-2 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20"
                >
                  {isCn ? "申请学术合作" : "Academic Collaboration"}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer brand={brand} />
    </div>
  );
}
