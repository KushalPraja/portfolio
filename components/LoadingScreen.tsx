"use client";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("initializing");

  const loadingSteps = [
    "initializing system",
    "loading modules",
    "compiling portfolio",
    "finalizing"
  ];

  useEffect(() => {
    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        const currentIndex = loadingSteps.indexOf(prev);
        return loadingSteps[(currentIndex + 1) % loadingSteps.length];
      });
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          setTimeout(() => setIsLoading(false), 1000);
          return 100;
        }
        return prev + 0.5;
      });
    }, 20);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#f5f0f0] z-50 flex flex-col items-center justify-center font-mono"
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" }
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-80 space-y-6"
          >
            {/* Name heading */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-medium text-black/80 mb-8 text-center"
            >
              Kushal Prajapati
            </motion.div>

            <div className="text-center space-y-3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-black/70 h-6"
              >
                [ {loadingText} ]
              </motion.div>
              <div className="text-4xl font-medium text-black tracking-tight">
                {progress.toFixed(0)}%
              </div>
            </div>
            
            <div className="h-[2px] w-full bg-black/5 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-black"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <motion.div 
              className="flex justify-between text-xs text-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.span
                animate={{
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                loading portfolio
              </motion.span>
              <span className="font-medium">{`{${progress.toFixed(0)}/100}`}</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
