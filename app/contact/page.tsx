"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getBrandConfig } from "@/lib/brand";
import { Mail, MapPin, Phone, Clock, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const brand = getBrandConfig();
  const isCn = brand.brand === "cn";

  const contactMethods = [
    {
      icon: MessageCircle,
      title: isCn ? "企业微信" : "WeChat Work",
      desc: isCn ? "扫码添加企业微信，获取专属服务" : "Scan to add us on WeChat Work for exclusive service",
      action: (
        <div className="mt-4 flex flex-col items-center">
          <img
            src="/qrcode.png"
            alt={isCn ? "企业微信二维码" : "WeChat Work QR Code"}
            className="h-48 w-48 object-contain"
          />
          <p className="mt-2 text-xs text-slate-500">
            {isCn ? "扫码联系" : "Scan to connect"}
          </p>
        </div>
      ),
    },
    {
      icon: Mail,
      title: isCn ? "电子邮件" : "Email",
      desc: isCn ? "发送邮件至 contact@tongguangai.cn" : "Send email to contact@tongguangai.cn",
      action: (
        <a
          href="mailto:contact@tongguangai.cn"
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400 transition-colors hover:bg-emerald-500/20"
        >
          <Mail className="h-4 w-4" />
          contact@tongguangai.cn
        </a>
      ),
    },
    {
      icon: Clock,
      title: isCn ? "响应时间" : "Response Time",
      desc: isCn ? "工作日 9:00-18:00" : "Working days 9:00-18:00",
      action: (
        <p className="mt-4 text-sm text-slate-400">
          {isCn
            ? "我们将在 24 小时内回复您的邮件"
            : "We will respond to your email within 24 hours"}
        </p>
      ),
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
                {isCn ? "联系我们" : "Contact Us"}
              </h1>
              <p className="mt-4 text-base text-slate-400">
                {isCn
                  ? "无论是产品咨询、技术支持还是商务合作，我们都期待与您交流"
                  : "Whether it's product inquiry, technical support, or business cooperation, we look forward to hearing from you"}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 lg:grid-cols-3">
              {contactMethods.map((method) => (
                <Card key={method.title} className="border-slate-800 bg-slate-900/50">
                  <CardHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-sm bg-emerald-500/10">
                      <method.icon className="h-6 w-6 text-emerald-400" />
                    </div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                    <CardDescription>{method.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>{method.action}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Academic Collaboration */}
        <section className="border-t border-slate-800/80 bg-slate-950/30 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-lg border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-transparent p-8">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <h3 className="text-xl font-bold text-zinc-100">
                    {isCn ? "学术合作与青年科学家计划" : "Academic Collaboration & Young Scientist Program"}
                  </h3>
                  <p className="mt-3 text-slate-400">
                    {isCn
                      ? "如果您是高校或科研机构的学者，欢迎申请我们的青年科学家启航计划。成功申请后将获得：免费学术算力配额、万级菌株资源库访问权限、以及专业技术团队支持。"
                      : "If you are a scholar from a university or research institution, welcome to apply for our Young Scientist Program. Successful applicants will receive: free academic compute quota, access to 10K+ strain resource library, and professional technical team support."}
                  </p>
                  <a
                    href={brand.routes.youngScientist}
                    className="mt-6 inline-flex items-center gap-2 rounded-md bg-emerald-500 px-6 py-2 text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400"
                  >
                    {isCn ? "申请学术合作" : "Apply for Academic Collaboration"}
                  </a>
                </div>
                <div className="flex justify-center">
                  <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900/50 p-6">
                    <div className="flex flex-col items-center text-center">
                      <img
                        src="/qrcode.png"
                        alt={isCn ? "企业微信" : "WeChat Work QR Code"}
                        className="h-48 w-48 object-contain"
                      />
                      <p className="mt-3 text-sm text-slate-400">
                        {isCn ? "扫码咨询学术合作" : "Scan to inquire about academic collaboration"}
                      </p>
                      <a
                        href="mailto:contact@tongguangai.cn"
                        className="mt-2 text-sm text-emerald-400 hover:text-emerald-300"
                      >
                        contact@tongguangai.cn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise Users */}
        <section className="border-t border-slate-800/80 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center">
              <h3 className="text-xl font-bold text-zinc-100">
                {isCn ? "企业用户定制服务" : "Enterprise Customized Services"}
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-slate-400">
                {isCn
                  ? "我们为企业用户提供定制化的菌株筛选、工艺优化、数据分析等服务。根据您的具体需求，我们的专业技术团队将为您提供专属解决方案。"
                  : "We provide enterprise users with customized strain screening, process optimization, data analysis and other services. According to your specific needs, our professional technical team will provide you with exclusive solutions."}
              </p>
              <div className="mt-6 flex flex-col items-center gap-3">
                <img
                  src="/qrcode.png"
                  alt={isCn ? "企业微信" : "WeChat Work QR Code"}
                  className="h-40 w-40 object-contain"
                />
                <p className="text-sm text-slate-500">
                  {isCn ? "扫码联系企业专属顾问" : "Scan to contact your enterprise dedicated consultant"}
                </p>
                <a
                  href="mailto:contact@tongguangai.cn"
                  className="text-sm text-emerald-400 hover:text-emerald-300"
                >
                  contact@tongguangai.cn
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
