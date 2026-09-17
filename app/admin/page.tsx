import Link from "next/link";
import Image from "next/image";
import { getAllAdminProjects } from "@/lib/db/projects";
import {
  deleteProjectAction,
  toggleFeaturedAction,
  togglePublishedAction,
} from "./actions";

export const revalidate = 0; // Always fresh in admin

export default async function AdminDashboardPage() {
  const projects = await getAllAdminProjects();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Showcase Projects
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Manage your portfolio case studies, reorder items, and publish live client work.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-xs font-semibold text-zinc-950 transition hover:bg-sky-400 shadow-lg shadow-sky-500/20"
        >
          <span className="text-base leading-none">+</span>
          <span>Add New Showcase</span>
        </Link>
      </div>

      {/* Projects Table / List */}
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
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between transition hover:bg-white/[0.02]"
              >
                {/* Left: Thumbnail & Titles */}
                <div className="flex items-center gap-4 min-w-0">
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
    </div>
  );
}
