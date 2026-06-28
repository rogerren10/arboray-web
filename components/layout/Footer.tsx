import type { BrandConfig } from "@/lib/brand";
import Image from "next/image";
import Link from "next/link";
import { Shield, Mail, MapPin } from "lucide-react";

interface FooterProps {
  brand: BrandConfig;
}

export function Footer({ brand }: FooterProps) {
  const isCn = brand.brand === "cn";
  const copyright = isCn
    ? `© ${new Date().getFullYear()} 桐光智能. 保留所有权利.`
    : `© ${new Date().getFullYear()} Arboray. All rights reserved.`;

  const logoSrc = isCn ? "/tongguang-logo.png" : "/arboray-logo.png";

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src={logoSrc}
                alt={brand.brandName}
                width={140}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-slate-400">
              {isCn ? brand.footer.description : brand.footer.descriptionEn}
            </p>
            <Link
              href={brand.routes.trust}
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-zinc-300"
            >
              <Shield className="h-3.5 w-3.5" />
              {isCn ? "信任中心" : "Trust Center"}
            </Link>
          </div>

          {brand.footer.columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-zinc-200">{column.title}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-zinc-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-slate-800/60 pt-8 md:flex-row md:items-center">
          <p className="text-xs text-slate-500">{copyright}</p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              <span>{isCn ? "contact@tongguangai.cn" : "contact@arboray.tech"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span>{isCn ? "苏州 · 中国" : "Suzhou · China"}</span>
            </div>
          </div>
        </div>

        {isCn && brand.icp && (
          <div className="mt-6 flex flex-col items-center gap-1.5 border-t border-slate-800/60 pt-6">
            <p className="text-[11px] text-slate-600">
              {brand.icp.icpNumber}
            </p>
            <p className="text-[11px] text-slate-600">
              {brand.icp.policeNumber}
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
