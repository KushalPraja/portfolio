"use client";

import { useEffect, useState } from "react";

const chars = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

interface TextScrambleProps {
  text: string;
  className?: string;
}

export default function TextScramble({ text, className }: TextScrambleProps) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 25;

    const interval = setInterval(() => {
      frame++;
      setDisplay(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (frame > (i / text.length) * totalFrames) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (frame >= totalFrames) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [text]);

  return <h1 className={className}>{display}</h1>;
}
