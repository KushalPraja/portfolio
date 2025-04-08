"use client";
import { motion } from "framer-motion"; // Removed AnimatePresence since it's not used
import dynamic from "next/dynamic";
import { GeistMono } from 'geist/font/mono';
import { useEffect, useState, useRef } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiExternalLink, FiCode, FiDatabase, FiPlay } from 'react-icons/fi';
import Link from 'next/link';
import React from "react";

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

  // Reusable section scroll indicator
  const SectionScrollIndicator = ({ targetRef }: { targetRef: React.RefObject<HTMLDivElement> }) => (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
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

          {/* Location indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`fixed ${isMobile ? 'bottom-4 right-4 text-sm' : 'bottom-8 right-8 text-base'} text-black z-50`}
          >
            [ Waterloo, Ontario ]
          </motion.div>
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
                I&apos;m a second-year Computer Engineering student fueled by creativity, curiosity, and a healthy dose of chaos. Whether I&apos;m building something cool or chasing random ideas at 2 AM, I&apos;m always up for a good challenge.
              </p>
              <p className="mb-4 text-[#111111]/90 leading-relaxed">
                My journey so far has been all about exploring and experimenting. I&apos;ve dipped my toes into everything from design to AI, constantly chasing that &quot;wait, I actually made this?&quot; moment. It&apos;s not always glamorous—but it&apos;s never boring.
              </p>
              <p className="text-[#111111]/90 leading-relaxed">
                Outside the screen, you&apos;ll catch me grinding in League (Irelia main), fiddling with Linux (yes, I use Arch, btw), snapping photos, or stepping out to touch some grass and reset. <strong> Hope you enjoy my portfolio as much as I enjoyed making it!</strong>
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
          className="relative min-h-screen flex flex-col justify-center py-24 px-4 md:px-16"
        >
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] -z-0"></div>
          <div className="max-w-6xl mx-auto relative z-10 my-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className={`${GeistMono.className} text-3xl font-medium mb-4 text-[#111111]`}>Featured Projects</h2>
              <div className="h-px w-20 bg-black/20 mx-auto mb-4"></div>
              <p className="text-[#333333]/80 max-w-2xl mx-auto">
                A selection of the work that I am most proud of. Each project represents a unique challenge and learning experience.
              </p>
            </motion.div>
            
            <div className="flex flex-col gap-8 mb-16">
              {/* Thorem Project Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="featured-project-card">
                  <div className="project-thumbnail">
                    <div 
                      className="project-thumbnail-image" 
                      style={{ backgroundImage: `url(https://img.youtube.com/vi/r2F_8a4ttiY/maxresdefault.jpg)` }}
                    ></div>
                    <a 
                      href="https://www.youtube.com/watch?v=r2F_8a4ttiY" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="play-button-overlay"
                    >
                      <div className="play-button">
                        <FiPlay size={20} className="ml-1" />
                      </div>
                    </a>
                  </div>
                  
                  <div className="project-content">
                    <div className="project-header">
                      <h3 className={`${GeistMono.className} project-title`}>Thorem</h3>
                      <span className="project-subtitle">Mathematical Notation AI Converter</span>
                    </div>
                    
                    <p className="project-description">
                      Supercharge your handwritten math notes through professional-quality LaTeX code with one click.
                    </p>
                    
                    <div className="project-tech-stack">
                      <span className="project-tech-tag">Next.js</span>
                      <span className="project-tech-tag">Node.js</span>
                      <span className="project-tech-tag">AI</span>
                      <span className="project-tech-tag">LaTeX</span>
                    </div>
                    
                    <div className="project-links">
                      <a 
                        href="https://www.youtube.com/watch?v=r2F_8a4ttiY"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-button project-primary-link"
                      >
                        <FiPlay size={12} />
                        <span className={GeistMono.className}>Watch Demo</span>
                      </a>
                      
                      <a 
                        href="https://github.com/KushalPraja/Thorem"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-button project-secondary-link"
                      >
                        <FiGithub size={12} />
                        <span className={GeistMono.className}>GitHub</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* GreenLens Project Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="featured-project-card">
                  <div className="project-thumbnail">
                    <div 
                      className="project-thumbnail-image" 
                      style={{ backgroundImage: `url(https://img.youtube.com/vi/hXZwNMDQX90/maxresdefault.jpg)` }}
                    ></div>
                    <a 
                      href="https://www.youtube.com/watch?v=hXZwNMDQX90" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="play-button-overlay"
                    >
                      <div className="play-button">
                        <FiPlay size={20} className="ml-1" />
                      </div>
                    </a>
                  </div>
                  
                  <div className="project-content">
                    <div className="project-header">
                      <h3 className={`${GeistMono.className} project-title`}>GreenLens</h3>
                      <span className="project-subtitle">Sustainability AI Assistant</span>
                    </div>
                    
                    <p className="project-description">
                      Point your camera at any product, and GreenLens will analyze its environmental impact.
                    </p>
                    
                    <div className="project-tech-stack">
                      <span className="project-tech-tag">React</span>
                      <span className="project-tech-tag">TensorFlow</span>
                      <span className="project-tech-tag">Firebase</span>
                      <span className="project-tech-tag">Mobile</span>
                    </div>
                    
                    <div className="project-links">
                      <a 
                        href="https://www.youtube.com/watch?v=hXZwNMDQX90"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-button project-primary-link"
                      >
                        <FiPlay size={12} />
                        <span className={GeistMono.className}>Watch Demo</span>
                      </a>
                      
                      <a 
                        href="https://github.com/KushalPraja/GreenLens"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-button project-secondary-link"
                      >
                        <FiGithub size={12} />
                        <span className={GeistMono.className}>GitHub</span>
                      </a>
                      <a 
                        href="https://green-lens-blond.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-button project-secondary-link"
                      >
                        <FiExternalLink size={12} />
                        <span className={GeistMono.className}>Live Demo</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Branch Project Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="featured-project-card">
                  <div className="project-thumbnail">
                    <div 
                      className="project-thumbnail-image" 
                      style={{ backgroundImage: `url(https://img.youtube.com/vi/qL1jV-JBYxU/maxresdefault.jpg)` }}
                    ></div>
                    <a 
                      href="https://www.youtube.com/watch?v=qL1jV-JBYxU" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="play-button-overlay"
                    >
                      <div className="play-button">
                        <FiPlay size={20} className="ml-1" />
                      </div>
                    </a>
                    
                  </div>
                  
                  <div className="project-content">
                    <div className="project-header">
                      <h3 className={`${GeistMono.className} project-title`}>Branch</h3>
                      <span className="project-subtitle">Modern Link Management Platform</span>
                    </div>
                    
                    <p className="project-description">

                      Create and share your own personalized link pages with Branch for free.
                      A modern LinkTree alternative that allows users to create customized link pages to share their online presence through a single URL.
                      With sleek, customizable themes and detailed analytics for content creators.
                    </p>
                    
                    <div className="project-tech-stack">
                      <span className="project-tech-tag">Next.js</span>
                      <span className="project-tech-tag">FastAPI</span>
                      <span className="project-tech-tag">TailwindCSS</span>
                      <span className="project-tech-tag">Authentication</span>
                    </div>
                    
                    <div className="project-links">
                      <a 
                        href="https://www.youtube.com/watch?v=qL1jV-JBYxU"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-button project-primary-link"
                      >
                        <FiPlay size={12} />
                        <span className={GeistMono.className}>Watch Demo</span>
                      </a>
                      
                      <a 
                        href="https://github.com/KushalPraja/Branch"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-button project-secondary-link"
                      >
                        <FiGithub size={12} />
                        <span className={GeistMono.className}>GitHub</span>
                      </a>
                      
                      <a 
                        href="https://ashy-ground-0a637de0f.6.azurestaticapps.net/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-button project-secondary-link"
                      >
                        <FiExternalLink size={12} />
                        <span className={GeistMono.className}>Live Demo</span>
                      </a>
                    </div>
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
                className={`inline-flex items-center gap-2 py-2 px-6 border  rounded-full bg-[white]/80 hover:bg-slate-200 transition-colors ${GeistMono.className} text-sm text-[black] group`}
              >
                <span>View All Projects</span>
                <FiArrowDown className="rotate-[270deg] group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
          {/* Section scroll indicator */}
          <SectionScrollIndicator targetRef={skillsRef} />
        </section>

        {/* Skills Section - Improved with modern design - Hidden on mobile */}
        <section 
          ref={skillsRef} 
          className="relative h-screen flex flex-col justify-center py-8 px-4 md:px-16 hidden md:flex"
        >
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] -z-0"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-6"
            >
              <h2 className={`${GeistMono.className} text-3xl font-medium mb-2`}>Technical Skills</h2>
              <div className="h-px w-16 bg-black/20 mx-auto mb-2"></div>
              <p className="text-[#333333]/80 max-w-lg mx-auto">
          Technologies and tools I specialize in for building modern applications.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Frontend Skills - Modern Card */}
              <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-black/20 to-black/10 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-300"></div>
          <div className="relative bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-black/5 shadow-sm h-full">
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
          <div className="relative bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-black/5 shadow-sm h-full">
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
          className="group relative md:col-span-2 mt-2"
              >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-black/20 to-black/10 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-300"></div>
          <div className="relative bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-black/5 shadow-sm">
            <h3 className={`${GeistMono.className} text-lg font-medium mb-3`}>Additional Expertise</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="skill-pill">
                <span className="skill-icon">🔒</span>
                <span className="skill-name">Cybersecurity</span>
              </div>
              <div className="skill-pill">
                <span className="skill-icon">🤖</span>
                <span className="skill-name">Machine Learning</span>
              </div>
              <div className="skill-pill">
                <span className="skill-icon">📱</span>
                <span className="skill-name">Mobile Dev</span>
              </div>
              <div className="skill-pill">
                <span className="skill-icon">🧪</span>
                <span className="skill-name">Testing</span>
              </div>
              <div className="skill-pill">
                <span className="skill-icon">🔄</span>
                <span className="skill-name">CI/CD</span>
              </div>
              <div className="skill-pill">
                <span className="skill-icon">🎨</span>
                <span className="skill-name">UI/UX</span>
              </div>
              <div className="skill-pill">
                <span className="skill-icon">📊</span>
                <span className="skill-name">Data Viz</span>
              </div>
              <div className="skill-pill">
                <span className="skill-icon">☁️</span>
                <span className="skill-name">Cloud Arch</span>
              </div>
            </div>
          </div>
              </motion.div>
            </motion.div>
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
        
        {/* Work Experience Section - Horizontal Timeline - Hidden on mobile */}
        <section 
          ref={experienceRef}
          className="relative min-h-screen hidden md:flex flex-col justify-center py-24 px-4 md:px-16"
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
              <h2 className={`${GeistMono.className} text-3xl font-medium mb-4`}>Work Experience</h2>
              <div className="h-px w-20 bg-black/20 mx-auto mb-4"></div>
              <p className="text-[#333333]/80 max-w-lg mx-auto">
                My professional journey and career milestones.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="overflow-x-auto pb-8"
            >
              <div className="horizontal-timeline w-full min-w-[760px]">
                {/* Kumon - Least Recent */}
         
                <div className="timeline-item-horizontal group">
                  <div className="timeline-point"></div>
                  <div className="timeline-date">Sept 2020 - Sept 2024</div>
                  <div className="timeline-title">Senior Assistant Teacher</div>
                  <div className="timeline-content">
                    <p>Mentored 20+ students in advanced mathematics, achieving a 95% student retention rate and contributing to the Kumon center&apos;s ranking as 2nd in North America.</p>
                    <div className="timeline-tech-badges mt-2">
                      <span className="timeline-tech-badge">C++</span>
                      <span className="timeline-tech-badge">Qt</span>
                      <span className="timeline-tech-badge">Robotics</span>
                    </div>
                  </div>
                </div>

                {/* Vex Robotics */}
                <div className="timeline-item-horizontal group">
                  <div className="timeline-point"></div>
                  <div className="timeline-date">Sept 2023 - May 2024</div>
                  <div className="timeline-title">VEX Robotics Builder</div>
                  <div className="timeline-content">
                    <p>Led the development of a real-time dashboard application using Qt/C++, enabling the team to visualize live robot sensor data for faster diagnostics and performance evaluation.</p>
                    <div className="timeline-tech-badges mt-2">
                      <span className="timeline-tech-badge">C++</span>
                      <span className="timeline-tech-badge">Qt</span>
                      <span className="timeline-tech-badge">Robotics</span>
                    </div>
                  </div>
                </div>

                {/* Levanta Labs - Most Recent */}
                <div className="timeline-item-horizontal group">
                  <div className="timeline-point"></div>
                  <div className="timeline-date">May 2025 - Present</div>
                  <div className="timeline-title">Levanta Labs SWE Intern</div>
                  <div className="timeline-content">
                    <p>Developing custom software solutions for clients ranging from early-stage SaaS companies to established B2B organizations. Creating internal tools, AI-powered systems, and full-scale SaaS platforms.</p>
                    <div className="timeline-tech-badges mt-2">
                      <span className="timeline-tech-badge">React.js</span>
                      <span className="timeline-tech-badge">Next.js</span>
                      <span className="timeline-tech-badge">Typescript</span>
                      <span className="timeline-tech-badge">Tailwind</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Section scroll indicator */}
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
    </>
  );
}