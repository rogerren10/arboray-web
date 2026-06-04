import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '../../routing'
import '../globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-mono'
});

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  
  const isZh = locale === 'zh';
  
  return {
    title: isZh ? 'Arboray | AI 驱动的菌株发现平台' : 'Arboray | AI-Driven Strain Discovery Platform',
    description: isZh 
      ? '用 AI 唤醒您的休眠菌株资产。分布式菌株深度挖掘与复用平台。' 
      : 'Wake up your dormant strain assets with AI. The distributed strain deep-digging & reuse platform for biotech innovation.',
    generator: 'Arboray',
    keywords: isZh 
      ? ['AI', '菌株发现', '生物技术', '深度学习', '微生物菌株', '研发', '生物科技']
      : ['AI', 'strain discovery', 'biotech', 'deep learning', 'microbial strains', 'R&D', 'biotechnology'],
    icons: {
      icon: [
        {
          url: '/arboray-logo-green.png',
          type: 'image/png',
        },
      ],
      apple: '/arboray-logo-green.png',
    },
  };
}

interface RootLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function RootLayout({
  children,
  params
}: RootLayoutProps) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="light bg-background" style={{ colorScheme: 'light' }}>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
