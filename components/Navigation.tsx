"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const routes = [
  { path: "/", label: "HOME" },
  { path: "/projects", label: "PROJECTS" },
  { path: "/about", label: "ABOUT" },
  { path: "/contact", label: "CONTACT" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [time, setTime] = useState("");

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
      <motion.nav 
        className="fixed top-8 left-8 flex flex-col gap-2 font-[var(--font-geist-mono)] text-md"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        {routes.map((route) => (
          <Link 
            key={route.path} 
            href={route.path}
            className={`text-md transition-colors font-regular ${
              pathname === route.path ? "underline text-black" : "no-underline text-black/70"
            }`}
          >
              {route.label} 
          </Link>
        ))}
      </motion.nav>
      <motion.div
        className="fixed top-8 right-8 text-md text-black font-regular"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        {time && `[ ${time} ]`}
      </motion.div>
      <motion.div 
        className="fixed bottom-8 right-8 text-md text-black font-regular"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        [ Waterloo, Ontario ]
      </motion.div>
    </>
  );
}
