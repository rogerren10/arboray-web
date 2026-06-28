import { BrandConfig } from "./types";

export const enConfig: BrandConfig = {
  brand: "en",
  brandName: "Arboray",
  brandNameEn: "Arboray Intelligence",
  slogan: "AI-Powered Discovery",
  sloganEn: "AI-Powered Strain Discovery",
  tagline: "AI-Powered Strain Discovery & Process Optimization Platform",
  taglineEn: "AI-Powered Strain Discovery & Process Optimization Platform",
  consoleButtonText: "Console",
  navItems: [
    { label: "Home", href: "/" },
    { label: "Strain Discovery", href: "/strain-discovery" },
    { label: "R&D Assistant", href: "/rd-assistant" },
    { label: "Process Optimization", href: "/process-optimization" },
    { label: "Agent", href: "/agent" },
    { label: "Strain Library", href: "/strain-library" },
    { label: "Contact", href: "/contact" },
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
    description: "Awaken dormant strain assets with AI - Distributed strain deep mining & reuse platform",
    descriptionEn: "Awaken dormant strain assets with AI - Distributed strain deep mining & reuse platform",
    columns: [
      {
        title: "Products",
        links: [
          { label: "Strain Discovery", href: "/strain-discovery" },
          { label: "R&D Assistant", href: "/rd-assistant" },
          { label: "Process Optimization", href: "/process-optimization" },
          { label: "Agent", href: "/agent" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Strain Library", href: "/strain-library" },
          { label: "Young Scientist Program", href: "/young-scientist" },
          { label: "Trust Center", href: "/trust" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About Us", href: "/about" },
          { label: "Contact Us", href: "/contact" },
        ],
      },
    ],
  },
};
