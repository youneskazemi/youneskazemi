import Link from "next/link";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
            <Link href="/admin" className="hover:text-zinc-300">
              Showcases
            </Link>
            <span>/</span>
            <span className="text-zinc-300">New</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Add New Showcase
          </h1>
        </div>
      </div>

      <ProjectForm />
    </div>
  );
}
