import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Download, Printer, Mail, MapPin, ExternalLink, Award } from "lucide-react";
import { config } from "@/data/config";
import { EXPERIENCE, CERTIFICATIONS } from "@/data/constants";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = origOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const modalContent = (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 pt-16 sm:pt-20 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 pointer-events-auto"
    >
      <div className="relative w-full max-w-4xl max-h-[85vh] sm:max-h-[88vh] flex flex-col rounded-2xl border border-white/15 bg-slate-950 text-slate-100 shadow-2xl overflow-hidden pointer-events-auto animate-in zoom-in-95 duration-150">
        {/* Top bar controls */}
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-slate-900/95 backdrop-blur-md px-5 sm:px-6 py-3.5">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-base text-white">
              Resume / Curriculum Vitae
            </span>
            <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              Varun Shetty B
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Close resume"
              title="Close (Esc)"
              className="p-1.5 sm:p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resume Content Sheet */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-slate-900/30 font-sans space-y-8 print:p-0 print:bg-white print:text-black">
          {/* Resume Header */}
          <div className="border-b border-white/10 pb-6 print:border-black">
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white print:text-black">
              Varun Shetty B
            </h1>
            <p className="text-sm sm:text-base font-medium text-indigo-400 print:text-indigo-700 mt-1">
              MCA Graduate · Machine Learning Developer · Full-Stack Engineer
            </p>
            <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-300 print:text-gray-700 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                Mangalore, Karnataka, India
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                shettybvarun@gmail.com
              </span>
              <a
                href="https://github.com/varunshetty1893"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-300 hover:underline"
              >
                github.com/varunshetty1893
              </a>
              <a
                href="https://www.linkedin.com/in/varun-shetty-b-b607bb2a6/"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-300 hover:underline"
              >
                linkedin.com/in/varun-shetty-b
              </a>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 print:text-indigo-700 mb-3 font-bold">
              Education
            </h2>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <div>
                  <h3 className="text-base font-bold text-white print:text-black">
                    Master of Computer Applications (MCA)
                  </h3>
                  <p className="text-xs text-slate-300 print:text-gray-700">
                    Mangalore University — Mangalore, Karnataka
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-400 print:text-gray-600">
                  2024 – 2026
                </span>
              </div>
              <p className="text-xs text-slate-400 print:text-gray-600 leading-relaxed">
                Specialized coursework in Advanced Machine Learning, Enterprise Database Design, Distributed Systems, and Deep Learning Architectures. Research in Medical Image Classification with DenseNet121.
              </p>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 print:text-indigo-700 mb-3 font-bold">
              Technical Skillset
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white/5 border border-white/5 print:border-gray-300">
                <span className="font-bold text-white print:text-black block mb-1">
                  Languages & Scripting
                </span>
                <p className="text-slate-300 print:text-gray-700 font-mono">
                  Python, JavaScript, TypeScript, PHP, Java, SQL, HTML5, CSS3, Bash
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/5 print:border-gray-300">
                <span className="font-bold text-white print:text-black block mb-1">
                  Backend & Databases
                </span>
                <p className="text-slate-300 print:text-gray-700 font-mono">
                  Flask, PostgreSQL, MySQL, SQLite, Node.js, Express.js, RESTful APIs
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/5 print:border-gray-300">
                <span className="font-bold text-white print:text-black block mb-1">
                  Machine Learning & AI
                </span>
                <p className="text-slate-300 print:text-gray-700 font-mono">
                  Scikit-learn, DenseNet121, PyTorch, Groq LLaMA 3.3 70B, NumPy, Pandas
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/5 print:border-gray-300">
                <span className="font-bold text-white print:text-black block mb-1">
                  Frontend & Tools
                </span>
                <p className="text-slate-300 print:text-gray-700 font-mono">
                  React, Tailwind CSS, Alpine.js, Bootstrap, Git, GitHub, Vercel, Render
                </p>
              </div>
            </div>
          </div>

          {/* Key Engineering Projects */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 print:text-indigo-700 mb-3 font-bold">
              Key Engineering Projects
            </h2>
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold text-sm text-white print:text-black">
                    ParkWise — Smart Parking Operations & Tariff Engine
                  </h3>
                  <span className="font-mono text-slate-400 print:text-gray-600">
                    Python, Flask, PostgreSQL, Alpine.js
                  </span>
                </div>
                <p className="text-slate-300 print:text-gray-700 mt-1 leading-relaxed">
                  Architected full-stack enterprise parking platform with 640+ automated test cases covering concurrent slot reservations, billing logic, and role-based staff operations. Supported both SQLite and PostgreSQL.
                </p>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold text-sm text-white print:text-black">
                    Zentra ATS — Job Search & Applicant Tracking System
                  </h3>
                  <span className="font-mono text-slate-400 print:text-gray-600">
                    Flask, PostgreSQL, Tailwind, Vercel
                  </span>
                </div>
                <p className="text-slate-300 print:text-gray-700 mt-1 leading-relaxed">
                  Engineered end-to-end recruitment platform with candidate resume scoring algorithms, recruiter management pipelines, and admin moderation. Deployed live on Vercel and Render.
                </p>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold text-sm text-white print:text-black">
                    AI Interviewer — Conversational Mock Interview Simulator
                  </h3>
                  <span className="font-mono text-slate-400 print:text-gray-600">
                    Groq LLaMA 3.3 70B, Flask, SQLite
                  </span>
                </div>
                <p className="text-slate-300 print:text-gray-700 mt-1 leading-relaxed">
                  Developed real-time AI interview practice engine leveraging Groq&apos;s high-speed LPU inference, generating dynamic questions and instant diagnostic feedback scorecards.
                </p>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold text-sm text-white print:text-black">
                    COVID-19 & Pneumonia CT Scan Classifier
                  </h3>
                  <span className="font-mono text-slate-400 print:text-gray-600">
                    DenseNet121, SVM, Scikit-learn
                  </span>
                </div>
                <p className="text-slate-300 print:text-gray-700 mt-1 leading-relaxed">
                  Extracted deep convolutional feature embeddings from chest CT scans using pretrained DenseNet121 layers, training SVM and Random Forest classifiers with cross-validation.
                </p>
              </div>
            </div>
          </div>

          {/* Experience & Certifications */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 print:text-indigo-700 mb-3 font-bold">
              Experience & Credentials
            </h2>
            <div className="space-y-3 text-xs">
              <div className="flex items-baseline justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white print:text-black">
                    Web Development Intern — Testsavvy Company
                  </h3>
                  <p className="text-slate-300 print:text-gray-700">
                    Built Student Result Management System handling school records, exams, and marksheet generation in PHP and MySQL.
                  </p>
                </div>
                <span className="font-mono text-slate-400 print:text-gray-600">
                  2023 – 2024
                </span>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                {CERTIFICATIONS.map((c) => (
                  <span
                    key={c.id}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300 print:border-gray-400 print:text-black"
                  >
                    <Award className="w-3 h-3 text-amber-400" />
                    <span>
                      {c.name} ({c.issuer})
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : null;
};
