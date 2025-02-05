"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const projects = [
  {
    category: "Web",
    items: [
      {
        title: "FiscalFox",
        description: "Effortless customer management with real-time updates. FiscalFox is a sleek, modern system built with Next.js and TailwindCSS that leverages Supabase (with PostgreSQL) for live data synchronization.",
        tech: ["Next.js", "TailwindCSS", "Supabase", "PostgreSQL", "Vercel"],
        link: "https://github.com/KushalPraja/FiscalFox"
      },
      {
        title:"Portfolio Website",
        description:"A personal portfolio website template that showcases my work and experience. Also used Three.js for the 3D background, and Framer Motion for animations. Built with Next.js and Tailwind CSS.",
        tech:["React","Tailwind CSS", "Framer Motion", "Vercel", "TypeScript", "Next.js"],
        link:"kushalprajapati.me"
      },
      {
        title: "WordleNeo 🎮",
        description: "A modern reimagining of the classic Wordle game that retains its addictive word-guessing mechanics while featuring a sleek, contemporary interface.",
        tech: ["Next.js", "Tailwind CSS"],
        link: "https://github.com/KushalPraja/WordleNeo"
      },
      {
        title: "motions",
        description: "A React application inspired by eraser.io, designed for interactive drawing experiences using the HTML canvas.",
        tech: ["React", "HTML Canvas", "Vite"],
        link: "https://github.com/KushalPraja/motions"
      },
      {
        title: "Music Visualization Project",
        description: "A dynamic music visualization tool that transforms audio files into engaging animated visuals.",
        tech: ["p5.js", "Express", "Node.js", "YouTube API"],
        link: "https://github.com/yourusername/music-vis.git"
      },
      {
        title: "School Partners Database",
        description: "A platform for finding the latest information about school, community, and business partnerships.",
        tech: ["Node.js", "Express"],
        link: "https://github.com/KushalPraja/School-Partners-Database"
      },
     
    ]
  },
  {
    category: "Games",
    items: [
      {
        title: "Tic-Tac-Toe AI",
        description: "A web-based Tic-Tac-Toe game that offers both a two-player mode and a challenging AI opponent.",
        tech: ["JavaScript", "HTML5", "CSS3"],
        link: "https://github.com/KushalPraja/Tic-Tac-Toe-AI"
      },
      {
        title: "Etch-A-Sketch",
        description: "An interactive drawing application inspired by the classic Etch-A-Sketch toy.",
        tech: ["JavaScript", "CSS Grid", "DOM Manipulation"],
        link: "https://github.com/KushalPraja/Etch-A-Sketch"
      }
    ]
  },
  {
    category: "Desktop",
    items: [
      {
        title: "Math Canvas",
        description: "A graphical tracer application that allows users to draw and visualize mathematical functions.",
        tech: ["Python", "Pygame"],
        link: "https://github.com/KushalPraja/Math-Canvas"
      },
      {
        title: "EssayBot Chatbot",
        description: "A chatbot application that utilizes the OpenAI GPT-3 language model to generate detailed, essay-like responses.",
        tech: ["Python", "tkinter", "OpenAI Python library"],
        link: "https://github.com/KushalPraja/EssayBot-Chatbot"
      },
      {
        title: "VPython Planetary Orbit Visualization",
        description: "A 3D solar system visualization tool built with Python that uses the VPython library.",
        tech: ["Python", "VPython", "Pygame"],
        link: "https://github.com/KushalPraja/VPython-Planetary-Orbit-Visualization"
      }
    ]
  }
];

export default function Projects() {
  return (
    <div className="min-h-screen p-8 md:p-16 font-mono">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Projects</h1>
        
        <Tabs defaultValue="Web" className="w-full">
          <TabsList className="w-full justify-start mb-8">
            {projects.map(category => (
              <TabsTrigger key={category.category} value={category.category}>
                {category.category}
              </TabsTrigger>
            ))}
          </TabsList>

          {projects.map(category => (
            <TabsContent key={category.category} value={category.category}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.items.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map(tech => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-black/5 rounded-full text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </div>
  );
}
