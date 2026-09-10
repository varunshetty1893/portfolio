import React from "react";
import { ArrowUp, Github, Linkedin, Mail, Terminal } from "lucide-react";
import { config } from "@/data/config";

interface FooterProps {
  theme?: "dark" | "light";
}

export const Footer: React.FC<FooterProps> = ({ theme = "dark" }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`relative z-10 border-t py-12 px-4 sm:px-6 lg:px-8 transition-colors ${
        theme === "dark"
          ? "border-zinc-800/80 bg-black/95 text-zinc-400"
          : "border-zinc-200 bg-white/90 text-zinc-600"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2">
            <span
              className={`font-display font-bold text-base ${
                theme === "dark" ? "text-white" : "text-zinc-950"
              }`}
            >
              Varun Shetty B
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-zinc-800 bg-zinc-900 text-zinc-400">
              MCA Scholar
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1 max-w-sm font-sans">
            Crafting scalable full-stack architectures and machine learning systems.
          </p>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 mt-2">
            <Terminal className="w-3 h-3 text-zinc-400" />
            <span>Check DevTools console (F12) for developer easter egg!</span>
          </div>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-2.5">
          <a
            href={config.social.github}
            target="_blank"
            rel="noreferrer"
            className={`p-2.5 rounded-lg border transition-colors ${
              theme === "dark"
                ? "border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white"
                : "border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800"
            }`}
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={config.social.linkedin}
            target="_blank"
            rel="noreferrer"
            className={`p-2.5 rounded-lg border transition-colors ${
              theme === "dark"
                ? "border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white"
                : "border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800"
            }`}
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={config.social.email}
            className={`p-2.5 rounded-lg border transition-colors ${
              theme === "dark"
                ? "border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white"
                : "border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800"
            }`}
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Copyright & Back to Top */}
        <div className="flex flex-col items-center md:items-end gap-2 text-xs">
          <span>Designed & Engineered by Varun Shetty B</span>
          <button
            onClick={scrollToTop}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border transition-colors ${
              theme === "dark"
                ? "border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white"
                : "border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800"
            }`}
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
