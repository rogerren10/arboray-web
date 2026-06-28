"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getBrandConfig } from "@/lib/brand";
import { Beaker, Thermometer, Droplets, Leaf, Loader2, Lock, ArrowRight, Sparkles } from "lucide-react";
import ReactECharts from "echarts-for-react";

const USAGE_LIMIT = 5;
const STORAGE_KEY = "v32_process_opt_usage";

export default function ProcessOptimizationPage() {
  const brand = getBrandConfig();
  const isCn = brand.brand === "cn";

  const [scenario, setScenario] = useState("compost");
  const [carbonRatio, setCarbonRatio] = useState(25);
  const [moisture, setMoisture] = useState(60);
  const [temperature, setTemperature] = useState(55);
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [showLimitDialog, setShowLimitDialog] = useState(false);
  const [tokenCost, setTokenCost] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setUsageCount(parseInt(stored, 10) || 0);
    }
  }, []);

  const scenarios = [
    {
      id: "compost",
      name: isCn ? "堆肥发酵" : "Compost Fermentation",
      icon: Leaf,
      color: "emerald",
    },
    {
      id: "silage",
      name: isCn ? "青贮发酵" : "Silage Fermentation",
      icon: Beaker,
      color: "amber",
    },
    {
      id: "inoculant",
      name: isCn ? "菌剂生产" : "Inoculant Production",
      icon: Beaker,
      color: "blue",
    },
  ];

  const handleCalculate = async () => {
    if (usageCount >= USAGE_LIMIT) {
      setShowLimitDialog(true);
      return;
    }

    setIsCalculating(true);
    setHasCalculated(true);

    const delay = 1200 + Math.random() * 1600;
    await new Promise((resolve) => setTimeout(resolve, delay));

    setTokenCost(Math.floor(1200 + Math.random() * 1000));

    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem(STORAGE_KEY, newCount.toString());

    setIsCalculating(false);

    if (newCount >= USAGE_LIMIT) {
      setTimeout(() => setShowLimitDialog(true), 800);
    }
  };

  const generateCurveData = () => {
    const data = [];
    const baseTemp = temperature;
    for (let i = 0; i <= 24; i++) {
      const noise = (Math.random() - 0.5) * 3;
      const sineWave = Math.sin(i / 4) * 2;
      let temp = baseTemp + noise + sineWave;
      if (i < 2) temp = baseTemp - 10 + i * 5 + noise;
      if (i > 20) temp = baseTemp - (i - 20) * 2 + noise;
      data.push([i, Math.round(temp * 10) / 10]);
    }
    return data;
  };

  const curveData = generateCurveData();

  const chartOption = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(15, 23, 42, 0.9)",
      borderColor: "rgba(51, 65, 85, 0.5)",
      textStyle: { color: "#e4e4e7", fontSize: 12 },
    },
    grid: { left: "10%", right: "5%", top: "15%", bottom: "15%" },
    xAxis: {
      type: "value",
      name: isCn ? "时间 (天)" : "Time (days)",
      nameTextStyle: { color: "#71717a" },
      axisLine: { lineStyle: { color: "#3f3f46" } },
      axisLabel: { color: "#71717a" },
      splitLine: { lineStyle: { color: "rgba(51, 65, 85, 0.3)" } },
    },
    yAxis: {
      type: "value",
      name: isCn ? "温度 (°C)" : "Temperature (°C)",
      nameTextStyle: { color: "#71717a" },
      axisLine: { lineStyle: { color: "#3f3f46" } },
      axisLabel: { color: "#71717a" },
      splitLine: { lineStyle: { color: "rgba(51, 65, 85, 0.3)" } },
    },
    series: [
      {
        type: "line",
        data: curveData,
        smooth: true,
        lineStyle: { color: "#10b981", width: 2 },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(16, 185, 129, 0.3)" },
              { offset: 1, color: "rgba(16, 185, 129, 0.02)" },
            ],
          },
        },
        itemStyle: { color: "#10b981" },
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header brand={brand} />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-400">
              <Beaker className="h-3.5 w-3.5" />
              {isCn ? "工艺智能优化" : "Process Intelligent Optimization"}
            </div>
            <h1 className="text-3xl font-bold text-zinc-100 sm:text-4xl">
              {isCn ? "农业微生物工艺优化沙盒" : "Agricultural Microbial Process Optimization Sandbox"}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-slate-400">
              {isCn
                ? "针对堆肥、青贮、菌剂生产等农业场景，智能优化关键工艺参数"
                : "Intelligently optimize key process parameters for agricultural scenarios"}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-amber-400" />
                    {isCn ? "工艺参数设置" : "Process Parameters"}
                  </CardTitle>
                  <CardDescription>
                    {isCn ? "调整参数查看实时优化效果" : "Adjust parameters to see optimization results"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>{isCn ? "应用场景" : "Application Scenario"}</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {scenarios.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setScenario(s.id)}
                          className={`flex flex-col items-center gap-2 rounded-lg border px-3 py-3 transition-all ${
                            scenario === s.id
                              ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                              : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600"
                          }`}
                        >
                          <s.icon className="h-5 w-5" />
                          <span className="text-xs">{s.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label htmlFor="carbon-ratio">
                        {isCn ? "碳氮比 (C/N)" : "Carbon/Nitrogen Ratio"}
                      </Label>
                      <span className="text-sm font-medium text-emerald-400">{carbonRatio}:1</span>
                    </div>
                    <input
                      id="carbon-ratio"
                      type="range"
                      min={15}
                      max={40}
                      value={carbonRatio}
                      onChange={(e) => setCarbonRatio(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>15:1</span>
                      <span>40:1</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label htmlFor="moisture">
                        {isCn ? "含水率" : "Moisture Content"}
                      </Label>
                      <span className="text-sm font-medium text-emerald-400">{moisture}%</span>
                    </div>
                    <input
                      id="moisture"
                      type="range"
                      min={30}
                      max={75}
                      value={moisture}
                      onChange={(e) => setMoisture(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>30%</span>
                      <span>75%</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label htmlFor="temperature">
                        {isCn ? "发酵温度" : "Fermentation Temperature"}
                      </Label>
                      <span className="text-sm font-medium text-emerald-400">{temperature}°C</span>
                    </div>
                    <input
                      id="temperature"
                      type="range"
                      min={25}
                      max={70}
                      value={temperature}
                      onChange={(e) => setTemperature(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>25°C</span>
                      <span>70°C</span>
                    </div>
                  </div>

                  <div className="space-y-3 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">
                        {isCn ? "剩余优化次数" : "Remaining Optimizations"}
                      </span>
                      <span className="text-sm font-medium text-zinc-200">
                        {Math.max(0, USAGE_LIMIT - usageCount)} / {USAGE_LIMIT}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all"
                        style={{
                          width: `${Math.max(0, ((USAGE_LIMIT - usageCount) / USAGE_LIMIT) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className="w-full bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                  >
                    {isCalculating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {isCn ? "AI 优化计算中..." : "AI Optimizing..."}
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        {isCn ? "开始智能优化" : "Start Optimization"}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>{isCn ? "温度变化曲线模拟" : "Temperature Curve Simulation"}</CardTitle>
                  <CardDescription>
                    {isCn ? "基于当前参数的发酵温度动态预测" : "Dynamic fermentation temperature prediction"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ReactECharts option={chartOption} style={{ height: "100%", width: "100%" }} />
                  </div>
                </CardContent>
              </Card>

              {hasCalculated && (
                <div className="grid gap-4 sm:grid-cols-3">
                  <Card>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                          <Thermometer className="h-5 w-5 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">
                            {isCn ? "发酵效率提升" : "Efficiency Improvement"}
                          </p>
                          <p className="text-lg font-bold text-emerald-400">
                            +{Math.round(15 + Math.random() * 20)}%
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                          <Droplets className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">
                            {isCn ? "周期缩短" : "Cycle Reduction"}
                          </p>
                          <p className="text-lg font-bold text-blue-400">
                            -{Math.round(10 + Math.random() * 15)}%
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                          <Sparkles className="h-5 w-5 text-amber-400" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">
                            {isCn ? "Token 消耗" : "Token Cost"}
                          </p>
                          <p className="text-lg font-bold text-amber-400">{tokenCost}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Dialog open={showLimitDialog} onOpenChange={setShowLimitDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10">
              <Lock className="h-8 w-8 text-amber-400" />
            </div>
            <DialogTitle className="text-center text-xl">
              {isCn ? "优化次数已用完" : "Optimization Quota Exceeded"}
            </DialogTitle>
            <DialogDescription className="text-center">
              {isCn
                ? "感谢您的体验！每位访客可免费体验5次工艺优化计算。"
                : "Thank you for trying! Each visitor gets 5 free optimizations."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <h4 className="font-medium text-emerald-300">
                {isCn ? "🎓 青年科学家启航计划" : "🎓 Young Scientist Program"}
              </h4>
              <p className="mt-2 text-sm text-slate-400">
                {isCn
                  ? "申请学术配额，免费获得更多优化次数和研发助手权限。"
                  : "Apply for academic quota with free extended access."}
              </p>
              <Button className="mt-3 w-full bg-emerald-500 text-slate-950 hover:bg-emerald-400">
                {isCn ? "立即申请" : "Apply Now"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer brand={brand} />
    </div>
  );
}
