import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  Sparkles,
  Volume2,
  VolumeX,
  FileText,
} from "lucide-react";
import { config } from "@/data/config";
import { themeDisclaimers } from "@/data/constants";

interface HeaderProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
  enable3D: boolean;
  toggle3D: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  activeSection: string;
  onOpenResume: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  toggleTheme,
  enable3D,
  toggle3D,
  soundEnabled,
  toggleSound,
  activeSection,
  onOpenResume,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [themeToast, setThemeToast] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleThemeChange = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    const quotes = themeDisclaimers[nextTheme];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setThemeToast(randomQuote);
    setTimeout(() => setThemeToast(null), 3500);
    toggleTheme();
  };

  const navLinks = [
    { label: "About", href: "#hero" },
    { label: "Tech Stack", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Theme switcher quote toast */}
      {themeToast && (
        <div
          className={`fixed top-20 right-6 z-[100] max-w-sm rounded-xl border p-4 text-xs shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-4 ${
            theme === "dark"
              ? "border-zinc-700 bg-zinc-900/95 text-zinc-200"
              : "border-zinc-300 bg-white/95 text-zinc-800"
          }`}
        >
          <div className="flex items-center gap-2 mb-1 font-semibold text-zinc-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Theme Notice</span>
          </div>
          <p className="leading-relaxed">{themeToast}</p>
        </div>
      )}

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? theme === "dark"
              ? "bg-black/85 backdrop-blur-md border-b border-zinc-800/80 shadow-md"
              : "bg-white/85 backdrop-blur-md border-b border-zinc-200 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Name */}
          <a
            href="#hero"
            className="group flex items-center gap-2.5 font-display font-bold text-base sm:text-lg tracking-tight transition-transform hover:scale-[1.01]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span
              className={
                theme === "dark"
                  ? "text-zinc-100 group-hover:text-white"
                  : "text-zinc-900 group-hover:text-black"
              }
            >
              Varun Shetty B
            </span>
            <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded border border-zinc-800 bg-zinc-900 text-zinc-400 font-mono">
              MCA &apos;26
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav
            className={`hidden md:flex items-center gap-1 border rounded-full px-3 py-1.5 backdrop-blur-md ${
              theme === "dark"
                ? "bg-zinc-900/60 border-zinc-800"
                : "bg-zinc-100/80 border-zinc-200"
            }`}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? theme === "dark"
                        ? "bg-zinc-100 text-zinc-950 font-semibold shadow-sm"
                        : "bg-zinc-900 text-white font-semibold shadow-sm"
                      : theme === "dark"
                      ? "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                      : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Actions: 3D, Sound, Theme, Resume, GitHub */}
          <div className="hidden sm:flex items-center gap-2">
            {/* 3D toggle button */}
            <button
              onClick={toggle3D}
              title={enable3D ? "Disable 3D Background" : "Enable 3D Background"}
              className={`p-2 rounded-lg border transition-colors ${
                enable3D
                  ? theme === "dark"
                    ? "border-zinc-700 bg-zinc-800 text-zinc-100"
                    : "border-zinc-300 bg-zinc-200 text-zinc-900"
                  : theme === "dark"
                  ? "border-zinc-800 bg-zinc-900 text-zinc-500"
                  : "border-zinc-200 bg-zinc-100 text-zinc-400"
              }`}
            >
              <Sparkles className="w-4 h-4" />
            </button>

            {/* Sound toggle button */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? "Mute Key Sounds" : "Enable Key Sounds"}
              className={`p-2 rounded-lg border transition-colors ${
                soundEnabled
                  ? theme === "dark"
                    ? "border-zinc-700 bg-zinc-800 text-zinc-100"
                    : "border-zinc-300 bg-zinc-200 text-zinc-900"
                  : theme === "dark"
                  ? "border-zinc-800 bg-zinc-900 text-zinc-500"
                  : "border-zinc-200 bg-zinc-100 text-zinc-400"
              }`}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={handleThemeChange}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className={`p-2 rounded-lg border transition-colors ${
                theme === "dark"
                  ? "border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-200"
                  : "border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-800"
              }`}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Resume button */}
            <button
              onClick={onOpenResume}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                theme === "dark"
                  ? "bg-zinc-100 text-zinc-950 hover:bg-white"
                  : "bg-zinc-950 text-white hover:bg-zinc-800"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={handleThemeChange}
              className="p-2 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden border-b px-6 py-4 space-y-3 ${
              theme === "dark"
                ? "bg-zinc-950/95 border-zinc-800 text-zinc-200"
                : "bg-white/95 border-zinc-200 text-zinc-800"
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium border-b border-zinc-800/40"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={toggle3D}
                  className={`p-2 rounded-lg border text-xs flex items-center gap-1 ${
                    enable3D
                      ? "border-zinc-700 bg-zinc-800 text-white"
                      : "border-zinc-800 text-zinc-500"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>3D {enable3D ? "ON" : "OFF"}</span>
                </button>
                <button
                  onClick={toggleSound}
                  className={`p-2 rounded-lg border text-xs flex items-center gap-1 ${
                    soundEnabled
                      ? "border-zinc-700 bg-zinc-800 text-white"
                      : "border-zinc-800 text-zinc-500"
                  }`}
                >
                  {soundEnabled ? (
                    <Volume2 className="w-3.5 h-3.5" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5" />
                  )}
                  <span>Sound</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="px-4 py-2 rounded-lg bg-zinc-100 text-zinc-950 font-semibold text-xs"
              >
                Resume
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
