"use client";
import { motion } from "framer-motion"; // Removed AnimatePresence since it's not used
import dynamic from "next/dynamic";
import { GeistMono } from 'geist/font/mono';
import { useEffect, useState, useRef } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiExternalLink, FiCode, FiDatabase, FiPlay } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import React from "react";
import RadarSkillsChart from "@/components/RadarSkillsChart";
import ChatBot from "@/components/ChatBot";

// Dynamically import Background component to avoid SSR issues
const Background = dynamic(() => import("@/components/Background"), {
  ssr: false,
});

const TimeDisplay = dynamic(() => import("@/components/TimeDisplay"), {
  ssr: false,
});

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  // Keeping activeSection for potential future use, but adding eslint-disable to prevent warning
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeSection, setActiveSection] = useState("hero");

  // Refs for scrolling to sections
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set loaded state after a slight delay for animations
    const timer = setTimeout(() => setIsLoaded(true), 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll events to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      const sections = [
        { ref: heroRef, id: "hero" },
        { ref: aboutRef, id: "about" },
        { ref: projectsRef, id: "projects" },
        { ref: skillsRef, id: "skills" },
        { ref: experienceRef, id: "experience" },
        { ref: achievementsRef, id: "achievements" },
        { ref: chatRef, id: "chat" },
        { ref: contactRef, id: "contact" },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current && scrollPosition >= section.ref.current.offsetTop) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to a section when clicked
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: "smooth"
      });
    }
  };

  // Handle suggestion clicks to open chat with preset message
  const handleSuggestionClick = (message: string) => {
    // Create a custom event to trigger the chat with a specific message
    const event = new CustomEvent('openChatWithMessage', { 
      detail: { message } 
    });
    window.dispatchEvent(event);
  };

  // Reusable section scroll indicator
  const SectionScrollIndicator = ({ targetRef }: { targetRef: React.RefObject<HTMLDivElement> }) => (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
      <motion.button
        onClick={() => scrollToSection(targetRef)}
        className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7, y: [0, 5, 0] }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }
        }}
      >
        <span className={`${GeistMono.className} text-xs mb-1`}>Scroll</span>
        <FiArrowDown size={16} />
      </motion.button>
    </div>
  );

  return (
    <>
      <Background />
      <div className="relative">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center"
        >
          {/* 3D Logo - visible on larger screens */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: isLoaded ? 1 : 0,
                scale: isLoaded ? 1 : 0.9
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute top-24 left-12"
            >

            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center font-mono z-10"
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
                className={`text-[#000000] text-base tracking-wide drop-shadow-sm ${GeistMono.className} mb-8`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                COMPUTER ENGINEER
              </motion.p>

              <motion.div
                className={`flex justify-center items-center gap-6 py-3 px-8 bg-black/[0.02] rounded-lg
                backdrop-blur-sm border border-black/5 mb-12 ${isMobile ? 'mx-4' : ''}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <a
                  href="https://github.com/KushalPraja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-black/75 hover:text-black transition-colors group"
                >
                  <FiGithub size={18} className="group-hover:scale-110 transition-transform" />
                  <span className={`${GeistMono.className} text-sm hidden md:inline`}>GitHub</span>
                </a>
                <span className="hidden md:inline text-black/20">|</span>
                <a
                  href="https://www.linkedin.com/in/kushalpraja/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-black/75 hover:text-black transition-colors group"
                >
                  <FiLinkedin size={18} className="group-hover:scale-110 transition-transform" />
                  <span className={`${GeistMono.className} text-sm hidden md:inline`}>LinkedIn</span>
                </a>
                <span className="hidden md:inline text-black/20">|</span>
                <a
                  href="mailto:kushalpraja6@gmail.com"
                  className="flex items-center gap-2 text-black/75 hover:text-black transition-colors group"
                >
                  <FiMail size={18} className="group-hover:scale-110 transition-transform" />
                  <span className={`${GeistMono.className} text-sm hidden md:inline`}>Email</span>
                </a>
              </motion.div>

              {/* Scroll down indicator */}
              <SectionScrollIndicator targetRef={aboutRef} />
          </motion.div>

          {/* Time indicator - exactly aligned with nav icon */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`fixed top-[2.25rem] right-8 text-base text-black font- ${GeistMono.className} z-50`}
              style={{ lineHeight: '34px' }} // Matches CodeIcon height
            >
              <TimeDisplay />
            </motion.div>
          )}


        </section>

        {/* About Me Section */}
        <section
          ref={aboutRef}
          className="relative min-h-screen flex flex-col justify-center py-24 px-4 md:px-16"
        >
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] -z-0"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className={`${GeistMono.className} text-3xl font-medium mb-4`}>About Me</h2>
              <div className="h-px w-20 bg-black/20 mx-auto"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/70 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-sm border border-black/5"
            >
              <div className="prose prose-slate max-w-none">
              <p className="mb-4 text-[#111111]/90 leading-relaxed">
                I&apos;m Kushal Prajapati, a second-year Computer Engineering student at the University of Waterloo, fueled by creativity, curiosity, and a healthy dose of chaos. Whether I&apos;m building something cool or chasing random ideas at 2 AM, I&apos;m always up for a good challenge.
              </p>
              <p className="mb-4 text-[#111111]/90 leading-relaxed">
                Living in Canada has been an incredible journey of exploring and experimenting. I&apos;ve dipped my toes into everything from design to AI, constantly chasing that &quot;wait, I actually made this?&quot; moment. It&apos;s not always glamorous—but it&apos;s never boring. When I&apos;m not coding, you&apos;ll find me indulging in my love for gaming, photography, and everything in between. I have a serious weakness for chicken, especially Lazeez shawarma!
              </p>
              <p className="text-[#111111]/90 leading-relaxed">
                Outside the screen, you&apos;ll catch me grinding in League (Irelia main), fiddling with Linux (yes, I use Arch, btw), snapping photos, or stepping out to touch some grass and reset. <strong>Hope you enjoy my portfolio as much as I enjoyed making it!</strong>
              </p>
              </div>
            </motion.div>
          </div>

          {/* Section scroll indicator */}
          <SectionScrollIndicator targetRef={projectsRef} />
        </section>

        {/* Featured Projects Section */}
        <section
          ref={projectsRef}
          className="relative min-h-screen flex flex-col justify-center py-8 px-4 md:px-8"
        >
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] -z-0"></div>
          <div className="max-w-7xl mx-auto relative z-10 flex flex-col h-full justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h2 className={`${GeistMono.className} text-3xl font-medium mb-2 text-[#111111]`}>Featured Projects</h2>
              <div className="h-px w-20 bg-black/20 mx-auto mb-2"></div>
              <p className="text-[#333333]/80 max-w-2xl mx-auto text-sm">
                A selection of the work that I am most proud of. Each project represents a unique challenge and learning experience.
              </p>
            </motion.div>

            {/* Project Grid - 3 columns on desktop, 1 column on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Thorem Project Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col bg-white/60 rounded-xl backdrop-blur-sm border border-black/5 shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-full"
              >
                {/* Project Preview (Top) */}
                <div className="relative w-full aspect-video">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(https://img.youtube.com/vi/r2F_8a4ttiY/maxresdefault.jpg)` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a
                      href="https://www.youtube.com/watch?v=r2F_8a4ttiY"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40 transform transition-transform duration-300 hover:scale-110"
                    >
                      <FiPlay size={30} className="text-white ml-1" />
                    </a>
                  </div>
                </div>

                {/* Project Details (Bottom) */}
                <div className="flex flex-col p-4 h-full flex-grow">
                  <div className="mb-2">
                    <h3 className={`${GeistMono.className} text-xl font-medium mb-1`}>Thorem</h3>
                    <p className="text-[#333333]/80 text-sm line-clamp-2">
                      Supercharge your handwritten math notes through professional-quality LaTeX code with one click.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="px-2 py-0.5 bg-black/5 text-black/70 rounded-full text-xs">Next.js</span>
                    <span className="px-2 py-0.5 bg-black/5 text-black/70 rounded-full text-xs">Node.js</span>
                    <span className="px-2 py-0.5 bg-black/5 text-black/70 rounded-full text-xs">AI</span>
                    <span className="px-2 py-0.5 bg-black/5 text-black/70 rounded-full text-xs">LaTeX</span>
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <a
                      href="https://www.youtube.com/watch?v=r2F_8a4ttiY"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 py-1.5 px-3 bg-black text-white text-xs rounded-md hover:bg-black/80 transition-colors"
                    >
                      <FiPlay size={12} />
                      <span className={GeistMono.className}>Watch Demo</span>
                    </a>

                    <a
                      href="https://github.com/KushalPraja/Thorem"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 py-1.5 px-3 bg-white text-black border border-black/10 text-xs rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <FiGithub size={12} />
                      <span className={GeistMono.className}>GitHub</span>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* GreenLens Project Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col bg-white/60 rounded-xl backdrop-blur-sm border border-black/5 shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-full"
              >
                {/* Project Preview (Top) */}
                <div className="relative w-full aspect-video">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(https://img.youtube.com/vi/hXZwNMDQX90/maxresdefault.jpg)` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a
                      href="https://www.youtube.com/watch?v=hXZwNMDQX90"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40 transform transition-transform duration-300 hover:scale-110"
                    >
                      <FiPlay size={30} className="text-white ml-1" />
                    </a>
                  </div>
                </div>

                {/* Project Details (Bottom) */}
                <div className="flex flex-col p-4 h-full flex-grow">
                  <div className="mb-2">
                    <h3 className={`${GeistMono.className} text-xl font-medium mb-1`}>GreenLens</h3>
                    <p className="text-[#333333]/80 text-sm line-clamp-2">
                      Recycle. Rethink. Reuse. Together.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="px-2 py-0.5 bg-black/5 text-black/70 rounded-full text-xs">React</span>
                    <span className="px-2 py-0.5 bg-black/5 text-black/70 rounded-full text-xs">TensorFlow</span>
                    <span className="px-2 py-0.5 bg-black/5 text-black/70 rounded-full text-xs">Firebase</span>
                    <span className="px-2 py-0.5 bg-black/5 text-black/70 rounded-full text-xs">Mobile</span>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-auto">
                    <a
                      href="https://www.youtube.com/watch?v=hXZwNMDQX90"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 py-1.5 px-3 bg-black text-white text-xs rounded-md hover:bg-black/80 transition-colors"
                    >
                      <FiPlay size={12} />
                      <span className={GeistMono.className}>Watch Demo</span>
                    </a>

                    <a
                      href="https://github.com/KushalPraja/GreenLens"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 py-1.5 px-3 bg-white text-black border border-black/10 text-xs rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <FiGithub size={12} />
                      <span className={GeistMono.className}>GitHub</span>
                    </a>

                    <a
                      href="https://green-lens-blond.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 py-1.5 px-3 bg-white text-black border border-black/10 text-xs rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <FiExternalLink size={12} />
                      <span className={GeistMono.className}>Live Demo</span>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Branch Project Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col bg-white/60 rounded-xl backdrop-blur-sm border border-black/5 shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-full"
              >
                {/* Project Preview (Top) */}
                <div className="relative w-full aspect-video">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(https://img.youtube.com/vi/qL1jV-JBYxU/maxresdefault.jpg)` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a
                      href="https://www.youtube.com/watch?v=qL1jV-JBYxU"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40 transform transition-transform duration-300 hover:scale-110"
                    >
                      <FiPlay size={30} className="text-white ml-1" />
                    </a>
                  </div>
                </div>

                {/* Project Details (Bottom) */}
                <div className="flex flex-col p-4 h-full flex-grow">
                  <div className="mb-2">
                    <h3 className={`${GeistMono.className} text-xl font-medium mb-1`}>Branch</h3>
                    <p className="text-[#333333]/80 text-sm line-clamp-2">
                      Create and share your own personalized link pages with Branch for free.
                      A modern LinkTree alternative with sleek, customizable themes and detailed analytics.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="px-2 py-0.5 bg-black/5 text-black/70 rounded-full text-xs">Next.js</span>
                    <span className="px-2 py-0.5 bg-black/5 text-black/70 rounded-full text-xs">FastAPI</span>
                    <span className="px-2 py-0.5 bg-black/5 text-black/70 rounded-full text-xs">TailwindCSS</span>
                    <span className="px-2 py-0.5 bg-black/5 text-black/70 rounded-full text-xs">Auth</span>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-auto">
                    <a
                      href="https://www.youtube.com/watch?v=qL1jV-JBYxU"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 py-1.5 px-3 bg-black text-white text-xs rounded-md hover:bg-black/80 transition-colors"
                    >
                      <FiPlay size={12} />
                      <span className={GeistMono.className}>Watch Demo</span>
                    </a>

                    <a
                      href="https://github.com/KushalPraja/Branch"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 py-1.5 px-3 bg-white text-black border border-black/10 text-xs rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <FiGithub size={12} />
                      <span className={GeistMono.className}>GitHub</span>
                    </a>

                    <a
                      href="https://ashy-ground-0a637de0f.6.azurestaticapps.net/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 py-1.5 px-3 bg-white text-black border border-black/10 text-xs rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <FiExternalLink size={12} />
                      <span className={GeistMono.className}>Live Demo</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <Link
                href="/projects"
                className={`inline-flex items-center gap-2 py-2 px-6 border rounded-full bg-white/80 hover:bg-slate-200 transition-colors ${GeistMono.className} text-sm text-black group`}
              >
                <span>View All Projects</span>
                <FiArrowDown className="rotate-[270deg] group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Custom mobile responsive styles */}
          <style jsx>{`
            @media (max-width: 768px) {
              .grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
              }
            }
          `}</style>

          {/* Section scroll indicator */}
          <SectionScrollIndicator targetRef={skillsRef} />
        </section>

        {/* Skills Section - Improved with modern design - Hidden on mobile */}
        <section
          ref={skillsRef}
          className="relative min-h-screen hidden md:flex flex-col justify-center py-4 px-2 md:px-8"
        >
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] -z-0"></div>
          <div className="max-w-5xl mx-auto relative z-10 w-full h-full flex flex-row gap-6 items-center min-h-[80vh]" style={{height: '80vh'}}>
            {/* Left: Title, subtitle, radar chart */}
            <div className="w-1/2 flex flex-col items-center justify-center h-full gap-2">
              <div className="text-center mb-2">
                <h2 className={`${GeistMono.className} text-2xl font-medium mb-1`}>Technical Skills</h2>
                <div className="h-px w-12 bg-black/20 mx-auto mb-1"></div>
                <p className="text-[#333333]/80 max-w-xs mx-auto text-sm">
                  Technologies and tools I specialize in for building modern applications.
                </p>
              </div>
              <RadarSkillsChart />
            </div>
            {/* Right: Skills cards and expertise */}
            <div className="w-1/2 h-full flex flex-col justify-center gap-2 pr-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-1 gap-3"
              >
                {/* Frontend Skills - Modern Card */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-black/20 to-black/10 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-300"></div>
                  <div className="relative bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-black/5 shadow-sm h-full">
                    <div className="flex items-center mb-4">
                      <div className="mr-3 p-2 bg-black/5 rounded-lg">
                        <FiCode className="text-black h-5 w-5" />
                      </div>
                      <h3 className={`${GeistMono.className} text-lg font-medium`}>Frontend Development</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex flex-col">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">React, Next.js, Vue</span>
                          <span className="text-xs text-black/50">Advanced</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-black/70 h-1.5 rounded-full" style={{ width: "95%" }}></div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">TypeScript, JavaScript</span>
                          <span className="text-xs text-black/50">Advanced</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-black/70 h-1.5 rounded-full" style={{ width: "90%" }}></div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Tailwind CSS, SCSS</span>
                          <span className="text-xs text-black/50">Advanced</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-black/70 h-1.5 rounded-full" style={{ width: "90%" }}></div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Three.js, WebGL, Canvas</span>
                          <span className="text-xs text-black/50">Proficient</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-black/60 h-1.5 rounded-full" style={{ width: "80%" }}></div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Framer Motion, GSAP</span>
                          <span className="text-xs text-black/50">Proficient</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-black/60 h-1.5 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Backend Skills - Modern Card */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-black/20 to-black/10 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-300"></div>
                  <div className="relative bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-black/5 shadow-sm h-full">
                    <div className="flex items-center mb-4">
                      <div className="mr-3 p-2 bg-black/5 rounded-lg">
                        <FiDatabase className="text-black h-5 w-5" />
                      </div>
                      <h3 className={`${GeistMono.className} text-lg font-medium`}>Backend Development</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex flex-col">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Node.js, Express, FastAPI</span>
                          <span className="text-xs text-black/50">Advanced</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-black/70 h-1.5 rounded-full" style={{ width: "90%" }}></div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Python, Java, C++</span>
                          <span className="text-xs text-black/50">Proficient</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-black/70 h-1.5 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">MongoDB, PostgreSQL, Firebase</span>
                          <span className="text-xs text-black/50">Advanced</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-black/70 h-1.5 rounded-full" style={{ width: "90%" }}></div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">RESTful APIs, GraphQL</span>
                          <span className="text-xs text-black/50">Advanced</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-black/70 h-1.5 rounded-full" style={{ width: "95%" }}></div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">AWS, Docker, CI/CD</span>
                          <span className="text-xs text-black/50">Proficient</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-black/60 h-1.5 rounded-full" style={{ width: "80%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Additional Skills Section - New Card for More Skills */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="group relative mt-2"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-black/20 to-black/10 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-300"></div>
                  <div className="relative bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-black/5 shadow-sm">
                    <h3 className={`${GeistMono.className} text-lg font-medium mb-3`}>Additional Expertise</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
                      <div className="skill-pill border border-black/10 bg-white/60 rounded-lg flex items-center px-2 py-1 text-xs font-medium gap-1">
                        <span className="skill-icon">🔒</span>
                        <span className="skill-name">Cyber Security</span>
                      </div>
                      <div className="skill-pill border border-black/10 bg-white/60 rounded-lg flex items-center px-2 py-1 text-xs font-medium gap-1">
                        <span className="skill-icon">🤖</span>
                        <span className="skill-name">Machine Learning</span>
                      </div>
                      <div className="skill-pill border border-black/10 bg-white/60 rounded-lg flex items-center px-2 py-1 text-xs font-medium gap-1">
                        <span className="skill-icon">📱</span>
                        <span className="skill-name">Mobile Dev</span>
                      </div>
                      <div className="skill-pill border border-black/10 bg-white/60 rounded-lg flex items-center px-2 py-1 text-xs font-medium gap-1">
                        <span className="skill-icon">🧪</span>
                        <span className="skill-name">Testing</span>
                      </div>
                      <div className="skill-pill border border-black/10 bg-white/60 rounded-lg flex items-center px-2 py-1 text-xs font-medium gap-1">
                        <span className="skill-icon">🔄</span>
                        <span className="skill-name">CI/CD</span>
                      </div>
                      <div className="skill-pill border border-black/10 bg-white/60 rounded-lg flex items-center px-2 py-1 text-xs font-medium gap-1">
                        <span className="skill-icon">🎨</span>
                        <span className="skill-name">UI/UX</span>
                      </div>
                      <div className="skill-pill border border-black/10 bg-white/60 rounded-lg flex items-center px-2 py-1 text-xs font-medium gap-1">
                        <span className="skill-icon">📊</span>
                        <span className="skill-name">Data Viz</span>
                      </div>
                      <div className="skill-pill border border-black/10 bg-white/60 rounded-lg flex items-center px-2 py-1 text-xs font-medium gap-1">
                        <span className="skill-icon">☁️</span>
                        <span className="skill-name">Cloud Arch</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Add some custom CSS for the additional pills */}
          <style jsx>{`
            .skill-pill {
              display: flex;
              align-items: center;
              padding: 0.4rem 0.8rem;
              background-color: rgba(0, 0, 0, 0.03);
              border-radius: 0.5rem;
              transition: all 0.2s ease;
            }
            .skill-pill:hover {
              background-color: rgba(0, 0, 0, 0.06);
              transform: translateY(-2px);
            }
            .skill-icon {
              margin-right: 0.4rem;
              font-size: 0.9rem;
            }
            .skill-name {
              font-size: 0.75rem;
              color: rgba(0, 0, 0, 0.8);
            }
          `}</style>

          {/* Section scroll indicator */}
          <SectionScrollIndicator targetRef={experienceRef} />
        </section>

        {/* Work Experience Section - Responsive Vertical Timeline */}
<section
  ref={experienceRef}
  className="relative flex flex-col justify-center py-20 px-4 md:px-16 min-h-[90vh]"
  id="experience"
>
  <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] -z-0"></div>
  <div className="max-w-6xl mx-auto relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <h2 className={`${GeistMono.className} text-3xl font-medium mb-3`}>Work Experience</h2>
      <div className="h-px w-20 bg-black/20 mx-auto mb-3"></div>
      <p className="text-[#333333]/80 max-w-lg mx-auto">My professional journey and career milestones.</p>
    </motion.div>

    {/* Timeline container */}
    <div className="vertical-timeline-container relative mb-10">
      {/* Vertical line for desktop */}
      <div className="absolute left-0 md:left-[110px] top-8 bottom-8 w-px bg-transparent md:bg-black/10 hidden md:block"></div>

      <div className="space-y-8 md:space-y-12 relative">
        {/* Timeline Entry */}
        {[{
          title: "Levanta Labs SWE Intern",
          date: "May 2025 - Present",
          description: "Developing custom software solutions for clients ranging from early-stage SaaS companies to established B2B organizations. Creating internal tools, AI-powered systems, and full-scale SaaS platforms.",
          tech: ["React.js", "Next.js", "Typescript", "Tailwind"],
          logo: "/company_icons/levantalabs_logo.jpg"
        },
        {
          title: "Hacker Fab Engineer",
          date: "Sept 2023 - May 2024",
          description: "Led the development of a real-time dashboard application using Qt/C++, enabling the team to visualize live robot sensor data for faster diagnostics and performance evaluation.",
          tech: ["C++", "Qt", "Robotics"],
          logo: "/company_icons/Hacker Fab_Black w lilac.png"
        },
        {
          title: "Senior Assistant Teacher",
          date: "Sept 2020 - Sept 2024",
          description: "Mentored 20+ students in advanced mathematics, achieving a 95% student retention rate and contributing to the Kumon center's ranking as 2nd in North America.",
          tech: ["Education", "Mathematics", "Mentorship"],
          logo: "/company_icons/Kumon_Method_Logo.svg.png"
        }].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="timeline-item pl-0 md:pl-[150px] relative max-w-3xl mx-auto"
          >
            <div className="timeline-dot hidden md:block left-0 md:left-[110px]"></div>

            {/* Company logo - completely hidden on mobile devices */}
            <div className="company-logo-container hidden md:flex">
              <Image
                src={item.logo}
                alt={`${item.title} Logo`}
                width={100}
                height={100}
                className="object-contain"
              />
            </div>

            {/* Content */}
            <div className="timeline-card group">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                <h3 className={`${GeistMono.className} text-lg font-medium`}>{item.title}</h3>
                <span className="timeline-date">{item.date}</span>
              </div>
              <p className="text-[#333333]/80 text-sm mb-4">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.tech.map((tag, i) => (
                  <span key={i} className="timeline-tech-badge">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Custom styles */}
    <style jsx>{`
      .timeline-dot {
        position: absolute;
        top: 25px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: white;
        border: 3px solid rgba(0, 0, 0, 0.2);
        z-index: 10;
        transform: translateX(-50%);
      }

      .company-logo-container {
        position: absolute;
        left: 0;
        top: 0;
        width: 100px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        background-color: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(0, 0, 0, 0.05);
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
        padding: 12px;
      }

      @media (max-width: 768px) {
        .company-logo-container {
          display: none !important;
        }
      }

      .timeline-card {
        background-color: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(0, 0, 0, 0.05);
        border-radius: 12px;
        padding: 16px;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
        margin-bottom: 4px;
      }

      .timeline-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.04);
        background-color: rgba(255, 255, 255, 0.8);
      }

      .timeline-date {
        font-size: 0.8rem;
        color: rgba(0, 0, 0, 0.6);
        font-family: GeistMono, sans-serif;
        font-weight: 500;
        margin-top: 4px;
        display: inline-block;
        background-color: rgba(0, 0, 0, 0.03);
        padding: 2px 8px;
        border-radius: 4px;
      }

      .timeline-tech-badge {
        font-size: 0.75rem;
        background-color: rgba(0, 0, 0, 0.04);
        color: rgba(0, 0, 0, 0.7);
        padding: 2px 8px;
        border-radius: 4px;
        display: inline-block;
      }

      @media (max-width: 768px) {
        .timeline-card {
          padding: 14px;
          margin-bottom: 0;
        }

        .timeline-date {
          font-size: 0.7rem;
          margin-top: 2px;
        }

        .timeline-tech-badge {
          font-size: 0.7rem;
          padding: 1px 6px;
        }
      }
    `}</style>
  </div>

  {/* Scroll indicator */}
  <SectionScrollIndicator targetRef={achievementsRef} />
</section>


        {/* Achievements Section */}
        <section
          ref={achievementsRef}
          className="relative min-h-screen flex flex-col justify-center py-24 px-4 md:px-16"
          id="achievements"
        >
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] -z-0"></div>
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className={`${GeistMono.className} text-3xl font-medium mb-4`}>Achievements</h2>
              <div className="h-px w-20 bg-black/20 mx-auto mb-4"></div>
              <p className="text-[#333333]/80 max-w-lg mx-auto">
                Recognition and awards highlighting my accomplishments.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              {/* Achievement Card 1 */}
              <div className="group relative overflow-hidden">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-black/40 to-black/20 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-300"></div>
                <div className="achievement-card bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-black/5 shadow-sm h-full relative flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-black/5 rounded-lg mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                          <path d="M12 2l1.6 4.3 4.4.6-3.2 3.1.8 4.4-3.6-2-3.6 2 .8-4.4-3.2-3.1 4.4-.6z"></path>
                        </svg>
                      </div>
                      <h3 className={`${GeistMono.className} text-lg font-medium`}>GenAI Genesis 2025</h3>
                    </div>
                    <span className="text-xs bg-black/5 py-1 px-2 rounded-full">Mar 2025</span>
                  </div>

                  <div className="flex items-center mb-3">
                    <span className="text-sm font-semibold bg-black/10 text-black/80 py-1 px-3 rounded-full">1st Place Winner</span>
                  </div>

                  <p className="text-[#333333]/80 text-sm flex-grow">
                    Won in Canada&apos;s largest AI hackathon with 700+ participants across 130+ teams, earning recognition for GreenLens—an AI-powered app that simplifies eco-friendly choices through image recognition.
                  </p>

                  <div className="mt-4 pt-4 border-t border-black/5 flex flex-wrap gap-2">
                    <span className="text-xs bg-black/5 py-1 px-2 rounded-full">AI/ML</span>
                    <span className="text-xs bg-black/5 py-1 px-2 rounded-full">Environmental Tech</span>
                    <span className="text-xs bg-black/5 py-1 px-2 rounded-full">Hackathon</span>
                  </div>
                </div>
              </div>

              {/* Achievement Card 2 */}
              <div className="group relative overflow-hidden">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-black/40 to-black/20 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-300"></div>
                <div className="achievement-card bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-black/5 shadow-sm h-full relative flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-black/5 rounded-lg mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                          <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                          <path d="M9 9h6v6H9z"></path>
                        </svg>
                      </div>
                      <h3 className={`${GeistMono.className} text-lg font-medium`}>FBLA Competition</h3>
                    </div>
                    <span className="text-xs bg-black/5 py-1 px-2 rounded-full">Jun 2023</span>
                  </div>

                  <div className="flex items-center mb-3">
                    <span className="text-sm font-semibold bg-black/10 text-black/80 py-1 px-3 rounded-full">Top 10 Finalist</span>
                  </div>

                  <p className="text-[#333333]/80 text-sm flex-grow">
                    Placed in the top 10 nationally in FBLA&apos;s Coding and Programming competition by developing an innovative web application that streamlines school club management and engagement tracking.
                  </p>

                  <div className="mt-4 pt-4 border-t border-black/5 flex flex-wrap gap-2">
                    <span className="text-xs bg-black/5 py-1 px-2 rounded-full">Full-Stack Development</span>
                    <span className="text-xs bg-black/5 py-1 px-2 rounded-full">UI/UX Design</span>
                    <span className="text-xs bg-black/5 py-1 px-2 rounded-full">National Competition</span>
                  </div>
                </div>
              </div>

              {/* Achievement Card 3 */}
              <div className="group relative overflow-hidden">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-black/40 to-black/20 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-300"></div>
                <div className="achievement-card bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-black/5 shadow-sm h-full relative flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-black/5 rounded-lg mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                          <line x1="6" x2="6" y1="1" y2="4"></line>
                          <line x1="10" x2="10" y1="1" y2="4"></line>
                          <line x1="14" x2="14" y1="1" y2="4"></line>
                        </svg>
                      </div>
                      <h3 className={`${GeistMono.className} text-lg font-medium`}>DECA PMFL</h3>
                    </div>
                    <span className="text-xs bg-black/5 py-1 px-2 rounded-full">Apr 2023</span>
                  </div>

                  <div className="flex items-center mb-3">
                    <span className="text-sm font-semibold bg-black/10 text-black/80 py-1 px-3 rounded-full">National Winner</span>
                  </div>

                  <p className="text-[#333333]/80 text-sm flex-grow">
                    Secured 1st place in DECA&apos;s Personal Financial Literacy Project (PMFL) with Undebtify—a digital financial literacy platform that successfully engaged 200+ participants across the Greater Toronto Area.
                  </p>

                  <div className="mt-4 pt-4 border-t border-black/5 flex flex-wrap gap-2">
                    <span className="text-xs bg-black/5 py-1 px-2 rounded-full">Financial Technology</span>
                    <span className="text-xs bg-black/5 py-1 px-2 rounded-full">Community Impact</span>
                    <span className="text-xs bg-black/5 py-1 px-2 rounded-full">Product Development</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Section scroll indicator */}
          <SectionScrollIndicator targetRef={chatRef} />
        </section>

        {/* Chat with me Section */}
        <section
          ref={chatRef}
          className="relative min-h-screen flex flex-col justify-center py-24 px-4 md:px-16"
          id="chat"
        >
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] -z-0"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className={`${GeistMono.className} text-3xl font-medium mb-4`}>Chat with Me</h2>
              <div className="h-px w-20 bg-black/20 mx-auto mb-4"></div>
              <p className="text-[#333333]/80 max-w-lg mx-auto">
                Have questions about my work, experience, or projects? Chat with my AI assistant to learn more about me!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-2xl bg-white/70 backdrop-blur-sm rounded-2xl border border-black/5 shadow-sm p-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-black/5 rounded-full mb-6">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      <path d="M8 10h.01"></path>
                      <path d="M12 10h.01"></path>
                      <path d="M16 10h.01"></path>
                    </svg>
                  </div>

                  <h3 className={`${GeistMono.className} text-xl font-medium mb-3`}>AI Assistant</h3>
                  <p className="text-[#333333]/80 mb-6">
                    Ask me anything about Kushal&apos;s background, projects, skills, or experience. I&apos;m here to help you learn more about his work and capabilities.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    <button 
                      onClick={() => handleSuggestionClick("What projects has Kushal worked on?")}
                      className="p-3 bg-white/50 rounded-lg border border-black/5 text-left hover:bg-white/70 hover:border-black/10 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                    >
                      <p className="text-sm text-[#333333]/70 mb-1">Try asking:</p>
                      <p className="text-sm font-medium">&quot;What projects has Kushal worked on?&quot;</p>
                    </button>
                    <button 
                      onClick={() => handleSuggestionClick("What are his technical skills?")}
                      className="p-3 bg-white/50 rounded-lg border border-black/5 text-left hover:bg-white/70 hover:border-black/10 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                    >
                      <p className="text-sm text-[#333333]/70 mb-1">Or:</p>
                      <p className="text-sm font-medium">&quot;What are his technical skills?&quot;</p>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    <button 
                      onClick={() => handleSuggestionClick("Tell me about Kushal's experience")}
                      className="p-3 bg-white/50 rounded-lg border border-black/5 text-left hover:bg-white/70 hover:border-black/10 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                    >
                      <p className="text-sm text-[#333333]/70 mb-1">Ask about:</p>
                      <p className="text-sm font-medium">&quot;Tell me about his experience&quot;</p>
                    </button>
                    <button 
                      onClick={() => handleSuggestionClick("What are Kushal's interests and hobbies?")}
                      className="p-3 bg-white/50 rounded-lg border border-black/5 text-left hover:bg-white/70 hover:border-black/10 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                    >
                      <p className="text-sm text-[#333333]/70 mb-1">Or discover:</p>
                      <p className="text-sm font-medium">&quot;What are his interests?&quot;</p>
                    </button>
                  </div>

                  <p className="text-xs text-[#333333]/60">
                    Click any suggestion above or use the chat icon in the bottom right corner to start a conversation
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Section scroll indicator */}
          <SectionScrollIndicator targetRef={contactRef} />
        </section>

        {/* Contact Section - Updated to be more minimal with glass effect */}
        <section
          ref={contactRef}
          className="relative min-h-screen flex flex-col justify-center py-24 px-4 md:px-16"
        >
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] -z-0"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className={`${GeistMono.className} text-3xl font-medium mb-4`}>Get In Touch</h2>
              <div className="h-px w-20 bg-black/20 mx-auto mb-4"></div>
              <p className="text-[#333333]/80 max-w-lg mx-auto">
                Interested in working together? Feel free to reach out through any of these platforms.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-2xl">
                {/* GitHub */}
                <motion.a
                  href="https://github.com/KushalPraja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center p-6 bg-white/50 hover:bg-white/70 backdrop-blur-sm rounded-xl border border-black/5 shadow-sm transition-all duration-300 hover:shadow-md"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-3 bg-black/5 rounded-full mb-3 group-hover:bg-black/10 transition-colors">
                    <FiGithub size={24} className="text-[#333]" />
                  </div>
                  <span className={`${GeistMono.className} text-sm font-medium`}>GitHub</span>
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                  href="https://www.linkedin.com/in/kushalpraja/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center p-6 bg-white/50 hover:bg-white/70 backdrop-blur-sm rounded-xl border border-black/5 shadow-sm transition-all duration-300 hover:shadow-md"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-3 bg-black/5 rounded-full mb-3 group-hover:bg-black/10 transition-colors">
                    <FiLinkedin size={24} className="text-[#333]" />
                  </div>
                  <span className={`${GeistMono.className} text-sm font-medium`}>LinkedIn</span>
                </motion.a>

                {/* Email */}
                <motion.a
                  href="mailto:kushalpraja6@gmail.com"
                  className="group flex flex-col items-center p-6 bg-white/50 hover:bg-white/70 backdrop-blur-sm rounded-xl border border-black/5 shadow-sm transition-all duration-300 hover:shadow-md"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-3 bg-black/5 rounded-full mb-3 group-hover:bg-black/10 transition-colors">
                    <FiMail size={24} className="text-[#333]" />
                  </div>
                  <span className={`${GeistMono.className} text-sm font-medium`}>Email</span>
                </motion.a>
              </div>
            </motion.div>

            {/* Contact Page Button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 text-center"
            >
              <Link
          href="/contact"
          className={`inline-flex items-center gap-2 py-2 px-6 border border-black/10 rounded-full bg-white/50 hover:bg-black/5 transition-colors ${GeistMono.className} text-sm text-[#333333] group`}
              >
          <span>Contact Me</span>
          <FiArrowDown className="rotate-[270deg] group-hover:translate-x-1 transition-transform" />
              </Link>

              <p className="mt-3 text-xs text-black/50">
                Or send me an email at <span className="font-medium">kushalpraja6@gmail.com</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4">
          <div className="max-w-4xl mx-auto text-center text-black/60 text-sm">
            <p>© {new Date().getFullYear()} Kushal Prajapati. All rights reserved.</p>
          </div>
        </footer>
      </div>

      {/* Chat Bot */}
      <ChatBot />
    </>
  );
}