"use client";
import { useState } from 'react';

interface ProjectThumbnailProps {
  project: string;
  color?: string;
}

export default function ProjectThumbnail({ project, color = "#50fa7b" }: ProjectThumbnailProps) {
  const [loaded, setLoaded] = useState(false);
  
  // Generate project-specific placeholder image
  const getPlaceholderImage = (projectName: string) => {
    switch(projectName) {
      case "Branch":
        return {
          bg: "#8be9fd33",
          icon: "🔗"
        };
      case "Thorem":
        return {
          bg: "#bd93f933",
          icon: "📝"
        };
      case "GreenLens":
        return {
          bg: "#50fa7b33",
          icon: "🌿"
        };
      default:
        return {
          bg: "#f8f8f833",
          icon: "💻"
        };
    }
  };
  
  const placeholderImage = getPlaceholderImage(project);
  
  return (
    <div 
      className="w-full h-40 rounded-md overflow-hidden flex items-center justify-center relative transition-all duration-300 group"
      style={{ 
        backgroundColor: placeholderImage.bg,
        color: color
      }}
      onLoad={() => setLoaded(true)}
    >
      <div className="text-5xl opacity-30 group-hover:opacity-50 transition-opacity">
        {placeholderImage.icon}
      </div>
      <div className="absolute inset-0 border border-black/5 rounded-md pointer-events-none" />
      <div 
        className={`absolute bottom-2 right-2 text-xs bg-white/70 backdrop-blur-sm px-2 py-1 rounded ${loaded ? 'opacity-70' : 'opacity-0'} group-hover:opacity-100 transition-opacity`}
        style={{ color: color }}
      >
        {project}
      </div>
    </div>
  );
}