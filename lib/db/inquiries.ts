import { getAdminSupabase, getPublicSupabase } from "@/lib/supabase/server";

export type InquiryRecord = {
  id: string;
  name: string;
  contact: string;
  service: string | null;
  timeline: string | null;
  message: string | null;
  created_at: string;
};

/**
 * Fetch all client inquiries for the admin dashboard.
 */
export async function getInquiries(): Promise<InquiryRecord[]> {
  try {
    const supabase = getAdminSupabase() || getPublicSupabase();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.error("Failed to fetch inquiries:", error?.message);
      return [];
    }

    return data as InquiryRecord[];
  } catch (err) {
    console.error("Error in getInquiries:", err);
    return [];
  }
}

/**
 * Delete an inquiry by ID.
 */
export async function deleteInquiry(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = getAdminSupabase() || getPublicSupabase();
    if (!supabase) return { success: false, error: "Database not configured" };

    const { error } = await supabase.from("inquiries").delete().eq("id", id);
    if (error) return { success: false, error: error.message };

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to delete" };
  }
}
