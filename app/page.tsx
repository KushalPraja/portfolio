"use client";

import Link from "next/link";
import { useTheme } from "@/lib/theme-context";
import Footer from "@/components/footer";
import Header from "@/components/header";

interface Project {
  title: string;
  description: string;
  link?: string;
  github: string;
  video?: string;
  poster?: string;
  year: string;
}

const projects: Project[] = [
  {
    title: "Persona",
    description: "AI customer support with conversational memory.",
    link: "https://persona-eight-gamma.vercel.app/",
    github: "https://github.com/KushalPraja/Persona",
    video: "/projects/persona.thumb.mp4",
    poster: "/projects/persona.poster.jpg",
    year: "2025",
  },
  {
    title: "GreenLens",
    description: "Product sustainability scanner. 1st at GenAI Genesis.",
    link: "https://devpost.com/software/greenlens",
    github: "https://github.com/KushalPraja/GreenLens",
    video: "/projects/greenlens.thumb.mp4",
    poster: "/projects/greenlens.poster.jpg",
    year: "2025",
  },
  {
    title: "Thorem",
    description: "Handwritten math to LaTeX converter.",
    link: "https://www.youtube.com/watch?v=r2F_8a4ttiY",
    github: "https://github.com/KushalPraja/Thorem",
    video: "/projects/thorem.thumb.mp4",
    poster: "/projects/thorem.poster.jpg",
    year: "2024",
  },
  {
    title: "Branches",
    description: "A simple and easy to use link-in-bio website builder.",
    link: "https://ashy-ground-0a637de0f.6.azurestaticapps.net/#demo",
    github: "https://github.com/KushalPraja/Branches",
    video: "/projects/branches.thumb.mp4",
    poster: "/projects/branches.poster.jpg",
    year: "2023",
  },
  {
    title: "SoundWave",
    description: "Audio visualizer based on the cover art of Unknown Pleasures album.",
    github: "https://github.com/KushalPraja/SoundWave",
    video: "/projects/soundwave.thumb.mp4",
    poster: "/projects/soundwave.poster.jpg",
    year: "2023",
  },
];

export default function Home() {
  const { isDark } = useTheme();

  const textPrimary = isDark ? "text-white" : "text-[#0a0a0a]";
  const textSecondary = isDark ? "text-white/60" : "text-[#0a0a0a]/60";
  const textMuted = isDark ? "text-white/40" : "text-[#0a0a0a]/40";

  return (
    <main className="min-h-screen px-6 py-12 md:px-12 lg:px-24 max-w-5xl mx-auto">
      <Header currentPage="home" />

      {/* Intro */}
      <section className="mb-16">
        <p className={`text-sm md:text-base leading-relaxed ${textPrimary} max-w-xl`}>
          Hello! I'm <span className="font-semibold">Kushal</span>, a Computer Engineering student @ UWaterloo.
          I am currently interning as a software engineer at{" "}
          <a
            href="https://kaimaging.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="animate-underline"
          >
            KA Imaging
          </a>
          , working on building image processing pipelines for X-Ray scanning systems.
        </p>
      </section>

      {/* Experience */}
      <section className="mb-16">
        <h2 className={`text-xs uppercase tracking-wide mb-6 ${textMuted}`}>Experience</h2>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/company_icons/KA-Imaging.jpg" alt="" className="w-4 h-4 rounded-sm" />
              <span className={`text-sm ${textPrimary}`}>Software Developer</span>
              <span className={`text-sm ${textSecondary}`}>·</span>
              <a href="https://kaimaging.com/" target="_blank" rel="noopener noreferrer" className={`text-sm animate-underline ${textSecondary}`}>
                KA Imaging
              </a>
            </div>
            <span className={`text-xs ${textMuted}`}>Present</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/company_icons/levantalabs_logo.jpg" alt="" className="w-4 h-4 rounded-sm" />
              <span className={`text-sm ${textPrimary}`}>Software Engineer</span>
              <span className={`text-sm ${textSecondary}`}>·</span>
              <a href="https://www.levantalabs.com/" target="_blank" rel="noopener noreferrer" className={`text-sm animate-underline ${textSecondary}`}>
                Levanta Labs
              </a>
            </div>
            <span className={`text-xs ${textMuted}`}>2024</span>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mb-16">
        <h2 className={`text-xs uppercase tracking-wide mb-6 ${textMuted}`}>Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.link || project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              {/* Video/Thumbnail */}
              {project.video && (
                <div className={`w-full aspect-video mb-3 rounded-lg overflow-hidden ${isDark ? "bg-white/5" : "bg-black/5"}`}>
                  <video
                    src={project.video}
                    poster={project.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <h3 className={`text-sm font-medium ${textPrimary} group-hover:underline underline-offset-2`}>{project.title}</h3>
                <span className={`text-xs ${textMuted}`}>{project.year}</span>
              </div>

              <p className={`text-xs ${textSecondary}`}>
                {project.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
