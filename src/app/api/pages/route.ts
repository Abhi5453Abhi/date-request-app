import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { pages, photos } from "@/db/schema";
import { generateSlug } from "@/lib/utils";
import { generateCaptions } from "@/lib/captions";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { creatorName, partnerName, question, theme, photoUrls } = body;

    // Validate required fields
    if (!creatorName || !partnerName) {
      return NextResponse.json({ error: "Names are required" }, { status: 400 });
    }

    // Generate unique slug
    const slug = generateSlug();

    // Create the page
    const [page] = await db
      .insert(pages)
      .values({
        slug,
        creatorName,
        partnerName,
        question: question || "Will you go on a date with me?",
        theme: theme || "romantic-rose",
      })
      .returning();

    // Generate captions and create photo records
    if (photoUrls && photoUrls.length > 0) {
      const captions = generateCaptions(theme || "romantic-rose", photoUrls.length);

      const photoRecords = photoUrls.map((url: string, index: number) => ({
        pageId: page.id,
        url,
        caption: captions[index],
        order: index + 1,
      }));

      await db.insert(photos).values(photoRecords);
    }

    return NextResponse.json({ slug, id: page.id });
  } catch (error) {
    console.error("Error creating page:", error);
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 });
  }
}
