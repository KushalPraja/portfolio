"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"

export default function WorkExperience() {
  const experienceRef = useRef(null)
  const GeistMono = { className: "font-mono" } // Using font-mono as a placeholder for GeistMono

  return (
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

        {/* Vertical Timeline */}
        <div className="vertical-timeline-container relative mb-10">
          {/* Center line for timeline */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-px bg-black/20"></div>

          {/* Timeline Items */}
          <div className="relative">
            {/* Levanta Labs - Most Recent */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="timeline-item timeline-left mb-14"
            >
              {/* Timeline dot */}
              <div className="timeline-dot-container">
                <div className="timeline-dot"></div>
              </div>

              {/* Company logo - on right side for left cards */}
              <div className="company-logo-container logo-right">
                <Image
                  src="/company_icons/levantalabs_logo.jpg"
                  alt="Levanta Labs Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>

              {/* Content card */}
              <div className="timeline-card group">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                  <h3 className={`${GeistMono.className} text-lg font-medium`}>Levanta Labs SWE Intern</h3>
                  <span className="timeline-date">May 2025 - Present</span>
                </div>

                <p className="text-[#333333]/80 text-sm mb-4">
                  Developing custom software solutions for clients ranging from early-stage SaaS companies to
                  established B2B organizations. Creating internal tools, AI-powered systems, and full-scale SaaS
                  platforms.
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="timeline-tech-badge">React.js</span>
                  <span className="timeline-tech-badge">Next.js</span>
                  <span className="timeline-tech-badge">Typescript</span>
                  <span className="timeline-tech-badge">Tailwind</span>
                </div>
              </div>
            </motion.div>

            {/* Hacker Fab */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="timeline-item timeline-right mb-14"
            >
              {/* Timeline dot */}
              <div className="timeline-dot-container">
                <div className="timeline-dot"></div>
              </div>

              {/* Company logo - on left side for right cards */}
              <div className="company-logo-container logo-left">
                <Image
                  src="/company_icons/Hacker Fab_Black w lilac.png"
                  alt="Hacker Fab Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>

              {/* Content card */}
              <div className="timeline-card group">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                  <h3 className={`${GeistMono.className} text-lg font-medium`}>Hacker Fab Engineer</h3>
                  <span className="timeline-date">Sept 2023 - May 2024</span>
                </div>

                <p className="text-[#333333]/80 text-sm mb-4">
                  Led the development of a real-time dashboard application using Qt/C++, enabling the team to visualize
                  live robot sensor data for faster diagnostics and performance evaluation.
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="timeline-tech-badge">C++</span>
                  <span className="timeline-tech-badge">Qt</span>
                  <span className="timeline-tech-badge">Robotics</span>
                </div>
              </div>
            </motion.div>

            {/* Kumon */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="timeline-item timeline-left"
            >
              {/* Timeline dot */}
              <div className="timeline-dot-container">
                <div className="timeline-dot"></div>
              </div>

              {/* Company logo - on right side for left cards */}
              <div className="company-logo-container logo-right">
                <Image
                  src="/company_icons/Kumon_Method_Logo.svg.png"
                  alt="Kumon Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>

              {/* Content card */}
              <div className="timeline-card group">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                  <h3 className={`${GeistMono.className} text-lg font-medium`}>Senior Assistant Teacher</h3>
                  <span className="timeline-date">Sept 2020 - Sept 2024</span>
                </div>

                <p className="text-[#333333]/80 text-sm mb-4">
                  Mentored 20+ students in advanced mathematics, achieving a 95% student retention rate and contributing
                  to the Kumon center&apos;s ranking as 2nd in North America.
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="timeline-tech-badge">Education</span>
                  <span className="timeline-tech-badge">Mathematics</span>
                  <span className="timeline-tech-badge">Mentorship</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Custom styling for timeline components */}
        <style jsx>{`
          .timeline-item {
            position: relative;
            width: 100%;
            display: flex;
            align-items: center;
            min-height: 120px;
          }

          .timeline-left {
            flex-direction: row;
          }

          .timeline-right {
            flex-direction: row-reverse;
          }

          .timeline-dot-container {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 20;
          }

          .timeline-dot {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: white;
            border: 3px solid rgba(0, 0, 0, 0.2);
            z-index: 10;
          }
          
          .company-logo-container {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            background-color: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(0, 0, 0, 0.05);
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
            padding: 6px;
          }

          .logo-left {
            left: calc(50% - 80px);
          }

          .logo-right {
            right: calc(50% - 80px);
          }
          
          .timeline-card {
            background-color: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(0, 0, 0, 0.05);
            border-radius: 12px;
            padding: 20px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
            width: calc(50% - 40px);
            margin: 0;
          }
          
          .timeline-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.04);
            background-color: rgba(255, 255, 255, 0.8);
          }
          
          .timeline-date {
            font-size: 0.8rem;
            color: rgba(0, 0, 0, 0.6);
            font-family: ${GeistMono.className};
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

          /* Responsive styles */
          @media (max-width: 768px) {
            .timeline-left, .timeline-right {
              flex-direction: column;
              align-items: flex-start;
              padding-top: 80px;
              margin-bottom: 30px;
            }

            .timeline-dot-container {
              left: 50%;
              top: 30px;
              transform: translateX(-50%);
            }

            .company-logo-container {
              top: 30px;
            }

            .logo-left {
              left: calc(50% + 20px);
            }

            .logo-right {
              right: auto;
              left: calc(50% - 80px);
            }

            .timeline-card {
              width: 100%;
              margin-top: 20px;
            }
          }
        `}</style>
      </div>
      
          {/* Section scroll indicator
          <SectionScrollIndicator targetRef={achievementsRef} /> */}

    </section>
  )
}


