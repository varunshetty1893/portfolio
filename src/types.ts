export enum SkillCategory {
  LANGUAGES = "Languages",
  BACKEND = "Backend & DB",
  AI_ML = "AI & ML",
  FRONTEND = "Frontend",
  TOOLS = "Tools & DevOps",
}

export enum SkillNames {
  PYTHON = "python",
  JAVASCRIPT = "javascript",
  TYPESCRIPT = "typescript",
  PHP = "php",
  JAVA = "java",
  SQL = "sql",
  HTML5 = "html5",
  CSS3 = "css3",
  FLASK = "flask",
  POSTGRES = "postgres",
  MYSQL = "mysql",
  SQLITE = "sqlite",
  NODEJS = "nodejs",
  EXPRESS = "express",
  SCIKIT = "scikit",
  NUMPY = "numpy",
  PANDAS = "pandas",
  DENSENET = "densenet",
  GROQ_AI = "groq_ai",
  REACT = "react",
  TAILWIND = "tailwind",
  BOOTSTRAP = "bootstrap",
  ALPINEJS = "alpinejs",
  GIT = "git",
  GITHUB = "github",
  VSCODE = "vscode",
  VERCEL = "vercel",
  RENDER = "render",
  LINUX = "linux",
  POSTMAN = "postman",
}

export interface Skill {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  category: SkillCategory;
  color: string;
  icon: string;
}

export interface Experience {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  location?: string;
  type: "Work" | "Education" | "Project";
  description: string[];
  skills: SkillNames[];
}

export interface ProjectSkillItem {
  name: string;
  icon: string;
  color?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  badge?: string;
  highlights: string[];
  features: string[];
  technicalDetails: string[];
  github?: string;
  live?: string;
  image?: string;
  skills: {
    frontend: ProjectSkillItem[];
    backend: ProjectSkillItem[];
    mlOrTools?: ProjectSkillItem[];
  };
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  hackerrank: string;
  instagram: string;
  email: string;
  portfolio: string;
}

export interface SiteConfig {
  title: string;
  author: string;
  role: string;
  location: string;
  status: string;
  email: string;
  site: string;
  githubUsername: string;
  githubRepo: string;
  description: {
    short: string;
    long: string;
  };
  social: SocialLinks;
}
