import React, { useState } from "react";
import confetti from "canvas-confetti";
import { config } from "@/data/config";
import {
  Mail,
  Check,
  ChevronRight,
  Github,
  Linkedin,
  Copy,
} from "lucide-react";

interface ContactSectionProps {
  theme: "dark" | "light";
}

export const ContactSection: React.FC<ContactSectionProps> = ({ theme }) => {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(config.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.7 },
      colors: ["#ffffff", "#e34f26", "#3178c6", "#f7df1e", "#61dafb"],
    });

    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: "", email: "", message: "" });
    }, 4500);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-20 sm:py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto z-10 flex flex-col justify-center canvas-overlay-mode"
    >
      {/* Section Header: LET'S WORK TOGETHER (matching second image) */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight uppercase">
          <span className={theme === "dark" ? "text-white" : "text-zinc-950"}>
            LET'S WORK
          </span>{" "}
          <span className={theme === "dark" ? "text-white" : "text-zinc-950"}>
            TOGETHER
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Contact Form Card (matching second image) */}
        <div className="lg:col-span-6 w-full max-w-xl mx-auto lg:mx-0">
          <div
            className={`rounded-3xl border p-7 sm:p-9 backdrop-blur-md shadow-2xl transition-all ${
              theme === "dark"
                ? "border-zinc-800/90 bg-black/90 text-zinc-100"
                : "border-zinc-200 bg-white/95 shadow-xl text-zinc-900"
            }`}
          >
            {/* Card Title */}
            <h3 className="font-display font-bold text-2xl sm:text-3xl mb-2 text-zinc-100 dark:text-white">
              Contact Form
            </h3>

            {/* Card Subtitle */}
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
              Please contact me directly at{" "}
              <a
                href={`mailto:${config.email}`}
                className="font-semibold text-zinc-200 hover:text-emerald-400 underline transition-colors"
              >
                {config.email}
              </a>{" "}
              or drop your info here.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Field 1: Full name */}
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                  Full name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your Name"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                    theme === "dark"
                      ? "border-zinc-800 bg-zinc-950 focus:border-zinc-500 text-zinc-100 placeholder-zinc-500"
                      : "border-zinc-300 bg-zinc-50 focus:border-zinc-700 text-zinc-900 placeholder-zinc-400"
                  }`}
                />
              </div>

              {/* Field 2: Email Address */}
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="you@example.com"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                    theme === "dark"
                      ? "border-zinc-800 bg-zinc-950 focus:border-zinc-500 text-zinc-100 placeholder-zinc-500"
                      : "border-zinc-300 bg-zinc-50 focus:border-zinc-700 text-zinc-900 placeholder-zinc-400"
                  }`}
                />
              </div>

              {/* Field 3: Your Message */}
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                  Your Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell me about your project,"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none transition-colors ${
                    theme === "dark"
                      ? "border-zinc-800 bg-zinc-950 focus:border-zinc-500 text-zinc-100 placeholder-zinc-500"
                      : "border-zinc-300 bg-zinc-50 focus:border-zinc-700 text-zinc-900 placeholder-zinc-400"
                  }`}
                />
              </div>

              {/* Helper text: Pinky promise */}
              <p className="text-xs text-zinc-400 font-sans pt-1">
                I'll never share your data with anyone else. Pinky promise!
              </p>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={sent}
                  className={`w-full sm:w-auto px-7 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-md ${
                    sent
                      ? "bg-zinc-800 border border-zinc-700 text-emerald-400 cursor-default"
                      : theme === "dark"
                      ? "bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-500 text-white"
                      : "bg-zinc-900 hover:bg-zinc-800 text-white"
                  }`}
                >
                  {sent ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Message Dispatched! Will respond shortly.</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ChevronRight className="w-4 h-4 text-zinc-300" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick action footer */}
            <div className="mt-8 pt-5 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-zinc-500" />
                <span className="truncate">{config.email}</span>
                <button
                  onClick={handleCopyEmail}
                  title="Copy email"
                  className="p-1 hover:text-white transition-colors"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={config.social.github}
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub"
                  className="hover:text-white transition-colors p-1"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={config.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn"
                  className="hover:text-white transition-colors p-1"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dedicated open view for the 3D Mechanical Keyboard in contact mode */}
        <div className="lg:col-span-6 hidden lg:block min-h-[440px] pointer-events-none">
          {/* The 3D Keyboard floats dynamically here with colorful rising keycaps */}
        </div>
      </div>
    </section>
  );
};
