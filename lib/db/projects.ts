import { getAdminSupabase, getPublicSupabase } from "@/lib/supabase/server";
import { projects as fallbackProjects, Project } from "@/content/projects";

export type ProjectRecord = Project & {
  id: string;
  display_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type ProjectInput = Omit<Project, "slug"> & {
  slug?: string;
  display_order?: number;
  published?: boolean;
};

/** Map Supabase snake_case columns to the portfolio Project camelCase type. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRowToProject(row: any): ProjectRecord {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    titleFa: row.title_fa ?? row.titleFa ?? "",
    href: row.href ?? "",
    tags: Array.isArray(row.tags) ? row.tags : [],
    summary: row.summary ?? "",
    summaryFa: row.summary_fa ?? row.summaryFa ?? "",
    image: row.image ?? "",
    featured: Boolean(row.featured),
    accent: row.accent ?? "#38bdf8",
    stack: Array.isArray(row.stack) ? row.stack : [],
    body: row.body ?? "",
    bodyFa: row.body_fa ?? row.bodyFa ?? "",
    year: row.year ?? "2025",
    offline: Boolean(row.offline),
    display_order: Number(row.display_order ?? 0),
    published: row.published !== false,
    created_at: row.created_at ?? new Date().toISOString(),
    updated_at: row.updated_at ?? new Date().toISOString(),
  };
}

/** Get all published projects for the public site. Falls back to static file if DB empty. */
export async function getProjects(): Promise<ProjectRecord[]> {
  try {
    const supabase = getPublicSupabase() || getAdminSupabase();
    if (!supabase) {
      return getFallbackProjectRecords();
    }

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return getFallbackProjectRecords();
    }

    return data.map(mapRowToProject);
  } catch {
    return getFallbackProjectRecords();
  }
}

/** Get all projects (including drafts) for the admin dashboard. */
export async function getAllAdminProjects(): Promise<ProjectRecord[]> {
  try {
    const supabase = getAdminSupabase();
    if (!supabase) {
      return getFallbackProjectRecords();
    }

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return getFallbackProjectRecords();
    }

    return data.map(mapRowToProject);
  } catch {
    return getFallbackProjectRecords();
  }
}

/** Find a single published project by slug. */
export async function getProjectBySlug(slug: string): Promise<ProjectRecord | null> {
  try {
    const supabase = getPublicSupabase() || getAdminSupabase();
    if (!supabase) {
      return getFallbackProjectBySlug(slug);
    }

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return getFallbackProjectBySlug(slug);
    }

    return mapRowToProject(data);
  } catch {
    return getFallbackProjectBySlug(slug);
  }
}

/** Insert a new project. */
export async function insertProject(project: Partial<ProjectRecord>): Promise<{ data: ProjectRecord | null; error: string | null }> {
  const supabase = getAdminSupabase();
  if (!supabase) {
    return { data: null, error: "Database connection not configured." };
  }

  const row = {
    slug: project.slug,
    title: project.title,
    title_fa: project.titleFa,
    href: project.href ?? "",
    tags: project.tags ?? [],
    summary: project.summary ?? "",
    summary_fa: project.summaryFa ?? "",
    image: project.image,
    featured: Boolean(project.featured),
    accent: project.accent ?? "#38bdf8",
    stack: project.stack ?? [],
    body: project.body ?? "",
    body_fa: project.bodyFa ?? "",
    year: project.year ?? "2025",
    offline: Boolean(project.offline),
    display_order: project.display_order ?? 0,
    published: project.published !== false,
  };

  const { data, error } = await supabase
    .from("projects")
    .insert(row)
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: mapRowToProject(data), error: null };
}

/** Update an existing project by ID or slug. */
export async function updateProject(
  id: string,
  project: Partial<ProjectRecord>
): Promise<{ data: ProjectRecord | null; error: string | null }> {
  const supabase = getAdminSupabase();
  if (!supabase) {
    return { data: null, error: "Database connection not configured." };
  }

  const row: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (project.slug !== undefined) row.slug = project.slug;
  if (project.title !== undefined) row.title = project.title;
  if (project.titleFa !== undefined) row.title_fa = project.titleFa;
  if (project.href !== undefined) row.href = project.href;
  if (project.tags !== undefined) row.tags = project.tags;
  if (project.summary !== undefined) row.summary = project.summary;
  if (project.summaryFa !== undefined) row.summary_fa = project.summaryFa;
  if (project.image !== undefined) row.image = project.image;
  if (project.featured !== undefined) row.featured = project.featured;
  if (project.accent !== undefined) row.accent = project.accent;
  if (project.stack !== undefined) row.stack = project.stack;
  if (project.body !== undefined) row.body = project.body;
  if (project.bodyFa !== undefined) row.body_fa = project.bodyFa;
  if (project.year !== undefined) row.year = project.year;
  if (project.offline !== undefined) row.offline = project.offline;
  if (project.display_order !== undefined) row.display_order = project.display_order;
  if (project.published !== undefined) row.published = project.published;

  const { data, error } = await supabase
    .from("projects")
    .update(row)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: mapRowToProject(data), error: null };
}

/** Delete a project by ID. */
export async function deleteProject(id: string): Promise<{ error: string | null }> {
  const supabase = getAdminSupabase();
  if (!supabase) {
    return { error: "Database connection not configured." };
  }

  const { error } = await supabase.from("projects").delete().eq("id", id);
  return { error: error ? error.message : null };
}

/** Upload an image to the showcases storage bucket. */
export async function uploadImageToStorage(file: File): Promise<{ url: string | null; error: string | null }> {
  const supabase = getAdminSupabase();
  if (!supabase) {
    return { url: null, error: "Database connection not configured." };
  }

  const fileExt = file.name.split(".").pop() || "jpg";
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const filePath = `covers/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("showcases")
    .upload(filePath, file, {
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) {
    return { url: null, error: uploadError.message };
  }

  const { data: publicUrlData } = supabase.storage
    .from("showcases")
    .getPublicUrl(filePath);

  return { url: publicUrlData.publicUrl, error: null };
}

function getFallbackProjectRecords(): ProjectRecord[] {
  return fallbackProjects.map((p, idx) => ({
    ...p,
    id: `fallback-${p.slug}`,
    display_order: idx,
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
}

function getFallbackProjectBySlug(slug: string): ProjectRecord | null {
  const p = fallbackProjects.find((x) => x.slug === slug);
  if (!p) return null;
  return {
    ...p,
    id: `fallback-${p.slug}`,
    display_order: 0,
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}
