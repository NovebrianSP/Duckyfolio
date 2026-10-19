"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Sun, Moon, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useWaveTransition } from "@/components/WaveTransition";

export default function WaterPortfolio() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
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

  return (
    <div
      className={`min-h-screen transition-colors duration-1000 ease-in-out relative overflow-hidden flex flex-col justify-center items-center px-4 ${
        isDarkMode
          ? "bg-gradient-to-b from-[#0B192C] via-[#050C14] to-[#02060d] text-slate-100"
          : "bg-gradient-to-b from-[#E0F4FF] via-[#87C4FF] to-[#39A7FF] text-slate-900"
      }`}
    >
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ opacity: 0.6, scale: 0 }}
          animate={{ opacity: 0, scale: 4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed pointer-events-none z-50 w-4 h-4 rounded-full border bg-transparent"
          style={{
            left: ripple.x - 8,
            top: ripple.y - 8,
            borderColor: isDarkMode ? "rgba(147, 197, 253, 0.3)" : "rgba(255, 255, 255, 0.5)",
          }}
        />
      ))}

      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center transition-all duration-300 ease-in-out border rounded-full shadow-2xl p-4 w-14 h-14 hover:scale-95 active:scale-90 ${
          isDarkMode ? "bg-[#1E3E62] text-yellow-400 border-slate-700 hover:bg-[#152C46]" : "bg-white text-indigo-900 border-blue-200 hover:bg-slate-50"
        }`}
      >
        {isDarkMode ? <Sun size={24} className="flex-shrink-0" /> : <Moon size={24} className="flex-shrink-0" />}
      </button>

      <div className="absolute top-20 z-0 flex items-center justify-center pointer-events-none">
        {isDarkMode ? (
          <svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="#E2E8F0" className="w-36 h-36 drop-shadow-[0_0_35px_rgba(226,232,240,0.6)] text-slate-200">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        ) : (
          <svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="none" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-40 h-40 drop-shadow-[0_0_50px_rgba(253,224,71,0.8)] text-yellow-300 animate-[spin_120s_linear_infinite]">
            <circle cx="12" cy="12" r="4" fill="#FEF08A" />
            <path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
          </svg>
        )}
      </div>

      <div className="z-30 text-center space-y-6 mb-20 relative">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-sm">
          Halo, Saya <span className={isDarkMode ? "text-cyan-400" : "text-blue-600"}>Bebek Tech</span>
        </h1>
        <p className="text-xl md:text-2xl max-w-lg mx-auto font-medium opacity-80">
          Mengarungi lautan kode dan menyelami ekosistem web dengan tenang seperti di danau.
          </p>

        <div className="w-full flex justify-center mt-6 mb-2">
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="relative w-[50px] h-[50px]">
            <Image src="/ducky.webp" alt="Ducky" fill className="object-contain" priority />
          </motion.div>
        </div>

        <button
          type="button"
          onClick={() => void navigate("/project")}
          className={`mt-4 px-8 py-3 rounded-full font-bold flex items-center gap-2 mx-auto transition-all active:scale-95 shadow-md ${
            isDarkMode ? "bg-cyan-500 text-slate-900 hover:bg-cyan-400" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Selami Portofolio <ArrowRight size={20} />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden z-10" style={{ height: "180px" }}>
        <svg className="absolute bottom-0 w-[200%] h-full" viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://w3.org">
          <motion.path animate={{ x: [0, -1200] }} transition={{ repeat: Infinity, duration: 16, ease: "linear" }} d="M0,60 C150,90 350,30 500,60 C650,90 850,30 1000,60 L2000,120 L0,120 Z" fill={isDarkMode ? "#1E3E62" : "#87C4FF"} opacity="0.4" />
          <motion.path animate={{ x: [-1200, 0] }} transition={{ repeat: Infinity, duration: 22, ease: "linear" }} d="M0,50 C200,20 400,80 600,50 C800,20 1000,80 1200,50 L2400,120 L0,120 Z" fill={isDarkMode ? "#0B192C" : "#39A7FF"} opacity="0.6" />
          <motion.path animate={{ x: [0, -1200] }} transition={{ repeat: Infinity, duration: 28, ease: "linear" }} d="M0,70 C150,40 300,90 450,70 C600,40 750,90 900,70 L1800,120 L0,120 Z" fill={isDarkMode ? "#050C14" : "#1A74E2"} />
        </svg>
      </div>
    </div>
  );
}