"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

const links = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/contact", label: "contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Wait for initial loading to complete
    const timer = setTimeout(() => setIsLoading(false)); // Adjust timing to match your loading screen
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return null;

  return (
    <>
      {isMobile ? (
        // Mobile Navigation
        <motion.nav 
          className=" top-8 m-2 left-8 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 flex items-center justify-center"
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="w-5 h-5 text-foreground" />
            </motion.button>

          <AnimatePresence>
            {isOpen && (
              <>
                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-background backdrop-blur-sm z-50"
                  onClick={() => setIsOpen(false)}
                />

                {/* Mobile Menu - Start below navbar */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="fixed inset-x-0 top-24 z-50 flex flex-col items-center gap-8 p-8"
                >
                  {links.map(({ href, label }) => (
                    <motion.div
                      key={href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="w-full max-w-sm"
                    >
                      <Link 
                        href={href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block text-center text-xl py-3 px-4 rounded-lg transition-colors",
                          pathname === href 
                            ? "bg-primary/10 text-primary font-medium" 
                            : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                        )}
                      >
                        {label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.nav>
      ) : (
        // Desktop Navigation
        <motion.nav 
          className="fixed top-8 left-8 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onHoverStart={() => setIsOpen(true)}
          onHoverEnd={() => setIsOpen(false)}
        >
          <div className="relative">
            {/* Minimal Trigger */}
            <motion.div
              className="flex justify-center items-center gap-2 py-2 px-3 bg-black/[0.02] rounded-lg shadow-md backdrop-blur-sm border border-black/5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="w-4 h-4 text-foreground hover:text-primary transition-colors" />
                <span className="text-sm text-foreground hover:text-primary transition-colors">menu</span>
            </motion.div>

            {/* Navigation Menu */}
            <AnimatePresence>
              {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute left-0 top-12 bg-background/80 backdrop-blur-sm rounded-lg p-2 min-w-[140px] shadow-lg"
              >
                {links.map(({ href, label }) => (
                <Link 
                  key={href} 
                  href={href}
                  className={cn(
                  "relative block px-3 py-2 text-sm rounded-md transition-colors",
                  pathname === href 
                    ? "text-primary font-medium bg-primary/10" 
                    : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                  )}
                >
                  {label}
                  {pathname === href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-primary/10 rounded-md -z-10"
                    transition={{ duration: 0.3 }}
                  />
                  )}
                </Link>
                ))}
              </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      )}
    </>
  );
}
