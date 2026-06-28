"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getBrandConfig } from "@/lib/brand";
import { strainLibrary, type Strain } from "@/lib/data/strains";
import { Search, Dna, Database, Filter, ChevronRight, Wheat } from "lucide-react";
import Link from "next/link";

export default function StrainLibraryPage() {
  const brand = getBrandConfig();
  const isCn = brand.brand === "cn";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);

  const categories = [...new Set(strainLibrary.map((s) => s.category))];
  const allCrops = [...new Set(strainLibrary.flatMap((s) => s.crops))];

  // 完整的作物列表（包括目前没有对应菌株的作物）
  const allCropOptions = [
    "水稻", "小麦", "玉米", "蔬菜", "大豆", "棉花", "果树", "花生", "苜蓿", "豌豆",
    "紫云英", "甜菜", "耐盐蔬菜", "大麦", "马铃薯", "寒地水稻", "中药材", "草莓", "西瓜",
    "油菜", "甘蔗", "茶叶", "烟草", "高粱", "谷子", "红薯", "魔芋", "香蕉", "柑橘",
    "苹果", "梨", "桃", "葡萄", "核桃", "板栗", "茶", "咖啡", "可可", "橡胶",
  ];
  const allCropOptionsEn = [
    "Rice", "Wheat", "Corn", "Vegetables", "Soybean", "Cotton", "Fruit Trees", "Peanut", "Alfalfa", "Pea",
    "Astragalus", "Sugar Beet", "Salt-Tolerant Vegetables", "Barley", "Potato", "Cold-Rice", "Chinese Herbs", "Strawberry", "Watermelon",
    "Rapeseed", "Sugarcane", "Tea", "Tobacco", "Sorghum", "Millet", "Sweet Potato", "Konjac", "Banana", "Citrus",
    "Apple", "Pear", "Peach", "Grape", "Walnut", "Chestnut", "Tea", "Coffee", "Cocoa", "Rubber",
  ];

  // 构建作物映射（中文到英文）
  const cropMap: Record<string, string> = {};
  allCropOptions.forEach((crop, index) => {
    cropMap[crop] = allCropOptionsEn[index];
  });
  const reverseCropMap: Record<string, string> = {};
  allCropOptionsEn.forEach((crop, index) => {
    reverseCropMap[crop] = allCropOptions[index];
  });

  // 检查作物是否有对应菌株
  const cropsWithStrains = new Set(allCrops);
  const getCropLabel = (crop: string) => isCn ? crop : (cropMap[crop] || crop);

  const filtered = strainLibrary.filter((strain) => {
    const matchesSearch =
      !searchQuery ||
      strain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      strain.latinName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      strain.functions.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase())) ||
      strain.crops.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = !selectedCategory || strain.category === selectedCategory;
    const matchesCrop = !selectedCrop || strain.crops.includes(selectedCrop);
    return matchesSearch && matchesCategory && matchesCrop;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header brand={brand} />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-500/30 bg-zinc-500/10 px-4 py-1.5 text-xs font-medium text-zinc-400">
              <Database className="h-3.5 w-3.5" />
              {isCn ? "菌株资源库" : "Strain Resource Library"}
            </div>
            <h1 className="text-3xl font-bold text-zinc-100 sm:text-4xl">
              {isCn ? "农业微生物菌种库" : "Agricultural Microbial Strain Library"}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-slate-400">
              {isCn
                ? "精选功能菌株，按功能分类与适用作物双维度筛选"
                : "Curated functional strains, filter by function category and applicable crops"}
            </p>
          </div>

          <div className="mb-8 flex flex-col gap-4">
            <div className="relative w-full md:max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                placeholder={isCn ? "搜索菌株名称、功能、作物..." : "Search strain name, function, crop..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Filter className="h-4 w-4" />
                  {isCn ? "功能分类" : "Category"}
                </span>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`rounded-full px-3 py-1 text-xs transition-all ${
                    selectedCategory === null
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-slate-900 text-slate-400 border border-slate-700 hover:border-slate-600"
                  }`}
                >
                  {isCn ? "全部" : "All"}
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-3 py-1 text-xs transition-all ${
                      selectedCategory === cat
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-slate-900 text-slate-400 border border-slate-700 hover:border-slate-600"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="flex items-center gap-1.5 text-sm text-slate-500">
                <Wheat className="h-4 w-4" />
                {isCn ? "适用作物" : "Applicable Crops"}
              </span>
              <button
                onClick={() => setSelectedCrop(null)}
                className={`rounded-full px-3 py-1 text-xs transition-all ${
                  selectedCrop === null
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : "bg-slate-900 text-slate-400 border border-slate-700 hover:border-slate-600"
                }`}
              >
                {isCn ? "全部" : "All"}
              </button>
              {(isCn ? allCropOptions : allCropOptionsEn).map((crop) => {
                const hasStrains = cropsWithStrains.has(isCn ? crop : (reverseCropMap[crop] || crop));
                const isSelected = selectedCrop === (isCn ? crop : (reverseCropMap[crop] || crop));
                
                return (
                  <button
                    key={crop}
                    onClick={() => hasStrains && setSelectedCrop(isCn ? crop : (reverseCropMap[crop] || crop))}
                    disabled={!hasStrains}
                    title={!hasStrains ? (isCn ? "暂无对应菌株" : "No corresponding strains") : undefined}
                    className={`rounded-full px-3 py-1 text-xs transition-all ${
                      isSelected
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        : hasStrains
                        ? "bg-slate-900 text-slate-400 border border-slate-700 hover:border-slate-600"
                        : "bg-slate-900/50 text-slate-600 border border-slate-800 cursor-not-allowed opacity-50"
                    }`}
                  >
                    {crop}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((strain) => (
              <Card
                key={strain.id}
                className="group cursor-pointer transition-all hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{strain.name}</CardTitle>
                      <CardDescription className="text-xs italic">
                        {strain.latinName}
                      </CardDescription>
                    </div>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400">
                      {strain.category}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 line-clamp-2 text-sm text-slate-400">
                    {strain.description}
                  </p>
                  <div className="mb-3">
                    <p className="mb-1.5 text-xs text-slate-500">
                      {isCn ? "适用作物：" : "Crops:"}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {strain.crops.slice(0, 4).map((crop) => (
                        <span
                          key={crop}
                          className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[11px] text-amber-300"
                        >
                          {crop}
                        </span>
                      ))}
                      {strain.crops.length > 4 && (
                        <span className="rounded-md bg-slate-900 px-2 py-0.5 text-[11px] text-slate-500">
                          +{strain.crops.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {strain.functions.slice(0, 3).map((func) => (
                      <span
                        key={func}
                        className="rounded-md bg-slate-900 px-2 py-0.5 text-xs text-slate-400"
                      >
                        {func}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Dna className="h-3.5 w-3.5" />
                      {strain.id}
                    </div>
                    <Link
                      href={brand.routes.strainDiscovery}
                      className="flex items-center gap-1 text-xs text-emerald-400 transition-colors hover:text-emerald-300 group-hover:gap-2"
                    >
                      {isCn ? "挖掘匹配" : "Match & Discover"}
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Database className="mx-auto mb-4 h-12 w-12 text-slate-700" />
              <p className="text-slate-400">{isCn ? "未找到匹配的菌株" : "No matching strains found"}</p>
            </div>
          )}

          <div className="mt-16 rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center">
            <h3 className="text-lg font-semibold text-zinc-100">
              {isCn ? "需要更多菌株资源？" : "Need more strain resources?"}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
              {isCn
                ? "我们拥有万级菌株资源库，企业用户可申请定制化筛选服务"
                : "We have 10K+ strains in our library. Enterprise users can request customized screening services."}
            </p>
            <Button asChild className="mt-6 bg-emerald-500 text-slate-950 hover:bg-emerald-400">
              <Link href={brand.routes.strainDiscovery}>
                {isCn ? "使用 AI 菌株挖掘" : "Use AI Strain Discovery"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer brand={brand} />
    </div>
  );
}
