import React from "react";
import { EXPERIENCE, CERTIFICATIONS, SKILLS } from "@/data/constants";
import { SkillNames } from "@/types";
import { Briefcase, GraduationCap, Award, Calendar, MapPin, CheckCircle2 } from "lucide-react";

interface ExperienceSectionProps {
  theme: "dark" | "light";
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ theme }) => {
  return (
    <section
      id="experience"
      className="relative min-h-screen py-24 px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto z-10 flex flex-col justify-center canvas-overlay-mode"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight uppercase">
          <span className={theme === "dark" ? "text-white" : "text-zinc-950"}>
            Experience
          </span>{" "}
          <span className="text-edge-outline">& Education</span>
        </h2>
        <p className="mt-3 text-zinc-400 dark:text-zinc-400 text-sm sm:text-base font-sans">
          My academic foundation at Mangalore University and engineering milestones.
        </p>
      </div>

      {/* Timeline container */}
      <div className="relative border-l border-zinc-800 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {EXPERIENCE.map((exp) => (
          <div key={exp.id} className="relative group">
            {/* Timeline node icon */}
            <div
              className={`absolute -left-[33px] sm:-left-[49px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full border transition-all ${
                theme === "dark"
                  ? "border-zinc-700 bg-zinc-950 text-zinc-300 group-hover:border-zinc-400"
                  : "border-zinc-300 bg-white text-zinc-800 group-hover:border-zinc-600"
              }`}
            >
              {exp.type === "Education" ? (
                <GraduationCap className="w-4 h-4" />
              ) : (
                <Briefcase className="w-4 h-4" />
              )}
            </div>

            {/* Card Content */}
            <div
              className={`rounded-2xl border p-6 sm:p-8 backdrop-blur-md transition-all duration-200 ${
                theme === "dark"
                  ? "border-zinc-800/90 bg-zinc-900/40 hover:bg-zinc-900/70 hover:border-zinc-700"
                  : "border-zinc-200 bg-white/80 hover:bg-white hover:border-zinc-300 shadow-sm"
              }`}
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800/50">
                <div>
                  <h3
                    className={`font-display font-bold text-xl sm:text-2xl ${
                      theme === "dark" ? "text-white" : "text-zinc-950"
                    }`}
                  >
                    {exp.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400 font-medium mt-1">
                    <span>{exp.company}</span>
                    {exp.location && (
                      <span className="flex items-center gap-1 text-xs text-zinc-500">
                        <MapPin className="w-3 h-3 text-zinc-500" />
                        {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-full border ${
                      theme === "dark"
                        ? "border-zinc-800 bg-zinc-900/80 text-zinc-400"
                        : "border-zinc-200 bg-zinc-100 text-zinc-600"
                    }`}
                  >
                    <Calendar className="w-3 h-3 text-zinc-400" />
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
              </div>

              {/* Description bullet points */}
              <ul className="mt-4 space-y-2.5">
                {exp.description.map((point, idx) => (
                  <li
                    key={idx}
                    className={`flex items-start gap-2.5 text-sm sm:text-base leading-relaxed ${
                      theme === "dark" ? "text-zinc-300" : "text-zinc-700"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-zinc-400 shrink-0 mt-1" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Applied tech pills */}
              <div className="mt-6 pt-4 border-t border-zinc-800/40 flex flex-wrap gap-2">
                {exp.skills.map((skillName) => {
                  const skill = SKILLS[skillName as SkillNames];
                  if (!skill) return null;
                  return (
                    <span
                      key={skillName}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono border ${
                        theme === "dark"
                          ? "border-zinc-800 bg-zinc-900/60 text-zinc-300"
                          : "border-zinc-200 bg-zinc-50 text-zinc-700"
                      }`}
                    >
                      <img
                        src={skill.icon}
                        alt={skill.label}
                        className="w-3.5 h-3.5 object-contain"
                      />
                      <span>{skill.label}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Certifications & Recognitions */}
      <div className="mt-16 pt-12 border-t border-zinc-800/60">
        <div className="flex items-center gap-2 mb-6">
          <Award className="w-5 h-5 text-zinc-400" />
          <h3
            className={`font-display font-bold text-xl ${
              theme === "dark" ? "text-white" : "text-zinc-950"
            }`}
          >
            Certifications & Verified Credentials
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CERTIFICATIONS.map((cert) => (
            <a
              key={cert.id}
              href={cert.credentialUrl}
              target="_blank"
              rel="noreferrer"
              className={`p-4 rounded-xl border backdrop-blur-md transition-all group flex flex-col justify-between ${
                theme === "dark"
                  ? "border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-zinc-700"
                  : "border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 shadow-sm"
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-2">
                  <span>{cert.badge}</span>
                  <span>{cert.date}</span>
                </div>
                <h4
                  className={`font-bold text-sm transition-colors ${
                    theme === "dark"
                      ? "text-zinc-100 group-hover:text-white"
                      : "text-zinc-900 group-hover:text-black"
                  }`}
                >
                  {cert.name}
                </h4>
                <p className="text-xs text-zinc-500 mt-1">{cert.issuer}</p>
              </div>
              <span className="text-[11px] font-mono text-zinc-400 mt-4 flex items-center gap-1">
                Verify credential →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
