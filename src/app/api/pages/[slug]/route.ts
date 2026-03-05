import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { pages, photos } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getDownloadUrl } from "@vercel/blob";

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

    // Generate signed URLs for private blobs
    const photosWithSignedUrls = await Promise.all(
      pagePhotos.map(async (photo) => {
        const signedUrl = await getDownloadUrl(photo.url, {
          token: process.env.DATE_BLOB_READ_WRITE_TOKEN,
        });
        return { ...photo, url: signedUrl };
      })
    );

    return NextResponse.json({
      ...page,
      photos: photosWithSignedUrls,
    });
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json({ error: "Failed to fetch page" }, { status: 500 });
  }
}
