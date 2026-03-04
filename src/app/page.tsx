import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-100 to-pink-200 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Floating hearts decoration */}
        <div className="relative mb-8">
          <span className="text-6xl animate-float inline-block">💕</span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-rose-600 mb-4 animate-fade-in-up">
          Ask Your Special Someone
        </h1>

        <p className="text-xl md:text-2xl text-rose-500 mb-8 animate-fade-in-up delay-100">
          Create a beautiful, personalized page to ask someone on a date
        </p>

        {/* Feature list */}
        <div className="grid md:grid-cols-3 gap-4 mb-12 animate-fade-in-up delay-200">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="text-3xl mb-2">📸</div>
            <h3 className="font-semibold text-rose-700">Add Photos</h3>
            <p className="text-rose-500 text-sm">Upload up to 4 photos of your memories together</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="text-3xl mb-2">✨</div>
            <h3 className="font-semibold text-rose-700">Beautiful Themes</h3>
            <p className="text-rose-500 text-sm">Choose from stunning romantic color themes</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="text-3xl mb-2">🔗</div>
            <h3 className="font-semibold text-rose-700">Share the Link</h3>
            <p className="text-rose-500 text-sm">Get a unique URL to send to your special someone</p>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href="/create"
          className="inline-block bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-xl px-12 py-5 rounded-full shadow-xl btn-primary hover:from-rose-600 hover:to-pink-600"
        >
          Create Your Page 💝
        </Link>

        {/* Subtle footer */}
        <p className="mt-12 text-rose-400 text-sm animate-fade-in-up delay-300">
          Made with love for people in love
        </p>
      </div>
    </main>
  );
}
