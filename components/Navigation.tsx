"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const routes = [
  { path: "/", label: "HOME" },
  { path: "/projects", label: "PROJECTS" },
  { path: "/about", label: "ABOUT" },
  { path: "/contact", label: "CONTACT" },
];

const navVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export default function Navigation() {
  const pathname = usePathname();
  const [time, setTime] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Navigation trigger area with improved visual indicator */}
      <div 
        className="fixed top-0 left-0 w-24 h-screen z-40"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {/* Navigation indicator */}
        <motion.div 
          className="fixed top-1/2 -translate-y-1/2 left-4 flex flex-col items-center gap-1"
          animate={{ 
            opacity: isVisible ? 0 : 1,
            x: isVisible ? -20 : 0
          }}
          transition={{ duration: 0.2 }}
        >
          <span className="block w-4 h-[1px] bg-black/40" />
          <span className="block w-2 h-[1px] bg-black/40" />
          <span className="block w-3 h-[1px] bg-black/40" />
        </motion.div>

        <AnimatePresence>
          {isVisible && (
            <motion.nav 
              className="fixed top-8 left-8 flex flex-col gap-3 font-[var(--font-geist-mono)] text-md"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {routes.map((route) => (
                <motion.div
                  key={route.path}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    href={route.path}
                    className={`text-md transition-all duration-200 relative group ${
                      pathname === route.path ? "text-black" : "text-black/60 hover:text-black"
                    }`}
                  >
                    <span className="relative">
                      {route.label}
                      {pathname === route.path && (
                        <motion.span 
                          layoutId="activeIndicator"
                          className="absolute -bottom-1 left-0 w-full h-[1px] bg-black"
                          transition={{ duration: 0.2 }}
                        />
                      )}
                      <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-black/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Visual indicator for nav area */}
        <motion.div 
          className="fixed top-0 left-0 w-1 h-screen bg-black/5"
          animate={{ 
            opacity: isVisible ? 1 : 0.3,
            width: isVisible ? "2px" : "1px"
          }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Time and Location with consistent styling */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed top-8 right-8 text-md text-black/60 hover:text-black transition-colors"
      >
        {time && `[ ${time} ]`}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed bottom-8 right-8 text-md text-black/60 hover:text-black transition-colors"
      >
        [ Waterloo, Ontario ]
      </motion.div>
    </>
  );
}
