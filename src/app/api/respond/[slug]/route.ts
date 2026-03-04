import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { pages } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { response } = body;

    if (response !== "yes") {
      return NextResponse.json({ error: "Invalid response" }, { status: 400 });
    }

    // Update the page
    const [updated] = await db
      .update(pages)
      .set({
        responded: true,
        response: "yes",
      })
      .where(eq(pages.slug, slug))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating response:", error);
    return NextResponse.json({ error: "Failed to update response" }, { status: 500 });
  }
}
