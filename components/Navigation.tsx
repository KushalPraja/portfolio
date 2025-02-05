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
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMenu = () => setIsVisible(!isVisible);

  return (
    <>
      {/* Navigation trigger area - different for mobile/desktop */}
      <div 
        className={`fixed z-40 ${isMobile ? 'top-4 left-4' : 'top-0 left-0 w-24 h-screen'}`}
        onMouseEnter={() => !isMobile && setIsVisible(true)}
        onMouseLeave={() => !isMobile && setIsVisible(false)}
        onClick={() => isMobile && toggleMenu()}
      >
        {/* Menu Icon */}
        <motion.div 
          className={`${isMobile ? 'relative' : 'fixed top-1/2 -translate-y-1/2 left-6'} text-black`}
          animate={{ 
            opacity: isVisible ? 0 : 1,
            x: isVisible ? -20 : 0
          }}
          transition={{ duration: 0.2 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hover:scale-110 transition-transform"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.div>

        <AnimatePresence>
          {isVisible && (
            <motion.nav 
              className={`fixed ${isMobile ? 'inset-0 bg-white/95' : 'top-8 left-8'} flex flex-col gap-3 font-[var(--font-geist-mono)] text-md`}
              initial={{ opacity: 0, x: isMobile ? -100 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isMobile ? -100 : -10 }}
              transition={{ duration: 0.2 }}
            >
              {isMobile && (
                <motion.button
                  className="absolute top-4 right-4"
                  onClick={() => setIsVisible(false)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </motion.button>
              )}
              <div className={`flex flex-col ${isMobile ? 'items-center justify-center h-full gap-8' : 'gap-3'}`}>
                {routes.map((route) => (
                  <motion.div
                    key={route.path}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => isMobile && setIsVisible(false)}
                  >
                    <Link 
                      href={route.path}
                      className={`text-md transition-all duration-200 relative group ${
                        isMobile ? 'text-2xl' : ''
                      } ${
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
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
