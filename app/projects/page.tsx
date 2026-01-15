"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Inter } from "next/font/google";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FiArrowLeft, FiExternalLink, FiGithub, FiMoon, FiSun, FiCode, FiMail, FiX } from "react-icons/fi";
import { useTheme } from "@/lib/theme-context";
import { useEffect, useState } from "react";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400"] });

// Dynamically import Background component to avoid SSR issues
const Background = dynamic(() => import("@/components/Background"), {
  ssr: false,
});

interface Project {
  title: string;
  description: string;
  longDescription?: string;
  features?: string[];
  tech: string[];
  liveLink?: string;
  githubLink: string;
  thumbnail?: string;
  year: string;
}

// function ProjectThumbnail({ project, isDark }: { project: Project; isDark: boolean }) {
//   const isVideo = project.thumbnail?.endsWith(".mp4");
//   const thumbSrc = isVideo ? project.thumbnail?.replace(/\.mp4$/, ".thumb.mp4") : project.thumbnail;
//   const posterSrc = isVideo ? project.thumbnail?.replace(/\.mp4$/, ".poster.jpg") : undefined;

//   return (
//     <div className={`w-full md:w-44 h-28 flex-shrink-0 rounded-md overflow-hidden ${isDark ? "bg-white/5" : "bg-black/5"} relative`}>
//       {project.thumbnail ? (
//         isVideo ? (
//           <video src={thumbSrc} poster={posterSrc} autoPlay loop muted playsInline className="w-full h-full object-cover" />
//         ) : (
//           // eslint-disable-next-line @next/next/no-img-element
//           <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
//         )
//       ) : (
//         <div className="w-full h-full flex items-center justify-center">
//           <span className={`text-xs ${isDark ? "text-white/20" : "text-black/20"} ${inter.className}`}>{project.title}</span>
//         </div>
//       )}
//     </div>
//   );
// }

const projects: Project[] = [
  {
    title: "Persona",
    description: "AI customer support that remembers every conversation.",
    longDescription:
      "Persona is a comprehensive AI-powered customer support platform that enables businesses to deploy customizable AI support agents. The platform features vectorized conversational memory for context-aware responses, a visual workflow builder using React Flow, and seamless integration with existing support systems.",
    features: [
      "Visual workflow builder for custom AI agent behavior",
      "Vectorized conversational memory for context retention",
      "Real-time analytics dashboard",
      "Multi-channel support integration",
    ],
    tech: ["Next.js", "React Flow", "Express.js", "MongoDB", "OpenAI"],
    liveLink: "https://persona-eight-gamma.vercel.app/",
    githubLink: "https://github.com/KushalPraja/Persona",
    thumbnail: "/projects/persona.mp4",
    year: "2025",
  },
  {
    title: "GreenLens",
    description: "Snap products, get instant sustainability scores.",
    longDescription:
      "GreenLens won 1st place at the GenAI Genesis 2025 hackathon with 700+ participants. It uses Google's Gemini API to analyze products through image recognition and provides detailed sustainability scores, recycling instructions, and eco-friendly alternatives.",
    features: [
      "AI-powered product recognition and analysis",
      "Sustainability scoring system",
      "Eco-friendly product recommendations",
      "Recycling instructions and guidelines",
    ],
    tech: ["Next.js", "FastAPI", "Gemini API", "Docker", "Azure"],
    liveLink: "https://devpost.com/software/greenlens",
    githubLink: "https://github.com/KushalPraja/GreenLens",
    thumbnail: "/projects/greenlens.mp4",
    year: "2025",
  },
 
  {
    title: "Thorem",
    description: "Write math by hand, get LaTeX instantly.",
    longDescription:
      "Thorem uses AI to recognize handwritten mathematical equations and converts them into properly formatted LaTeX code. It features real-time compilation using Tectonic and provides an intuitive interface for editing and exporting equations.",
    features: [
      "AI-powered handwriting recognition",
      "Real-time LaTeX compilation",
      "Export to PDF and image formats",
      "Equation history and favorites",
    ],
    tech: ["Next.js", "Node.js", "AI", "LaTeX", "Tectonic"],
    liveLink: "https://www.youtube.com/watch?v=r2F_8a4ttiY",
    githubLink: "https://github.com/KushalPraja/Thorem",
    thumbnail: "/projects/thorem.mp4",
    year: "2024",
  },
  {
    title: "Branches",
    description: "One link, infinite possibilities.",
    longDescription:
      "Branches is a clean, minimalist link-in-bio tool that allows users to share multiple links through a single, customizable page. Built with Next.js and styled with Tailwind CSS for a modern, responsive experience.",
    features: ["Customizable themes and layouts", "Analytics and click tracking", "Social media integration", "Fast, responsive design"],
    tech: ["Next.js", "TailwindCSS", "TypeScript"],
    liveLink: "https://branches.kushalprajapati.me",
    githubLink: "https://github.com/KushalPraja/Branches",
    thumbnail: "/projects/branches.mp4",
    year: "2023",
  },
  {
    title: "Music Visualization",
    description: "Turn any song into stunning visual art.",
    longDescription:
      "SoundWave creates stunning real-time visualizations from audio files or YouTube videos. Using p5.js for graphics and the Web Audio API for frequency analysis, it generates dynamic visuals that react to the music.",
    features: ["Real-time audio frequency analysis", "Multiple visualization modes", "YouTube video integration", "Customizable color schemes"],
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
        setSelectedProject(null);
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
    <>
      <Background />
      <div className="relative min-h-screen overflow-y-auto">
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
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="mb-5">
              <h1 className={`text-2xl md:text-2xl mb-2 ${isDark ? "text-white" : "text-[#0a0a0a]"} font-normal ${inter.className}`}>projects</h1>
              <p className={`${isDark ? "text-white/80" : "text-[#0a0a0a]/70"} text-sm font-light ${inter.className} max-w-2xl`}>
                a selection of what i&apos;ve built recently
              </p>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.6 }}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer"
                >
                  {/* Thumbnail with rounded corners */}
                  <div className={`w-full aspect-[16/9] ${isDark ? "bg-white/5" : "bg-black/5"} relative rounded-xl overflow-hidden mb-3`}>
                    {project.thumbnail ? (
                      project.thumbnail.endsWith(".mp4") ? (
                        <video 
                          src={project.thumbnail} 
                          autoPlay 
                          loop 
                          muted 
                          playsInline 
                          className="w-full h-full object-cover" 
                        />
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
                      className={`absolute top-3 right-3 px-2 opacity-0 group-hover:opacity-100 transition-opacity py-1 rounded text-[9px] ${inter.className} ${
                        isDark ? "bg-black/60 text-white/60" : "bg-white/60 text-black/60"
                      } backdrop-blur-sm`}
                    >
                      {project.year}
                    </div>

                    {/* Links overlay - visible on hover */}
                    <div className="absolute top-3 left-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`p-2 rounded-md backdrop-blur-sm ${
                            isDark ? "bg-black/60 text-white/80 hover:text-white" : "bg-white/60 text-black/80 hover:text-black"
                          } transition-colors`}
                          aria-label="View live project"
                        >
                          <FiExternalLink size={14} />
                        </a>
                      )}
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={`p-2 rounded-md backdrop-blur-sm ${
                          isDark ? "bg-black/60 text-white/80 hover:text-white" : "bg-white/60 text-black/80 hover:text-black"
                        } transition-colors`}
                        aria-label="View on GitHub"
                      >
                        <FiGithub size={14} />
                      </a>
                    </div>
                  </div>

                  {/* Content below thumbnail */}
                  <div className="space-y-1">
                    <h3 className={`text-sm font-semibold ${isDark ? "text-white/90" : "text-black/90"} ${inter.className} group-hover:underline underline-offset-2 transition-all`}>
                      {project.title}
                    </h3>

                    <p className={`text-xs font-md ${isDark ? "text-white/80" : "text-black/80"} ${inter.className} leading-relaxed`}>
                      {project.description}
                    </p>
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

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed inset-0 ${
                isDark ? "bg-black/80" : "bg-black/50"
              } backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-6`}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className={`${isDark ? "bg-[#0a0a0a] border-white/10" : "bg-white border-black/10"} rounded-lg shadow-2xl border w-full max-w-2xl ${
                  inter.className
                }`}
              >
                {/* Compact Video/Image */}
                <div className={`w-full aspect-[16/9] ${isDark ? "bg-white/5" : "bg-black/5"} relative rounded-t-lg overflow-hidden`}>
                  {selectedProject.thumbnail ? (
                    selectedProject.thumbnail.endsWith(".mp4") ? (
                      <video src={selectedProject.thumbnail} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                    ) : (
                      <Image src={selectedProject.thumbnail} alt={selectedProject.title} fill className="object-cover" />
                    )
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className={`text-xs ${isDark ? "text-white/20" : "text-black/20"}`}>{selectedProject.title}</span>
                    </div>
                  )}
                  {/* Close button overlay */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className={`absolute top-3 right-3 p-1.5 rounded-md backdrop-blur-sm ${
                      isDark
                        ? "bg-black/50 hover:bg-black/70 text-white/70 hover:text-white"
                        : "bg-white/50 hover:bg-white/70 text-black/70 hover:text-black"
                    } transition-colors`}
                  >
                    <FiX size={14} />
                  </button>
                  {/* Year badge */}
                  <div
                    className={`absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] backdrop-blur-sm ${
                      isDark ? "bg-black/50 text-white/70" : "bg-white/50 text-black/70"
                    }`}
                  >
                    {selectedProject.year}
                  </div>
                </div>

                {/* Compact Content */}
                <div className="p-4 space-y-3">
                  {/* Title and Links row */}
                  <div className="flex items-center justify-between gap-3">
                    <h2 className={`text-base font-medium ${isDark ? "text-white/90" : "text-black/90"}`}>{selectedProject.title}</h2>
                    <div className="flex items-center gap-2">
                      {selectedProject.liveLink && (
                        <a
                          href={selectedProject.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-medium transition-colors ${
                            isDark ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-black/90"
                          }`}
                        >
                          <FiExternalLink size={11} />
                          Live
                        </a>
                      )}
                      <a
                        href={selectedProject.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-medium transition-colors ${
                          isDark ? "bg-white/10 text-white/80 hover:bg-white/20" : "bg-black/5 text-black/80 hover:bg-black/10"
                        }`}
                      >
                        <FiGithub size={11} />
                        Code
                      </a>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`text-xs leading-relaxed ${isDark ? "text-white/60" : "text-black/60"}`}>{selectedProject.description}</p>

                  {/* Tech Stack - inline */}
                  <div className="flex flex-wrap gap-1">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-0.5 rounded text-[10px] ${isDark ? "bg-white/5 text-white/50" : "bg-black/5 text-black/50"}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
