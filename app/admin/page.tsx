import Link from "next/link";
import Image from "next/image";
import { getAllAdminProjects } from "@/lib/db/projects";
import { getInquiries } from "@/lib/db/inquiries";
import {
  deleteProjectAction,
  reorderProjectAction,
  toggleFeaturedAction,
  togglePublishedAction,
  deleteInquiryAction,
} from "./actions";

export const dynamic = "force-dynamic";
export const revalidate = 0; // Always fresh in admin

function getContactHref(contact: string) {
  const clean = contact.trim();
  if (clean.startsWith("@")) {
    return `https://t.me/${clean.slice(1)}`;
  }
  if (clean.startsWith("t.me/")) {
    return `https://${clean}`;
  }
  if (clean.includes("@")) {
    return `mailto:${clean}`;
  }
  const digits = clean.replace(/\D/g, "");
  if (digits.length >= 10) {
    return `tel:${clean}`;
  }
  return null;
}

function formatDate(isoString: string) {
  try {
    const d = new Date(isoString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  } catch {
    return isoString;
  }
}

export default async function AdminDashboardPage(props: {
  searchParams?: Promise<{ tab?: string }>;
}) {
  const [projects, inquiries] = await Promise.all([
    getAllAdminProjects(),
    getInquiries(),
  ]);

  const searchParams = props.searchParams ? await props.searchParams : {};
  const activeTab = searchParams.tab === "inquiries" ? "inquiries" : "projects";

  const liveProjectsCount = projects.filter((p) => p.published).length;
  const featuredProjectsCount = projects.filter((p) => p.featured).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Admin Studio
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Manage showcase case studies, reorder priority, and review incoming consultation briefs.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-xs font-semibold text-zinc-950 transition hover:bg-sky-400 shadow-lg shadow-sky-500/20 cursor-pointer"
          >
            <span className="text-base leading-none">+</span>
            <span>Add New Showcase</span>
          </Link>
        </div>
      </div>

      {/* Stats row & Tab Switcher */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Segmented Tabs */}
        <div className="inline-flex items-center rounded-xl bg-[#0c0c14] p-1 border border-white/10">
          <Link
            href="/admin?tab=projects"
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition ${
              activeTab === "projects"
                ? "bg-white/10 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <span>📁 Showcases</span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-mono text-zinc-300">
              {projects.length}
            </span>
          </Link>
          <Link
            href="/admin?tab=inquiries"
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition ${
              activeTab === "inquiries"
                ? "bg-sky-500/20 text-sky-300 border border-sky-500/30 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <span>📬 Client Inquiries</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-bold ${
                inquiries.length > 0
                  ? "bg-sky-500 text-zinc-950"
                  : "bg-white/10 text-zinc-400"
              }`}
            >
              {inquiries.length}
            </span>
          </Link>
        </div>

        {/* Quick status summary */}
        <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {liveProjectsCount} Live
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            {featuredProjectsCount} Featured
          </span>
        </div>
      </div>

      {activeTab === "inquiries" ? (
        /* Inquiries Inbox Tab */
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c12]">
          {inquiries.length === 0 ? (
            <div className="p-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl">
                📬
              </div>
              <h3 className="mt-4 text-sm font-semibold text-white">
                No inquiries yet
              </h3>
              <p className="mt-1 text-xs text-zinc-400 max-w-sm mx-auto">
                When visitors submit the consultation brief on the portfolio contact section, their contact handle, service needs, and project brief will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {inquiries.map((inq) => {
                const contactHref = getContactHref(inq.contact);
                return (
                  <div
                    key={inq.id}
                    className="p-5 transition hover:bg-white/[0.02] flex flex-col gap-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-white text-sm">
                          {inq.name}
                        </span>
                        {inq.service && (
                          <span className="rounded-md border border-sky-500/20 bg-sky-500/10 px-2 py-0.5 text-[11px] font-mono text-sky-400">
                            {inq.service}
                          </span>
                        )}
                        {inq.timeline && (
                          <span className="rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[11px] text-amber-300">
                            ⏱ {inq.timeline}
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-[11px] text-zinc-500">
                        {formatDate(inq.created_at)}
                      </span>
                    </div>

                    {/* Contact handle + Actions */}
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300">
                        <span className="text-zinc-500 font-mono">Contact:</span>
                        <span className="font-medium text-white select-all">
                          {inq.contact}
                        </span>
                      </div>

                      {contactHref && (
                        <a
                          href={contactHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-1.5 text-xs font-semibold text-sky-300 hover:bg-sky-500/20 transition"
                        >
                          <span>Connect</span>
                          <span>↗</span>
                        </a>
                      )}

                      <form
                        action={deleteInquiryAction.bind(null, inq.id)}
                        className="mr-auto sm:mr-0 sm:ml-auto"
                      >
                        <button
                          type="submit"
                          title="Delete inquiry"
                          className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/20 cursor-pointer"
                        >
                          Delete
                        </button>
                      </form>
                    </div>

                    {/* Message body */}
                    {inq.message && (
                      <div
                        className="rounded-xl border border-white/5 bg-[#12121c] p-3 text-xs leading-relaxed text-zinc-300 font-vazirmatn"
                        dir="rtl"
                      >
                        {inq.message}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Projects Table / List */
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c12]">
          {projects.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-sm text-zinc-400">No showcases found.</p>
              <Link
                href="/admin/projects/new"
                className="mt-4 inline-block text-xs font-medium text-sky-400 underline underline-offset-4"
              >
                Create your first showcase
              </Link>
            </div>
          ) : (
          <div className="divide-y divide-white/5">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between transition hover:bg-white/[0.02]"
              >
                {/* Left: Reordering + Thumbnail & Titles */}
                <div className="flex items-center gap-4 min-w-0">
                  {/* Reorder Up/Down arrows */}
                  <div className="flex flex-col items-center gap-0.5 shrink-0">
                    <form action={reorderProjectAction.bind(null, project.id, "up")}>
                      <button
                        type="submit"
                        disabled={idx === 0}
                        title="Move showcase up"
                        className="flex h-5 w-5 items-center justify-center rounded border border-white/10 bg-white/5 text-[9px] text-zinc-400 hover:bg-white/15 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition"
                      >
                        ▲
                      </button>
                    </form>
                    <span className="font-mono text-[10px] text-zinc-500 font-bold leading-none py-0.5">
                      #{idx + 1}
                    </span>
                    <form action={reorderProjectAction.bind(null, project.id, "down")}>
                      <button
                        type="submit"
                        disabled={idx === projects.length - 1}
                        title="Move showcase down"
                        className="flex h-5 w-5 items-center justify-center rounded border border-white/10 bg-white/5 text-[9px] text-zinc-400 hover:bg-white/15 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition"
                      >
                        ▼
                      </button>
                    </form>
                  </div>

                  <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-white/10 bg-zinc-900">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-zinc-600">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-semibold text-white truncate">
                        {project.title}
                      </h2>
                      <span className="text-xs text-zinc-500">·</span>
                      <span className="text-xs text-zinc-400 font-vazirmatn" dir="rtl">
                        {project.titleFa}
                      </span>
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                      <span className="font-mono text-[11px] text-zinc-400">
                        /{project.slug}
                      </span>
                      <span>·</span>
                      <span>{project.year || "2025"}</span>
                      {project.gallery && project.gallery.length > 0 && (
                        <>
                          <span>·</span>
                          <span className="rounded bg-sky-500/10 px-1.5 py-0.2 text-[10px] font-mono text-sky-400 border border-sky-500/20">
                            📸 {project.gallery.length} screens
                          </span>
                        </>
                      )}
                      {project.tags.length > 0 && (
                        <>
                          <span>·</span>
                          <span className="truncate max-w-[200px]">
                            {project.tags.join(", ")}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Badges & Controls */}
                <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
                  {/* Featured toggle */}
                  <form
                    action={toggleFeaturedAction.bind(
                      null,
                      project.id,
                      project.featured
                    )}
                  >
                    <button
                      type="submit"
                      title="Click to toggle featured on Home"
                      className={`rounded-md border px-2.5 py-1 text-[11px] font-medium transition ${
                        project.featured
                          ? "border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
                          : "border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {project.featured ? "★ Featured" : "☆ Standard"}
                    </button>
                  </form>

                  {/* Published toggle */}
                  <form
                    action={togglePublishedAction.bind(
                      null,
                      project.id,
                      project.published
                    )}
                  >
                    <button
                      type="submit"
                      title="Click to toggle publish status"
                      className={`rounded-md border px-2.5 py-1 text-[11px] font-medium transition ${
                        project.published
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                          : "border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {project.published ? "● Live" : "○ Draft"}
                    </button>
                  </form>

                  {/* View Live Case Study */}
                  <Link
                    href={`/projects/${project.slug}`}
                    target="_blank"
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-white/10 hover:text-white"
                    title="View public case study"
                  >
                    View ↗
                  </Link>

                  {/* Edit button */}
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white"
                  >
                    Edit
                  </Link>

                  {/* Delete button */}
                  <form
                    action={async () => {
                      "use server";
                      await deleteProjectAction(project.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/20"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      )}
    </div>
  );
}
