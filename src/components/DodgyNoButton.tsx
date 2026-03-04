"use client";

import { useState, useCallback } from "react";
import { funnyMessages } from "@/lib/funny-messages";

interface DodgyNoButtonProps {
  colors: {
    primary: string;
    secondary: string;
  };
}

export default function DodgyNoButton({ colors }: DodgyNoButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);

  const moveButton = useCallback(() => {
    // Get random position within viewport
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 60;

    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;

    setPosition({ x: newX, y: newY });

    // Show funny message
    const nextIndex = (messageIndex + 1) % funnyMessages.length;
    setMessage(funnyMessages[nextIndex]);
    setMessageIndex(nextIndex);

    // Clear message after a delay
    setTimeout(() => setMessage(""), 2000);
  }, [messageIndex]);

  return (
    <div className="relative">
      <button
        type="button"
        onMouseEnter={moveButton}
        onTouchStart={moveButton}
        onClick={moveButton}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          borderColor: colors.secondary,
          color: colors.primary,
        }}
        className="dodgy-button px-10 py-4 rounded-full text-xl font-bold border-2 bg-white hover:bg-gray-50 transition-colors"
      >
        No
      </button>

      {/* Funny message popup */}
      {message && (
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-3 rounded-2xl shadow-xl text-lg font-medium animate-fade-in-up z-50"
          style={{ color: colors.primary }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
