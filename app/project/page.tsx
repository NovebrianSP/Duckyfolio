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
} from "lucide-react";
import Image from "next/image";
import { useWaveTransition } from "@/components/WaveTransition";

export default function ProjectPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
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

  const projects = [
    {
      id: 1,
      title: "E-Commerce Danau Hijau",
      desc: "Platform belanja online ramah lingkungan berbasis Next.js App Router dan Sanity CMS.",
      tech: ["Next.js", "Tailwind", "Sanity"],
    },
    {
      id: 2,
      title: "Sistem Tracker Kawanan Bebek",
      desc: "Aplikasi pelacak migrasi unggas real-time menggunakan integrasi WebSocket dan Leaflet Maps.",
      tech: ["React", "Node.js", "Socket.io"],
    },
    {
      id: 3,
      title: "Weather App Aliran Sungai",
      desc: "Prediksi cuaca dan debit air sungai akurat menggunakan integrasi OpenWeather API resmi.",
      tech: ["Next.js", "TypeScript", "Tailwind"],
    },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col items-center px-4 pt-40 pb-24 transition-colors duration-1000 ease-in-out relative overflow-hidden no-scrollbar ${
        isDarkMode ? "bg-[#050C14] text-slate-100" : "bg-[#1A74E2] text-white"
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

      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center border rounded-full shadow-2xl p-4 w-14 h-14 ${isDarkMode ? "bg-[#1E3E62] text-yellow-400 border-slate-700" : "bg-white text-indigo-900 border-blue-200"}`}
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>

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

      <div className="max-w-4xl w-full mb-12 z-20 relative">
        <button
          type="button"
          onClick={() => void navigate("/")}
          className={`px-5 py-2.5 rounded-full font-semibold flex items-center gap-2 transition-all active:scale-95 shadow-md border backdrop-blur-md ${
            isDarkMode
              ? "bg-slate-900/80 border-slate-700 text-cyan-400 hover:bg-slate-900"
              : "bg-white/80 border-blue-200 text-blue-700 hover:bg-white"
          }`}
        >
          <ArrowLeft size={18} /> Kembali ke Permukaan
        </button>
      </div>

      <div className="max-w-4xl w-full space-y-24 z-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-8 md:p-10 rounded-3xl border backdrop-blur-lg ${isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white/10 border-white/20"}`}
        >
          <div className="flex items-center gap-3 mb-6">
            <User
              className={isDarkMode ? "text-cyan-400" : "text-blue-200"}
              size={28}
            />
            <h2 className="text-3xl font-bold tracking-tight">
              Tentang Penyelam Kode
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="relative w-32 h-32 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-white/60 bg-gradient-to-br from-white/40 via-sky-200/30 to-blue-500/30 shadow-[inset_-8px_-10px_18px_rgba(30,116,226,0.28),inset_8px_8px_14px_rgba(255,255,255,0.65),0_10px_24px_rgba(7,67,145,0.3)] flex items-center justify-center text-5xl">
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
            <div className="md:col-span-2 space-y-4 text-lg leading-relaxed opacity-90">
              <p>
                Saya adalah <span className={isDarkMode ? "text-cyan-400" : "text-blue-600"}>Novebrian Setya Purwanto</span>, seorang{" "}
                <span
                  className={`font-bold ${isDarkMode ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]" : "text-[#0A3981]"}`}
                >
                  Junior Full Stack Developer
                </span>{" "}
                dengan filosofi seperti bebek di atas danau: tampak tenang di
                permukaan, namun terus mengayuh kaki dengan kerja keras di bawah
                air.
              </p>

              <p>
                Fokus utama saya adalah membangun arsitektur aplikasi yang kokoh
                dan interaktif, baik pada sisi{" "}
                <Highlight tech={TECH_STACKS.backend} isDarkMode={isDarkMode} />{" "}
                maupun{" "}
                <Highlight
                  tech={TECH_STACKS.frontend}
                  isDarkMode={isDarkMode}
                />
                . Dalam mengembangkan ekosistem web dan mobile, saya
                berpengalaman menggunakan kombinasi tech stack modern seperti{" "}
                <Highlight tech={TECH_STACKS.laravel} isDarkMode={isDarkMode} />
                ,{" "}
                <Highlight
                  tech={TECH_STACKS.codeigniter}
                  isDarkMode={isDarkMode}
                />
                ,{" "}
                <Highlight
                  tech={TECH_STACKS.bootstrap}
                  isDarkMode={isDarkMode}
                />
                ,{" "}
                <Highlight
                  tech={TECH_STACKS.tailwind}
                  isDarkMode={isDarkMode}
                />
                ,{" "}
                <Highlight tech={TECH_STACKS.framer} isDarkMode={isDarkMode} />,{" "}
                <Highlight tech={TECH_STACKS.nextjs} isDarkMode={isDarkMode} />,{" "}
                <Highlight tech={TECH_STACKS.flutter} isDarkMode={isDarkMode} />
                , serta{" "}
                <Highlight tech={TECH_STACKS.kotlin} isDarkMode={isDarkMode} />.
              </p>
            </div>
          </div>
        </motion.div>

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
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className={`p-6 rounded-2xl border backdrop-blur-md text-left flex flex-col justify-between transition-all group ${isDarkMode ? "bg-slate-900/50 border-slate-800/80 hover:border-cyan-400" : "bg-white/10 border-white/10 hover:border-white"}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`p-3 rounded-xl ${isDarkMode ? "bg-slate-800" : "bg-white/20"}`}
                    >
                      <Code size={22} />
                    </div>
                    <a href="#" className="opacity-60 hover:opacity-100">
                      <ExternalLink size={18} />
                    </a>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p
                    className={`text-sm mb-6 ${isDarkMode ? "text-slate-400" : "text-blue-100"}`}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
