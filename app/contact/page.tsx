"use client";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center font-mono"
      >
        <h1 className="text-3xl text-[#111111]">Contact</h1>
      </motion.div>
    </div>
  );
}
