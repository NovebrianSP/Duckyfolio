"use client";

import { ArrowLeft, CalendarDays, Code2, Moon, RotateCcw, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Suspense,
  useEffect,
  useState,
} from "react";
import { projects } from "@/data/projects";
import { useTheme } from "@/components/ThemeProvider";
import { useWaveTransition } from "@/components/WaveTransition";

export default function ShowcasePage() {
  return (
    <Suspense fallback={<ShowcaseLoading />}>
      <ShowcaseContent />
    </Suspense>
  );
}

function ShowcaseLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050C14] text-white">
      <p className="text-lg font-semibold">Memuat showcase...</p>
    </main>
  );
}

function ShowcaseContent() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((item) => item.id === id);
  const [imageOrientation, setImageOrientation] = useState<
    "landscape" | "portrait"
  >("landscape");
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const {
    theme,
    isDarkMode,
    hasManualOverride,
    resetToAutomatic,
    toggleDarkMode,
  } = useTheme();
  const { navigate } = useWaveTransition();

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

      setScrollProgress(Math.min(1, Math.max(0, progress)));
    };

    const handlePointerMove = (event: PointerEvent) => {
      const newRipple = {
        id: Date.now() + Math.random(),
        x: event.clientX,
        y: event.clientY,
      };

      setRipples((currentRipples) => [
        ...currentRipples.slice(-8),
        newRipple,
      ]);
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);
    document.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
      document.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050C14] px-4 text-center text-white">
        <div>
          <h1 className="text-3xl font-bold">Project tidak ditemukan</h1>
          <Link
            href="/project"
            className="mt-6 inline-flex rounded-full bg-cyan-400 px-5 py-2.5 font-semibold text-slate-950"
          >
            Kembali ke proyek
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      className={`min-h-screen px-4 py-24 transition-colors duration-1000 ${
        theme === "midnight"
          ? "bg-[#050C14] text-slate-100"
          : theme === "sunset"
            ? "bg-gradient-to-b from-[#F97316] via-[#C2410C] to-[#7C2D12] text-white"
            : theme === "dawn"
              ? "bg-gradient-to-b from-[#F8C58A] via-[#E68A63] to-[#C2410C] text-white"
              : "bg-[#1A74E2] text-white"
      } relative`}
    >
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ opacity: 0.6, scale: 0 }}
          animate={{ opacity: 0, scale: 4 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="fixed pointer-events-none z-[9999] w-5 h-5 rounded-full border-2 bg-transparent"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            borderColor: isDarkMode
              ? "rgba(147, 197, 253, 0.7)"
              : "rgba(255, 255, 255, 0.8)",
          }}
        />
      ))}

      <div className="fixed top-0 left-0 right-0 z-[100] h-16 pointer-events-none">
        <div
          style={{ width: `${scrollProgress * 100}%` }}
          className={`absolute bottom-0 left-0 h-1 transition-[width] duration-100 ${
            isDarkMode ? "bg-cyan-400" : "bg-white"
          }`}
        />
        <motion.div
          style={{ left: `${scrollProgress * 95}%` }}
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

      <div className="mx-auto flex max-w-4xl flex-col gap-10">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => void navigate("/project", "Kembali ke project...")}
            className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 font-semibold shadow-md backdrop-blur-md transition hover:bg-white/20"
          >
            <ArrowLeft size={18} />
            Kembali ke proyek
          </button>
          <div className="flex items-center gap-2">
            {hasManualOverride && (
              <button
                type="button"
                onClick={resetToAutomatic}
                title="Kembali ke tema otomatis"
                className="flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-4 py-2.5 text-sm font-semibold backdrop-blur-md"
              >
                <RotateCcw size={16} />
                Otomatis
              </button>
            )}
            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label="Ganti tema manual"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-md"
            >
              {isDarkMode ? <Sun size={21} /> : <Moon size={21} />}
            </button>
          </div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className={`overflow-hidden rounded-3xl border backdrop-blur-lg ${
            isDarkMode
              ? "border-slate-800 bg-slate-900/60"
              : "border-white/20 bg-white/10"
          } ${
            imageOrientation === "portrait"
              ? "md:grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
              : "flex flex-col"
          }`}
        >
          <div
            className={`relative flex min-h-64 items-center justify-center bg-black/15 ${
              imageOrientation === "portrait" ? "md:min-h-[520px]" : "h-72 md:h-96"
            }`}
          >
            <Image
              src={project.image}
              alt={`Foto ${project.title}`}
              fill
              className="object-contain p-12 drop-shadow-2xl"
              onLoad={(event) => {
                const { naturalWidth, naturalHeight } = event.currentTarget;
                setImageOrientation(
                  naturalWidth >= naturalHeight ? "landscape" : "portrait",
                );
              }}
              priority
            />
          </div>
          <div className="space-y-8 p-8 md:flex md:flex-col md:justify-center md:p-12">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] opacity-70">
                Project showcase
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
                {project.title}
              </h1>
            </div>

            <p className="max-w-3xl text-lg leading-relaxed opacity-90">
              {project.desc}
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-black/10 p-5">
                <div className="mb-3 flex items-center gap-2 font-semibold">
                  <Code2 size={20} />
                  Tech stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg bg-cyan-400/15 px-3 py-1.5 text-sm font-semibold text-cyan-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-black/10 p-5">
                <div className="mb-3 flex items-center gap-2 font-semibold">
                  <CalendarDays size={20} />
                  Tanggal pembuatan
                </div>
                <p className="text-lg font-semibold">{project.createdAt}</p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
