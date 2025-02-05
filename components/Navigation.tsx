"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CodeIcon } from "lucide-react";

const links = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/contact", label: "contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Wait for initial loading to complete
    const timer = setTimeout(() => setIsLoading(false), 2000); // Adjust timing to match your loading screen
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return null;

  return (
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
          className="w-10 h-10 flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <CodeIcon className="w-5 h-5 text-foreground hover:text-primary transition-colors" />
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
                    "relative block px-3 py-2 text-sm rounded-md transition-colors hover:bg-primary/10",
                    pathname === href ? "text-primary font-medium" : "text-muted-foreground"
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
  );
}
