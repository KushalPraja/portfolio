import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    tech: string[];
    link: string;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <Card className="group h-full flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 relative z-10">
          <CardHeader className="space-y-2 p-4">
            <div className="flex justify-between items-start">
              <CardTitle className="group-hover:text-primary transition-colors line-clamp-1 text-base">
                {project.title}
              </CardTitle>
              <div className="flex gap-2 shrink-0">
                {project.link && (
                  <>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="opacity-50 hover:opacity-100 transition-opacity hover:text-primary"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    {project.link.includes('github.com') && (
                      <a 
                        href={project.link.replace('github.com', 'github1s.com')} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="opacity-50 hover:opacity-100 transition-opacity hover:text-primary"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </>
                )}
              </div>
            </div>
            <CardDescription className="line-clamp-2 min-h-[2.5rem] text-sm">
              {project.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto p-4 pt-0">
            <Separator className="mb-3" />
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map(tech => (
                <Badge 
                  key={tech} 
                  variant="outline"
                  className="hover:bg-primary hover:text-primary-foreground transition-colors text-xs"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent 
        className="w-80 backdrop-blur-sm bg-card/80 z-50"
        align="start"
        sideOffset={8}
        avoidCollisions
      >
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">{project.title}</h4>
          <p className="text-sm text-muted-foreground">
            {project.description}
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
