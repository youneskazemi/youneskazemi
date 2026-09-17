"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import { Section } from "@/components/Section";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/cn";

const SERVICE_OPTIONS = [
  { id: "custom", label: "Next.js / Web App", labelFa: "محصول اختصاصی (Next.js)" },
  { id: "pwa", label: "PWA & E-commerce", labelFa: "فروشگاه و PWA پیش‌رونده" },
  { id: "wordpress", label: "WordPress & Shop", labelFa: "سایت و فروشگاه وردپرس" },
  { id: "seo", label: "Technical SEO", labelFa: "سئو فنی و بهینه‌سازی سرعت" },
];

const TIMELINE_OPTIONS = [
  { id: "urgent", label: "< 2 weeks", labelFa: "فوری (زیر ۲ هفته)" },
  { id: "standard", label: "2–4 weeks", labelFa: "۲ تا ۴ هفته" },
  { id: "flexible", label: "Flexible", labelFa: "منعطف / فازبندی" },
];

export function Contact() {
  const { t, isFa } = useI18n();
  const reduce = useReducedMotion();

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [service, setService] = useState("custom");
  const [timeline, setTimeline] = useState("standard");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      setErrorMsg(isFa ? "لطفاً نام و راه ارتباطی خود را وارد کنید." : "Please enter your name and contact info.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contact,
          service,
          timeline,
          message,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit");
      }

      setStatus("success");
    } catch (err: any) {
      setErrorMsg(isFa ? "خطایی رخ داد، لطفاً از طریق تلگرام پیام دهید." : "Error sending inquiry. Please reach out via Telegram.");
      setStatus("error");
    }
  };

  return (
    <Section id="contact" title={t.contactTitle} subtitle={t.contactSubtitle}>
      <div className="space-y-6">
        {/* 1. Quick Project Brief Inquiry Form */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="surface-card relative overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/10"
        >
          <div
            className="pointer-events-none absolute -end-16 -top-16 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl"
            aria-hidden
          />

          <div className="relative mb-6">
            <h3 className="text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
              {isFa ? "شروع پروژه یا استعلام برآورد فازبندی" : "Start a project or request a phased estimate"}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {isFa
                ? "مشخصات کلی پروژه را بفرستید؛ بررسی می‌کنم و با پیشنهاد شفاف فازها و هزینه پاسخ می‌دهم."
                : "Share your product goals; I'll review and reply with a transparent phase-by-phase scope and timeline."}
            </p>
          </div>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center sm:p-8"
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-emerald-300">
                {isFa ? "درخواست شما با موفقیت ثبت شد!" : "Inquiry sent successfully!"}
              </h4>
              <p className="mt-2 text-sm text-zinc-300">
                {isFa
                  ? "به‌زودی بررسی می‌کنم و از طریق شماره یا تلگرامی که وارد کردید با شما در ارتباط خواهم بود."
                  : "I'll review your project details and get back to you shortly via your preferred contact method."}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={site.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  {isFa ? "ارتباط فوری در تلگرام" : "Fast-track on Telegram"} ↗
                </a>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="rounded-xl border border-white/15 px-4 py-2 text-xs font-medium text-zinc-300 hover:bg-white/5"
                >
                  {isFa ? "ارسال درخواست جدید" : "Send another"}
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="relative space-y-6">
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2.5">
                  {isFa ? "نوع پروژه مورد نظر:" : "Project Type:"}
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {SERVICE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setService(opt.id)}
                      className={cn(
                        "rounded-xl border px-3 py-2.5 text-xs font-medium transition text-start sm:text-center",
                        service === opt.id
                          ? "border-sky-400/50 bg-sky-500/15 text-sky-200 shadow-[0_0_12px_rgba(56,189,248,0.15)] ring-1 ring-sky-400/30"
                          : "border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/5",
                      )}
                    >
                      {isFa ? opt.labelFa : opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Contact inputs */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="inquiry-name" className="block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
                    {isFa ? "نام شما یا نام برند:" : "Your Name / Company:"}
                  </label>
                  <input
                    id="inquiry-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isFa ? "مثال: علی رضایی یا استارتاپ فردا" : "e.g. Alex or Acme Corp"}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-sky-400/60 focus:outline-none focus:ring-1 focus:ring-sky-400/40"
                  />
                </div>

                <div>
                  <label htmlFor="inquiry-contact" className="block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
                    {isFa ? "راه ارتباطی (تلگرام، شماره تماس یا ایمیل):" : "Contact (Telegram handle, Phone, or Email):"}
                  </label>
                  <input
                    id="inquiry-contact"
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={isFa ? "مثال: @telegram_id یا 0912..." : "e.g. @telegram or email@domain.com"}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-sky-400/60 focus:outline-none focus:ring-1 focus:ring-sky-400/40"
                  />
                </div>
              </div>

              {/* Timeline selection */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2.5">
                  {isFa ? "زمان‌بندی مطلوب تحویل:" : "Target Timeline:"}
                </label>
                <div className="flex flex-wrap gap-2">
                  {TIMELINE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setTimeline(opt.id)}
                      className={cn(
                        "rounded-xl border px-3.5 py-2 text-xs font-medium transition",
                        timeline === opt.id
                          ? "border-sky-400/50 bg-sky-500/15 text-sky-200 ring-1 ring-sky-400/30"
                          : "border-white/10 bg-white/[0.03] text-zinc-400 hover:bg-white/5 hover:text-zinc-200",
                      )}
                    >
                      {isFa ? opt.labelFa : opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message / Brief */}
              <div>
                <label htmlFor="inquiry-msg" className="block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
                  {isFa ? "خلاصه ایده یا نیازمندی‌های پروژه (اختیاری):" : "Project brief or goals (optional):"}
                </label>
                <textarea
                  id="inquiry-msg"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    isFa
                      ? "ویژگی‌های مدنظر، نمونه سایت‌هایی که دوست دارید یا فایل توضیحات..."
                      : "Key features, references you like, or specific requirements..."
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-sky-400/60 focus:outline-none focus:ring-1 focus:ring-sky-400/40 resize-none"
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-rose-400">{errorMsg}</p>
              )}

              {/* Submit CTA */}
              <div className="flex items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary min-h-[46px] px-6 text-sm font-semibold disabled:opacity-60"
                >
                  {status === "loading"
                    ? (isFa ? "در حال ارسال..." : "Sending...")
                    : (isFa ? "ارسال و ثبت مشخصات پروژه" : "Submit Project Brief")}
                </button>
                <p className="text-xs text-zinc-500 hidden sm:block">
                  {isFa ? "پاسخ طی ۱ تا ۲۴ ساعت کاری" : "Response within 1–24 business hours"}
                </p>
              </div>
            </form>
          )}
        </motion.div>

        {/* 2. Direct Channels: Telegram & Email Cards */}
        <motion.div
          className="grid gap-4 md:grid-cols-2 md:gap-5"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="group surface-card relative min-h-[10rem] overflow-hidden p-6 transition hover:border-sky-400/35 sm:p-7 rounded-2xl"
          >
            <div
              className="pointer-events-none absolute -end-8 -top-8 h-32 w-32 rounded-full bg-sky-400/10 blur-2xl transition group-hover:bg-sky-400/20"
              aria-hidden
            />
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Telegram Direct</p>
            <p className="mt-2.5 text-xl font-semibold tracking-tight text-zinc-50">
              {site.telegramHandle}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              {t.contactFormHint}
            </p>
            <span className="mt-4 inline-flex items-center text-xs font-semibold text-sky-300 transition group-hover:text-sky-200">
              {isFa ? "باز کردن چت تلگرام" : "Open chat"} ↗
            </span>
          </a>

          <a
            href={`mailto:${site.email}`}
            className="group surface-card relative min-h-[10rem] overflow-hidden p-6 transition hover:border-violet-400/35 sm:p-7 rounded-2xl"
          >
            <div
              className="pointer-events-none absolute -end-8 -top-8 h-32 w-32 rounded-full bg-violet-400/10 blur-2xl transition group-hover:bg-violet-400/18"
              aria-hidden
            />
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Email Official</p>
            <p className="mt-2.5 break-all text-xl font-semibold tracking-tight text-zinc-50">
              {site.email}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              {isFa
                ? "برای ارسال مستندات، فایل‌های فنی و RFP سازمانی."
                : "Best for RFP documents and technical attachments."}
            </p>
            <span className="mt-4 inline-flex items-center text-xs font-semibold text-violet-300 transition group-hover:text-violet-200">
              {isFa ? "ارسال ایمیل" : "Send email"} ↗
            </span>
          </a>
        </motion.div>

        <p className="text-center text-sm text-zinc-400 pt-2">
          {t.available}
        </p>
      </div>
    </Section>
  );
}
