"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  checkIsAdmin,
  clearAdminSessionCookie,
  setAdminSessionCookie,
} from "@/lib/auth/session";
import {
  deleteProject,
  insertProject,
  ProjectRecord,
  updateProject,
} from "@/lib/db/projects";

export async function loginAction(
  prevState: { error: string | null } | null,
  formData: FormData
) {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD || "admin";

  if (!password || password !== adminPassword) {
    return { error: "Invalid admin password. Please try again." };
  }

  await setAdminSessionCookie();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSessionCookie();
  redirect("/admin/login");
}

export async function saveProjectAction(
  prevState: { error: string | null; success?: boolean } | null,
  formData: FormData
) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    return { error: "Unauthorized. Please log in." };
  }

  const id = (formData.get("id") as string) || "";
  const title = (formData.get("title") as string)?.trim() || "";
  const titleFa = (formData.get("titleFa") as string)?.trim() || "";
  const slug = (formData.get("slug") as string)?.trim().toLowerCase() || "";
  const href = (formData.get("href") as string)?.trim() || "";
  const summary = (formData.get("summary") as string)?.trim() || "";
  const summaryFa = (formData.get("summaryFa") as string)?.trim() || "";
  const body = (formData.get("body") as string)?.trim() || "";
  const bodyFa = (formData.get("bodyFa") as string)?.trim() || "";
  const image = (formData.get("image") as string)?.trim() || "";
  const accent = (formData.get("accent") as string)?.trim() || "#38bdf8";
  const year = (formData.get("year") as string)?.trim() || "2025";
  const tagsStr = (formData.get("tags") as string) || "";
  const stackStr = (formData.get("stack") as string) || "";
  const featured = formData.get("featured") === "on";
  const offline = formData.get("offline") === "on";
  const published = formData.get("published") === "on";
  const display_order = parseInt((formData.get("display_order") as string) || "0", 10);

  if (!title || !titleFa || !slug) {
    return { error: "Title, Persian title, and slug are required fields." };
  }

  if (!image) {
    return { error: "Cover image is required. Please upload or specify an image URL." };
  }

  const tags = tagsStr
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const stack = stackStr
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const projectPayload: Partial<ProjectRecord> = {
    title,
    titleFa,
    slug,
    href,
    summary,
    summaryFa,
    body,
    bodyFa,
    image,
    accent,
    year,
    tags,
    stack,
    featured,
    offline,
    published,
    display_order,
  };

  let res;
  if (id && !id.startsWith("fallback-")) {
    res = await updateProject(id, projectPayload);
  } else {
    res = await insertProject(projectPayload);
  }

  if (res.error) {
    return { error: res.error };
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/admin");

  redirect("/admin");
}

export async function deleteProjectAction(id: string) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  const { error } = await deleteProject(id);
  if (error) {
    throw new Error(error);
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");
}

export async function toggleFeaturedAction(id: string, currentFeatured: boolean) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) throw new Error("Unauthorized");

  await updateProject(id, { featured: !currentFeatured });
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");
}

export async function togglePublishedAction(id: string, currentPublished: boolean) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) throw new Error("Unauthorized");

  await updateProject(id, { published: !currentPublished });
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");
}
