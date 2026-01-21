"use client";

import Link from "next/link";
import { useTheme } from "@/lib/theme-context";

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
    description: "Minimalist link-in-bio tool.",
    link: "https://ashy-ground-0a637de0f.6.azurestaticapps.net/#demo",
    github: "https://github.com/KushalPraja/Branches",
    video: "/projects/branches.thumb.mp4",
    poster: "/projects/branches.poster.jpg",
    year: "2023",
  },
  {
    title: "SoundWave",
    description: "Real-time audio visualization.",
    github: "https://github.com/KushalPraja/SoundWave",
    video: "/projects/soundwave.thumb.mp4",
    poster: "/projects/soundwave.poster.jpg",
    year: "2023",
  },
];

export default function Home() {
  const { isDark, toggleTheme } = useTheme();

  const textPrimary = isDark ? "text-white" : "text-[#0a0a0a]";
  const textSecondary = isDark ? "text-white/60" : "text-[#0a0a0a]/60";
  const textMuted = isDark ? "text-white/40" : "text-[#0a0a0a]/40";
  const border = isDark ? "border-white/10" : "border-[#0a0a0a]/10";

  return (
    <main className="min-h-screen px-6 py-12 md:px-12 lg:px-24 max-w-5xl mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between mb-16">
        <h1 className={`text-xl md:text-2xl lg:text-3xl font-medium ${textPrimary}`}>Kushal Praja</h1>
        <div className="flex items-center gap-6">
          <nav className={`flex items-center gap-6 text-sm`}>
            <Link href="/writing" className={`${textPrimary} animate-underline`}>Writing</Link>
          </nav>
          <button
            onClick={toggleTheme}
            className={`w-8 h-8 flex items-center justify-center rounded-full border ${border} ${textSecondary} ${isDark ? 'hover:bg-white/6 hover:text-white' : 'hover:bg-black/6 hover:text-black'}`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Intro */}
      <section className="mb-16">
        <p className={`text-sm md:text-base leading-relaxed ${textPrimary} max-w-xl`}>
          Computer Engineering student at the University of Waterloo and software engineering intern at{" "}
          <a
            href="https://kaimaging.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="animate-underline"
          >
            KA Imaging
          </a>
          , working on image processing pipelines and C++ software development. Currently exploring graphics programming using OpenGL. Check out my projects on{" "}
          <a
            href="https://github.com/KushalPraja"
            target="_blank"
            rel="noopener noreferrer"
            className="animate-underline"
          >
            GitHub
          </a>
          .
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
      <footer className={`pt-8 border-t ${border}`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className={`flex flex-wrap gap-x-6 gap-y-2 text-xs ${textMuted}`}>
            <a href="mailto:k2prajap@uwaterloo.ca" className="underline underline-offset-2">Email</a>
            <a href="https://github.com/KushalPraja" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">GitHub</a>
            <a href="https://www.linkedin.com/in/kushalpraja/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">LinkedIn</a>
            <a href="https://x.com/KushalPraj" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Twitter</a>
          </div>

          <div className={`text-xs ${textMuted}`}>
            <span>© {new Date().getFullYear()} Kushal Prajapati</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
