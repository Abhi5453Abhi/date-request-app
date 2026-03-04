"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ThemeSelector from "@/components/ThemeSelector";
import PhotoUpload from "@/components/PhotoUpload";

export default function CreatePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Form state
  const [creatorName, setCreatorName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [question, setQuestion] = useState("Will you go on a date with me?");
  const [theme, setTheme] = useState("romantic-rose");
  const [photos, setPhotos] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First, upload photos if any
      const photoUrls: string[] = [];

      for (const photo of photos) {
        const formData = new FormData();
        formData.append("file", photo);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (uploadRes.ok) {
          const { url } = await uploadRes.json();
          photoUrls.push(url);
        }
      }

      // Create the page
      const res = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creatorName,
          partnerName,
          question,
          theme,
          photoUrls,
        }),
      });

      if (res.ok) {
        const { slug } = await res.json();
        router.push(`/waiting/${slug}`);
      } else {
        throw new Error("Failed to create page");
      }
    } catch (error) {
      console.error("Error creating page:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-100 to-pink-200 py-12 px-4">
      <div className="max-w-xl mx-auto">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-2 text-rose-500 hover:text-rose-600 mb-8">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-3 h-3 rounded-full transition-colors ${
                s === step ? "bg-rose-500" : s < step ? "bg-rose-300" : "bg-rose-200"
              }`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Names and Question */}
          {step === 1 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl animate-fade-in-up">
              <h2 className="text-2xl font-bold text-rose-600 mb-6">Tell us about you two</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Their Name</label>
                  <input
                    type="text"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    placeholder="Enter their name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Question</label>
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Will you go on a date with me?"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Customize the question or leave as default
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!creatorName || !partnerName}
                className="w-full mt-8 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next: Choose Theme
              </button>
            </div>
          )}

          {/* Step 2: Theme Selection */}
          {step === 2 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl animate-fade-in-up">
              <h2 className="text-2xl font-bold text-rose-600 mb-6">Choose a Theme</h2>

              <ThemeSelector selectedTheme={theme} onSelect={setTheme} />

              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 rounded-xl border-2 border-rose-300 text-rose-500 font-bold hover:bg-rose-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg btn-primary"
                >
                  Next: Add Photos
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Photo Upload */}
          {step === 3 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl animate-fade-in-up">
              <h2 className="text-2xl font-bold text-rose-600 mb-6">Add Photos (Optional)</h2>

              <PhotoUpload photos={photos} onPhotosChange={setPhotos} maxPhotos={4} />

              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 py-4 rounded-xl border-2 border-rose-300 text-rose-500 font-bold hover:bg-rose-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg btn-primary disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Creating...
                    </span>
                  ) : (
                    "Create My Page 💝"
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
