"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { GeistMono } from 'geist/font/mono';
import { useEffect, useState } from 'react';

const Background = dynamic(() => import("@/components/Background"), {
  ssr: false,
});

export default function Home() {
  const [time, setTime] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

        {/* Time indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`fixed ${isMobile ? 'top-4 right-4 text-sm' : 'top-8 right-8 text-md'} text-black/60 hover:text-black transition-colors`}
        >
          {time && `[ ${time} ]`}
        </motion.div>

        {/* Location indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`fixed ${isMobile ? 'bottom-4 right-4 text-sm' : 'bottom-8 right-8 text-md'} text-black/60 hover:text-black transition-colors`}
        >
          [ Waterloo, Ontario ]
        </motion.div>
      </div>
    </>
  );
}
