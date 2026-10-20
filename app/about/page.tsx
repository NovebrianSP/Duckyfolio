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
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";
import { useWaveTransition } from "@/components/WaveTransition";

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState<
    "about" | "education" | "skills"
  >("about");
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

  const socialIconClass = "h-[19px] w-[19px] fill-current";

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
        onClick={() => void navigate("/", "Naik ke permukaan...")}
        aria-label="Kembali ke permukaan"
        className={`fixed bottom-6 left-6 z-50 flex items-center gap-0 rounded-full border p-3 font-semibold shadow-md backdrop-blur-md transition-all active:scale-95 sm:gap-2 sm:px-5 sm:py-2.5 ${
          isDarkMode
            ? "bg-slate-900/80 border-slate-700 text-cyan-400 hover:bg-slate-900"
            : "bg-white/80 border-blue-200 text-blue-700 hover:bg-white"
        }`}
      >
        <ArrowLeft size={18} />
        <span className="hidden sm:inline">Kembali ke Permukaan</span>
      </button>

      <div className="z-20 grid w-full max-w-6xl grid-cols-1 items-start gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <nav className="flex flex-col gap-4" aria-label="Navigasi tentang saya">
          <button
            type="button"
            onClick={() => setActiveSection("about")}
            className={`cursor-pointer rounded-xl px-6 py-4 text-center text-lg font-bold shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:scale-95 ${
              activeSection === "about"
                ? isDarkMode
                  ? "bg-cyan-500 text-slate-950"
                  : "bg-white text-blue-900"
                : isDarkMode
                  ? "bg-slate-900/60 text-slate-300"
                  : "bg-white/20 text-white hover:bg-white/35"
            }`}
          >
            Tentang Saya
          </button>
          <button
            type="button"
            onClick={() => setActiveSection("education")}
            className={`cursor-pointer rounded-xl px-6 py-4 text-center text-lg font-bold shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:scale-95 ${
              activeSection === "education"
                ? isDarkMode
                  ? "bg-cyan-500 text-slate-950"
                  : "bg-white text-blue-900"
                : isDarkMode
                  ? "bg-slate-900/60 text-slate-300"
                  : "bg-white/20 text-white hover:bg-white/35"
            }`}
          >
            Pendidikan
          </button>
          <button
            type="button"
            onClick={() => setActiveSection("skills")}
            className={`cursor-pointer rounded-xl px-6 py-4 text-center text-lg font-bold shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:scale-95 ${
              activeSection === "skills"
                ? isDarkMode
                  ? "bg-cyan-500 text-slate-950"
                  : "bg-white text-blue-900"
                : isDarkMode
                  ? "bg-slate-900/60 text-slate-300"
                  : "bg-white/20 text-white hover:bg-white/35"
            }`}
          >
            Keahlian
          </button>
        </nav>

        <div className="w-full space-y-12">
          {activeSection === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-3xl border p-6 backdrop-blur-lg md:p-10 ${isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white/10 border-white/20"}`}
            >
              <div className="mb-6 flex items-center gap-3">
                <User
                  className={isDarkMode ? "text-cyan-400" : "text-blue-200"}
                  size={28}
                />
                <h2 className="text-3xl font-bold tracking-tight">
                  Tentang Penyelam Kode
                </h2>
              </div>
              <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
                <div className="relative mx-auto flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-white/60 bg-gradient-to-br from-white/40 via-sky-200/30 to-blue-500/30 text-5xl shadow-[inset_-8px_-10px_18px_rgba(30,116,226,0.28),inset_8px_8px_14px_rgba(255,255,255,0.65),0_10px_24px_rgba(7,67,145,0.3)] md:mx-0">
                  <Image
                    src="/profile.png"
                    alt="Bebek Tech"
                    fill
                    className="object-cover object-[center_top]"
                    style={{ transform: "scale(2) translateY(30%)" }}
                    priority
                  />
                  <span className="pointer-events-none absolute top-1 left-2 h-5 w-10 rotate-[-25deg] rounded-full bg-white/55 blur-[1px]" />
                  <span className="pointer-events-none absolute top-7 left-2 h-2 w-2 rounded-full bg-white/70" />
                </div>
                <div className="space-y-4 text-lg leading-relaxed opacity-90 md:col-span-2">
                  <p>
                    Saya adalah{" "}
                    <span
                      className={
                        isDarkMode ? "text-cyan-400" : "text-[#1E3E62]"
                      }
                    >
                      Novebrian Setya Purwanto
                    </span>
                    , Junior Web Developer yang antusias dalam membangun
                    aplikasi web yang interaktif dan user-friendly. Selalu
                    tertarik mengeksplorasi teknologi terbaru agar tetap relevan
                    dengan tren industri. Berkomitmen tinggi untuk menghadirkan
                    karya berkualitas dan memenuhi tenggat waktu proyek.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href="https://github.com/NovebrianSP"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      title="Novebrian di GitHub"
                      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-transform hover:scale-110 ${
                        isDarkMode
                          ? "border-cyan-400/70 text-cyan-400 hover:bg-cyan-400/10"
                          : "border-blue-700/60 text-blue-800 hover:bg-white/30"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" className={socialIconClass}>
                        <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.17c-3.22.7-3.9-1.36-3.9-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.57-.29-5.27-1.29-5.27-5.74 0-1.27.45-2.3 1.2-3.11-.12-.29-.52-1.47.11-3.07 0 0 .98-.31 3.16 1.19a10.9 10.9 0 0 1 5.76 0c2.18-1.5 3.16-1.19 3.16-1.19.63 1.6.23 2.78.11 3.07.75.81 1.2 1.84 1.2 3.11 0 4.46-2.71 5.45-5.29 5.74.41.36.78 1.08.78 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/novebrian-setya-purwanto-026717273/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      title="Novebrian di LinkedIn"
                      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-transform hover:scale-110 ${
                        isDarkMode
                          ? "border-cyan-400/70 text-cyan-400 hover:bg-cyan-400/10"
                          : "border-blue-700/60 text-blue-800 hover:bg-white/30"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" className={socialIconClass}>
                        <path d="M5.04 3.2a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0ZM.86 7.28h4.36V21H.86V7.28ZM7.96 7.28h4.18v1.87h.06c.58-1.1 2-2.26 4.12-2.26 4.41 0 5.23 2.9 5.23 6.67V21h-4.36v-6.6c0-1.57-.03-3.59-2.19-3.59-2.19 0-2.52 1.71-2.52 3.48V21H8V7.28h-.04Z" />
                      </svg>
                    </a>
                    <a
                      href="https://discord.com/users/392225177464733707"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Discord"
                      title="Novebrian di Discord"
                      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-transform hover:scale-110 ${
                        isDarkMode
                          ? "border-cyan-400/70 text-cyan-400 hover:bg-cyan-400/10"
                          : "border-blue-700/60 text-blue-800 hover:bg-white/30"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" className={socialIconClass}>
                        <path d="M19.54 4.21A16.4 16.4 0 0 0 15.7 3l-.48.98a14.7 14.7 0 0 0-6.44 0L8.3 3a16.4 16.4 0 0 0-3.84 1.21C2.03 7.8 1.37 11.3 1.7 14.76a16.6 16.6 0 0 0 4.72 2.4l1.14-1.56c-.63-.23-1.23-.52-1.8-.86l.44-.34c3.47 1.63 7.24 1.63 10.67 0l.45.34c-.57.34-1.17.63-1.8.86l1.14 1.56a16.6 16.6 0 0 0 4.72-2.4c.39-4.01-.66-7.48-1.84-10.55ZM8.7 13.03c-1.04 0-1.9-.96-1.9-2.14s.84-2.14 1.9-2.14 1.91.96 1.9 2.14c0 1.18-.84 2.14-1.9 2.14Zm6.6 0c-1.04 0-1.9-.96-1.9-2.14s.84-2.14 1.9-2.14 1.91.96 1.9 2.14c0 1.18-.84 2.14-1.9 2.14Z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/notvebrian/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      title="Novebrian di Instagram"
                      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-transform hover:scale-110 ${
                        isDarkMode
                          ? "border-cyan-400/70 text-cyan-400 hover:bg-cyan-400/10"
                          : "border-blue-700/60 text-blue-800 hover:bg-white/30"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" className={socialIconClass}>
                        <path d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6a5.2 5.2 0 0 1-5.2 5.2H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2Zm-.1 2A3.1 3.1 0 0 0 4 7.1v9.8A3.1 3.1 0 0 0 7.1 20h9.8a3.1 3.1 0 0 0 3.1-3.1V7.1A3.1 3.1 0 0 0 16.9 4H7.1Zm9.65 1.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "education" && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-3xl border p-6 backdrop-blur-lg md:p-10 ${isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white/10 border-white/20"}`}
            >
              <div className="mb-8 flex items-center gap-3">
                <Briefcase
                  className={isDarkMode ? "text-cyan-400" : "text-blue-200"}
                  size={28}
                />
                <h2 className="text-3xl font-bold tracking-tight">
                  Pendidikan
                </h2>
              </div>
              <div className="space-y-8 text-lg">
                <div className="border-l-4 border-cyan-400 pl-5">
                  <div className="flex flex-col justify-between gap-2 md:flex-row">
                    <h3 className="font-bold">
                      S1 Sistem Informasi, Sarjana Komputer
                    </h3>
                    <span className="font-semibold opacity-80">
                      September 2022 - Maret 2026
                    </span>
                  </div>
                  <p
                    className={`font-semibold ${
                      isDarkMode ? "text-slate-100" : "text-[#0B192C]"
                    }`}
                  >
                    Universitas AMIKOM Yogyakarta
                  </p>
                  <p className="mt-2 text-base opacity-80">
                    Spesialisasi Digital Business dan Developer Web serta Mobile
                    Apps.
                  </p>
                </div>
                <div className="border-l-4 border-cyan-400 pl-5">
                  <div className="flex flex-col justify-between gap-2 md:flex-row">
                    <h3 className="font-bold">
                      Siswa Jurusan Ilmu Pengetahuan Sosial
                    </h3>
                    <span className="font-semibold opacity-80">
                      Juli 2017 - Juli 2020
                    </span>
                  </div>
                  <p
                    className={`font-semibold ${
                      isDarkMode ? "text-slate-100" : "text-[#0B192C]"
                    }`}
                  >
                    SMA Negeri 3 Klaten
                  </p>
                </div>
                <div className="border-l-4 border-cyan-400 pl-5">
                  <h3 className="font-bold">
                    Pengalaman Akademik dan Volunteer
                  </h3>
                  <p className="mt-2 opacity-90">
                    Asisten Laboratorium Komputer, Forum Asisten Amikom
                    Yogyakarta (Oktober 2024 - Agustus 2025).
                  </p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-base opacity-85">
                    <li>
                      Praktikum Perancangan Basis Data untuk program studi
                      D3-Manajemen Informatika.
                    </li>
                    <li>
                      Praktikum Struktur Data untuk program studi S1-Sistem
                      Informasi.
                    </li>
                    <li>
                      Praktikum Digital Business untuk program studi S1-Sistem
                      Informasi.
                    </li>
                    <li>
                      Praktikum Statistika untuk program studi S1-Sistem
                      Informasi.
                    </li>
                    <li>
                      Praktikum Pemrograman Terstruktur untuk program studi
                      S1-Sistem Informasi.
                    </li>
                  </ul>
                  <p className="mt-2 opacity-90">
                    Asisten Instruktur Technology Engineering Project - Divisi
                    Mobile Apps (Desember 2024).
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "skills" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-3xl border p-6 backdrop-blur-lg md:p-10 ${isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white/10 border-white/20"}`}
            >
              <div className="mb-8 flex items-center gap-3">
                <Code
                  className={isDarkMode ? "text-cyan-400" : "text-blue-200"}
                  size={28}
                />
                <h2 className="text-3xl font-bold tracking-tight">Keahlian</h2>
              </div>
              <div className="grid gap-6 text-lg md:grid-cols-2">
                <div>
                  <h3 className="mb-3 font-bold text-cyan-400">
                    Web Development
                  </h3>
                  <p className="leading-relaxed opacity-90">
                    PHP, CSS, JavaScript, MySQL, Python, CodeIgniter 3 & 4, Laravel,
                    Bootstrap, Tailwind CSS, Next.js, dan Framer Motion.
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 font-bold text-cyan-400">
                    Mobile Development
                  </h3>
                  <p className="leading-relaxed opacity-90">
                    Flutter, Dart, Kotlin, serta pengembangan aplikasi mobile
                    yang responsif dan mudah digunakan.
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 font-bold text-cyan-400">
                    Tools dan Bahasa
                  </h3>
                  <p className="leading-relaxed opacity-90">
                    Git sebagai version control, Bahasa Indonesia (native), dan
                    Bahasa Inggris (advanced).
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 font-bold text-cyan-400">Soft Skills</h3>
                  <p className="leading-relaxed opacity-90">
                    Kerja sama tim, cepat belajar, problem solving, disiplin,
                    dan bertanggung jawab.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <button
            type="button"
            onClick={() => void navigate("/project")}
            className={`mx-auto mt-4 flex items-center gap-2 rounded-full px-8 py-3 font-bold shadow-md transition-all active:scale-95 ${
              isDarkMode
                ? "bg-cyan-500 text-slate-900 hover:bg-cyan-400"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Menyelam ke kedalamanan Proyek <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
