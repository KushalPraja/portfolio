"use client";

import { useTheme } from "@/lib/theme-context";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatingKnot from "@/components/particles";
import TextScramble from "@/components/text-scramble";

const projects = [
  {
    title: "Rendr",
    description: "Build CAD models with natural language.",
    link: "https://devpost.com/software/rendr"

  },
  {
    title: "GreenLens",
    description: "Product sustainability scanner. 1st at GenAI Genesis.",
    link: "https://devpost.com/software/greenlens",
  },
  {
    title: "Thorem",
    description: "Handwritten math to LaTeX converter.",
    link: "https://www.youtube.com/watch?v=r2F_8a4ttiY",
  },
];

export default function Home() {
  const { isDark } = useTheme();

  const textPrimary = isDark ? "text-white" : "text-[#0a0a0a]";
  const textSecondary = isDark ? "text-white/55" : "text-[#0a0a0a]/55";
  const textMuted = isDark ? "text-white/35" : "text-[#0a0a0a]/35";

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-lg space-y-7">
          <div className="space-y-3">
            {/* 3D cube accent */}
            <FloatingKnot className="mb-3" />

            {/* Name */}
            <TextScramble
              text="kushal praja"
              className={`text-xl font-medium tracking-tight ${textPrimary}`}
            />
          </div>

          {/* Bio */}
          <p className={`text-[15px] leading-relaxed ${textPrimary}`}>
            I&apos;m interested in building software that interacts with the physical world,
            focusing on image processing and embedded systems.
          </p>

          <p className={`text-[15px] leading-relaxed ${textPrimary}`}>
            Currently, I&apos;m interning at{" "}
            <a href="https://kaimaging.com/" target="_blank" rel="noopener noreferrer" className="animate-underline">
              KA Imaging
            </a>
            , building image processing pipelines for X-Ray scanning systems.
            I&apos;m based in Waterloo, studying Computer Engineering @ UWaterloo.
          </p>

          {/* Projects */}
          <div>
            <p className={`text-[15px] leading-relaxed mb-3 ${textPrimary}`}>A few projects I&apos;ve worked on:</p>
            <div className="space-y-1.5">
              {projects.map((p) => (
                <div key={p.title} className="flex items-baseline gap-2">
                  <span className={`text-[15px] ${textPrimary}`}>
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="animate-underline">
                      {p.title}
                    </a>
                    <span className={`${textSecondary}`}> - {p.description}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </main>
    </>
  );
}
