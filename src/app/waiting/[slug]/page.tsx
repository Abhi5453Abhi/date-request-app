"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTheme, Theme } from "@/lib/themes";

interface PageData {
  id: string;
  slug: string;
  creatorName: string;
  partnerName: string;
  question: string;
  theme: string;
  responded: boolean;
  response: string | null;
}

export default function WaitingPage() {
  const params = useParams();
  const router = useRouter();
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [theme, setTheme] = useState<Theme | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/love/${params.slug}`
    : "";

  // Initial fetch
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

  // Polling for response
  useEffect(() => {
    if (!pageData || pageData.responded) return;

    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch(`/api/pages/${params.slug}`);
        if (res.ok) {
          const data = await res.json();
          if (data.responded) {
            clearInterval(pollInterval);
            router.push(`/love/${params.slug}/celebrate`);
          }
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    }, 3000); // Poll every 3 seconds

    return () => clearInterval(pollInterval);
  }, [pageData, params.slug, router]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
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
      className="min-h-screen flex items-center justify-center py-12 px-4"
      style={{ background: theme.colors.backgroundGradient }}
    >
      <div className="max-w-xl mx-auto text-center">
        {/* Animated heart */}
        <div className="text-6xl mb-8 animate-pulse-heart">💌</div>

        {/* Success card */}
        <div
          className="rounded-3xl p-8 shadow-2xl animate-fade-in-up"
          style={{
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.cardBorder,
            borderWidth: "2px",
          }}
        >
          <h1
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: theme.colors.primary }}
          >
            Your Page is Ready! 🎉
          </h1>

          <p
            className="text-lg mb-8"
            style={{ color: theme.colors.text }}
          >
            Share this link with {pageData.partnerName}
          </p>

          {/* Share URL box */}
          <div className="bg-white rounded-xl p-4 mb-6 shadow-inner">
            <p className="text-sm text-gray-500 mb-2">Share this link:</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 bg-gray-50 px-4 py-3 rounded-lg text-gray-700 text-sm outline-none"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-3 rounded-lg font-medium text-white transition-all"
                style={{ backgroundColor: theme.colors.primary }}
              >
                {copied ? "Copied! ✓" : "Copy"}
              </button>
            </div>
          </div>

          {/* Waiting status */}
          <div
            className="flex items-center justify-center gap-3 p-4 rounded-xl"
            style={{ backgroundColor: theme.colors.background }}
          >
            <div className="relative">
              <div
                className="w-3 h-3 rounded-full animate-ping absolute"
                style={{ backgroundColor: theme.colors.accent }}
              />
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: theme.colors.primary }}
              />
            </div>
            <p style={{ color: theme.colors.textMuted }}>
              Waiting for {pageData.partnerName}&apos;s response...
            </p>
          </div>
        </div>

        {/* Preview link */}
        <div className="mt-8">
          <a
            href={`/love/${pageData.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-shadow"
            style={{ backgroundColor: theme.colors.secondary }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Preview Page
          </a>
        </div>

        <p
          className="mt-8 text-sm"
          style={{ color: theme.colors.textMuted }}
        >
          This page will automatically update when they respond
        </p>
      </div>
    </main>
  );
}
