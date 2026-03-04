// Hardcoded romantic captions organized by theme
// These will be randomly selected based on the theme

const romanticRoseCaptions = [
  "Every moment with you feels like a beautiful dream come true",
  "You make my heart skip a beat, every single time",
  "In your eyes, I found my forever home",
  "Love looks good on us, don't you think?",
  "You're the reason I believe in fairy tales",
  "My heart chose you, and it was the best decision ever",
  "Together is my favorite place to be",
  "You're the missing piece I never knew I needed",
  "Every love story is beautiful, but ours is my favorite",
  "With you, every day is Valentine's Day",
];

const oceanBreezeCaptions = [
  "Like the ocean meets the shore, we were meant to be",
  "You calm my soul like the gentle waves",
  "Our love runs deeper than any ocean",
  "You're my anchor in life's stormy seas",
  "Together, we're an endless horizon",
  "You make my heart sail with joy",
  "Like tides to the moon, I'm drawn to you",
  "In the sea of people, I found you",
  "Our love flows like the eternal tide",
  "You're the calm in my beautiful chaos",
];

const goldenHourCaptions = [
  "You're my golden hour, every hour",
  "Like the sunset, you take my breath away",
  "Our love shines brighter than any sun",
  "You make everything glow with warmth",
  "Together, we're pure magic",
  "You light up my world in golden hues",
  "Every moment with you is golden",
  "Like warm sunshine, you brighten my days",
  "Our love story is written in golden light",
  "You're the warmth I've been searching for",
];

const midnightLoveCaptions = [
  "You're my star in the endless night sky",
  "Our love is written in the constellations",
  "Like the moon, you light up my darkest nights",
  "You're the magic in my midnight dreams",
  "Together, we're an enchanting mystery",
  "In the universe of love, you're my galaxy",
  "Our souls dance under the starlit sky",
  "You're the dream I never want to wake from",
  "Like stardust, our love is eternal",
  "You make my heart sparkle like the night sky",
];

const captionsByTheme: Record<string, string[]> = {
  "romantic-rose": romanticRoseCaptions,
  "ocean-breeze": oceanBreezeCaptions,
  "golden-hour": goldenHourCaptions,
  "midnight-love": midnightLoveCaptions,
};

export function generateCaptions(theme: string, count: number): string[] {
  const themeCaptions = captionsByTheme[theme] || romanticRoseCaptions;
  const shuffled = [...themeCaptions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function generateCaption(theme: string, index: number): string {
  const themeCaptions = captionsByTheme[theme] || romanticRoseCaptions;
  return themeCaptions[index % themeCaptions.length];
}
