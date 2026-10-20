"use client";

import { ArrowLeft, CalendarDays, Code2, Moon, Sun } from "lucide-react";
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

const FLOATING_BUBBLES = [
  { id: 1, left: "5%", size: 26, duration: 12, delay: -2, drift: 32 },
  { id: 2, left: "14%", size: 48, duration: 16, delay: -9, drift: -42 },
  { id: 3, left: "25%", size: 18, duration: 10, delay: -5, drift: 28 },
  { id: 4, left: "36%", size: 36, duration: 14, delay: -11, drift: -34 },
  { id: 5, left: "48%", size: 58, duration: 19, delay: -15, drift: 44 },
  { id: 6, left: "59%", size: 22, duration: 11, delay: -7, drift: -30 },
  { id: 7, left: "69%", size: 42, duration: 15, delay: -13, drift: 36 },
  { id: 8, left: "79%", size: 20, duration: 13, delay: -4, drift: -26 },
  { id: 9, left: "88%", size: 52, duration: 18, delay: -12, drift: 40 },
  { id: 10, left: "94%", size: 24, duration: 11, delay: -6, drift: -32 },
];

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
      <p className="text-lg font-semibold">Loading showcase...</p>
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
          <h1 className="text-3xl font-bold">Project not found</h1>
          <Link
            href="/project"
            className="mt-6 inline-flex rounded-full bg-cyan-400 px-5 py-2.5 font-semibold text-slate-950"
          >
            Back to projects
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
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        {FLOATING_BUBBLES.map((bubble) => (
          <motion.div
            key={bubble.id}
            initial={{ y: "115vh", x: 0, opacity: 0 }}
            animate={{
              y: "-25vh",
              x: [0, bubble.drift, 0],
              opacity: [0, 0.78, 0.78, 0],
            }}
            transition={{
              duration: bubble.duration,
              delay: bubble.delay,
              repeat: Infinity,
              ease: "easeInOut",
              x: {
                duration: bubble.duration / 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
              opacity: {
                duration: bubble.duration,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className={`absolute bottom-0 rounded-full border ${
              isDarkMode
                ? "border-cyan-100/65 bg-cyan-100/20"
                : "border-white/80 bg-white/35"
            } shadow-[inset_-5px_-5px_9px_rgba(255,255,255,0.25),inset_3px_3px_6px_rgba(255,255,255,0.35),0_0_20px_rgba(186,230,253,0.4)]`}
            style={{
              left: bubble.left,
              width: bubble.size,
              height: bubble.size,
            }}
          >
            <span className="absolute left-[20%] top-[16%] h-[25%] w-[25%] rounded-full bg-white/85 blur-[1px]" />
          </motion.div>
        ))}
      </div>

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
            alt="Swimming duck"
            width={48}
            height={48}
            className="object-contain"
            priority
          />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-10">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => void navigate("/project", "Back to projects...")}
            aria-label="Back to projects"
            className="fixed bottom-6 left-6 z-50 flex items-center gap-0 rounded-full border border-white/30 bg-white/10 p-3 font-semibold shadow-md backdrop-blur-md transition hover:bg-white/20 sm:gap-2 sm:px-5 sm:py-2.5"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Back to projects</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label="Toggle theme manually"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-md"
            >
              {isDarkMode ? (
                <Sun size={21} />
              ) : (
                <Moon
                  size={21}
                  className="text-yellow-200 drop-shadow-[0_0_8px_rgba(254,243,163,0.8)]"
                />
              )}
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
              className="object-cover drop-shadow-2xl"
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

            <p className="max-w-3xl text-justify text-lg leading-relaxed opacity-90">
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
                  Date created
                </div>
                <p className="text-lg font-semibold">{project.createdAt}</p>
              </div>
            </div>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-300/60 px-5 py-2.5 font-semibold text-cyan-200 transition hover:bg-cyan-400/15 hover:text-white"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.17c-3.22.7-3.9-1.36-3.9-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.57-.29-5.27-1.29-5.27-5.74 0-1.27.45-2.3 1.2-3.11-.12-.29-.52-1.47.11-3.07 0 0 .98-.31 3.16 1.19a10.9 10.9 0 0 1 5.76 0c2.18-1.5 3.16-1.19 3.16-1.19.63 1.6.23 2.78.11 3.07.75.81.2 1.84 1.2 3.11 0 4.46-2.71 5.45-5.29 5.74.41.36.78 1.08.78 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
              </svg>
              View GitHub repository
            </a>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
