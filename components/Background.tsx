"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme-context";

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    window.addEventListener("resize", setCanvasSize);

    // Draw simple background with grain texture
    const draw = () => {
      // Base color
      ctx.fillStyle = isDark ? "#0a0a0a" : "#f5f0f0";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle grain texture with reduced opacity
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 8; // Reduced noise intensity from 10 to 8
        data[i] += noise; // R
        data[i + 1] += noise; // G
        data[i + 2] += noise; // B
      }

      ctx.putImageData(imageData, 0, 0);
    };

    draw();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, [isDark]);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
}
