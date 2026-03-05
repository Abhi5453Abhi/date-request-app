import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { pages, photos } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Get the page
    const page = await db.query.pages.findFirst({
      where: eq(pages.slug, slug),
    });

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    // Get photos
    const pagePhotos = await db.query.photos.findMany({
      where: eq(photos.pageId, page.id),
      orderBy: (photos, { asc }) => [asc(photos.order)],
    });

    // Convert private blob URLs to proxy URLs
    const photosWithProxyUrls = pagePhotos.map((photo) => {
      // Extract the blob path and create a proxy URL
      const blobPath = encodeURIComponent(photo.url);
      return { ...photo, url: `/api/image?url=${blobPath}` };
    });

    return NextResponse.json({
      ...page,
      photos: photosWithProxyUrls,
    });
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json({ error: "Failed to fetch page" }, { status: 500 });
  }
}
