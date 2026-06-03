"use client";

import { useState } from "react";
import { useTheme } from "@/lib/theme-context";
import { projects } from "@/lib/projects";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatingKnot from "@/components/particles";
import TextScramble from "@/components/text-scramble";

const INITIAL = 4;

export default function Home() {
  const { isDark } = useTheme();
  const [count, setCount] = useState(INITIAL);

  const textPrimary = isDark ? "text-white/90" : "text-[#1a1a1a]";
  const textSecondary = isDark ? "text-white/40" : "text-[#1a1a1a]/50";
  const divider = isDark ? "border-white/[0.06]" : "border-[#1a1a1a]/[0.06]";

  const visible = projects.slice(0, count);

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-6 py-32">
        <div className="max-w-2xl w-full space-y-10">
          {/* Intro */}
          <div className="space-y-6">
            <FloatingKnot className="mb-4" />
            <TextScramble
              text="kushal praja"
              className={`text-2xl font-semibold tracking-tight ${textPrimary}`}
            />

            <p className={`text-[15px] leading-[1.8] font-light ${textSecondary}`}>
              I&apos;m interested in building software that interacts with the physical world, with a focus on 3D graphics, AI/ML, and distributed systems.
            </p>

            <p className={`text-[15px] leading-[1.8] font-light ${textSecondary}`}>
              Based in Waterloo, studying Computer Engineering @ UWaterloo.
              Previously interned at{" "}
              <a href="https://kaimaging.com/" target="_blank" rel="noopener noreferrer" className={`${textPrimary} animate-underline`}>
                KA Imaging
              </a>
              {" "}and{" "}
              <a href="https://levantalabs.com/" target="_blank" rel="noopener noreferrer" className={`${textPrimary} animate-underline`}>
                Levanta Labs
              </a>.
            </p>
          </div>

          {/* Divider */}
          <div className={`border-t ${divider}`} />

          {/* Projects */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-5">
              {visible.map((p) => (
                <a
                  key={p.title}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="aspect-[16/9] overflow-hidden mb-3">
                    {p.type === "video" ? (
                      <video
                        src={p.preview}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    ) : (
                      <img
                        src={p.preview}
                        alt={p.title}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    )}
                  </div>
                  <h3 className={`text-[13px] font-medium tracking-wide uppercase ${textPrimary}`}>{p.title}</h3>
                  <p className={`text-[12px] mt-1 leading-relaxed font-light ${textSecondary}`}>{p.description}</p>
                </a>
              ))}
            </div>

            {count < projects.length && (
              <button
                onClick={() => setCount(projects.length)}
                className={`text-[12px] tracking-wide uppercase font-light ${textSecondary} hover:${textPrimary} transition-colors cursor-pointer`}
              >
                + {projects.length - count} more
              </button>
            )}
            {count > INITIAL && (
              <button
                onClick={() => setCount(INITIAL)}
                className={`text-[12px] tracking-wide uppercase font-light ${textSecondary} hover:${textPrimary} transition-colors cursor-pointer`}
              >
                Show less
              </button>
            )}
          </div>

          {/* Divider */}
          <div className={`border-t ${divider}`} />

          <Footer />
        </div>
      </main>
    </>
  );
}
