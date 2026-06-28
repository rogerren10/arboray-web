"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getBrandConfig } from "@/lib/brand";
import {
  Shield,
  Lock,
  Server,
  FileCheck,
  Eye,
  KeyRound,
  Building2,
  CheckCircle2,
  ArrowRight,
  Download,
  Calendar,
} from "lucide-react";
import Link from "next/link";

export default function TrustCenterPage() {
  const brand = getBrandConfig();
  const isCn = brand.brand === "cn";

  const pillars = [
    {
      icon: Lock,
      title: isCn ? "数据安全" : "Data Security",
      description: isCn
        ? "端到端加密，数据全生命周期安全防护"
        : "End-to-end encryption, full lifecycle data protection",
      features: isCn
        ? ["AES-256 存储加密", "TLS 1.3 传输加密", "数据脱敏处理", "定期安全审计"]
        : ["AES-256 at rest", "TLS 1.3 in transit", "Data masking", "Regular security audits"],
    },
    {
      icon: Server,
      title: isCn ? "本地部署" : "Local Deployment",
      description: isCn
        ? "支持私有化部署，数据不出企业内网"
        : "Private deployment support, data stays within enterprise network",
      features: isCn
        ? ["本地化模型推理", "数据不出内网", "离线运行支持", "定制化集成"]
        : ["On-prem inference", "Data stays in-house", "Offline operation", "Custom integration"],
    },
    {
      icon: FileCheck,
      title: isCn ? "合规认证" : "Compliance",
      description: isCn
        ? "符合国家数据安全法规和行业标准"
        : "Compliant with national data security regulations",
      features: isCn
        ? ["网络安全等级保护", "数据安全法合规", "个人信息保护", "ISO 27001 认证"]
        : ["MLPS certification", "Data Security Law", "PIPL compliance", "ISO 27001 certified"],
    },
  ];

  const capabilities = [
    {
      icon: Eye,
      title: isCn ? "访问审计" : "Access Audit",
      description: isCn ? "全操作日志记录，可追溯可审计" : "Full operation logging, traceable and auditable",
    },
    {
      icon: KeyRound,
      title: isCn ? "权限管理" : "Access Control",
      description: isCn ? "细粒度权限控制，角色分级管理" : "Fine-grained RBAC, role-based management",
    },
    {
      icon: Building2,
      title: isCn ? "数据隔离" : "Data Isolation",
      description: isCn ? "租户间数据物理隔离，互不干扰" : "Physical data isolation between tenants",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header brand={brand} />
      <main className="flex-1">
        <section className="border-b border-slate-800/80">
          <div className="relative mx-auto max-w-7xl px-6 py-20 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.06),transparent_50%)]" />
            <div className="relative">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
                <Shield className="h-8 w-8 text-emerald-400" />
              </div>
              <h1 className="text-3xl font-bold text-zinc-100 sm:text-4xl">
                {isCn ? "信任中心" : "Trust Center"}
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
                {isCn
                  ? "以工业级安全标准，守护您的菌株数据与研发资产"
                  : "Industrial-grade security standards to protect your strain data and R&D assets"}
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold text-zinc-100 sm:text-3xl">
                {isCn ? "安全三大支柱" : "Three Security Pillars"}
              </h2>
              <p className="mt-4 text-slate-400">
                {isCn
                  ? "全方位构建从数据到应用的安全防护体系"
                  : "Comprehensive security system from data to application"}
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {pillars.map((pillar) => (
                <Card key={pillar.title} className="border-slate-800">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
                      <pillar.icon className="h-6 w-6 text-emerald-400" />
                    </div>
                    <CardTitle>{pillar.title}</CardTitle>
                    <CardDescription>{pillar.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {pillar.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-800/80 bg-slate-950/50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold text-zinc-100 sm:text-3xl">
                {isCn ? "安全能力" : "Security Capabilities"}
              </h2>
              <p className="mt-4 text-slate-400">
                {isCn ? "多层次安全防护，确保系统稳定可靠" : "Multi-layered security ensures system reliability"}
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {capabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-emerald-500/30"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-slate-950">
                    <cap.icon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h3 className="font-medium text-zinc-200">{cap.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{cap.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <Card className="overflow-hidden border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent">
              <CardContent className="p-8 md:p-12">
                <div className="grid gap-8 md:grid-cols-2 md:items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-100">
                      {isCn ? "获取完整安全白皮书" : "Get the Full Security Whitepaper"}
                    </h3>
                    <p className="mt-4 text-slate-400">
                      {isCn
                        ? "深入了解我们的安全架构、合规认证和数据保护措施"
                        : "Learn more about our security architecture, compliance, and data protection measures"}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-4">
                      <Button className="bg-emerald-500 text-slate-950 hover:bg-emerald-400">
                        <Download className="mr-2 h-4 w-4" />
                        {isCn ? "下载白皮书" : "Download Whitepaper"}
                      </Button>
                      <Button variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        {isCn ? "预约安全评估" : "Schedule a Security Assessment"}
                      </Button>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="relative mx-auto h-48 w-48">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 blur-xl" />
                      <div className="relative flex h-full w-full items-center justify-center rounded-2xl border border-emerald-500/30 bg-slate-900/80">
                        <Shield className="h-20 w-20 text-emerald-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer brand={brand} />
    </div>
  );
}
