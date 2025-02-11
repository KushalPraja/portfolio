"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { GeistMono } from 'geist/font/mono';
import { useEffect, useState } from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

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
            className={`text-5xl mb-4 tracking-tight text-[#111111] font-medium drop-shadow-md ${isMobile ? 'px-4' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            >
            Kushal Prajapati
            </motion.h1>
            <motion.p 
            className={`text-[#000000] text-base tracking-wide drop-shadow-sm ${GeistMono.className} mb-12`} // Added mb-12 for spacing
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            >
            COMPUTER ENGINEER
            </motion.p>
            
            <motion.div
            className={`flex justify-center items-center gap-8 py-3 px-6 bg-black/[0.02] rounded-lg 
            backdrop-blur-sm border border-black/5 ${isMobile ? 'mt-8' : 'mt-12'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            >
              <a
                href="https://github.com/KushalPraja"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-black/80 hover:text-black transition-colors"
              >
                <FiGithub size={20} />
              </a>
              <a
                href="https://linkedin.com/in/KushalPraj"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-black/80 hover:text-black transition-colors"
              >
                <FiLinkedin size={20} />
              </a>
              <a
                href="mailto:kushalpraja6@gmail.com"
                className="flex items-center gap-2 text-black/80 hover:text-black transition-colors"
              >
                <FiMail size={20} />
              </a>
            </motion.div>
        </motion.div>

        {/* Time indicator - exactly aligned with nav icon */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`fixed top-[2.25rem] right-8 text-md text-black font- ${GeistMono.className}`}
            style={{ lineHeight: '34px' }} // Matches CodeIcon height
          >
            {time && `[ ${time} ]`}
          </motion.div>
        )}

        {/* Location indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`fixed ${isMobile ? 'bottom-4 right-4 text-sm' : 'bottom-8 right-8 text-md'} text-black`}
        >
          [ Waterloo, Ontario ]
        </motion.div>
      </div>
    </>
  );
}
