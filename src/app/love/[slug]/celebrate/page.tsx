"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { getTheme, Theme } from "@/lib/themes";

interface PageData {
  id: string;
  slug: string;
  creatorName: string;
  partnerName: string;
  question: string;
  theme: string;
  responded: boolean;
}

export default function CelebratePage() {
  const params = useParams();
  const router = useRouter();
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [theme, setTheme] = useState<Theme | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`/api/pages/${params.slug}`);
        if (res.ok) {
          const data = await res.json();
          setPageData(data);
          setTheme(getTheme(data.theme));
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

  // Fire confetti on page load
  useEffect(() => {
    if (!loading && pageData) {
      // Initial burst
      const duration = 5000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Shoot confetti from both sides
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ["#ff6b6b", "#feca57", "#ff9ff3", "#54a0ff", "#5f27cd"],
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ["#ff6b6b", "#feca57", "#ff9ff3", "#54a0ff", "#5f27cd"],
        });
      }, 250);

      // Big center burst
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#ff6b6b", "#feca57", "#ff9ff3", "#54a0ff", "#5f27cd"],
      });

      return () => clearInterval(interval);
    }
  }, [loading, pageData]);

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
      <div className="max-w-2xl mx-auto text-center">
        {/* Big animated heart */}
        <div className="text-8xl mb-8 animate-pulse-heart">💖</div>

        {/* Success message */}
        <div
          className="rounded-3xl p-8 md:p-12 shadow-2xl animate-fade-in-up"
          style={{
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.cardBorder,
            borderWidth: "2px",
          }}
        >
          <h1
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{ color: theme.colors.primary }}
          >
            They Said YES!
          </h1>

          <p
            className="text-2xl md:text-3xl mb-6"
            style={{ color: theme.colors.text }}
          >
            {pageData.creatorName} & {pageData.partnerName}
          </p>

          <div
            className="text-xl"
            style={{ color: theme.colors.textMuted }}
          >
            It&apos;s a date! 🎉
          </div>
        </div>

        {/* Floating hearts */}
        <div className="mt-12 flex justify-center gap-4 text-4xl">
          <span className="animate-float" style={{ animationDelay: "0s" }}>💕</span>
          <span className="animate-float" style={{ animationDelay: "0.5s" }}>💖</span>
          <span className="animate-float" style={{ animationDelay: "1s" }}>💗</span>
          <span className="animate-float" style={{ animationDelay: "1.5s" }}>💝</span>
          <span className="animate-float" style={{ animationDelay: "2s" }}>💕</span>
        </div>

        <p
          className="mt-12 text-sm"
          style={{ color: theme.colors.textMuted }}
        >
          Made with love ❤️
        </p>
      </div>
    </main>
  );
}
