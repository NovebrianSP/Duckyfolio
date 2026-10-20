"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  Sun,
  Moon,
  ArrowLeft,
  Code,
  User,
  Briefcase,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { useTheme } from "@/components/ThemeProvider";
import { useWaveTransition } from "@/components/WaveTransition";

export default function ProjectPage() {
  const {
    theme,
    isDarkMode,
    hasManualOverride,
    resetToAutomatic,
    toggleDarkMode,
  } = useTheme();
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const { navigate } = useWaveTransition();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-8), newRipple]);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const duckX = useTransform(scrollYProgress, [0, 1], ["0%", "95%"]);

  const TECH_STACKS = {
    laravel: { name: "Laravel", isMain: false },
    codeigniter: { name: "CodeIgniter", isMain: false },
    bootstrap: { name: "Bootstrap", isMain: false },
    tailwind: { name: "Tailwind CSS", isMain: false },
    framer: { name: "Framer Motion", isMain: false },
    nextjs: { name: "Next.js", isMain: false },
    flutter: { name: "Flutter", isMain: false },
    kotlin: { name: "Kotlin", isMain: false },
    fullstack: { name: "Full-Stack Developer", isMain: true },
    backend: { name: "Backend", isMain: false },
    frontend: { name: "Front-End", isMain: false },
  };

  const Highlight = ({
    tech,
    isDarkMode,
  }: {
    tech: (typeof TECH_STACKS)[keyof typeof TECH_STACKS];
    isDarkMode: boolean;
  }) => {
    if (tech.isMain) {
      return (
        <span
          className={`font-extrabold transition-colors duration-300 ${
            isDarkMode
              ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]"
              : "text-[#0A3981] bg-white/40 px-2 py-0.5 rounded-md"
          }`}
        >
          {tech.name}
        </span>
      );
    }
    return (
      <span
        className={
          isDarkMode
            ? "text-cyan-300 font-semibold"
            : "text-[#0B192C] font-bold"
        }
      >
        {tech.name}
      </span>
    );
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center px-4 pt-28 pb-24 transition-colors duration-1000 ease-in-out relative overflow-x-hidden no-scrollbar ${
        theme === "midnight"
          ? "bg-[#050C14] text-slate-100"
          : theme === "sunset"
            ? "bg-gradient-to-b from-[#F97316] via-[#C2410C] to-[#7C2D12] text-white"
            : theme === "dawn"
              ? "bg-gradient-to-b from-[#F8C58A] via-[#E68A63] to-[#C2410C] text-white"
              : "bg-[#1A74E2] text-white"
      }`}
    >
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ opacity: 0.6, scale: 0 }}
          animate={{ opacity: 0, scale: 4 }}
          transition={{ duration: 0.8 }}
          className="fixed pointer-events-none z-50 w-4 h-4 rounded-full border bg-transparent"
          style={{
            left: ripple.x - 8,
            top: ripple.y - 8,
            borderColor: isDarkMode
              ? "rgba(147, 197, 253, 0.3)"
              : "rgba(255, 255, 255, 0.5)",
          }}
        />
      ))}

      <div
        className="absolute top-0 left-0 right-0 w-full overflow-hidden z-10 rotate-180"
        style={{ height: "120px" }}
      >
        <svg
          className="absolute bottom-0 w-[200%] h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://w3.org"
        >
          <motion.path
            animate={{ x: [0, -1200] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            d="M0,60 C150,90 350,30 500,60 C650,90 850,30 1000,60 L2000,120 L0,120 Z"
            fill={isDarkMode ? "#1E3E62" : "#87C4FF"}
            opacity="0.3"
          />
          <motion.path
            animate={{ x: [-1200, 0] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            d="M0,50 C200,20 400,80 600,50 C800,20 1000,80 1200,50 L2400,120 L0,120 Z"
            fill={isDarkMode ? "#0B192C" : "#39A7FF"}
            opacity="0.5"
          />
        </svg>
      </div>

      <div className="fixed top-0 left-0 right-0 h-16 z-40 bg-transparent pointer-events-none">
        <motion.div
          style={{ scaleX }}
          className={`h-1 origin-left absolute bottom-0 left-0 right-0 ${isDarkMode ? "bg-cyan-400" : "bg-white"}`}
        />
        <motion.div
          style={{ left: duckX }}
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="absolute bottom-1 select-none"
        >
          <Image
            src="/swimduck.webp"
            alt="Bebek Berenang"
            width={48}
            height={48}
            className="object-contain"
            priority
          />
        </motion.div>
      </div>

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        {hasManualOverride && (
          <button
            type="button"
            onClick={resetToAutomatic}
            aria-label="Kembali ke tema otomatis berdasarkan waktu"
            title="Kembali ke tema otomatis"
            className="flex h-12 items-center gap-2 rounded-full border border-white/40 bg-black/20 px-4 text-sm font-semibold text-white shadow-2xl backdrop-blur-md transition-all hover:scale-95 active:scale-90"
          >
            <RotateCcw size={18} />
            Otomatis
          </button>
        )}
        <button
          type="button"
          onClick={toggleDarkMode}
          aria-label="Ganti tema manual"
          className={`flex items-center justify-center border rounded-full shadow-2xl p-4 w-14 h-14 ${isDarkMode ? "bg-[#1E3E62] text-yellow-400 border-slate-700" : "bg-white text-indigo-900 border-blue-200"}`}
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      <div className="absolute top-4 opacity-15 pointer-events-none z-0">
        {isDarkMode ? (
          <svg
            xmlns="http://w3.org"
            viewBox="0 0 24 24"
            fill="#E2E8F0"
            className="w-36 h-36 text-slate-200"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://w3.org"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FDE047"
            strokeWidth="2"
            className="w-40 h-40 text-yellow-300 animate-[spin_120s_linear_infinite]"
          >
            <circle cx="12" cy="12" r="4" fill="#FEF08A" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
          </svg>
        )}
      </div>

      <button
        type="button"
        onClick={() => void navigate("/about", "Naik ke permukaan...")}
        aria-label="Kembali ke penyelam"
        className={`fixed bottom-6 left-6 z-50 flex items-center gap-0 rounded-full border p-3 font-semibold shadow-md backdrop-blur-md transition-all active:scale-95 sm:gap-2 sm:px-5 sm:py-2.5 ${
          isDarkMode
            ? "bg-slate-900/80 border-slate-700 text-cyan-400 hover:bg-slate-900"
            : "bg-white/80 border-blue-200 text-blue-700 hover:bg-white"
        }`}
      >
        <ArrowLeft size={18} />
        <span className="hidden sm:inline">Kembali ke penyelam</span>
      </button>

      <div className="max-w-4xl w-full space-y-24 z-20 relative">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <Briefcase
              className={isDarkMode ? "text-cyan-400" : "text-blue-200"}
              size={28}
            />
            <h2 className="text-3xl font-bold tracking-tight">
              Eksplorasi Proyek
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/project/showcase/${project.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  void navigate(
                    `/project/showcase/${project.id}`,
                    "Masuk showcase...",
                  );
                }}
                className="block h-full"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className={`h-full min-h-[290px] p-6 rounded-2xl border backdrop-blur-md text-left flex flex-col justify-between transition-all group ${isDarkMode ? "bg-slate-900/50 border-slate-800/80 hover:border-cyan-400" : "bg-white/10 border-white/10 hover:border-white"}`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div
                        className={`p-3 rounded-xl ${isDarkMode ? "bg-slate-800" : "bg-white/20"}`}
                      >
                        <Code size={22} />
                      </div>
                      <span className="opacity-60 group-hover:opacity-100">
                        <ExternalLink size={18} />
                      </span>
                    </div>
                    <h3 className="line-clamp-2 text-xl font-bold mb-2 group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p
                      className={`project-description-clamp min-h-[4.5rem] text-sm mb-6 ${isDarkMode ? "text-slate-400" : "text-blue-100"}`}
                    >
                      {project.desc}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-md ${isDarkMode ? "bg-slate-800 text-cyan-400" : "bg-blue-900/40 text-blue-100 border border-white/10"}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
