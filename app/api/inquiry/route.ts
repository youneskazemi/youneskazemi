import { NextResponse } from "next/server";
import { getAdminSupabase, getPublicSupabase } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, contact, service, timeline, message } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!contact || typeof contact !== "string" || !contact.trim()) {
      return NextResponse.json({ error: "Contact is required" }, { status: 400 });
    }

    const supabase = getAdminSupabase() || getPublicSupabase();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    const { data, error } = await supabase.from("inquiries").insert({
      name: name.trim().slice(0, 100),
      contact: contact.trim().slice(0, 150),
      service: typeof service === "string" ? service.slice(0, 100) : null,
      timeline: typeof timeline === "string" ? timeline.slice(0, 50) : null,
      message: typeof message === "string" ? message.trim().slice(0, 2000) : null,
    }).select().single();

    if (error) {
      console.error("Error saving inquiry:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err: any) {
    console.error("Inquiry error:", err);
    return NextResponse.json({ error: err?.message || "Internal server error" }, { status: 500 });
  }
}
