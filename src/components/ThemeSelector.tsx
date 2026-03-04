"use client";

import { themes, Theme } from "@/lib/themes";

interface ThemeSelectorProps {
  selectedTheme: string;
  onSelect: (themeId: string) => void;
}

export default function ThemeSelector({ selectedTheme, onSelect }: ThemeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {themes.map((theme) => (
        <button
          key={theme.id}
          type="button"
          onClick={() => onSelect(theme.id)}
          className={`relative p-4 rounded-xl border-2 transition-all text-left ${
            selectedTheme === theme.id
              ? "border-rose-500 shadow-lg scale-[1.02]"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          {/* Theme preview gradient */}
          <div
            className="h-12 rounded-lg mb-3"
            style={{ background: theme.colors.backgroundGradient }}
          />

          {/* Theme name and description */}
          <h3 className="font-semibold text-gray-800">{theme.name}</h3>
          <p className="text-sm text-gray-500">{theme.description}</p>

          {/* Selected checkmark */}
          {selectedTheme === theme.id && (
            <div className="absolute top-2 right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
