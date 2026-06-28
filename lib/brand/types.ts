export type Brand = "cn" | "en";

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface BrandConfig {
  brand: "cn" | "en";
  brandName: string;
  brandNameEn: string;
  slogan: string;
  sloganEn: string;
  tagline: string;
  taglineEn: string;
  consoleButtonText: string;
  navItems: NavItem[];
  routes: {
    home: string;
    sandbox: string;
    strainDiscovery: string;
    rdAssistant: string;
    processOptimization: string;
    agent: string;
    strainLibrary: string;
    trust: string;
    youngScientist: string;
    about?: string;
    contact?: string;
  };
  availableRoutes: string[];
  footer: {
    description: string;
    descriptionEn: string;
    columns: FooterColumn[];
  };
  icp?: {
    icpNumber: string;
    policeNumber: string;
  };
}
