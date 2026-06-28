import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const isCnBrand = process.env.NEXT_PUBLIC_BRAND !== "en";

export const metadata: Metadata = {
  title: isCnBrand
    ? "桐光智能 | AI 驱动的菌株发现与工艺优化平台"
    : "Arboray | AI-Powered Strain Discovery & Process Optimization Platform",
  description: isCnBrand
    ? "用 AI 唤醒您的休眠菌株资产。分布式菌株深度挖掘与复用平台，将6个月的湿实验筛选周期缩短至数天。"
    : "Awaken dormant strain assets with AI. Distributed strain deep mining and reuse platform - shorten the 6-month wet lab screening cycle to just days.",
};

const BAIDU_TONGJI_ID = "ca7bbb454665a7f7c74aec6f6f3e1e85";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={isCnBrand ? "zh-CN" : "en"} className="dark">
      <Script
        id="baidu-tongji"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?${BAIDU_TONGJI_ID}";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
          `,
        }}
      />
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        {children}
      </body>
    </html>
  );
}
