"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { GeistMono } from 'geist/font/mono';

const skillCategories = {
  languages: [
    { name: "JavaScript/TypeScript", level: 80, description: "Modern web development with static typing" },
    { name: "Python", level: 70, description: "Data processing and automation" },
    { name: "C++", level: 75, description: "Systems programming and algorithms" }
  ],
  frameworks: [
    { name: "React/Next.js", level: 75, description: "Frontend development with server components" },
    { name: "Node.js", level: 70, description: "Backend development and API creation" },
    { name: "TailwindCSS", level: 85, description: "Utility-first CSS framework" }
  ],
  tools: [
    { name: "Git/GitHub", level: 85, description: "Version control and collaboration" },
    { name: "Docker", level: 65, description: "Containerization and deployment" },
    { name: "Linux", level: 70, description: "System administration" }
  ]
};

const interests = {
  technical: [
    "Artificial Intelligence & Machine Learning",
    "Full Stack Development",
    "System Design & Architecture",
    "Mobile App Development",
    "Cloud Computing & DevOps"
  ],
  hobbies: [
    "Photography",
    "Gaming",
    "Reading Tech Blogs",
    "Learning New Technologies",
    "Building Side Projects"
  ]
};

const education = [
  {
    degree: "Computer Engineering",
    school: "University of Waterloo",
    year: "2024-2029",
    details: "Focusing on software development and AI applications"
  }
];

const experiences = [
  {
    year: "2024-2025",
    role: "HackerFab Software Developer",
    company: "University of Waterloo",
    description: "Contributed to the development of the HackerFab Sputter Deposition System, focusing on software integration and real-time data monitoring to improve system performance."
  },
  {
    year: "2020-2024",
    role: "Senior Math Assistant",
    company: "Kumon Math & Reading Center",
    description: "Mentored 20+ students in advanced mathematics, achieving a 95% student retention rate and helping the center rank 2nd in North America. Analyzed student performance data using Excel and Power BI to identify learning gaps and optimize strategies."
  },
  {
    year: "2023-2025",
    role: "Freelance Web Developer",
    company: "Self-Employed",
    description: "Designed and developed websites for local businesses and school clubs, focusing on user experience and responsive design. Optimized site performance and integrated content management systems to enhance site maintenance and scalability."
  },
  {
    year: "2023-2024",
    role: "Software Developer",
    company: "VEX Robotics Team",
    description: "Led the development of a Qt/C++ dashboard for visualizing live robot sensor data, aiding the team in quickly diagnosing issues. Contributed to autonomous programming, achieving 90% accuracy in navigation, and optimized sensor data processing to reduce tracking error to less than 2 cm."
  }
];


export default function About() {
  return (
    <ScrollArea className="h-screen">
      <div className="min-h-screen p-8 md:p-16 font-mono max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10"
        >
          {/* Enhanced Header Animation */}
          <div className="text-center space-y-4 mb-12">
            <motion.h1 
              className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              About Me
            </motion.h1>
            <motion.div 
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className={`text-gray-600 max-w-2xl mx-auto ${GeistMono.className}`}>
                Computer Engineering Student at University of Waterloo
              </p>
              <div className="flex gap-2">
                <Badge variant="outline">2023 - 2028</Badge>
                <Badge variant="outline">Full Stack Development</Badge>
                <Badge variant="outline">AI/ML</Badge>
              </div>
            </motion.div>
          </div>

          <Separator className="my-8" />

          {/* Enhanced Tabs */}
          <Tabs defaultValue="bio" className="w-full mb-12">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-black/[0.02] rounded-lg p-1">
              <TabsTrigger 
                value="bio" 
                className="data-[state=active]:bg-white data-[state=active]:scale-105 transition-all duration-200"
              >
                Bio
              </TabsTrigger>
              <TabsTrigger 
                value="interests" 
                className="data-[state=active]:bg-white data-[state=active]:scale-105 transition-all duration-200"
              >
                Interests
              </TabsTrigger>
              <TabsTrigger 
                value="education" 
                className="data-[state=active]:bg-white data-[state=active]:scale-105 transition-all duration-200"
              >
                Education
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bio">
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Card className="border-black/5 shadow-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">About Me</h2>
                    <p className={`text-gray-600 leading-relaxed ${GeistMono.className}`}>
                      I&apos;m Kushal Prajapati, an aspiring AI + FullStack developer currently studying Computer Engineering at the University of Waterloo. I specialize in building modern web applications using Next.js, React, and Node.js, with a focus on creating responsive and performant solutions.                  With expertise in modern web technologies, I focus on building performant and scalable applications.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="interests">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["technical", "hobbies"].map((type) => (
                  <motion.div
                    key={type}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Card className="border-black/5 shadow-sm hover:shadow-md transition-all duration-300">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4 capitalize">{type}</h3>
                        <ul className="space-y-2">
                          {interests[type as keyof typeof interests].map((item, index) => (
                            <motion.li 
                              key={item}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              whileHover={{ x: 5 }}
                              transition={{ 
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 400
                              }}
                              className="flex items-center gap-2 group cursor-pointer"
                            >
                              <span className="text-black/30 group-hover:text-black/60 transition-colors">▹</span>
                              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="education">
              <Card>
                <CardContent className="p-6">
                  {education.map((edu) => (
                    <div key={edu.degree} className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{edu.year}</Badge>
                        <h3 className="text-lg font-semibold">{edu.degree}</h3>
                      </div>
                      <p className="text-gray-600">{edu.school}</p>
                      <p className="text-sm text-gray-500">{edu.details}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Main Content */}
          <div className="grid gap-8">
            {/* Skills Grid - Enhanced animations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(skillCategories).map(([category, skills]) => (
                <motion.div
                  key={category}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Card className="border-black/5 shadow-sm hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold capitalize mb-6">{category}</h3>
                      <div className="space-y-4">
                        {skills.map((skill) => (
                          <HoverCard key={skill.name}>
                            <HoverCardTrigger asChild>
                              <motion.div 
                                className="space-y-2 cursor-pointer"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400 }}
                              >
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium">{skill.name}</span>
                                  <span className="text-xs text-gray-500">{skill.level}%</span>
                                </div>
                                <Progress value={skill.level} className="h-1.5" />
                              </motion.div>
                            </HoverCardTrigger>
                            <HoverCardContent 
                              side="top" 
                              className="w-64 animate-in fade-in-0 zoom-in-95"
                            >
                              <p className="text-sm">{skill.description}</p>
                            </HoverCardContent>
                          </HoverCard>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Experience Timeline - Enhanced animations */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Card className="border-black/5 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Experience</h2>
                  <div className="space-y-6">
                    {experiences.map((exp, index) => (
                      <motion.div
                        key={exp.year}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="relative pl-8 pb-6 border-l border-gray-200 last:pb-0"
                      >
                        <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-gray-200" />
                        <Badge variant="outline" className="mb-2">{exp.year}</Badge>
                        <h3 className="font-bold text-lg mt-2">{exp.role}</h3>
                        <p className="text-gray-600 text-sm">{exp.company}</p>
                        <p className="text-gray-500 mt-2 text-sm">{exp.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </ScrollArea>
  );
}
