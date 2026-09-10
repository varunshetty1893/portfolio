import React from "react";
import { FileText, Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { config } from "@/data/config";

interface HeroSectionProps {
  onOpenResume: () => void;
  theme: "dark" | "light";
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume, theme }) => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between pt-20 sm:pt-24 z-10 canvas-overlay-mode"
    >
      <div className="max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-2 items-center flex-1">
        {/* Left Column: Typography, Subtitle & Monochrome Buttons */}
        <div className="flex flex-col justify-center items-start z-10 py-12">
          {/* Greeting */}
          <p className="font-medium text-base sm:text-xl text-zinc-500 dark:text-zinc-400 mb-2">
            Hi, I am
          </p>

          {/* Signature Unbounded Display Typography */}
          <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-9xl tracking-tight leading-[0.92] uppercase select-none text-left mb-4">
            <span className={theme === "dark" ? "text-white block" : "text-zinc-950 block"}>
              Varun
            </span>
            <span className="text-edge-outline block">
              Shetty
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-medium text-lg sm:text-2xl text-zinc-400 dark:text-zinc-400 mb-3">
            A Full Stack & ML Developer
          </p>

          {/* Quick status line */}
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-500 max-w-md mb-8">
            MCA Scholar at Mangalore University. Architecting enterprise platforms like{" "}
            <a href="#projects" className="underline hover:text-zinc-300">ParkWise</a> (640+ tests),{" "}
            <a href="#projects" className="underline hover:text-zinc-300">Zentra ATS</a>, and AI systems.
          </p>

          {/* Monochrome Action Buttons matching reference site */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-6">
            <button
              onClick={onOpenResume}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 active:scale-95 shadow-sm ${
                theme === "dark"
                  ? "bg-zinc-100 text-zinc-950 hover:bg-white"
                  : "bg-zinc-950 text-white hover:bg-zinc-800"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </button>

            <div className="flex items-center gap-2">
              <a
                href="#contact"
                className={`flex-1 sm:flex-initial flex items-center justify-center px-5 py-3 rounded-lg border text-sm font-medium transition-colors ${
                  theme === "dark"
                    ? "border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200 hover:text-white"
                    : "border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-900"
                }`}
              >
                Hire Me
              </a>

              <a
                href={config.social.github}
                target="_blank"
                rel="noreferrer"
                title="GitHub"
                className={`p-3 rounded-lg border transition-colors ${
                  theme === "dark"
                    ? "border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white"
                    : "border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800"
                }`}
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={config.social.linkedin}
                target="_blank"
                rel="noreferrer"
                title="LinkedIn"
                className={`p-3 rounded-lg border transition-colors ${
                  theme === "dark"
                    ? "border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white"
                    : "border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800"
                }`}
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={config.social.email}
                title="Email"
                className={`p-3 rounded-lg border transition-colors ${
                  theme === "dark"
                    ? "border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white"
                    : "border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800"
                }`}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Intentionally open for the 3D keyboard in the background */}
        <div className="hidden md:block col-span-1 h-full min-h-[450px] pointer-events-none" />
      </div>

      {/* Scroll Down Indicator */}
      <div className="w-full flex justify-center pb-8 z-10 pointer-events-auto">
        <a
          href="#skills"
          className="flex flex-col items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-zinc-700 flex items-start justify-center p-1">
            <span className="w-1 h-2 rounded-full bg-zinc-400 animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
};
