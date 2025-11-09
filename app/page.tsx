"use client";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { useEffect, useState } from "react";
import { FiGithub, FiLinkedin, FiMail, FiMoon, FiSun, FiCode } from "react-icons/fi";
import { RiArrowRightDownLine } from "react-icons/ri";
import Link from "next/link";
import { useTheme } from "@/lib/theme-context";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });

// Dynamically import Background component to avoid SSR issues
const Background = dynamic(() => import("@/components/Background"), {
  ssr: false,
});

export default function Home() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isDark, toggleTheme } = useTheme();

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
        setIsChatOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleAskCommand = async (question: string) => {
    if (!question.trim()) return;

    setIsChatOpen(true);
    setIsCommandOpen(false);
    setSearchQuery("");

    const userMessage = { role: "user", content: question };
    setChatMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...chatMessages, userMessage] }),
      });

      const data = await response.json();
      setChatMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch {
      setChatMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I couldn't process that request." }]);
    } finally {
      setIsLoading(false);
    }
  };

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
      label: "ask",
      key: "a",
      description: "ask me anything with ai",
      isAskCommand: true,
      icon: FiMail,
    },
    {
      label: "projects",
      href: "/projects",
      key: "p",
      description: "view my work",
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
                    placeholder={searchQuery.startsWith("ask ") ? "ask me anything..." : "type a command or search..."}
                    className={`w-full bg-transparent text-xs outline-none ${
                      isDark ? "text-white placeholder:text-white/40" : "text-black placeholder:text-black/40"
                    }`}
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && searchQuery.startsWith("ask ")) {
                        const question = searchQuery.replace("ask ", "").trim();
                        handleAskCommand(question);
                      }
                    }}
                  />
                </div>
                <div className="p-2 max-h-[400px] overflow-y-auto">
                  {searchQuery.startsWith("ask ") ? (
                    <div className={`px-3 py-4 text-xs ${isDark ? "text-white/60" : "text-black/60"}`}>
                      press <kbd className={`px-1.5 py-0.5 ${isDark ? "bg-white/5" : "bg-black/5"} rounded text-[9px]`}>enter</kbd> to ask your
                      question
                    </div>
                  ) : filteredItems.length > 0 ? (
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
                      } else if (item.isAskCommand) {
                        // Ask command - sets up the input
                        return (
                          <button
                            key={item.label}
                            onClick={() => setSearchQuery("ask ")}
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

        {/* AI Chat Modal */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
              onClick={() => setIsChatOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className={`${
                  isDark ? "bg-[#0a0a0a] border-white/10" : "bg-white border-black/10"
                } rounded-lg shadow-2xl border w-full max-w-2xl max-h-[600px] flex flex-col ${inter.className}`}
              >
                <div className={`p-4 ${isDark ? "border-white/10" : "border-black/5"} border-b flex items-center justify-between`}>
                  <h3 className={`text-sm font-medium ${isDark ? "text-white" : "text-black"}`}>Ask me anything</h3>
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className={`${isDark ? "text-white/40 hover:text-white" : "text-black/40 hover:text-black"} transition-colors`}
                  >
                    ✕
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.length === 0 ? (
                    <div className={`text-center py-12 text-sm ${isDark ? "text-white/40" : "text-black/40"}`}>
                      Start a conversation by asking a question
                    </div>
                  ) : (
                    chatMessages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                            msg.role === "user"
                              ? isDark
                                ? "bg-white text-black"
                                : "bg-black text-white"
                              : isDark
                              ? "bg-white/10 text-white/80"
                              : "bg-black/5 text-black/80"
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))
                  )}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className={`${isDark ? "bg-white/10 text-white/40" : "bg-black/5 text-black/40"} rounded-lg px-4 py-2 text-sm`}>
                        Thinking...
                      </div>
                    </div>
                  )}
                </div>

                <div className={`p-4 ${isDark ? "border-white/10" : "border-black/5"} border-t`}>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type your question..."
                      className={`flex-1 ${
                        isDark ? "bg-white/5 text-white placeholder:text-white/40" : "bg-black/5 text-black placeholder:text-black/40"
                      } rounded-lg px-4 py-2 text-sm outline-none`}
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleAskCommand(chatInput);
                          setChatInput("");
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        handleAskCommand(chatInput);
                        setChatInput("");
                      }}
                      disabled={isLoading || !chatInput.trim()}
                      className={`${
                        isDark ? "bg-white text-black hover:bg-white/80" : "bg-black text-white hover:bg-black/80"
                      } px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed`}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content - Perfectly Centered */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-2xl w-full">
            {/* Name - Positioned Higher */}
            <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
              <h1
                className={`text-3xl md:text-4xl mb-2 tracking-tight ${isDark ? "text-white" : "text-[#0a0a0a]"} font-normal ${playfair.className}`}
              >
                kushal prajapati
              </h1>
              <p className={`${isDark ? "text-white/60" : "text-[#0a0a0a]/60"} text-sm ${inter.className}`}>
                <a
                  href="https://uwaterloo.ca/future-students/programs/computer-engineering"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`animate-underline ${isDark ? "hover:text-white/80" : "hover:text-black/80"} transition-colors`}
                >
                  Computer Engineering
                </a>
                {" @ "}
                <a
                  href="https://uwaterloo.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 animate-underline ${
                    isDark ? "hover:text-white/80" : "hover:text-black/80"
                  } transition-colors`}
                >
                  University of Waterloo
                </a>
              </p>
            </motion.div>

            {/* About Me Section */}
            <motion.div className="mb-8" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
              <h2 className={`${isDark ? "text-white/80" : "text-[#0a0a0a]/80"} text-sm font-medium ${inter.className} mb-3`}>about me</h2>
              <ul className={`space-y-2 ${isDark ? "text-white/70" : "text-[#0a0a0a]/70"} text-sm ${inter.className} ml-5`}>
                <motion.li className="flex items-start gap-2 group cursor-pointer" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <RiArrowRightDownLine size={16} className={isDark ? "text-white/30 mt-0.5 flex-shrink-0" : "text-black/30 mt-0.5 flex-shrink-0"} />
                  <span>
                    Second-year{" "}
                    <a
                      href="https://uwaterloo.ca/future-students/programs/computer-engineering"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`animate-underline font-medium ${isDark ? "hover:text-white" : "hover:text-black"} transition-colors`}
                    >
                      Computer Engineering
                    </a>{" "}
                    student passionate about <span className="font-medium">AI</span>, <span className="font-medium">full-stack development</span>, and
                    building products that solve real problems
                  </span>
                </motion.li>
                <motion.li className="flex items-start gap-2 group cursor-pointer" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <RiArrowRightDownLine size={14} className={isDark ? "text-white/30 mt-0.5 flex-shrink-0" : "text-black/30 mt-0.5 flex-shrink-0"} />
                  <span>
                    When I&apos;m not coding, you&apos;ll find me playing{" "}
                    <a
                      href="https://op.gg/lol/summoners/na/link-NA69"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`animate-underline ${isDark ? "hover:text-white" : "hover:text-black"} transition-colors`}
                    >
                      LoL
                    </a>
                    , ricing my Linux distro, or snapping photos
                  </span>
                </motion.li>
              </ul>
            </motion.div>

            {/* Currently Section */}
            <motion.div className="mb-8" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
              <h2 className={`${isDark ? "text-white/80" : "text-[#0a0a0a]/80"} text-sm font-medium ${inter.className} mb-3`}>currently</h2>
              <ul className={`space-y-2 ${isDark ? "text-white/70" : "text-[#0a0a0a]/70"} text-sm ${inter.className} ml-5`}>
                <motion.li className="flex items-start gap-2 group cursor-pointer" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <RiArrowRightDownLine size={16} className={isDark ? "text-white/30 mt-0.5 flex-shrink-0" : "text-black/30 mt-0.5 flex-shrink-0"} />
                  <span>
                    Studying{" "}
                    <a
                      href="https://uwaterloo.ca/future-students/programs/computer-engineering"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`animate-underline font-medium ${isDark ? "hover:text-white" : "hover:text-black"} transition-colors`}
                    >
                      Computer Engineering
                    </a>
                    {" at "}
                    <a
                      href="https://uwaterloo.ca/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 animate-underline font-medium ${
                        isDark ? "hover:text-white" : "hover:text-black"
                      } transition-colors`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/company_icons/University_of_Waterloo_logo-1-768x768.png" alt="" className="w-3 h-3 rounded-sm inline-block" />
                      UWaterloo
                    </a>
                    , focusing on <span className="font-medium">AI/ML</span> and <span className="font-medium">systems design</span>
                  </span>
                </motion.li>
                <motion.li className="flex items-start gap-2 group cursor-pointer" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <RiArrowRightDownLine size={14} className={isDark ? "text-white/30 mt-0.5 flex-shrink-0" : "text-black/30 mt-0.5 flex-shrink-0"} />
                  <span>
                    Building{" "}
                    <a
                      href="https://github.com/KushalPraja/Thorem"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`animate-underline font-medium ${isDark ? "hover:text-white" : "hover:text-black"} transition-colors`}
                    >
                      Thorem
                    </a>
                    : <span className="font-medium">AI-powered</span> handwritten notes to LaTeX converter
                  </span>
                </motion.li>
              </ul>
            </motion.div>

            {/* Previously Section (Work Experience) */}
            <motion.div className="mb-8" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
              <h2 className={`${isDark ? "text-white/80" : "text-[#0a0a0a]/80"} text-sm font-medium ${inter.className} mb-3`}>previously</h2>
              <ul className={`space-y-2 ${isDark ? "text-white/70" : "text-[#0a0a0a]/70"} text-sm ${inter.className} ml-5`}>
                <motion.li className="flex items-start gap-2 group cursor-pointer" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <RiArrowRightDownLine size={16} className={isDark ? "text-white/30 mt-0.5 flex-shrink-0" : "text-black/30 mt-0.5 flex-shrink-0"} />
                  <span>
                    Software Engineer @{" "}
                    <a
                      href="https://www.levantalabs.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 animate-underline ${
                        isDark ? "hover:text-white" : "hover:text-black"
                      } transition-colors`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/company_icons/levantalabs_logo.jpg" alt="" className="w-3 h-3 rounded-sm inline-block" />
                      Levanta Labs
                    </a>{" "}
                    - developing scalable B2B SaaS platforms
                  </span>
                </motion.li>
                <motion.li className="flex items-start gap-2 group cursor-pointer" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <RiArrowRightDownLine size={14} className={isDark ? "text-white/30 mt-0.5 flex-shrink-0" : "text-black/30 mt-0.5 flex-shrink-0"} />
                  <span>
                    Software Engineer @{" "}
                    <a
                      href="https://www.watonomous.ca/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`animate-underline font-medium ${isDark ? "hover:text-white" : "hover:text-black"} transition-colors`}
                    >
                      WATonomous
                    </a>{" "}
                    - developed PID algorithms for autonomous systems
                  </span>
                </motion.li>
                <motion.li className="flex items-start gap-2 group cursor-pointer" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <RiArrowRightDownLine size={14} className={isDark ? "text-white/30 mt-0.5 flex-shrink-0" : "text-black/30 mt-0.5 flex-shrink-0"} />
                  <span>
                    Won <span className="font-medium">1st place</span> at <span className="font-medium">Google Genesis AI Hackathon</span> (700+
                    participants)
                  </span>
                </motion.li>
                <motion.li className="flex items-start gap-2 group cursor-pointer" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <RiArrowRightDownLine size={14} className={isDark ? "text-white/30 mt-0.5 flex-shrink-0" : "text-black/30 mt-0.5 flex-shrink-0"} />
                  <span>
                    Built{" "}
                    <a
                      href="https://persona-eight-gamma.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`animate-underline font-medium ${isDark ? "hover:text-white" : "hover:text-black"} transition-colors`}
                    >
                      Persona
                    </a>{" "}
                    at <span className="font-medium">SpurHacks</span>: AI assistant unifying product documentation
                  </span>
                </motion.li>
              </ul>
            </motion.div>

            {/* View All Projects Button */}
            <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}>
              <Link href="/projects">
                <motion.div
                  className={`group relative backdrop-blur-md rounded-lg p-4 transition-all duration-300 border ${
                    isDark
                      ? "bg-white/[0.03] border-white/15 hover:bg-white/[0.06] hover:border-white/25"
                      : "bg-black/[0.03] border-black/15 hover:bg-black/[0.06] hover:border-black/25"
                  }`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 12 12"
                        fill="none"
                        className={`${
                          isDark ? "stroke-white/50 group-hover:stroke-white/70" : "stroke-black/50 group-hover:stroke-black/70"
                        } transition-colors`}
                      >
                        <path d="M2 6h8M6 2v8" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span
                        className={`text-sm ${isDark ? "text-white/70 group-hover:text-white" : "text-black/70 group-hover:text-black"} ${
                          inter.className
                        } transition-colors`}
                      >
                        view my projects
                      </span>
                    </div>
                    <RiArrowRightDownLine
                      size={18}
                      className={`rotate-90 ${
                        isDark ? "text-white/40 group-hover:text-white/70" : "text-black/40 group-hover:text-black/70"
                      } transition-all group-hover:translate-x-1`}
                    />
                  </div>
                </motion.div>
              </Link>
            </motion.div>

            {/* Social Links & Ctrl+Q Indicator - Centered */}
            <motion.div
              className="flex flex-col items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="flex items-center gap-4">
                <motion.a
                  href="https://github.com/KushalPraja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${isDark ? "text-white/50 hover:text-white" : "text-black/50 hover:text-black"} transition-colors`}
                  aria-label="GitHub"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiGithub size={14} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/kushalpraja/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${isDark ? "text-white/50 hover:text-white" : "text-black/50 hover:text-black"} transition-colors`}
                  aria-label="LinkedIn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiLinkedin size={14} />
                </motion.a>
                <motion.a
                  href="mailto:kushalpraja6@gmail.com"
                  className={`${isDark ? "text-white/50 hover:text-white" : "text-black/50 hover:text-black"} transition-colors`}
                  aria-label="Email"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiMail size={14} />
                </motion.a>
              </div>

              {/* Ctrl+Q Indicator */}
              <motion.button
                onClick={() => setIsCommandOpen(true)}
                className={`text-[9px] ${isDark ? "text-white/40 hover:text-white/60" : "text-black/40 hover:text-black/60"} transition-colors ${
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

              {/* Footer */}
              <p className={`text-[9px] ${isDark ? "text-white/30" : "text-black/30"} ${inter.className}`}>
                © {new Date().getFullYear()} Kushal Prajapati
              </p>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
