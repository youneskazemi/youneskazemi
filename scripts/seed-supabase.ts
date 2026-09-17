import { createClient } from "@supabase/supabase-js";
import { projects, recentSlugs } from "../content/projects";

// Read from process.env or fallback to hardcoded if run via tsx
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://nehoacloapbgqgfxjzij.supabase.co";
const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5laG9hY2xvYXBiZ3FnZnhqemlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4OTYxMDgyMywiZXhwIjoyMTA1MTg2ODIzfQ.Ze6zPjm3qGewcP3zsytM3H5S10YABoLTXXFPW94GKl4";

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function seed() {
  console.log("Seeding Supabase projects table...");

  const slugOrderMap = new Map<string, number>();
  recentSlugs.forEach((slug, idx) => {
    slugOrderMap.set(slug, idx);
  });

  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    const displayOrder = slugOrderMap.has(p.slug)
      ? slugOrderMap.get(p.slug)!
      : 100 + i;

    const row = {
      slug: p.slug,
      title: p.title,
      title_fa: p.titleFa,
      href: p.href,
      tags: p.tags,
      summary: p.summary,
      summary_fa: p.summaryFa,
      image: p.image,
      featured: p.featured,
      accent: p.accent,
      stack: p.stack,
      body: p.body,
      body_fa: p.bodyFa,
      year: p.year ?? "2025",
      offline: Boolean(p.offline),
      display_order: displayOrder,
      published: true,
    };

    const { error } = await supabase
      .from("projects")
      .upsert(row, { onConflict: "slug" });

    if (error) {
      console.error(`Failed to seed ${p.slug}:`, error.message);
    } else {
      console.log(`Seeded: ${p.title} (${p.slug})`);
    }
  }

  console.log("Done seeding!");
}

seed().catch(console.error);
