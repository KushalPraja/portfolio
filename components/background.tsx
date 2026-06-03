"use client";

import { useTheme } from "@/lib/theme-context";

export default function Background() {
  const { isDark } = useTheme();

  return (
    <>
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundColor: isDark ? "#1c1c1c" : "#f2f0ed",
        }}
      />
      {/* Grain overlay */}
      <div className="fixed inset-0 -z-[5] pointer-events-none">
        <svg className="w-full h-full opacity-[0.03]">
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>
    </>
  );
}
