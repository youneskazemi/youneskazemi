import { NextRequest, NextResponse } from "next/server";
import { checkIsAdmin } from "@/lib/auth/session";
import { uploadImageToStorage } from "@/lib/db/projects";

export async function POST(request: NextRequest) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed (PNG, JPG, WebP, SVG)" },
        { status: 400 }
      );
    }

    const { url, error } = await uploadImageToStorage(file);
    if (error || !url) {
      return NextResponse.json(
        { error: error || "Failed to upload image" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Upload error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
