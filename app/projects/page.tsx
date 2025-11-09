"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";
import { FiArrowLeft, FiExternalLink, FiGithub, FiMoon, FiSun, FiCode, FiMail } from "react-icons/fi";
import { useTheme } from "@/lib/theme-context";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });

interface Project {
  title: string;
  description: string;
  tech: string[];
  liveLink?: string;
  githubLink: string;
  thumbnail?: string;
  year: string;
}

const projects: Project[] = [
  {
    title: "Persona",
    description:
      "AI-Powered Customer Support Platform. End-to-end platform that lets businesses deploy customizable AI support agents with vectorized conversational memory.",
    tech: ["Next.js", "React Flow", "Express.js", "MongoDB", "OpenAI"],
    liveLink: "https://persona-eight-gamma.vercel.app/",
    githubLink: "https://github.com/KushalPraja/Persona",
    thumbnail: "/projects/persona.mp4",
    year: "2025",
  },
  {
    title: "GreenLens",
    description:
      "Sustainable Product Scanner (GenAI Genesis 2025 Winner). AI-powered tool to analyze product recyclability and suggest eco-friendly alternatives.",
    tech: ["Next.js", "FastAPI", "Gemini API", "Docker", "Azure"],
    liveLink: "https://devpost.com/software/greenlens",
    githubLink: "https://github.com/KushalPraja/GreenLens",
    thumbnail: "/projects/greenlens.mp4",
    year: "2025",
  },
  {
    title: "Kenesis",
    description:
      "AR Gesture-Controlled Robot (Hack the North 2025). AR-based robot control system with low-latency gesture tracking and ROS2 control stack.",
    tech: ["Snap Lens Studio", "Flask", "MQTT", "ROS2", "Jetson Nano"],
    liveLink: "https://devpost.com/software/steven-lvnh4w",
    githubLink: "https://github.com/KushalPraja/Kenesis",
    thumbnail: "/projects/kenesis.png",
    year: "2025",
  },
  {
    title: "Thorem",
    description:
      "Handwritten Math to LaTeX Converter. Transforms handwritten math equations into editable LaTeX with real-time compilation (3M+ views, 1.9k+ stars).",
    tech: ["Next.js", "Node.js", "AI", "LaTeX", "Tectonic"],
    liveLink: "https://www.youtube.com/watch?v=r2F_8a4ttiY",
    githubLink: "https://github.com/KushalPraja/Thorem",
    thumbnail: "/projects/thorem.mp4",
    year: "2024",
  },
  {
    title: "Branches",
    description: "A linktree-like website for sharing multiple links in one place.",
    tech: ["Next.js", "TailwindCSS", "TypeScript"],
    liveLink: "https://branches.kushalprajapati.me",
    githubLink: "https://github.com/KushalPraja/Branches",
    thumbnail: "/projects/branches.mp4",
    year: "2023",
  },
  {
    title: "Music Visualization",
    description: "Dynamic audio visualization transforming audio files into engaging animated visuals.",
    tech: ["p5.js", "Express", "Node.js", "YouTube API"],
    githubLink: "https://github.com/KushalPraja/SoundWave",
    thumbnail: "/projects/soundwave.mp4",
    year: "2023",
  },
];

export default function Projects() {
  const { isDark, toggleTheme } = useTheme();
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Command palette keyboard shortcut (Ctrl+Q)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "q") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsCommandOpen(false);
        setSearchQuery("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const menuItems = [
    {
      label: "theme",
      key: "t",
      description: isDark ? "switch to light mode" : "switch to dark mode",
      action: () => {
        toggleTheme();
        setIsCommandOpen(false);
      },
      icon: isDark ? FiSun : FiMoon,
    },
    {
      label: "home",
      href: "/",
      key: "h",
      description: "go to home page",
      icon: FiCode,
    },
    {
      label: "contact",
      href: "/contact",
      key: "c",
      description: "get in touch",
      icon: FiMail,
    },
  ];

  // Filter menu items based on search query
  const filteredItems = menuItems.filter(
    (item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen overflow-y-auto">
      <div className={`fixed inset-0 ${isDark ? "bg-[#0a0a0a]" : "bg-white"} -z-10`} />

      {/* Command Palette */}
      <AnimatePresence>
        {isCommandOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 ${isDark ? "bg-black/40" : "bg-black/20"} backdrop-blur-sm z-[100] flex items-start justify-center pt-32`}
            onClick={() => {
              setIsCommandOpen(false);
              setSearchQuery("");
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className={`${
                isDark ? "bg-[#0a0a0a] border-white/10" : "bg-white border-black/10"
              } rounded-lg shadow-2xl border w-full max-w-md overflow-hidden ${inter.className}`}
            >
              <div className={`p-4 border-b ${isDark ? "border-white/10" : "border-black/5"}`}>
                <input
                  type="text"
                  placeholder="type a command or search..."
                  className={`w-full bg-transparent text-xs outline-none ${
                    isDark ? "text-white placeholder:text-white/40" : "text-black placeholder:text-black/40"
                  }`}
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="p-2 max-h-[400px] overflow-y-auto">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => {
                    const Icon = item.icon;
                    if (item.action) {
                      // Action button (like theme toggle)
                      return (
                        <button
                          key={item.label}
                          onClick={item.action}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md ${
                            isDark ? "hover:bg-white/5" : "hover:bg-black/5"
                          } transition-colors group`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon size={14} className={isDark ? "text-white/40" : "text-black/40"} />
                            <div className="flex flex-col gap-0.5 items-start">
                              <span
                                className={`text-xs ${
                                  isDark ? "text-white/90 group-hover:text-white" : "text-black/90 group-hover:text-black"
                                } font-medium`}
                              >
                                {item.label}
                              </span>
                              <span className={`text-[11px] ${isDark ? "text-white/40" : "text-black/40"}`}>{item.description}</span>
                            </div>
                          </div>
                          <kbd className={`text-[11px] ${isDark ? "text-white/40 bg-white/5" : "text-black/40 bg-black/5"} px-2 py-1 rounded`}>
                            {item.key}
                          </kbd>
                        </button>
                      );
                    } else {
                      // Navigation link
                      return (
                        <Link
                          key={item.href}
                          href={item.href!}
                          onClick={() => {
                            setIsCommandOpen(false);
                            setSearchQuery("");
                          }}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-md ${
                            isDark ? "hover:bg-white/5" : "hover:bg-black/5"
                          } transition-colors group`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon size={14} className={isDark ? "text-white/40" : "text-black/40"} />
                            <div className="flex flex-col gap-0.5">
                              <span
                                className={`text-xs ${
                                  isDark ? "text-white/90 group-hover:text-white" : "text-black/90 group-hover:text-black"
                                } font-medium`}
                              >
                                {item.label}
                              </span>
                              <span className={`text-[11px] ${isDark ? "text-white/40" : "text-black/40"}`}>{item.description}</span>
                            </div>
                          </div>
                          <kbd className={`text-[11px] ${isDark ? "text-white/40 bg-white/5" : "text-black/40 bg-black/5"} px-2 py-1 rounded`}>
                            {item.key}
                          </kbd>
                        </Link>
                      );
                    }
                  })
                ) : (
                  <div className={`px-3 py-8 text-center text-xs ${isDark ? "text-white/40" : "text-black/40"}`}>
                    no results found for &quot;{searchQuery}&quot;
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="min-h-screen px-4 py-12 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-5xl mx-auto">
          {/* Back Button */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="mb-8">
            <Link
              href="/"
              className={`inline-flex items-center gap-2 text-xs ${
                isDark ? "text-white/40 hover:text-white/80" : "text-black/40 hover:text-black/80"
              } transition-colors ${inter.className}`}
            >
              <FiArrowLeft size={14} />
              <span>back</span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="mb-10">
            <h1 className={`text-2xl md:text-3xl mb-2 tracking-tight ${isDark ? "text-white" : "text-[#0a0a0a]"} font-normal ${playfair.className}`}>
              Projects
            </h1>
            <p className={`${isDark ? "text-white/60" : "text-[#0a0a0a]/60"} text-xs ${inter.className} max-w-2xl`}>
              A collection of my work spanning AI/ML, full-stack development, and creative experiments. Each project represents a unique challenge and
              learning experience.
            </p>

            {/* Ctrl+Q Indicator */}
            <motion.button
              onClick={() => setIsCommandOpen(true)}
              className={`mt-3 text-[9px] ${isDark ? "text-white/40 hover:text-white/60" : "text-black/40 hover:text-black/60"} transition-colors ${
                inter.className
              } flex items-center gap-1.5`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <kbd className={`px-1.5 py-0.5 ${isDark ? "bg-white/5" : "bg-black/5"} rounded text-[9px]`}>ctrl</kbd>
              <span>+</span>
              <kbd className={`px-1.5 py-0.5 ${isDark ? "bg-white/5" : "bg-black/5"} rounded text-[9px]`}>q</kbd>
              <span className="ml-1">for menu</span>
            </motion.button>
          </motion.div>

          {/* Projects List */}
          <div className="space-y-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05, duration: 0.6 }}
                className={`group relative ${
                  isDark ? "hover:bg-white/[0.02]" : "hover:bg-black/[0.02]"
                } rounded-lg p-3 -mx-3 transition-all duration-300`}
              >
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Thumbnail */}
                  <div
                    className={`w-full md:w-44 h-28 flex-shrink-0 rounded-md overflow-hidden ${
                      isDark ? "bg-white/5" : "bg-black/5"
                    } backdrop-blur-sm relative`}
                  >
                    {project.thumbnail ? (
                      project.thumbnail.endsWith(".mp4") ? (
                        <video src={project.thumbnail} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
                      )
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className={`text-xs ${isDark ? "text-white/20" : "text-black/20"} ${inter.className}`}>{project.title}</span>
                      </div>
                    )}
                    {/* Year Badge */}
                    <div
                      className={`absolute top-2 right-2 px-2 py-1 rounded text-[9px] ${inter.className} ${
                        isDark ? "bg-black/60 text-white/60" : "bg-white/60 text-black/60"
                      } backdrop-blur-sm`}
                    >
                      {project.year}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <h3 className={`text-sm font-medium ${isDark ? "text-white/90" : "text-black/90"} ${inter.className}`}>{project.title}</h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${isDark ? "text-white/40 hover:text-white" : "text-black/40 hover:text-black"} transition-colors`}
                            aria-label="View live project"
                          >
                            <FiExternalLink size={13} />
                          </a>
                        )}
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${isDark ? "text-white/40 hover:text-white" : "text-black/40 hover:text-black"} transition-colors`}
                          aria-label="View on GitHub"
                        >
                          <FiGithub size={13} />
                        </a>
                      </div>
                    </div>

                    <p className={`text-xs ${isDark ? "text-white/60" : "text-black/60"} ${inter.className} mb-2.5 leading-relaxed`}>
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className={`px-2 py-0.5 rounded text-[10px] ${inter.className} ${
                            isDark ? "bg-white/5 text-white/50" : "bg-black/5 text-black/50"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-12 pt-6 border-t border-white/10">
            <p className={`text-[9px] ${isDark ? "text-white/30" : "text-black/30"} ${inter.className} text-center`}>
              © {new Date().getFullYear()} Kushal Prajapati
            </p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
