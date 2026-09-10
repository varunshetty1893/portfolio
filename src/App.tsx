import React, { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/header";
import { AnimatedBackground } from "@/components/animated-background";
import { HeroSection } from "@/components/sections/hero";
import { SkillsSection } from "@/components/sections/skills";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectsSection } from "@/components/sections/projects";
import { ContactSection } from "@/components/sections/contact";
import { Footer } from "@/components/footer";
import { ResumeModal } from "@/components/resume-modal";
import { Skill } from "@/types";

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [enable3D, setEnable3D] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [skillsMode, setSkillsMode] = useState<"3d" | "grid">("grid");
  const [inspectedSkill, setInspectedSkill] = useState<Skill | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [lastKeyPressed, setLastKeyPressed] = useState<string | null>(null);

  // Synchronize HTML dark class & body styles
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
      document.body.style.backgroundColor = "#000000";
      document.body.style.color = "#f4f4f5";
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#09090b";
    }
  }, [theme]);

  // Audio synthesis for keyboard tactile sound feedback
  const playKeySound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioContextClass) return;
      const audioCtx = new AudioContextClass();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(
        320 + Math.random() * 80,
        audioCtx.currentTime
      );

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch {
      // Audio playback fails silently if restricted
    }
  }, [soundEnabled]);

  // Global keyboard listener mimicking 3D keyboard tactile experience
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      playKeySound();
      setLastKeyPressed(e.key.toUpperCase());
      setTimeout(() => setLastKeyPressed(null), 1200);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playKeySound]);

  // Active section scroll observer
  useEffect(() => {
    const sections = ["hero", "skills", "experience", "projects", "contact"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // DevTools Easter Egg
  useEffect(() => {
    console.log(
      `%c
 __      __                                 
 \\ \\    / /                                
  \\ \\  / /_ _ _ __ _   _ _ __              
   \\ \\/ / _\` | '__| | | | '_ \\             
    \\  / (_| | |  | |_| | | | |            
  ___\\/ \\__,_|_|__ \\__,_|_| |_|            
 / ____| |      | | | |                    
| (___ | |__   ___| |_| |_ _   _           
 \\___ \\| '_ \\ / _ \\ __| __| | | |          
 ____) | | | |  __/ |_| |_| |_| |          
|_____/|_| |_|\\___|\\__|\\__|\\__, |          
                            __/ |          
                           |___/           
    `,
      "color: #f4f4f5; font-family: monospace; font-size: 11px; font-weight: bold;"
    );
    console.log(
      "%c⚡ Varun Shetty B | Full-Stack & Machine Learning Developer",
      "color: #ffffff; font-size: 13px; font-weight: bold;"
    );
    console.log(
      "%c📦 GitHub: https://github.com/varunshetty1893",
      "color: #a1a1aa; font-size: 11px;"
    );
  }, []);

  return (
    <div
      className={`min-h-screen relative selection:bg-zinc-800 selection:text-white ${
        theme === "dark" ? "text-zinc-100" : "text-zinc-900"
      }`}
    >
      {/* Keystroke floating pill notification */}
      {lastKeyPressed && (
        <div className="fixed bottom-6 left-6 z-50 pointer-events-none px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900/90 backdrop-blur-md shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="text-[10px] font-mono text-zinc-400">Key:</span>
          <span className="font-mono text-xs font-bold text-white px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700">
            {lastKeyPressed}
          </span>
        </div>
      )}

      {/* Spline 3D Mechanical Keyboard Background */}
      <AnimatedBackground
        activeSection={activeSection}
        theme={theme}
        enable3D={enable3D}
        skillsMode={skillsMode}
        onSkillSelect={(skill) => setInspectedSkill(skill)}
        playPressSound={playKeySound}
        playReleaseSound={playKeySound}
      />

      {/* Navigation Header */}
      <Header
        theme={theme}
        toggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
        enable3D={enable3D}
        toggle3D={() => setEnable3D(!enable3D)}
        soundEnabled={soundEnabled}
        toggleSound={() => setSoundEnabled(!soundEnabled)}
        activeSection={activeSection}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Sections */}
      <main className="relative z-10 pointer-events-none">
        <HeroSection
          onOpenResume={() => setIsResumeOpen(true)}
          theme={theme}
        />

        <SkillsSection
          onSelectSkill={(skill) => {
            playKeySound();
            setInspectedSkill(skill);
          }}
          theme={theme}
          enable3D={enable3D}
          skillsMode={skillsMode}
          setSkillsMode={setSkillsMode}
          inspectedSkill={inspectedSkill}
        />

        <ExperienceSection theme={theme} />

        <ProjectsSection theme={theme} />

        <ContactSection theme={theme} />
      </main>

      {/* Footer */}
      <Footer theme={theme} />

      {/* Interactive Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
