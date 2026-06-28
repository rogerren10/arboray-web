import type { Brand, BrandConfig } from "./types";
import { cnConfig } from "./config.cn";
import { enConfig } from "./config.en";

export function getBrand(): Brand {
  const brand =
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_BRAND) || "cn";
  return (brand === "en" ? "en" : "cn") as Brand;
}

export function getBrandConfig(): BrandConfig {
  const brand = getBrand();
  return brand === "en" ? enConfig : cnConfig;
}

export function isRouteAvailable(pathname: string): boolean {
  const config = getBrandConfig();
  return config.availableRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}

export type { Brand, BrandConfig, NavItem, FooterColumn, FooterLink } from "./types";
