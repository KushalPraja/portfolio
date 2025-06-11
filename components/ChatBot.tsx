"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GeistMono } from "geist/font/mono";
import { FiSend, FiMessageCircle, FiUser, FiCpu, FiMaximize2, FiMinimize2, FiX } from "react-icons/fi";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hey hey! 🤖 I'm *totally* Kushal. Well... his digital clone ofc. I come preloaded with all his projects, hobbies, and questionable habits. What do you wanna know about me? 😎💻",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 320, height: 384 });
  const [isResizing, setIsResizing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // Listen for preset message events
  useEffect(() => {
    const handlePresetMessage = (event: CustomEvent) => {
      const { message } = event.detail;
      setIsExpanded(true);
      // Small delay to ensure chat is open before sending message
      setTimeout(() => {
        setInputMessage(message);
        // Auto-send the message after a short delay
        setTimeout(() => {
          if (message.trim()) {
            const userMessage: Message = {
              id: Date.now().toString(),
              content: message.trim(),
              isUser: true,
              timestamp: new Date(),
            };

            setMessages((prev) => [...prev, userMessage]);
            setInputMessage("");
            setIsLoading(true);

            fetch("/api/chat", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ message: message.trim() }),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Failed to get response");
                }
                return response.json();
              })
              .then((data) => {
                const botMessage: Message = {
                  id: (Date.now() + 1).toString(),
                  content: data.response,
                  isUser: false,
                  timestamp: new Date(),
                };
                setMessages((prev) => [...prev, botMessage]);
              })
              .catch((error) => {
                console.error("Error sending message:", error);
                const errorMessage: Message = {
                  id: (Date.now() + 1).toString(),
                  content: "Sorry, I'm having trouble connecting right now. Please try again later!",
                  isUser: false,
                  timestamp: new Date(),
                };
                setMessages((prev) => [...prev, errorMessage]);
              })
              .finally(() => {
                setIsLoading(false);
              });
          }
        }, 300);
      }, 100);
    };

    window.addEventListener("openChatWithMessage", handlePresetMessage as EventListener);
    return () => {
      window.removeEventListener("openChatWithMessage", handlePresetMessage as EventListener);
    };
  }, []);

  // Resize functionality
  const handleResizeStart = useCallback(
    (e: React.MouseEvent, direction: string) => {
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(true);

      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = dimensions.width;
      const startHeight = dimensions.height;

      const handleMouseMove = (e: MouseEvent) => {
        let newWidth = startWidth;
        let newHeight = startHeight;

        if (direction.includes("right")) {
          newWidth = Math.max(300, Math.min(800, startWidth + (e.clientX - startX)));
        }
        if (direction.includes("left")) {
          newWidth = Math.max(300, Math.min(800, startWidth - (e.clientX - startX)));
        }
        if (direction.includes("bottom")) {
          newHeight = Math.max(400, Math.min(700, startHeight + (e.clientY - startY)));
        }
        if (direction.includes("top")) {
          newHeight = Math.max(400, Math.min(700, startHeight - (e.clientY - startY)));
        }

        setDimensions({ width: newWidth, height: newHeight });
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [dimensions]
  );

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputMessage.trim() }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting right now. Please try again later!",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isExpanded) {
    return (
      <motion.div
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {/* Pulsing ring animation */}
        <motion.div
          className="absolute inset-0 w-12 h-12 md:w-14 md:h-14 bg-[#f5f0f0]/30 rounded-lg"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Secondary pulse */}
        <motion.div
          className="absolute inset-0 w-12 h-12 md:w-14 md:h-14 bg-[#f5f0f0]/20 rounded-lg"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        {/* Main button */}
        <motion.button
          onClick={() => setIsExpanded(true)}
          className="relative w-12 h-12 md:w-14 md:h-14 bg-[#f5f0f0]/95 backdrop-blur-sm border border-black/10 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group overflow-hidden"
          whileHover={{
            scale: 1.1,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#f5f0f0] to-[#e8ddd4] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
          />

          {/* Icon with bounce animation */}
          <motion.div
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10"
          >
            <FiMessageCircle size={20} className="text-black/70 group-hover:text-black transition-colors duration-300" />
          </motion.div>

          {/* Sparkle effect */}
          <motion.div
            className="absolute top-1 right-1 w-1 h-1 bg-black/40 rounded-full"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 0.3,
            }}
          />
          <motion.div
            className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-black/30 rounded-full"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 0.8,
            }}
          />
        </motion.button>
      </motion.div>
    );
  }

  return (
    <>
      {/* Fullscreen overlay */}
      {isFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 pointer-events-none"
        />
      )}

      <motion.div
        ref={chatRef}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{
          opacity: 1,
          scale: 1,
          x: isFullscreen ? "-50%" : 0,
          y: isFullscreen ? "-50%" : 0,
        }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        style={{
          width: isFullscreen ? "90vw" : `${dimensions.width}px`,
          height: isFullscreen ? "90vh" : `${dimensions.height}px`,
          maxWidth: isFullscreen ? "1200px" : "none",
          maxHeight: isFullscreen ? "800px" : "none",
        }}
        className={`
          fixed z-50 bg-[#f5f0f0]/95 backdrop-blur-sm border border-black/10 shadow-xl
          ${isFullscreen ? "top-1/2 left-1/2 rounded-2xl" : "bottom-4 right-4 md:bottom-6 md:right-6 rounded-xl"}
          ${isResizing ? "select-none" : ""}
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-black/5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-black/5 rounded-full">
              <FiCpu size={16} className="text-black" />
            </div>
            <div>
              <h3 className={`${GeistMono.className} text-sm font-medium`}>Chat with Kushal</h3>
              <p className="text-xs text-black/60">AI Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={toggleFullscreen}
              className="p-1.5 hover:bg-black/5 rounded-full transition-colors"
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <FiMinimize2 size={14} /> : <FiMaximize2 size={14} />}
            </button>
            <button onClick={() => setIsExpanded(false)} className="p-1 hover:bg-black/5 rounded-full transition-colors">
              <FiX size={16} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex items-start gap-2 max-w-[80%] ${message.isUser ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`p-1.5 rounded-full ${message.isUser ? "bg-black/10" : "bg-black/5"}`}>
                    {message.isUser ? <FiUser size={12} /> : <FiCpu size={12} />}
                  </div>
                  <div className={`px-3 py-2 rounded-lg text-sm ${message.isUser ? "bg-black text-white" : "bg-white/70 text-black border border-black/5"}`}>
                    {message.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <div className="flex items-start gap-2">
                <div className="p-1.5 bg-black/5 rounded-full">
                  <FiCpu size={12} />
                </div>
                <div className="px-3 py-2 rounded-lg bg-white/70 border border-black/5">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex-shrink-0 p-4 border-t border-black/5 bg-white/50">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about Kushal..."
              className={`flex-1 px-3 py-2 text-sm bg-white/70 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 ${GeistMono.className}`}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="p-2 bg-black text-white rounded-lg hover:bg-black/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiSend size={16} />
            </button>
          </div>
        </div>

        {/* Resize handles - only show when not in fullscreen */}
        {!isFullscreen && (
          <>
            {/* Corner handles */}
            <div
              className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-transparent hover:bg-black/10 transition-colors"
              onMouseDown={(e) => handleResizeStart(e, "bottom-right")}
            >
              <div className="absolute bottom-1 right-1 w-2 h-2 bg-black/30 rounded-sm" />
            </div>
            <div
              className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize bg-transparent hover:bg-black/10 transition-colors"
              onMouseDown={(e) => handleResizeStart(e, "top-right")}
            >
              <div className="absolute top-1 right-1 w-2 h-2 bg-black/30 rounded-sm" />
            </div>
            <div
              className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize bg-transparent hover:bg-black/10 transition-colors"
              onMouseDown={(e) => handleResizeStart(e, "bottom-left")}
            >
              <div className="absolute bottom-1 left-1 w-2 h-2 bg-black/30 rounded-sm" />
            </div>
            <div
              className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize bg-transparent hover:bg-black/10 transition-colors"
              onMouseDown={(e) => handleResizeStart(e, "top-left")}
            >
              <div className="absolute top-1 left-1 w-2 h-2 bg-black/30 rounded-sm" />
            </div>

            {/* Edge handles */}
            <div
              className="absolute top-0 left-4 right-4 h-2 cursor-n-resize bg-transparent hover:bg-black/5 transition-colors"
              onMouseDown={(e) => handleResizeStart(e, "top")}
            />
            <div
              className="absolute bottom-0 left-4 right-4 h-2 cursor-s-resize bg-transparent hover:bg-black/5 transition-colors"
              onMouseDown={(e) => handleResizeStart(e, "bottom")}
            />
            <div
              className="absolute left-0 top-4 bottom-4 w-2 cursor-w-resize bg-transparent hover:bg-black/5 transition-colors"
              onMouseDown={(e) => handleResizeStart(e, "left")}
            />
            <div
              className="absolute right-0 top-4 bottom-4 w-2 cursor-e-resize bg-transparent hover:bg-black/5 transition-colors"
              onMouseDown={(e) => handleResizeStart(e, "right")}
            />
          </>
        )}
      </motion.div>
    </>
  );
}
