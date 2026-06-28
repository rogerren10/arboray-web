import { BrandConfig } from "./types";

export const cnConfig: BrandConfig = {
  brand: "cn",
  brandName: "桐光智能",
  brandNameEn: "Arboray Intelligence",
  slogan: "AI 驱动菌株发现",
  sloganEn: "AI-Powered Strain Discovery",
  tagline: "AI 驱动的菌株发现与工艺优化平台",
  taglineEn: "AI-Powered Strain Discovery & Process Optimization Platform",
  consoleButtonText: "进入控制台",
  navItems: [
    { label: "首页", href: "/" },
    { label: "菌株挖掘", href: "/strain-discovery" },
    { label: "研发助手", href: "/rd-assistant" },
    { label: "工艺优化", href: "/process-optimization" },
    { label: "智能体", href: "/agent" },
    { label: "菌种库", href: "/strain-library" },
    { label: "联系我们", href: "/contact" },
  ],
  routes: {
    home: "/",
    sandbox: "/strain-discovery",
    strainDiscovery: "/strain-discovery",
    rdAssistant: "/rd-assistant",
    processOptimization: "/process-optimization",
    agent: "/agent",
    strainLibrary: "/strain-library",
    trust: "/trust",
    youngScientist: "/young-scientist",
  },
  availableRoutes: [
    "/",
    "/strain-discovery",
    "/rd-assistant",
    "/process-optimization",
    "/agent",
    "/strain-library",
    "/trust",
    "/young-scientist",
    "/about",
    "/contact",
  ],
  footer: {
    description: "用 AI 唤醒休眠菌株资产，分布式菌株深度挖掘与复用平台",
    descriptionEn: "Awaken dormant strain assets with AI - Distributed strain deep mining & reuse platform",
    columns: [
      {
        title: "产品",
        links: [
          { label: "菌株挖掘", href: "/strain-discovery" },
          { label: "研发助手", href: "/rd-assistant" },
          { label: "工艺优化", href: "/process-optimization" },
          { label: "智能体", href: "/agent" },
        ],
      },
      {
        title: "资源",
        links: [
          { label: "菌种库", href: "/strain-library" },
          { label: "青年科学家计划", href: "/young-scientist" },
          { label: "信任中心", href: "/trust" },
        ],
      },
      {
        title: "关于",
        links: [
          { label: "关于我们", href: "/about" },
          { label: "联系我们", href: "/contact" },
        ],
      },
    ],
  },
  icp: {
    icpNumber: "苏ICP备2026036571号",
    policeNumber: "苏公网安备32059002008098号",
  },
};
