"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { saveProjectAction } from "@/app/admin/actions";
import { ProjectRecord } from "@/lib/db/projects";

type Props = {
  initialData?: Partial<ProjectRecord>;
};

const ACCENT_PRESETS = [
  { name: "Sky", color: "#38bdf8" },
  { name: "Emerald", color: "#10b981" },
  { name: "Purple", color: "#a78bfa" },
  { name: "Amber", color: "#f59e0b" },
  { name: "Gold", color: "#d4a574" },
  { name: "Rose", color: "#fb7185" },
];

export function ProjectForm({ initialData }: Props) {
  const [state, formAction, isPending] = useActionState(saveProjectAction, null);

  const [imageUrl, setImageUrl] = useState(initialData?.image || "");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [accent, setAccent] = useState(initialData?.accent || "#38bdf8");

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setUploadError(data.error || "Failed to upload image");
      } else {
        setImageUrl(data.url);
      }
    } catch {
      setUploadError("Network error while uploading image");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form action={formAction} className="space-y-8">
      {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}
      <input type="hidden" name="image" value={imageUrl} />

      {state?.error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {state.error}
        </div>
      )}

      {/* Media Upload & Preview */}
      <div className="rounded-2xl border border-white/10 bg-[#0c0c12] p-6">
        <h2 className="text-sm font-semibold text-white mb-1">Project Cover Image</h2>
        <p className="text-xs text-zinc-400 mb-4">
          Upload a high-resolution screenshot. It will be stored in your Supabase storage CDN.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div>
            <label className="block rounded-xl border-2 border-dashed border-white/15 bg-white/[0.02] p-6 text-center cursor-pointer transition hover:border-sky-500/50 hover:bg-white/[0.04]">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
              <span className="block text-2xl mb-1">🖼️</span>
              <span className="block text-xs font-semibold text-white">
                {isUploading ? "Uploading to CDN..." : "Choose screenshot or drag & drop"}
              </span>
              <span className="block text-[11px] text-zinc-500 mt-1">
                PNG, JPG, WebP up to 10MB
              </span>
            </label>

            {uploadError && (
              <p className="mt-2 text-xs text-red-400">{uploadError}</p>
            )}

            <div className="mt-4">
              <label className="block text-xs text-zinc-400 mb-1">Or direct Image URL</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="/projects/covers/sample.jpg or https://..."
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder-zinc-600 outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Live Preview */}
          <div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Cover preview"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-zinc-600">
                  Preview will appear here
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bilingual Content: Side-by-side or stacked */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* English Section (LTR) */}
        <div className="rounded-2xl border border-white/10 bg-[#0c0c12] p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-sm font-semibold text-white">English Content</h3>
            <span className="text-[11px] font-mono text-zinc-500">LTR</span>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              name="title"
              defaultValue={initialData?.title || ""}
              required
              placeholder="e.g. Latorin"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              URL Slug <span className="text-red-400">*</span>
            </label>
            <input
              name="slug"
              defaultValue={initialData?.slug || ""}
              required
              placeholder="e.g. latorin"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-mono text-white placeholder-zinc-600 outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Summary (Card brief)
            </label>
            <textarea
              name="summary"
              rows={3}
              defaultValue={initialData?.summary || ""}
              placeholder="Brief description for showcase cards..."
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Case Study Body
            </label>
            <textarea
              name="body"
              rows={5}
              defaultValue={initialData?.body || ""}
              placeholder="Full case study explanation..."
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Persian Section (RTL) */}
        <div className="rounded-2xl border border-white/10 bg-[#0c0c12] p-6 space-y-4 font-vazirmatn">
          <div className="flex items-center justify-between pb-3 border-b border-white/10" dir="rtl">
            <h3 className="text-sm font-semibold text-white">محتوای فارسی</h3>
            <span className="text-[11px] font-mono text-zinc-500">RTL</span>
          </div>

          <div dir="rtl">
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              عنوان فارسی <span className="text-red-400">*</span>
            </label>
            <input
              name="titleFa"
              defaultValue={initialData?.titleFa || ""}
              required
              placeholder="مثال: لاتورین"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-sky-500"
            />
          </div>

          <div dir="rtl">
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              خلاصه فارسی (کارت پروژه)
            </label>
            <textarea
              name="summaryFa"
              rows={3}
              defaultValue={initialData?.summaryFa || ""}
              placeholder="توضیح کوتاه برای کارت پروژه..."
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-sky-500"
            />
          </div>

          <div dir="rtl">
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              متن کامل مطالعه موردی (Body)
            </label>
            <textarea
              name="bodyFa"
              rows={5}
              defaultValue={initialData?.bodyFa || ""}
              placeholder="توضیحات جامع درباره محصول، چالش‌ها و پیاده‌سازی..."
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-sky-500"
            />
          </div>
        </div>
      </div>

      {/* Metadata & Settings */}
      <div className="rounded-2xl border border-white/10 bg-[#0c0c12] p-6 space-y-6">
        <h3 className="text-sm font-semibold text-white pb-3 border-b border-white/10">
          Metadata & Display Settings
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Live Website URL
            </label>
            <input
              name="href"
              defaultValue={initialData?.href || ""}
              placeholder="https://example.com"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-mono text-white placeholder-zinc-600 outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Year</label>
            <input
              name="year"
              defaultValue={initialData?.year || "2025"}
              placeholder="2025"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs text-white placeholder-zinc-600 outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Display Order
            </label>
            <input
              name="display_order"
              type="number"
              defaultValue={initialData?.display_order ?? 0}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs text-white placeholder-zinc-600 outline-none focus:border-sky-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Tags (comma-separated)
            </label>
            <input
              name="tags"
              defaultValue={initialData?.tags?.join(", ") || ""}
              placeholder="Custom, Next.js, EdTech"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs text-white placeholder-zinc-600 outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Tech Stack (comma-separated)
            </label>
            <input
              name="stack"
              defaultValue={initialData?.stack?.join(", ") || ""}
              placeholder="Next.js, React, AI, API, Tailwind"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs text-white placeholder-zinc-600 outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Accent Color Picker */}
        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-2">
            Card Accent Color
          </label>
          <div className="flex flex-wrap items-center gap-3">
            {ACCENT_PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => setAccent(preset.color)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs transition ${
                  accent === preset.color
                    ? "border-white/40 bg-white/10 text-white"
                    : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                }`}
              >
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: preset.color }}
                />
                <span>{preset.name}</span>
              </button>
            ))}

            <div className="flex items-center gap-2 border-l border-white/10 pl-3">
              <input
                type="color"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
                className="h-7 w-7 rounded cursor-pointer border-0 bg-transparent"
              />
              <input
                name="accent"
                type="text"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
                className="w-24 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs font-mono text-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="flex flex-wrap gap-6 pt-2 border-t border-white/5">
          <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={initialData?.featured ?? true}
              className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-sky-500 focus:ring-0"
            />
            <span>Featured Showcase (Display on Home page)</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              name="published"
              defaultChecked={initialData?.published ?? true}
              className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-0"
            />
            <span>Published (Visible publicly)</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              name="offline"
              defaultChecked={initialData?.offline ?? false}
              className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-amber-500 focus:ring-0"
            />
            <span>Domain Offline (Keeps case study, hides outbound button)</span>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4">
        <Link
          href="/admin"
          className="rounded-xl border border-white/10 px-5 py-2.5 text-xs font-medium text-zinc-400 transition hover:bg-white/5 hover:text-white"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending || isUploading}
          className="rounded-xl bg-sky-500 px-6 py-2.5 text-xs font-semibold text-zinc-950 transition hover:bg-sky-400 disabled:opacity-50 shadow-lg shadow-sky-500/20"
        >
          {isPending ? "Saving showcase..." : initialData?.id ? "Update Showcase" : "Publish Showcase"}
        </button>
      </div>
    </form>
  );
}
