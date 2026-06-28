"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ExternalLink,
  Loader2,
  Mail,
  Building2,
  ArrowLeft,
  ShieldAlert,
} from "lucide-react";
import type { BrandConfig } from "@/lib/brand";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brand: BrandConfig;
}

export function LoginModal({ open, onOpenChange, brand }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNotRegistered, setShowNotRegistered] = useState(false);
  const [error, setError] = useState("");

  const isCn = brand.brand === "cn";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.notRegistered) {
        setShowNotRegistered(true);
      } else if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        setError(isCn ? "账号或密码错误" : "Invalid email or password");
      }
    } catch {
      setError(isCn ? "网络错误，请稍后重试" : "Network error, please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setShowNotRegistered(false);
    setPassword("");
  };

  const titleText = isCn ? "登录控制台" : "Sign in to Console";
  const descText = isCn
    ? "登录后将跳转至您的专属工作空间"
    : "You will be redirected to your dedicated workspace";
  const emailText = isCn ? "邮箱" : "Email";
  const passwordText = isCn ? "密码" : "Password";
  const submitText = isCn ? "登录" : "Sign In";
  const hintText = isCn
    ? "官网仅作为登录入口，业务系统独立部署"
    : "This site is a login entry only. Business logic runs on dedicated systems.";

  const notRegisteredTitle = isCn ? "账号尚未注册" : "Account Not Registered";
  const notRegisteredDesc = isCn
    ? "您输入的邮箱暂未在桐光智能平台注册"
    : "The email you entered is not yet registered on our platform";
  const notRegisteredMain = isCn
    ? "请联系公司商务人员开通账号"
    : "Please contact our business team to create an account";
  const contactEmail = isCn ? "contact@tongguangai.cn" : "contact@arboray.tech";
  const contactLabel = isCn ? "商务合作邮箱" : "Business Email";
  const backText = isCn ? "返回登录" : "Back to Login";
  const wechatTip = isCn
    ? "您也可以添加企业微信咨询详情"
    : "You can also add our WeChat for more details";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{titleText}</DialogTitle>
          <DialogDescription>{descText}</DialogDescription>
        </DialogHeader>

        {showNotRegistered ? (
          <div className="py-2">
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="relative mb-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10">
                  <ShieldAlert className="h-8 w-8 text-amber-400" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-zinc-100">
                {notRegisteredTitle}
              </h3>
              <p className="mt-2 text-sm text-slate-400">{notRegisteredDesc}</p>
            </div>

            <div className="space-y-3 rounded-sm border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-center text-sm font-medium text-zinc-200">
                {notRegisteredMain}
              </p>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 rounded-sm border border-slate-700/50 bg-slate-800/40 p-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-sm bg-emerald-500/10">
                    <Mail className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-500">{contactLabel}</p>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors break-all"
                    >
                      {contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-sm border border-slate-700/50 bg-slate-800/40 p-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-sm bg-sky-500/10">
                    <Building2 className="h-4 w-4 text-sky-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-500">
                      {isCn ? "公司地址" : "Company Address"}
                    </p>
                    <p className="text-sm font-medium text-zinc-200">
                      {isCn ? "苏州 · 中国" : "Suzhou · China"}
                    </p>
                  </div>
                </div>
              </div>

              <p className="pt-2 text-center text-[11px] text-slate-500">
                {wechatTip}
              </p>
            </div>

            <Button
              variant="outline"
              className="mt-5 w-full border-slate-700 bg-slate-900 text-zinc-200 hover:bg-slate-800 hover:text-zinc-100"
              onClick={handleBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {backText}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{emailText}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{passwordText}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isCn ? "登录中..." : "Signing in..."}
                </>
              ) : (
                submitText
              )}
            </Button>
          </form>
        )}

        <div className="flex items-center gap-2 border-t border-slate-800 pt-4">
          <ExternalLink className="h-3 w-3 flex-shrink-0 text-slate-600" />
          <p className="text-[11px] text-slate-600">{hintText}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
