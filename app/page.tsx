"use client";

import { useState } from "react";
import { useTheme } from "@/lib/theme-context";
import { projects } from "@/lib/projects";
import Header from "@/components/header";
import FloatingKnot from "@/components/particles";
import Footer from "@/components/footer";
import TextScramble from "@/components/text-scramble";

const INITIAL = 4;

export default function Home() {
  const { isDark } = useTheme();
  const [count, setCount] = useState(INITIAL);

  const textPrimary = isDark ? "text-white" : "text-[#0a0a0a]";
  const textSecondary = isDark ? "text-white/55" : "text-[#0a0a0a]/70";
  const textMuted = isDark ? "text-white/30" : "text-[#0a0a0a]/65";
  const accent = isDark ? "text-sky-400" : "text-blue-500";
  const accentHover = isDark ? "hover:text-sky-400" : "hover:text-blue-500";
  const border = isDark ? "border-white/[0.08]" : "border-[#0a0a0a]/[0.08]";
  const hoverBorder = isDark ? "hover:border-sky-500/30" : "hover:border-blue-400/30";
  const previewBg = isDark ? "bg-white/[0.03]" : "bg-[#0a0a0a]/[0.03]";

  const visible = projects.slice(0, count);

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-2xl w-full space-y-5">
          <div className="space-y-2">
            <FloatingKnot className="mb-2" />
            <TextScramble
              text="kushal praja"
              className={`text-3xl font-bold tracking-tight ${textPrimary}`}
            />
          </div>

          <p className={`text-base leading-relaxed ${textSecondary}`}>
            I&apos;m interested in building software that interacts with the physical world, with a focus on{" "}
            <span className={accent}>3D graphics</span>, <span className={accent}>AI/ML</span>, and{" "}
            <span className={accent}>distributed systems</span>.
          </p>

          <p className={`text-base leading-relaxed ${textSecondary}`}>
            I&apos;m based in Waterloo, studying Computer Engineering @ UWaterloo.
            Previously interned at{" "}
            <a href="https://kaimaging.com/" target="_blank" rel="noopener noreferrer" className={`${textPrimary} ${accentHover} transition-colors duration-200 animate-underline`}>
              KA Imaging
            </a>
            {" "}and{" "}
            <a href="https://levantalabs.com/" target="_blank" rel="noopener noreferrer" className={`${textPrimary} ${accentHover} transition-colors duration-200 animate-underline`}>
              Levanta Labs
            </a>.
          </p>

          {/* Projects */}
          <div className="pt-4">
            <div className="grid grid-cols-2 gap-3">
              {visible.map((p) => (
                <a
                  key={p.title}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group block border ${border} ${hoverBorder} transition-all duration-200 overflow-hidden`}
                >
                  <div className={`aspect-[16/9] ${previewBg} overflow-hidden`}>
                    {p.type === "video" ? (
                      <video
                        src={p.preview}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={p.preview}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="px-3 py-2.5">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-sm font-medium ${textPrimary}`}>{p.title}</h3>
                      <svg className={`w-3 h-3 ${textMuted} group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </div>
                    <p className={`text-[13px] mt-1 leading-relaxed ${textMuted}`}>{p.description}</p>
                  </div>
                </a>
              ))}
            </div>

            {count < projects.length && (
              <button
                onClick={() => setCount(projects.length)}
                className={`mt-4 text-sm ${textMuted} ${accentHover} transition-colors cursor-pointer animate-underline`}
              >
                Show {projects.length - count} more projects
              </button>
            )}
            {count > INITIAL && (
              <button
                onClick={() => setCount(INITIAL)}
                className={`mt-4 text-sm ${textMuted} ${accentHover} transition-colors cursor-pointer animate-underline`}
              >
                Show less
              </button>
            )}
          </div>

          <Footer />
        </div>
      </main>
    </>
  );
}
