"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { GeistMono } from 'geist/font/mono';

const Background = dynamic(() => import("@/components/Background"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Background />
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center font-mono"
        >
          <motion.h1 
            className="text-5xl mb-4 tracking-tight text-[#111111] font-medium drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Kushal Prajapati
          </motion.h1>
            <motion.p 
            className={`text-[#000000] text-base tracking-wide drop-shadow-sm ${GeistMono.className} `}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            >
            COMPUTER ENGINEER
            </motion.p>
        </motion.div>
      </div>
    </>
  );
}
