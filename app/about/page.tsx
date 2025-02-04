"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const skills = [
  { name: "JavaScript/TypeScript", level: 80 },
  { name: "React/Next.js", level: 75 },
  { name: "Node.js", level: 70 },
  { name: "Python", level: 70 },
  { name: "C++", level: 75 }
];

const experiences = [
  {
    year: "2024-2025",
    role: "HackerFab Software Developer",
    company: "University Of Waterloo",
    description: "Helping in the development of the HackerFab Sputter Deposition System"
  },
  {
    year: "2020-2024",
    role: "Senior Math Assistant",
    company: "Kumon Math & Reading Center",
    description: "Helped students with deeper understanding of higher-level math concepts"
  },
  {
    year: "2023-2025",
    role: "FreeLance Developer",
    company: "Self-Employed",
    description: "Helped Develop Websites for Local Businesses and School Clubs"
  }

];

export default function About() {
  return (
    <div className="min-h-screen p-8 md:p-16 font-mono">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-12 text-center">About Me</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Bio</h2>
                <p className="text-gray-600 leading-relaxed">
                I'm Kushal Prajapati, an aspiring software engineer currently studying Computer Engineering at the University of Waterloo. I specialize in building modern web applications using Next.js, React, and Node.js, with a focus on creating responsive and performant solutions.                  With expertise in modern web technologies, I focus on building performant and scalable applications.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Skills</h2>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">{skill.name}</span>
                        <span className="text-sm text-gray-500">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2"
          >
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Experience</h2>
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={exp.year}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex gap-6"
                    >
                      <div className="text-gray-500 whitespace-nowrap">{exp.year}</div>
                      <div>
                        <h3 className="font-bold">{exp.role}</h3>
                        <div className="text-gray-600">{exp.company}</div>
                        <p className="text-gray-500 mt-1">{exp.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
