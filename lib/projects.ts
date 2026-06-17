export interface Project {
  title: string;
  description: string;
  link: string;
  preview: string;
  poster?: string;
  type: "video" | "image";
}

export const projects: Project[] = [
  {
    title: "Rendr",
    description: "Agentic 3D design system that converts natural language into manufacturable CAD models.",
    link: "https://devpost.com/software/rendr",
    preview: "/projects/rendr.mp4",
    type: "video",
  },
  {
    title: "Persona",
    description: "Tool for building AI-powered Q&A product support agents with one-click deployment.",
    link: "https://github.com/KushalPraja/persona",
    preview: "/projects/persona.thumb.mp4",
    poster: "/projects/persona.poster.jpg",
    type: "video",
  },
  {
    title: "GreenLens",
    description: "Using AI to help users make environmentally conscious decisions. GenAI Genesis 2025 winner.",
    link: "https://github.com/KushalPraja/greenlens",
    preview: "/projects/greenlens.thumb.mp4",
    poster: "/projects/greenlens.poster.jpg",
    type: "video",
  },
  {
    title: "Game of Life",
    description: "Conway's Game Of Life cellular automata in Raylib.",
    link: "https://github.com/KushalPraja/raylib_game_of_life",
    preview: "/projects/game_of_life.mp4",
    type: "video",
  },
  {
    title: "Thorem",
    description: "A tool that uses AI to convert handwritten text and equations to LaTeX.",
    link: "https://github.com/KushalPraja/thorem",
    preview: "/projects/thorem.thumb.mp4",
    poster: "/projects/thorem.poster.jpg",
    type: "video",
  },
  {
    title: "Orb Recorder",
    description: "An opinionated screen recorder for recording beautiful demo videos.",
    link: "https://github.com/KushalPraja/orb_recorder",
    preview: "/projects/orb.mp4",
    type: "video",
  },
  {
    title: "pg3d",
    description: "Simple 3D rasterization engine with interactive movement, built in Pygame.",
    link: "https://github.com/KushalPraja/pg3d",
    preview: "/projects/pg3d.png",
    type: "image",
  },
  {
    title: "Particle Sim",
    description: "A simple particle simulator made using Raylib in C.",
    link: "https://github.com/KushalPraja/particle_sim",
    preview: "/projects/particle_sim.mp4",
    type: "video",
  },
  {
    title: "Kenesis",
    description: "Control physical robots through natural hand gestures using AR glasses.",
    link: "https://github.com/KushalPraja/kenesis",
    preview: "/projects/kenesis.png",
    type: "image",
  },
  {
    title: "Soundwave",
    description: "Visualizer and music player made with p5.js.",
    link: "https://github.com/KushalPraja/soundwave",
    preview: "/projects/soundwave.thumb.mp4",
    poster: "/projects/soundwave.poster.jpg",
    type: "video",
  },
];
