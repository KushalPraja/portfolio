"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";
import { FiArrowLeft, FiGithub, FiLinkedin, FiMail, FiTwitter, FiMoon, FiSun, FiCode } from "react-icons/fi";
import { useTheme } from "@/lib/theme-context";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });

const contactMethods = [
  {
    name: "Email",
    handle: "kushpraja6@gmail.com",
    link: "mailto:kushpraja6@gmail.com",
    icon: FiMail,
    description: "Drop me a line anytime",
  },
  {
    name: "GitHub",
    handle: "@KushalPraja",
    link: "https://github.com/KushalPraja",
    icon: FiGithub,
    description: "Check out my code",
  },
  {
    name: "LinkedIn",
    handle: "/in/kushalpraja",
    link: "https://www.linkedin.com/in/kushalpraja/",
    icon: FiLinkedin,
    description: "Let's connect professionally",
  },
  {
    name: "X (Twitter)",
    handle: "@KushalPraj",
    link: "https://x.com/KushalPraj",
    icon: FiTwitter,
    description: "Follow for updates",
  },
];

export default function Contact() {
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
      label: "projects",
      href: "/projects",
      key: "p",
      description: "view my work",
      icon: FiCode,
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-4xl mx-auto">
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
              Get in Touch
            </h1>
            <p className={`${isDark ? "text-white/60" : "text-[#0a0a0a]/60"} text-xs ${inter.className} max-w-2xl`}>
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out
              through any of these channels.
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

          {/* Contact Methods */}
          <div className="space-y-3">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={method.name}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  className={`group block ${
                    isDark ? "hover:bg-white/[0.02]" : "hover:bg-black/[0.02]"
                  } rounded-lg p-4 -mx-2 transition-all duration-300`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2.5 rounded-lg ${isDark ? "bg-white/5" : "bg-black/5"} ${
                        isDark ? "group-hover:bg-white/10" : "group-hover:bg-black/10"
                      } transition-colors`}
                    >
                      <Icon size={18} className={isDark ? "text-white/70" : "text-black/70"} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className={`text-sm font-medium ${isDark ? "text-white/90" : "text-black/90"} ${inter.className}`}>{method.name}</h3>
                      </div>
                      <p
                        className={`text-xs ${isDark ? "text-white/50" : "text-black/50"} ${inter.className} mb-1.5 ${
                          isDark ? "group-hover:text-white/70" : "group-hover:text-black/70"
                        } transition-colors`}
                      >
                        {method.description}
                      </p>
                      <p
                        className={`text-xs font-mono ${isDark ? "text-white/70" : "text-black/70"} ${
                          isDark ? "group-hover:text-white" : "group-hover:text-black"
                        } transition-colors`}
                      >
                        {method.handle}
                      </p>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className={`mt-10 p-4 rounded-lg ${isDark ? "bg-white/[0.02]" : "bg-black/[0.02]"}`}
          >
            <h3 className={`text-xs font-medium ${isDark ? "text-white/80" : "text-black/80"} ${inter.className} mb-2`}>Availability</h3>
            <p className={`text-xs ${isDark ? "text-white/60" : "text-black/60"} ${inter.className} leading-relaxed`}>
              Currently open to freelance opportunities, internships, and full-time positions starting Summer 2026. I typically respond within 24-48
              hours.
            </p>
          </motion.div>

          {/* Footer */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-12 pt-6 border-t border-white/10">
            <p className={`text-[9px] ${isDark ? "text-white/30" : "text-black/30"} ${inter.className} text-center`}>
              © {new Date().getFullYear()} Kushal Prajapati
            </p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
