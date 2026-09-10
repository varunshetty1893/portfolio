import React, { useState } from "react";
import {
  Keyboard as KeyboardIcon,
  LayoutGrid,
  Search,
  Sparkles,
  Volume2,
  ArrowRight,
  ArrowLeft,
  X,
} from "lucide-react";
import { SKILLS } from "@/data/constants";
import { Skill, SkillCategory } from "@/types";

interface SkillsSectionProps {
  onSelectSkill?: (skill: Skill) => void;
  theme: "dark" | "light";
  enable3D?: boolean;
  skillsMode: "3d" | "grid";
  setSkillsMode: (mode: "3d" | "grid") => void;
  inspectedSkill?: Skill | null;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  onSelectSkill,
  theme,
  enable3D = true,
  skillsMode,
  setSkillsMode,
  inspectedSkill,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  const categories = [
    "All",
    SkillCategory.LANGUAGES,
    SkillCategory.BACKEND,
    SkillCategory.AI_ML,
    SkillCategory.FRONTEND,
    SkillCategory.TOOLS,
  ];

  const skillList = Object.values(SKILLS);
  const filteredSkills = skillList.filter((s) => {
    const matchesCategory =
      activeCategory === "All" || s.category === activeCategory;
    const matchesSearch =
      s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayInspected = inspectedSkill || activeSkill;

  return (
    <section
      id="skills"
      className="relative min-h-screen py-20 sm:py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto z-10 flex flex-col justify-center canvas-overlay-mode"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight uppercase">
          <span className={theme === "dark" ? "text-white" : "text-zinc-950"}>
            Tech
          </span>{" "}
          <span className="text-edge-outline">Stack</span>
        </h2>
        <p className="mt-2.5 text-zinc-400 dark:text-zinc-400 text-xs sm:text-sm font-sans">
          {skillsMode === "3d" && enable3D
            ? "(hint: click or press keys to test the mechanical switches)"
            : "Languages, machine learning toolchains, backend databases, and DevOps tools."}
        </p>

        {/* View Mode Toggle Pill: 1st All Skills Grid, then 3D Keyboard Stage */}
        {enable3D && (
          <div className="inline-flex items-center gap-1 mt-6 p-1 rounded-full border backdrop-blur-md transition-colors bg-zinc-950/80 border-zinc-800 shadow-lg pointer-events-auto">
            <button
              id="toggle-all-skills-grid"
              onClick={() => setSkillsMode("grid")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                skillsMode === "grid"
                  ? theme === "dark"
                    ? "bg-white text-zinc-950 shadow-sm"
                    : "bg-zinc-900 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>All Skills Grid ({skillList.length})</span>
            </button>
            <button
              id="toggle-3d-keyboard-stage"
              onClick={() => setSkillsMode("3d")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                skillsMode === "3d"
                  ? theme === "dark"
                    ? "bg-white text-zinc-950 shadow-sm"
                    : "bg-zinc-900 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <KeyboardIcon className="w-3.5 h-3.5" />
              <span>3D Keyboard Stage</span>
            </button>
          </div>
        )}
      </div>

      {/* VIEW 1: 3D Keyboard Stage (Clean, zero overlap, interactive HUD) */}
      {skillsMode === "3d" && enable3D ? (
        <div className="flex flex-col items-center justify-between min-h-[55vh] sm:min-h-[62vh] relative pointer-events-none">
          {/* Top Hint Badge */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-mono backdrop-blur-md border-zinc-800/80 bg-zinc-900/50 text-zinc-300 pointer-events-auto">
            <Volume2 className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>Interactive switch sound active — try typing or clicking keycaps</span>
          </div>

          {/* Center Space Reserved for 3D Spline Mechanical Keyboard */}
          <div className="flex-1 w-full flex items-center justify-center my-6 pointer-events-none">
            {/* The 3D model renders unobstructed through the canvas overlay */}
          </div>

          {/* Bottom Live Keycap HUD Card */}
          <div className="w-full max-w-xl mx-auto z-20 pointer-events-auto">
            {displayInspected ? (
              <div
                className={`p-4 sm:p-5 rounded-2xl border backdrop-blur-md shadow-2xl flex items-center gap-4 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${
                  theme === "dark"
                    ? "border-zinc-700 bg-zinc-900/90 text-zinc-100"
                    : "border-zinc-300 bg-white/95 text-zinc-900"
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center shrink-0 p-2">
                  <img
                    src={displayInspected.icon}
                    alt={displayInspected.label}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm sm:text-base truncate">
                      {displayInspected.label}
                    </h4>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border border-zinc-700 bg-zinc-800/70 text-zinc-300 shrink-0">
                      {displayInspected.category}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                    {displayInspected.shortDescription}
                  </p>
                </div>
                <button
                  onClick={() => setActiveSkill(null)}
                  className="text-zinc-500 hover:text-zinc-300 p-1 rounded-md"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="p-3 sm:p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md text-center flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-zinc-400 text-left">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Click any keycap above or press keys on your keyboard to inspect skills.
                  </span>
                </div>
                <button
                  onClick={() => setSkillsMode("grid")}
                  className="flex items-center gap-1 text-xs font-semibold text-white hover:text-emerald-400 px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Full Grid</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* VIEW 2: Complete Skills Grid (Board moved away, 100% readable cards) */
        <div className="space-y-6 animate-in fade-in duration-300 pointer-events-auto">
          {/* Controls: Search & Category Filter */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                    activeCategory === cat
                      ? theme === "dark"
                        ? "bg-zinc-100 border-zinc-100 text-zinc-950 font-semibold"
                        : "bg-zinc-900 border-zinc-900 text-white font-semibold"
                      : theme === "dark"
                      ? "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                      : "bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search technologies..."
                className={`w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border focus:outline-none transition-colors ${
                  theme === "dark"
                    ? "bg-zinc-900/80 border-zinc-800 text-zinc-200 placeholder-zinc-500 focus:border-zinc-600"
                    : "bg-white border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-zinc-400"
                }`}
              />
            </div>
          </div>

          {/* Full Grid of Skill Cards (Zero overlap from the 3D board!) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {filteredSkills.map((skill) => {
              const isSelected = activeSkill?.name === skill.name;
              return (
                <div
                  key={skill.name}
                  onClick={() => {
                    setActiveSkill(skill);
                    onSelectSkill?.(skill);
                  }}
                  className={`group relative flex flex-col items-center justify-center gap-2 rounded-xl p-4 border transition-all duration-200 cursor-pointer overflow-hidden ${
                    isSelected
                      ? theme === "dark"
                        ? "border-zinc-300 bg-zinc-800/90 shadow-lg scale-[1.02]"
                        : "border-zinc-700 bg-zinc-100 shadow-md scale-[1.02]"
                      : theme === "dark"
                      ? "border-zinc-800/80 bg-zinc-900/60 hover:bg-zinc-900/90 hover:border-zinc-700 hover:-translate-y-0.5"
                      : "border-zinc-200 bg-white/80 hover:bg-white hover:border-zinc-300 hover:-translate-y-0.5"
                  }`}
                >
                  {/* Skill Icon */}
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    <img
                      src={skill.icon}
                      alt={skill.label}
                      loading="lazy"
                      className="w-8 h-8 object-contain transition-transform duration-200 group-hover:scale-110 drop-shadow-sm"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className={`relative text-xs font-semibold tracking-wide text-center truncate w-full px-1 ${
                      theme === "dark"
                        ? "text-zinc-200 group-hover:text-white"
                        : "text-zinc-800 group-hover:text-zinc-950"
                    }`}
                  >
                    {skill.label}
                  </span>

                  {/* Category tag */}
                  <span className="text-[10px] font-mono text-zinc-500">
                    {skill.category}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Selected Skill Detail Modal/Card */}
          {activeSkill && (
            <div
              className={`p-4 sm:p-5 rounded-2xl border backdrop-blur-md shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2 ${
                theme === "dark"
                  ? "border-zinc-700 bg-zinc-900/95 text-zinc-100"
                  : "border-zinc-300 bg-white/95 text-zinc-900"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center shrink-0 p-2">
                <img
                  src={activeSkill.icon}
                  alt={activeSkill.label}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm sm:text-base">
                    {activeSkill.label}
                  </h4>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border border-zinc-700 bg-zinc-800/70 text-zinc-300">
                    {activeSkill.category}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  {activeSkill.shortDescription}
                </p>
              </div>
              <button
                onClick={() => setActiveSkill(null)}
                className="text-zinc-500 hover:text-zinc-300 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Back to 3D Stage button if 3D is available */}
          {enable3D && (
            <div className="text-center pt-2">
              <button
                onClick={() => setSkillsMode("3d")}
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to 3D Mechanical Keyboard</span>
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
