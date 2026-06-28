import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "桐光智能 | AI 驱动的菌株发现与工艺优化平台",
  description: "用 AI 唤醒您的休眠菌株资产。分布式菌株深度挖掘与复用平台，将6个月的湿实验筛选周期缩短至数天。",
};

const BAIDU_TONGJI_ID = "ca7bbb454665a7f7c74aec6f6f3e1e85";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="dark">
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
