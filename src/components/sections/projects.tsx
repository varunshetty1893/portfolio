import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { projects } from "@/data/projects";
import { Project } from "@/types";
import {
  ExternalLink,
  Github,
  CheckCircle2,
  X,
  ArrowUpRight,
  Code,
  Sparkles,
} from "lucide-react";

interface ProjectsSectionProps {
  theme: "dark" | "light";
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ theme }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Close modal on Escape and prevent background scrolling
  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedProject]);

  return (
    <section
      id="projects"
      className="relative min-h-screen py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto z-10 flex flex-col justify-center canvas-overlay-mode"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight uppercase">
          <span className={theme === "dark" ? "text-white" : "text-zinc-950"}>
            Featured
          </span>{" "}
          <span className="text-edge-outline">Projects</span>
        </h2>
        <p className="mt-3 text-zinc-400 dark:text-zinc-400 text-sm sm:text-base font-sans">
          Production systems, AI platforms, and algorithmic architectures.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`group relative rounded-2xl border p-5 flex flex-col justify-between backdrop-blur-md transition-all duration-200 hover:-translate-y-1 ${
              theme === "dark"
                ? "border-zinc-800/90 bg-zinc-900/40 hover:bg-zinc-900/70 hover:border-zinc-700"
                : "border-zinc-200 bg-white/80 hover:bg-white hover:border-zinc-300 shadow-sm"
            }`}
          >
            {/* Project Preview Window Mockup */}
            <div className="mb-4">
              <div
                className={`rounded-xl border p-3 shadow-inner backdrop-blur-md ${
                  theme === "dark"
                    ? "border-zinc-800/80 bg-zinc-950/60"
                    : "border-zinc-200/80 bg-zinc-100/70"
                }`}
              >
                {/* Browser top-bar chrome */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800/40">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/90 inline-block ring-1 ring-red-500/30" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/90 inline-block ring-1 ring-yellow-400/30" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 inline-block ring-1 ring-emerald-500/30" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 truncate max-w-[150px]">
                    {project.live ? new URL(project.live).hostname : `${project.id}.local`}
                  </span>
                </div>

                {/* Visual Content inside mockup */}
                <div
                  className={`h-28 flex flex-col justify-between rounded-lg p-3 backdrop-blur-sm ${
                    theme === "dark"
                      ? "bg-zinc-900/60 border border-zinc-800/60"
                      : "bg-white/70 border border-zinc-200"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                        theme === "dark"
                          ? "border-zinc-800 bg-zinc-800/60 text-zinc-300"
                          : "border-zinc-200 bg-zinc-100 text-zinc-700"
                      }`}
                    >
                      {project.category}
                    </span>
                    {project.badge && (
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${
                          theme === "dark"
                            ? "border-zinc-700 bg-zinc-800 text-zinc-200"
                            : "border-zinc-300 bg-zinc-200 text-zinc-900"
                        }`}
                      >
                        {project.badge}
                      </span>
                    )}
                  </div>
                  <div>
                    <h4
                      className={`font-display font-bold text-base line-clamp-1 ${
                        theme === "dark" ? "text-white" : "text-zinc-950"
                      }`}
                    >
                      {project.title}
                    </h4>
                    <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                      {project.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Body Description & Highlights */}
            <div className="flex-1 flex flex-col justify-between">
              <p
                className={`text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4 ${
                  theme === "dark" ? "text-zinc-300" : "text-zinc-700"
                }`}
              >
                {project.description}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {[...project.skills.backend, ...project.skills.frontend]
                  .slice(0, 4)
                  .map((skill) => (
                    <span
                      key={skill.name}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono border ${
                        theme === "dark"
                          ? "border-zinc-800 bg-zinc-900/80 text-zinc-300"
                          : "border-zinc-200 bg-zinc-100 text-zinc-700"
                      }`}
                    >
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-3 h-3 object-contain"
                      />
                      <span>{skill.name}</span>
                    </span>
                  ))}
                {[...project.skills.backend, ...project.skills.frontend].length > 4 && (
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-mono text-zinc-500">
                    +{[...project.skills.backend, ...project.skills.frontend].length - 4} more
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-zinc-800/40 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className={`text-xs font-semibold flex items-center gap-1 transition-colors ${
                    theme === "dark"
                      ? "text-zinc-300 hover:text-white"
                      : "text-zinc-800 hover:text-black"
                  }`}
                >
                  <span>Details & Arch</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      title="GitHub Repository"
                      className={`p-2 rounded-lg border transition-colors ${
                        theme === "dark"
                          ? "border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white"
                          : "border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800"
                      }`}
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      title="Live Demo"
                      className={`p-2 rounded-lg border transition-colors ${
                        theme === "dark"
                          ? "border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-100"
                          : "border-zinc-300 bg-zinc-100 hover:bg-zinc-200 text-zinc-900"
                      }`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive Detailed Modal Dialog */}
      {selectedProject &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedProject(null);
            }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 pt-16 sm:pt-20 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 pointer-events-auto"
          >
            <div
              className={`relative w-full max-w-3xl max-h-[85vh] sm:max-h-[88vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden pointer-events-auto animate-in zoom-in-95 duration-150 ${
                theme === "dark"
                  ? "border-zinc-800 bg-zinc-950 text-zinc-100 shadow-black/80"
                  : "border-zinc-300 bg-white text-zinc-900 shadow-xl"
              }`}
            >
              {/* Modal Header */}
              <div
                className={`sticky top-0 z-30 flex items-center justify-between border-b px-5 sm:px-6 py-3.5 sm:py-4 backdrop-blur-md ${
                  theme === "dark"
                    ? "border-zinc-800 bg-zinc-900/95 text-white"
                    : "border-zinc-200 bg-zinc-50/95 text-zinc-900"
                }`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
                  <div className="hidden sm:flex items-center gap-1.5 mr-1 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/90 inline-block ring-1 ring-red-500/30" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/90 inline-block ring-1 ring-yellow-400/30" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 inline-block ring-1 ring-emerald-500/30" />
                  </div>
                  <h3 className="font-display font-bold text-lg sm:text-2xl truncate">
                    {selectedProject.title}
                  </h3>
                  <span
                    className={`shrink-0 text-[10px] sm:text-xs font-mono uppercase px-2 sm:px-2.5 py-0.5 rounded-full border ${
                      theme === "dark"
                        ? "border-zinc-700 bg-zinc-800 text-zinc-300"
                        : "border-zinc-300 bg-zinc-200 text-zinc-800"
                    }`}
                  >
                    {selectedProject.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                        theme === "dark"
                          ? "border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200"
                          : "border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-900"
                      }`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source</span>
                    </a>
                  )}
                  {selectedProject.live && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                        theme === "dark"
                          ? "bg-zinc-100 text-zinc-950 hover:bg-white"
                          : "bg-zinc-950 text-white hover:bg-zinc-800"
                      }`}
                    >
                      <span>Visit Live</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedProject(null)}
                    aria-label="Close project modal"
                    title="Close (Esc)"
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      theme === "dark"
                        ? "border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white"
                        : "border-zinc-300 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-950"
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
                {/* Overview & Subtitle */}
                <div>
                  <p className="text-sm sm:text-base font-semibold mb-1 text-zinc-300 dark:text-zinc-300">
                    {selectedProject.subtitle}
                  </p>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Floating Dock Tech Stack */}
                <div
                  className={`space-y-4 rounded-xl border p-5 backdrop-blur-md ${
                    theme === "dark"
                      ? "border-zinc-800 bg-zinc-900/40"
                      : "border-zinc-200 bg-zinc-50/80"
                  }`}
                >
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    Technology Stack
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Backend pills */}
                    <div>
                      <span className="text-[11px] font-mono text-zinc-400 block mb-2">
                        Backend & Infrastructure
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.skills.backend.map((s) => (
                          <span
                            key={s.name}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono border ${
                              theme === "dark"
                                ? "border-zinc-800 bg-zinc-900 text-zinc-300"
                                : "border-zinc-200 bg-white text-zinc-800"
                            }`}
                          >
                            <img
                              src={s.icon}
                              alt={s.name}
                              className="w-3.5 h-3.5 object-contain"
                            />
                            <span>{s.name}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Frontend pills */}
                    <div>
                      <span className="text-[11px] font-mono text-zinc-400 block mb-2">
                        Frontend & Interface
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.skills.frontend.map((s) => (
                          <span
                            key={s.name}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono border ${
                              theme === "dark"
                                ? "border-zinc-800 bg-zinc-900 text-zinc-300"
                                : "border-zinc-200 bg-white text-zinc-800"
                            }`}
                          >
                            <img
                              src={s.icon}
                              alt={s.name}
                              className="w-3.5 h-3.5 object-contain"
                            />
                            <span>{s.name}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="font-display font-bold text-base mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-zinc-400" />
                    <span>Key Features & Capabilities</span>
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Implementation & Challenges */}
                <div>
                  <h4 className="font-display font-bold text-base mb-3 flex items-center gap-2">
                    <Code className="w-4 h-4 text-zinc-400" />
                    <span>Technical Implementation & Architecture</span>
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.technicalDetails.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0 mt-2" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Footer Dismiss Button */}
                <div className="pt-4 border-t border-zinc-800/40 flex justify-end">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                      theme === "dark"
                        ? "border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white"
                        : "border-zinc-300 bg-zinc-100 hover:bg-zinc-200 text-zinc-800"
                    }`}
                  >
                    Close Dialog
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};
