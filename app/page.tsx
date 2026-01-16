"use client";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
// Inter is provided globally in app/layout.tsx
import { useEffect, useState } from "react";
import CommandPalette from "@/components/CommandPalette";
import { FiMail, FiMoon, FiSun, FiCode } from "react-icons/fi";
import { RiArrowRightDownLine } from "react-icons/ri";
import Link from "next/link";
import { useTheme } from "@/lib/theme-context";

// global Inter applied in layout

// Dynamically import Background component to avoid SSR issues
const Background = dynamic(() => import("@/components/Background"), {
  ssr: false,
});

export default function Home() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
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
    // search state is managed inside CommandPalette

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
  ];

  // CommandPalette will handle filtering internally

  return (
    <>
      <Background />
      <div className="relative min-h-screen overflow-y-auto">
        {/* Command Palette (shared component) */}
        <CommandPalette
          isOpen={isCommandOpen}
          onClose={() => setIsCommandOpen(false)}
          menuItems={menuItems}
          onAsk={handleAskCommand}
        />

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
                } rounded-lg shadow-2xl border w-full max-w-2xl max-h-[600px] flex flex-col`}
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
        <section className="min-h-screen flex items-center justify-center px-4 py-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-2xl w-full">
            {/* Name with Social Links - Positioned Higher */}
            <motion.div
              className="mb-8 flex flex-row items-center justify-between sm:items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className={`${isDark ? "text-white" : "text-[#0a0a0a]"} text-base md:text-xl lg:text-2xl font-medium whitespace-nowrap`}>kushal praja</h1>

              {/* Social Links: stack vertically on small screens, inline on sm+ */}
              <div className="flex flex-col gap-y-1 sm:flex-row sm:gap-x-2 text-xs md:text-sm lg:text-base items-end sm:items-center">
                <a
                  href="https://www.linkedin.com/in/kushalpraja/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${isDark ? "text-white underline" : "text-black underline"}`}
                >
                  LinkedIn
                </a>
                <span className={`${isDark ? "text-white mx-2 select-none hidden sm:inline-block" : "text-black mx-2 select-none hidden sm:inline-block"}`}>/</span>
                <a
                  href="https://github.com/KushalPraja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${isDark ? "text-white underline" : "text-black underline"}`}
                >
                  GitHub
                </a>
                <span className={`${isDark ? "text-white mx-2 select-none hidden sm:inline-block" : "text-black mx-2 select-none hidden sm:inline-block"}`}>/</span>
                <a
                  href="https://x.com/KushalPraj"
                  className={`${isDark ? "text-white underline" : "text-black underline"}`}
                >
                  Twitter
                </a>
              </div>
            </motion.div>

            

            {/* Currently Section */}
            <motion.div className="mb-8" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
              <h2 className={`${isDark ? "text-white" : "text-[#0a0a0a]"} text-sm md:text-base lg:text-lg font-medium mb-3`}>currently</h2>
              <ul className={`space-y-2 ${isDark ? "text-white" : "text-[#0a0a0a]"} text-xs md:text-sm lg:text-base font-light ml-5`}>
                <li className="flex items-start gap-2">
                  <RiArrowRightDownLine size={16} className={isDark ? "text-white mt-0.5 flex-shrink-0" : "text-black mt-0.5 flex-shrink-0"} />
                  <span>
                    studying{" "}
                    <a
                      href="https://uwaterloo.ca/future-students/programs/computer-engineering"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`animate-underline ${isDark ? "hover:text-white" : "hover:text-black"} transition-colors`}
                    >
                      Computer Engineering
                    </a>
                    {" at "}
                    <a
                      href="https://uwaterloo.ca/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 ${isDark ? "hover:text-white" : "hover:text-black"} transition-colors`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/company_icons/University_of_Waterloo_logo-1-768x768.png" alt="" className="w-4 h-4 inline-block align-middle" />
                      <span className={`animate-underline`}>UWaterloo</span>
                    </a>
                  </span>
                </li>

                
                <li className="flex items-start gap-2">
                  <RiArrowRightDownLine size={14} className={isDark ? "text-white mt-0.5 flex-shrink-0" : "text-black mt-0.5 flex-shrink-0"} />
                  <span>
                    software developer at {" "}
                    <a
                      href="https://kaimaging.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 ${isDark ? "hover:text-white" : "hover:text-black"} transition-colors`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/company_icons/KA-Imaging.jpg" alt="" className="w-4 h-4 inline-block align-middle" />
                      <span className={`animate-underline`}>KA Imaging</span>
                    </a>{" "}
                  </span>
                </li>

                <li className="flex items-start gap-2">
                  <RiArrowRightDownLine size={14} className={isDark ? "text-white mt-0.5 flex-shrink-0" : "text-black mt-0.5 flex-shrink-0"} />
                  <span>building a 3d rendering engine in pygame</span>
                </li>
              </ul>
            </motion.div>

            {/* Previously Section (Work Experience) */}
            <motion.div className="mb-8" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
              <h2 className={`${isDark ? "text-white" : "text-[#0a0a0a]"} text-sm md:text-base lg:text-lg font-medium mb-3`}>previously</h2>
              <ul className={`space-y-2 ${isDark ? "text-white" : "text-[#0a0a0a]"} text-xs md:text-sm lg:text-base font-light ml-5`}>
                <li className="flex items-start gap-2">
                  <RiArrowRightDownLine size={16} className={isDark ? "text-white mt-0.5 flex-shrink-0" : "text-black mt-0.5 flex-shrink-0"} />
                  <span>
                    software engineer at{" "}
                    <a
                      href="https://www.levantalabs.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 ${isDark ? "hover:text-white" : "hover:text-black"} transition-colors`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/company_icons/levantalabs_logo.jpg" alt="" className="w-4 h-4 inline-block align-middle" />
                      <span className={`animate-underline`}>Levanta Labs</span>
                    </a>{" "}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <RiArrowRightDownLine size={14} className={isDark ? "text-white mt-0.5 flex-shrink-0" : "text-black mt-0.5 flex-shrink-0"} />
                  <span>
                    software engineer at{" "}
                    <a
                      href="https://www.watonomous.ca/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`animate-underline ${isDark ? "hover:text-white" : "hover:text-black"} transition-colors`}
                    >
                      WATonomous
                    </a>{" "}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <RiArrowRightDownLine size={14} className={isDark ? "text-white mt-0.5 flex-shrink-0" : "text-black mt-0.5 flex-shrink-0"} />
                  <span>
                    won <span>1st place</span> at <span>genai genesis 2025</span> building {" "}
                    <a
                      href="
                        https://github.com/KushalPraja/greenlens"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`animate-underline ${isDark ? "hover:text-white" : "hover:text-black"} transition-colors`}
                    >
                      GreenLens
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <RiArrowRightDownLine size={14} className={isDark ? "text-white mt-0.5 flex-shrink-0" : "text-black mt-0.5 flex-shrink-0"} />
                  <span>
                    built{" "}
                    <a
                      href="https://persona-eight-gamma.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`animate-underline ${isDark ? "hover:text-white" : "hover:text-black"} transition-colors`}
                    >
                      persona
                    </a>{" "}
                    at spurhacks
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* View All Projects Button */}
            <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}>
              <Link href="/projects">
                <motion.div
                  className={`group relative backdrop-blur-md rounded-lg p-4 transition-all duration-300 border ${
                    isDark
                      ? "bg-white/[0.02] border-white/10 hover:bg-white/[0.03] hover:border-white/15"
                      : "bg-black/[0.02] border-black/10 hover:bg-black/[0.03] hover:border-black/15"
                  }`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
                  }}
                >
                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`text-sm font-normal ${isDark ? "text-white group-hover:text-white" : "text-black group-hover:text-black"} transition-colors`}
                      >
                        <i>view my projects</i>
                      </span>

                      <RiArrowRightDownLine
                        size={18}
                        className={` ${
                          isDark ? "text-white group-hover:text-white" : "text-black group-hover:text-black"
                        } transition-all group-hover:translate-x-1`}
                      />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
