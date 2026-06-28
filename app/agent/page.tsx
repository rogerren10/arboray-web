"use client";

import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getBrandConfig } from "@/lib/brand";
import { Bot, User, Send, Loader2, Lock, Sparkles, ArrowRight } from "lucide-react";

const USAGE_LIMIT = 5;
const STORAGE_KEY = "v32_agent_usage";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const quickQuestions = [
  { zh: "如何从土壤中分离固氮菌？", en: "How to isolate nitrogen-fixing bacteria from soil?", category: "isolation" },
  { zh: "堆肥发酵温度上不去怎么办？", en: "Why isn't compost temperature rising?", category: "composting" },
  { zh: "青贮饲料容易发霉怎么解决？", en: "How to prevent mold in silage?", category: "silage" },
  { zh: "微生物菌剂如何延长保质期？", en: "How to extend shelf life of microbial inoculants?", category: "preservation" },
  { zh: "根瘤菌与大豆共生的原理是什么？", en: "What is the mechanism of rhizobia-soybean symbiosis?", category: "symbiosis" },
  { zh: "生物有机肥的制作要点有哪些？", en: "What are the key points for bio-organic fertilizer production?", category: "biofertilizer" },
  { zh: "如何提高解磷菌的解磷效率？", en: "How to improve phosphorus solubilization efficiency?", category: "screening" },
  { zh: "设施蔬菜土传病害如何生物防治？", en: "How to biocontrol soil-borne diseases in greenhouse vegetables?", category: "biocontrol" },
];

const responseTemplatesCn = [
  [
    "关于您的问题，我来从专业角度为您解答：\n\n首先，这类问题在农业微生物研究中非常常见。根据已发表的研究和实践经验，建议您从以下几个方面入手：\n\n1. **样本选择**：建议从目标生境中采集新鲜样本，注意保持低温和厌氧条件\n2. **分离策略**：采用富集培养结合选择性培养基的方法，可以显著提高目标菌的分离效率\n3. **验证方法**：分离后需要通过形态观察、生理生化实验和分子生物学方法进行验证\n\n另外，如果您需要更具体的实验方案，可以使用研发助手模块，输入您的具体条件后会生成个性化方案。",
  ],
  [
    "这是一个很好的问题！让我为您详细分析：\n\n从微生物生态学的角度来看，这个现象通常与以下几个因素有关：\n\n**主要原因：**\n- 初始菌剂活性不足\n- 环境条件（温度、湿度、pH）不适宜\n- 营养基质配比不合理\n- 杂菌污染严重\n\n**解决方案：**\n1. 优化接种量和接种时间\n2. 调整环境参数至适宜范围\n3. 补充必要的营养元素\n4. 做好无菌操作和杂菌防控\n\n建议您先做小试验证，找到最关键的影响因素后再进行放大实验。",
  ],
  [
    "感谢您的提问！这个问题涉及到微生物生理代谢的多个层面：\n\n根据我们的菌株数据库和研究经验，以下是一些建议：\n\n**关键技术要点：**\n- 选择适宜的初始菌株非常重要，不同菌株的特性差异很大\n- 培养条件的优化需要多因素正交实验\n- 过程监测和控制是成功的关键\n\n**推荐的技术路线：**\n1. 先通过菌株挖掘沙盒找到合适的候选菌株\n2. 用研发助手的初筛/复筛模块进行条件优化\n3. 最后用工艺优化模块进行放大验证\n\n这样的流程可以大大提高研发效率，减少试错成本。",
  ],
  [
    "非常专业的问题！以下是我的分析和建议：\n\n在农业微生物领域，这确实是一个既有挑战性又有实用价值的课题。\n\n**核心影响因素分析：**\n| 因素 | 影响程度 | 优化方向 |\n|------|----------|----------|\n| 温度 | ⭐⭐⭐⭐⭐ | 梯度优化 |\n| pH值 | ⭐⭐⭐⭐ | 缓冲体系 |\n| 接种量 | ⭐⭐⭐ | 逐步放大 |\n| 营养源 | ⭐⭐⭐⭐ | 碳氮比优化 |\n\n**下一步建议：**\n- 如果您有具体的菌株，可以直接使用工艺优化沙盒进行参数模拟\n- 如果还在筛选阶段，建议先用菌株挖掘功能找到合适的候选菌\n- 研发助手可以帮您设计完整的实验方案\n\n希望这些建议对您有帮助！如需更深入的讨论，欢迎继续提问。",
  ],
];

const responseTemplatesEn = [
  [
    "Let me answer your question from a professional perspective:\n\nThis type of question is very common in agricultural microbiology research. Based on published studies and practical experience, I recommend approaching it from the following angles:\n\n1. **Sample Selection**: Collect fresh samples from the target habitat, maintaining low temperature and anaerobic conditions\n2. **Isolation Strategy**: Use enrichment culture combined with selective media to significantly improve target strain isolation efficiency\n3. **Verification Methods**: After isolation, verify through morphological observation, biochemical tests, and molecular biology methods\n\nAdditionally, for more specific experimental protocols, you can use the R&D Assistant module — it will generate a personalized plan based on your specific conditions.",
  ],
  [
    "Great question! Let me analyze this in detail:\n\nFrom a microbial ecology perspective, this phenomenon is typically related to the following factors:\n\n**Main Causes:**\n- Insufficient initial inoculant activity\n- Unsuitable environmental conditions (temperature, humidity, pH)\n- Improper nutrient substrate formulation\n- Severe contamination by unwanted microorganisms\n\n**Solutions:**\n1. Optimize inoculation amount and timing\n2. Adjust environmental parameters to optimal ranges\n3. Supplement essential nutrients\n4. Maintain aseptic technique and contamination control\n\nI recommend conducting small-scale tests first to identify the most critical factors before scaling up.",
  ],
  [
    "Thank you for your question! This involves multiple aspects of microbial physiology and metabolism:\n\nBased on our strain database and research experience, here are some recommendations:\n\n**Key Technical Points:**\n- Selecting the right initial strain is crucial — different strains have vastly different characteristics\n- Culture condition optimization requires multi-factor orthogonal experiments\n- Process monitoring and control are key to success\n\n**Recommended Technical Route:**\n1. First use the Strain Discovery Sandbox to find suitable candidate strains\n2. Use the R&D Assistant's screening modules for condition optimization\n3. Finally use the Process Optimization module for scale-up validation\n\nThis workflow can greatly improve R&D efficiency and reduce trial-and-error costs.",
  ],
  [
    "Very professional question! Here's my analysis and recommendations:\n\nIn agricultural microbiology, this is indeed a challenging yet practically valuable topic.\n\n**Key Factor Analysis:**\n| Factor | Impact Level | Optimization Direction |\n|--------|--------------|------------------------|\n| Temperature | ⭐⭐⭐⭐⭐ | Gradient optimization |\n| pH | ⭐⭐⭐⭐ | Buffer system |\n| Inoculum Size | ⭐⭐⭐ | Stepwise scale-up |\n| Nutrient Source | ⭐⭐⭐⭐ | C/N ratio optimization |\n\n**Next Steps:**\n- If you have specific strains, you can directly use the Process Optimization Sandbox for parameter simulation\n- If still in the screening phase, use the Strain Discovery feature to find suitable candidates\n- The R&D Assistant can help design a complete experimental plan\n\nI hope these suggestions are helpful! Feel free to continue the discussion for deeper insights.",
  ],
];

export default function AgentPage() {
  const brand = getBrandConfig();
  const isCn = brand.brand === "cn";
  const [hasAskedQuestion, setHasAskedQuestion] = useState(false);
  const [showAdvancedInput, setShowAdvancedInput] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: isCn
        ? "您好！我是农业微生物AI智能体。我可以帮您解答关于菌株分离筛选、发酵工艺、菌剂生产、生物防治等方面的问题。请从下方快捷问题中选择，或申请高阶模式自由提问。"
        : "Hello! I'm the Agricultural Microbial AI Agent. I can help with strain isolation, fermentation, inoculant production, biocontrol, and more. Choose from quick questions below, or apply for advanced mode to ask freely.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [showLimitDialog, setShowLimitDialog] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isTypingRef = useRef(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setUsageCount(parseInt(stored, 10) || 0);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, displayedText]);

  const typewriterEffect = (text: string) => {
    isTypingRef.current = true;
    setDisplayedText("");
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        isTypingRef.current = false;
        setIsLoading(false);
      }
    }, 20 + Math.random() * 15);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (usageCount >= USAGE_LIMIT) {
      setShowLimitDialog(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const delay1 = 1200 + Math.random() * 1600;
    await new Promise((resolve) => setTimeout(resolve, delay1));

    const templates1 = isCn ? responseTemplatesCn : responseTemplatesEn;
    const randomTemplate =
      templates1[Math.floor(Math.random() * templates1.length)][0];

    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem(STORAGE_KEY, newCount.toString());

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: randomTemplate,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    typewriterEffect(randomTemplate);

    if (newCount >= USAGE_LIMIT) {
      setTimeout(() => setShowLimitDialog(true), 1500);
    }
  };

  const handleQuickQuestion = async (question: string) => {
    if (isLoading) return;

    if (usageCount >= USAGE_LIMIT) {
      setShowLimitDialog(true);
      return;
    }

    setHasAskedQuestion(true);

    const userMessage2: Message = {
      id: Date.now().toString(),
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage2]);
    setIsLoading(true);

    const delay2 = 1200 + Math.random() * 1600;
    await new Promise((resolve) => setTimeout(resolve, delay2));

    const templates2 = isCn ? responseTemplatesCn : responseTemplatesEn;
    const randomTemplate =
      templates2[Math.floor(Math.random() * templates2.length)][0];

    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem(STORAGE_KEY, newCount.toString());

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: randomTemplate,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    typewriterEffect(randomTemplate);

    if (newCount >= USAGE_LIMIT) {
      setTimeout(() => setShowLimitDialog(true), 1500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header brand={brand} />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="mb-6 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-400">
              <Bot className="h-3.5 w-3.5" />
              {isCn ? "AI 智能体" : "AI Agent"}
            </div>
            <h1 className="text-2xl font-bold text-zinc-100">
              {isCn ? "农业微生物 AI 助手" : "Agricultural Microbial AI Assistant"}
            </h1>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
              {isCn
                ? `剩余对话次数：${Math.max(0, USAGE_LIMIT - usageCount)} / ${USAGE_LIMIT}`
                : `Remaining messages: ${Math.max(0, USAGE_LIMIT - usageCount)} / ${USAGE_LIMIT}`}
            </p>
          </div>

          <Card className="flex h-[600px] flex-col">
            <CardContent className="flex flex-1 flex-col gap-4 p-0">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                        msg.role === "user"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-cyan-500/20 text-cyan-400"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-emerald-500/10 text-zinc-100"
                          : "bg-slate-900 text-slate-200 border border-slate-800"
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm">
                        {idx === messages.length - 1 && msg.role === "assistant" && isLoading
                          ? displayedText
                          : msg.content}
                        {idx === messages.length - 1 && msg.role === "assistant" && isLoading && (
                          <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-cyan-400 align-middle" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {messages.length <= 1 ? (
                <div className="px-4 pb-2">
                  <p className="mb-2 text-xs text-slate-500">
                    {isCn ? "请选择您感兴趣的问题：" : "Choose a question:"}
                  </p>
                  <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {quickQuestions.map((q) => (
                      <button
                        key={q.zh}
                        onClick={() => handleQuickQuestion(isCn ? q.zh : q.en)}
                        disabled={isLoading || usageCount >= USAGE_LIMIT}
                        className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-left text-xs text-slate-400 transition-all hover:border-cyan-500/30 hover:bg-cyan-500/5 hover:text-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isCn ? q.zh : q.en}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                    <div>
                      <p className="text-xs font-medium text-amber-300">
                        {isCn ? "需要自由提问？" : "Need to ask freely?"}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {isCn
                          ? "申请高阶模式，获取无限AI对话"
                          : "Apply for advanced mode, unlimited conversations"}
                      </p>
                    </div>
                    <Button
                      onClick={() => setShowLimitDialog(true)}
                      size="sm"
                      className="bg-amber-500 text-slate-950 hover:bg-amber-400"
                    >
                      {isCn ? "申请高阶模式" : "Apply Now"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="px-4 pb-2">
                  {showAdvancedInput ? (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder={
                            isCn
                              ? "输入您的问题，按 Enter 发送..."
                              : "Type your question, press Enter to send..."
                          }
                          disabled={isLoading || usageCount >= USAGE_LIMIT}
                          className="flex-1"
                        />
                        <Button
                          onClick={handleSend}
                          disabled={isLoading || !input.trim() || usageCount >= USAGE_LIMIT}
                          className="bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <button
                        onClick={() => setShowAdvancedInput(false)}
                        className="text-xs text-slate-500 hover:text-slate-400"
                      >
                        {isCn ? "← 返回快捷提问" : "← Back to quick questions"}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-500">
                        {isCn ? "更多快捷问题：" : "More quick questions:"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {quickQuestions.slice(0, 4).map((q) => (
                          <button
                            key={q.zh + "-more"}
                            onClick={() => handleQuickQuestion(isCn ? q.zh : q.en)}
                            disabled={isLoading || usageCount >= USAGE_LIMIT}
                            className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-400 transition-colors hover:border-cyan-500/30 hover:bg-cyan-500/5 hover:text-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isCn ? q.zh : q.en}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => {
                          if (usageCount >= USAGE_LIMIT) {
                            setShowLimitDialog(true);
                          } else {
                            setShowAdvancedInput(true);
                          }
                        }}
                        className="text-xs text-cyan-400 hover:text-cyan-300"
                      >
                        {isCn ? "→ 自由提问（申请高阶模式）" : "→ Free questions (Apply for advanced mode)"}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Dialog open={showLimitDialog} onOpenChange={setShowLimitDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10">
              <Lock className="h-8 w-8 text-cyan-400" />
            </div>
            <DialogTitle className="text-center text-xl">
              {isCn ? "对话次数已用完" : "Message Quota Exceeded"}
            </DialogTitle>
            <DialogDescription className="text-center">
              {isCn
                ? "感谢您的体验！每位访客可免费体验5次AI对话。"
                : "Thank you for trying! Each visitor gets 5 free AI conversations."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <h4 className="font-medium text-emerald-300">
                {isCn ? "🎓 青年科学家启航计划" : "🎓 Young Scientist Program"}
              </h4>
              <p className="mt-2 text-sm text-slate-400">
                {isCn
                  ? "申请学术配额，免费获得无限AI对话、菌株挖掘和研发助手权限。"
                  : "Apply for academic quota with unlimited AI conversations and more."}
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
