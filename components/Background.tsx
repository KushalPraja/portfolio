"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme-context";

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();
  const hasDrawnRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw simple background with grain texture
    const draw = () => {
      // Base color
      ctx.fillStyle = isDark ? "#1A1A1A" : "#E5E5E5";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle grain texture with reduced opacity
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 3; // Further reduced noise intensity
        data[i] += noise; // R
        data[i + 1] += noise; // G
        data[i + 2] += noise; // B
      }

      ctx.putImageData(imageData, 0, 0);
      hasDrawnRef.current = true;
    };

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      hasDrawnRef.current = false; // Reset drawn state on resize
      draw();
    };
    setCanvasSize();

    // Only draw if not already drawn or theme changed
    if (!hasDrawnRef.current) {
      draw();
    }

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isDark]);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
}
