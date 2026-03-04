"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getTheme, Theme } from "@/lib/themes";
import DodgyNoButton from "@/components/DodgyNoButton";

interface Photo {
  id: string;
  url: string;
  caption: string;
  order: number;
}

interface PageData {
  id: string;
  slug: string;
  creatorName: string;
  partnerName: string;
  question: string;
  theme: string;
  responded: boolean;
  photos: Photo[];
}

export default function LovePage() {
  const params = useParams();
  const router = useRouter();
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [theme, setTheme] = useState<Theme | null>(null);
  const [loading, setLoading] = useState(true);
  const [visiblePhotos, setVisiblePhotos] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [responding, setResponding] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`/api/pages/${params.slug}`);
        if (res.ok) {
          const data = await res.json();
          setPageData(data);
          setTheme(getTheme(data.theme));

          // If already responded, go to celebration
          if (data.responded) {
            router.push(`/love/${params.slug}/celebrate`);
          }
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching page:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [params.slug, router]);

  // Animate photos appearing one by one
  useEffect(() => {
    if (!pageData || pageData.photos.length === 0) {
      setShowQuestion(true);
      return;
    }

    const interval = setInterval(() => {
      setVisiblePhotos((prev) => {
        if (prev >= pageData.photos.length) {
          clearInterval(interval);
          setTimeout(() => setShowQuestion(true), 500);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [pageData]);

  const handleYes = async () => {
    if (!pageData || responding) return;
    setResponding(true);

    try {
      const res = await fetch(`/api/respond/${pageData.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response: "yes" }),
      });

      if (res.ok) {
        router.push(`/love/${pageData.slug}/celebrate`);
      }
    } catch (error) {
      console.error("Error responding:", error);
    } finally {
      setResponding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100">
        <div className="text-rose-500 text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!pageData || !theme) {
    return null;
  }

  return (
    <main
      className="min-h-screen py-12 px-4"
      style={{ background: theme.colors.backgroundGradient }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1
            className="text-4xl md:text-5xl font-bold mb-2"
            style={{ color: theme.colors.primary }}
          >
            Hey {pageData.partnerName}!
          </h1>
          <p className="text-xl" style={{ color: theme.colors.textMuted }}>
            {pageData.creatorName} has something special for you
          </p>
        </div>

        {/* Photos */}
        {pageData.photos.length > 0 && (
          <div className="space-y-8 mb-12">
            {pageData.photos.slice(0, visiblePhotos).map((photo, index) => (
              <div
                key={photo.id}
                className="photo-card rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up"
                style={{
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.cardBorder,
                  borderWidth: "2px",
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={photo.url}
                    alt={`Memory ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <p
                    className="text-lg italic text-center"
                    style={{ color: theme.colors.text }}
                  >
                    &ldquo;{photo.caption}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* The Big Question */}
        {showQuestion && (
          <div className="text-center animate-fade-in-up">
            <div
              className="rounded-3xl p-8 md:p-12 shadow-2xl"
              style={{
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.cardBorder,
                borderWidth: "2px",
              }}
            >
              <div className="text-5xl mb-6 animate-pulse-heart">💕</div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-8"
                style={{ color: theme.colors.primary }}
              >
                {pageData.question}
              </h2>

              {/* Buttons container */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative min-h-[80px]">
                <button
                  onClick={handleYes}
                  disabled={responding}
                  className="px-10 py-4 rounded-full text-xl font-bold text-white shadow-lg btn-primary disabled:opacity-50"
                  style={{
                    backgroundColor: theme.colors.primary,
                  }}
                >
                  {responding ? "..." : "Yes! 💝"}
                </button>

                <DodgyNoButton colors={theme.colors} />
              </div>
            </div>

            <p
              className="mt-8 text-sm"
              style={{ color: theme.colors.textMuted }}
            >
              With love from {pageData.creatorName}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
