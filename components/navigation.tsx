"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Database, Cpu, Shield, FlaskConical, Leaf, Heart, Users, GraduationCap, Microscope, Languages } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navigation() {
  const t = useTranslations()
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)

  const industryItems = [
    {
      title: t("industries.animalNutrition.title"),
      href: "/#industries",
      description: t("industries.animalNutrition.description"),
      icon: Heart,
    },
    {
      title: t("industries.plantProtection.title"),
      href: "/#industries",
      description: t("industries.plantProtection.description"),
      icon: Leaf,
    },
    {
      title: t("industries.animalHealth.title"),
      href: "/#industries",
      description: t("industries.animalHealth.description"),
      icon: FlaskConical,
    },
  ]

  const roleItems = [
    {
      title: t("roles.rdDirector.title"),
      href: "/#roles",
      description: t("roles.rdDirector.description"),
      icon: Microscope,
    },
    {
      title: t("roles.academicPI.title"),
      href: "/#roles",
      description: t("roles.academicPI.description"),
      icon: GraduationCap,
    },
  ]

  const platformItems = [
    {
      title: t("platform.strainDatabase.title"),
      href: "/#platform",
      description: t("platform.strainDatabase.description"),
      icon: Database,
    },
    {
      title: t("platform.aiAgent.title"),
      href: "/#platform",
      description: t("platform.aiAgent.description"),
      icon: Cpu,
    },
    {
      title: t("platform.apiGateway.title"),
      href: "/#platform",
      description: t("platform.apiGateway.description"),
      icon: Users,
    },
  ]

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/')
    const nextSegments = [...segments]
    
    if (segments[1] === locale) {
      nextSegments[1] = newLocale
    } else {
      nextSegments.splice(1, 0, newLocale)
    }
    
    router.push(nextSegments.join('/'))
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <svg viewBox="0 0 32 32" className="w-8 h-8" aria-label="Arboray Logo">
                <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
                <circle cx="16" cy="16" r="4" className="fill-primary" />
                <circle cx="16" cy="6" r="2" className="fill-accent" />
                <circle cx="24" cy="12" r="2" className="fill-accent" />
                <circle cx="24" cy="22" r="2" className="fill-accent" />
                <circle cx="16" cy="26" r="2" className="fill-accent" />
                <circle cx="8" cy="22" r="2" className="fill-accent" />
                <circle cx="8" cy="12" r="2" className="fill-accent" />
                <line x1="16" y1="16" x2="16" y2="6" stroke="currentColor" strokeWidth="1" className="text-primary/40" />
                <line x1="16" y1="16" x2="24" y2="12" stroke="currentColor" strokeWidth="1" className="text-primary/40" />
                <line x1="16" y1="16" x2="24" y2="22" stroke="currentColor" strokeWidth="1" className="text-primary/40" />
                <line x1="16" y1="16" x2="16" y2="26" stroke="currentColor" strokeWidth="1" className="text-primary/40" />
                <line x1="16" y1="16" x2="8" y2="22" stroke="currentColor" strokeWidth="1" className="text-primary/40" />
                <line x1="16" y1="16" x2="8" y2="12" stroke="currentColor" strokeWidth="1" className="text-primary/40" />
              </svg>
            </div>
            <span className="text-xl font-semibold tracking-tight text-foreground">Arboray</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-foreground hover:bg-secondary">
                  {t("navigation.industries")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                    {industryItems.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                        icon={item.icon}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-foreground hover:bg-secondary">
                  {t("navigation.roles")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1">
                    {roleItems.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                        icon={item.icon}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-foreground hover:bg-secondary">
                  {t("navigation.platform")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                    {platformItems.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                        icon={item.icon}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/trust-center" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-foreground hover:bg-secondary")}>
                    <Shield className="mr-2 h-4 w-4 text-primary" />
                    {t("navigation.trustCenter")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Right Side - Language Switcher & CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Languages className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {locale === 'en' ? 'EN' : '中文'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem 
                  onClick={() => switchLocale('zh')}
                  className={locale === 'zh' ? 'bg-secondary font-medium' : ''}
                >
                  中文
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => switchLocale('en')}
                  className={locale === 'en' ? 'bg-secondary font-medium' : ''}
                >
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              {t("common.login")}
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              {t("common.requestDemo")}
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">打开菜单</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background border-border">
              <nav className="flex flex-col gap-4 mt-8">
                {/* Mobile Language Switcher */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b">
                  <Languages className="h-4 w-4 text-muted-foreground" />
                  <Button 
                    variant={locale === 'zh' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => switchLocale('zh')}
                    className="flex-1"
                  >
                    中文
                  </Button>
                  <Button 
                    variant={locale === 'en' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => switchLocale('en')}
                    className="flex-1"
                  >
                    EN
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground">{t("navigation.industries")}</h4>
                  {industryItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-5 w-5 text-primary" />
                      <span className="text-foreground">{item.title}</span>
                    </Link>
                  ))}
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground">{t("navigation.roles")}</h4>
                  {roleItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-5 w-5 text-primary" />
                      <span className="text-foreground">{item.title}</span>
                    </Link>
                  ))}
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground">{t("navigation.platform")}</h4>
                  {platformItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-5 w-5 text-primary" />
                      <span className="text-foreground">{item.title}</span>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/trust-center"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-foreground">{t("navigation.trustCenter")}</span>
                </Link>
                <div className="pt-4 space-y-2">
                  <Button variant="outline" className="w-full">{t("common.login")}</Button>
                  <Button className="w-full bg-primary text-primary-foreground">{t("common.requestDemo")}</Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ComponentType<{ className?: string }> }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary focus:bg-secondary group",
            className
          )}
          {...props}
        >
          <div className="flex items-start gap-3">
            {Icon && (
              <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                <Icon className="h-5 w-5" />
              </div>
            )}
            <div className="flex-1">
              <div className="text-sm font-medium leading-none mb-2 text-foreground">{title}</div>
              <p className="text-sm leading-snug text-muted-foreground">
                {children}
              </p>
            </div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
