import { getBrandConfig } from "@/lib/brand";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  const brand = getBrandConfig();

  return (
    <div className="flex min-h-screen flex-col">
      <Header brand={brand} />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-slate-800/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.06),transparent_50%)]" />
          
          <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-1.5 text-xs text-slate-400">
                <svg
                  className="h-3.5 w-3.5 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
                <span>
                  {brand.brand === "cn"
                    ? "AI 驱动的农业微生物创新平台"
                    : "AI-Powered Agricultural Microbial Innovation"}
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl lg:text-6xl">
                {brand.brand === "cn" ? "用 AI 唤醒" : "Awaken "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  {brand.brand === "cn" ? "休眠菌株资产" : "Dormant Strain Assets"}
                </span>
              </h1>

              <p className="mt-6 text-lg leading-8 text-slate-400">
                {brand.brand === "cn"
                  ? "分布式菌株深度挖掘与复用平台，将6个月的湿实验筛选周期缩短至数天。从菌株发现到工艺放大，全流程AI赋能。"
                  : "Distributed strain deep mining and reuse platform. Reduce 6-month wet lab screening to days. Full-stack AI from discovery to scale-up."}
              </p>

              <div className="mt-10 flex items-center justify-center gap-4">
                <a
                  href={brand.routes.strainDiscovery}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-500 px-8 text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400"
                >
                  {brand.brand === "cn" ? "立即体验菌株挖掘" : "Try Strain Discovery"}
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
                <a
                  href={brand.routes.rdAssistant}
                  className="inline-flex h-11 items-center justify-center rounded-md border border-zinc-700 bg-slate-900 px-8 text-sm font-medium text-zinc-200 transition-colors hover:bg-slate-800 hover:text-zinc-100"
                >
                  {brand.brand === "cn" ? "了解研发助手" : "Explore R&D Assistant"}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b border-slate-800/80 bg-slate-950/50">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                {
                  value: "12,000+",
                  label: brand.brand === "cn" ? "菌株资产" : "Strain Assets",
                },
                {
                  value: "85%",
                  label: brand.brand === "cn" ? "筛选效率提升" : "Screening Efficiency",
                },
                {
                  value: "6 个月 → 7 天",
                  label: brand.brand === "cn" ? "研发周期缩短" : "R&D Cycle Reduction",
                },
                {
                  value: "98.2%",
                  label: brand.brand === "cn" ? "匹配准确率" : "Matching Accuracy",
                },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
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
                {brand.brand === "cn" ? "三层价值体系" : "Three-Layer Value System"}
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                {brand.brand === "cn"
                  ? "从菌株发现到工艺放大，构建农业微生物研发全链路AI能力"
                  : "From strain discovery to process scale-up - building full-stack AI for agricultural microbial R&D"}
              </p>
            </div>

            <div className="mt-16 grid gap-6 lg:grid-cols-3">
              {/* Strain Discovery */}
              <div className="group relative overflow-hidden rounded-lg border border-emerald-500/30 bg-gradient-to-b from-emerald-500/20 to-teal-500/10 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20">
                <div className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900/80 text-emerald-400">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                      />
                    </svg>
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    {brand.brand === "cn" ? "核心差异化能力" : "Core Differentiation"}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-zinc-100">
                    {brand.brand === "cn" ? "菌株发现层" : "Strain Discovery"}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">
                    {brand.brand === "cn"
                      ? "AI驱动的菌株挖掘引擎，从海量休眠菌株资产中精准匹配功能需求，唤醒沉睡的生物多样性宝库。"
                      : "AI-powered strain mining engine that precisely matches functional requirements from vast dormant strain assets."}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {(brand.brand === "cn"
                      ? ["智能功能匹配", "多维度性状预测", "Top-K推荐排序", "可解释性评分"]
                      : ["Intelligent Function Matching", "Multi-dimensional Trait Prediction", "Top-K Ranking", "Explainable Scoring"]
                    ).map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                        <svg
                          className="h-4 w-4 text-emerald-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={brand.routes.strainDiscovery}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-slate-800/50 hover:text-zinc-100"
                  >
                    {brand.brand === "cn" ? "了解更多" : "Learn More"}
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* R&D Process */}
              <div className="group relative overflow-hidden rounded-lg border border-blue-500/30 bg-gradient-to-b from-blue-500/20 to-cyan-500/10 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20">
                <div className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900/80 text-blue-400">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    {brand.brand === "cn" ? "全链路AI助手" : "Full-Stack AI Assistant"}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-zinc-100">
                    {brand.brand === "cn" ? "研发流程层" : "R&D Process"}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">
                    {brand.brand === "cn"
                      ? "覆盖采样规划、分离培养、初筛复筛、菌种鉴定、保藏管理、工艺放大7大研发环节，全程AI赋能。"
                      : "Covers 7 R&D stages: sampling, isolation, screening, identification, preservation, and scale-up - all AI-powered."}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {(brand.brand === "cn"
                      ? ["7大研发环节", "实验方案智能生成", "数据结构化分析", "知识图谱关联"]
                      : ["7 R&D Stages", "Intelligent Protocol Generation", "Structured Data Analysis", "Knowledge Graph"]
                    ).map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                        <svg
                          className="h-4 w-4 text-blue-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={brand.routes.rdAssistant}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-slate-800/50 hover:text-zinc-100"
                  >
                    {brand.brand === "cn" ? "了解更多" : "Learn More"}
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Process Scale-up */}
              <div className="group relative overflow-hidden rounded-lg border border-amber-500/30 bg-gradient-to-b from-amber-500/20 to-orange-500/10 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20">
                <div className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900/80 text-amber-400">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    {brand.brand === "cn" ? "农业场景化优化" : "Agricultural Optimization"}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-zinc-100">
                    {brand.brand === "cn" ? "工艺放大层" : "Process Scale-up"}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">
                    {brand.brand === "cn"
                      ? "针对堆肥、青贮、菌剂发酵等农业场景，提供碳氮比、含水率、温度等关键参数的智能优化方案。"
                      : "Intelligent optimization for composting, silage, and microbial fermentation with key agricultural parameters."}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {(brand.brand === "cn"
                      ? ["农业场景适配", "参数动态优化", "曲线模拟预测", "成本效益分析"]
                      : ["Agricultural Scenarios", "Dynamic Parameter Optimization", "Curve Simulation", "Cost-Benefit Analysis"]
                    ).map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                        <svg
                          className="h-4 w-4 text-amber-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={brand.routes.processOptimization}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-slate-800/50 hover:text-zinc-100"
                  >
                    {brand.brand === "cn" ? "了解更多" : "Learn More"}
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Young Scientist Program CTA - Prominent */}
        <section className="relative overflow-hidden border-y border-emerald-500/20 bg-gradient-to-r from-emerald-950/40 via-slate-950 to-teal-950/40 py-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08),transparent_60%)]" />
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
          
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-5 lg:items-center">
              <div className="lg:col-span-3">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-4 py-1.5 text-xs font-semibold text-emerald-300 shadow-lg shadow-emerald-500/10">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                  {brand.brand === "cn" ? "🔥 限时开放 · 青年科学家启航计划" : "🔥 Limited Time · Young Scientist Program"}
                </div>
                <h3 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                  {brand.brand === "cn" ? (
                    <>
                      免费解锁 <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">万级菌株资产</span>
                      <br />
                      加速您的农业微生物研究
                    </>
                  ) : (
                    <>
                      Free Access to <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">10K+ Strain Assets</span>
                      <br />
                      Accelerate Your Agricultural Microbiology Research
                    </>
                  )}
                </h3>
                <p className="mt-4 text-base text-slate-400 sm:text-lg">
                  {brand.brand === "cn"
                    ? "为高校和科研机构的青年学者提供专属学术算力配额，从菌株挖掘到工艺优化全流程AI赋能。立即申请，3个工作日内开通。"
                    : "Exclusive academic compute quota for young researchers. Full-stack AI from strain discovery to process optimization. Apply now, activated within 3 business days."}
                </p>
                <div className="mt-6 flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
                      <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-zinc-300">
                      {brand.brand === "cn" ? "50,000 Tokens/月免费算力" : "50,000 Tokens/month free compute"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
                      <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-zinc-300">
                      {brand.brand === "cn" ? "完整菌株库访问权限" : "Full strain library access"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
                      <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-zinc-300">
                      {brand.brand === "cn" ? "1对1技术顾问支持" : "1-on-1 technical advisor"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="rounded-lg border border-emerald-500/30 bg-slate-900/80 p-6 shadow-2xl shadow-emerald-500/5 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
                      <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-zinc-100">
                        {brand.brand === "cn" ? "立即加入计划" : "Join the Program Now"}
                      </div>
                      <div className="text-xs text-slate-500">
                        {brand.brand === "cn" ? "仅需2分钟填写申请" : "Only 2 minutes to apply"}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">
                        {brand.brand === "cn" ? "本月剩余配额" : "Monthly quota remaining"}
                      </span>
                      <span className="font-semibold text-emerald-400">
                        {brand.brand === "cn" ? "127 个名额" : "127 spots left"}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
                    </div>
                  </div>
                  <a
                    href={brand.routes.youngScientist}
                    className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-emerald-500 to-teal-500 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:from-emerald-400 hover:to-teal-400 hover:shadow-emerald-500/30"
                  >
                    {brand.brand === "cn" ? "提交学术合作申请并预约在线demo" : "Submit Application & Book Online Demo"}
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                  <p className="mt-3 text-center text-xs text-slate-500">
                    {brand.brand === "cn" ? "提交后 3 个工作日内审核并联系" : "Reviewed and contacted within 3 business days"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
              {brand.brand === "cn"
                ? "开启您的 AI 菌株发现之旅"
                : "Start Your AI Strain Discovery Journey"}
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              {brand.brand === "cn"
                ? "立即体验菌株挖掘沙盒，感受AI驱动的微生物研发新范式"
                : "Experience the strain discovery sandbox and feel the new paradigm of AI-driven microbial R&D"}
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <a
                href={brand.routes.strainDiscovery}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-500 px-8 text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400"
              >
                {brand.brand === "cn" ? "免费开始使用" : "Get Started Free"}
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer brand={brand} />
    </div>
  );
}
