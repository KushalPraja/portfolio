"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { Project, ProjectCategory } from "@/types/project";

const projects: ProjectCategory[] = [
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
        tech:["React","TailwindCSS", "Framer Motion", "Vercel", "TypeScript", "Next.js"],
        link:"kushalprajapati.me"
      },
      {
        title: "WordleNeo 🎮",
        description: "A modern reimagining of the classic Wordle game that retains its addictive word-guessing mechanics while featuring a sleek, contemporary interface.",
        tech: ["Next.js", "TailwindCSS"],
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
  const [searchTerm, setSearchTerm] = useState("");

  const filterProjects = (items: Project[]): Project[] => {
    return items.filter(project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tech.some((tech) => 
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <div className="min-h-screen p-8 md:p-16 font-mono bg-gradient-to-b from-background via-background to-secondary/10 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto relative z-0"
      >
        <div className="text-center space-y-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h1 className="text-4xl font-bold tracking-tight mb-4">My Projects</h1>
            <p className="text-muted-foreground max-w-[42rem] mx-auto">
              A collection of my work, side projects, and experiments. Each project represents a unique challenge and learning experience.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-md mx-auto"
          >
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects by name, description, or tech..."
              className="pl-8 bg-background/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>
        </div>
        
        <Tabs defaultValue="Web" className="w-full">
          <TabsList className="w-full justify-start mb-8 bg-background/50 backdrop-blur-sm sticky top-0 z-40">
            {projects.map(category => (
              <TabsTrigger 
                key={category.category} 
                value={category.category}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category.category}
              </TabsTrigger>
            ))}
          </TabsList>

          {projects.map(category => (
            <TabsContent key={category.category} value={category.category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                <AnimatePresence mode="popLayout">
                  {filterProjects(category.items).map((project, index) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.1 }}
                      layout
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </div>
  );
}
