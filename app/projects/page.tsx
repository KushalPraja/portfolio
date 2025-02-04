"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const projects = [
  {
    category: "Web",
    items: [
      {
        title: "E-Commerce Platform",
        description: "Built with Next.js and TypeScript",
        tech: ["React", "Next.js", "TypeScript", "Tailwind"],
        link: "#"
      },
      {
        title: "Portfolio Website",
        description: "Interactive 3D portfolio",
        tech: ["Three.js", "React", "Framer Motion"],
        link: "#"
      }
    ]
  },
  {
    category: "Mobile",
    items: [
      {
        title: "Fitness Tracker",
        description: "Cross-platform mobile app",
        tech: ["React Native", "Firebase", "Redux"],
        link: "#"
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
