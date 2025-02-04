"use client";
import { motion } from "framer-motion";

export default function Projects() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center font-mono"
      >
        <h1 className="text-4xl text-[#111111] drop-shadow-md">Projects</h1>
      </motion.div>
    </div>
  );
}
