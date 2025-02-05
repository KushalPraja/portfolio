export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
}

export interface ProjectCategory {
  category: string;
  items: Project[];
}
