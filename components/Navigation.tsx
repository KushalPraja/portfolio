"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const routes = [
  { path: "/", label: "home" },
  { path: "/projects", label: "projects" },
  { path: "/about", label: "about" },
  { path: "/contact", label: "contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  
  return (
    <motion.nav 
      className="fixed top-8 left-8 flex flex-col gap-2 font-mono text-sm"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      {routes.map((route) => (
        <Link 
          key={route.path} 
          href={route.path}
          className={`hover:text-black transition-colors ${
            pathname === route.path ? "text-black" : "text-neutral-400"
          }`}
        >
          [ {route.label} ]
        </Link>
      ))}
    </motion.nav>
  );
}
