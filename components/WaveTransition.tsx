"use client";

import { motion, useAnimation } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";

type WaveTransitionContextValue = {
  navigate: (href: string, message?: string) => Promise<void>;
};

const WaveTransitionContext = createContext<WaveTransitionContextValue | null>(null);

export function useWaveTransition() {
  const context = useContext(WaveTransitionContext);

  if (!context) {
    throw new Error("useWaveTransition must be used inside WaveTransition");
  }

  return context;
}

export default function WaveTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const controls = useAnimation();
  const isNavigating = useRef(false);
  const [transitionMessage, setTransitionMessage] = useState("Menyelam...");
  const handleReveal = useCallback(() => {
    isNavigating.current = false;
  }, []);

  const navigate = async (href: string, message = "Menyelam...") => {
    if (isNavigating.current) return;

    isNavigating.current = true;
    setTransitionMessage(message);

    try {
      await controls.start({
        y: "0%",
        transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
      });

      router.push(href);
    } catch (error) {
      isNavigating.current = false;
      throw error;
    }
  };

  return (
    <WaveTransitionContext.Provider value={{ navigate }}>
      <Suspense fallback={children}>
        <WaveTransitionContent
          controls={controls}
          onReveal={handleReveal}
          transitionMessage={transitionMessage}
        >
          {children}
        </WaveTransitionContent>
      </Suspense>
    </WaveTransitionContext.Provider>
  );
}

function WaveTransitionContent({
  children,
  controls,
  onReveal,
  transitionMessage,
}: {
  children: React.ReactNode;
  controls: ReturnType<typeof useAnimation>;
  onReveal: () => void;
  transitionMessage: string;
}) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    setDisplayChildren(children);
  }, [pathname, children]);

  useEffect(() => {
    const revealPage = async () => {
      await new Promise((resolve) => setTimeout(resolve, 150));

      await controls.start({
        y: "120%",
        transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
      });
      onReveal();
    };

    void revealPage();
  }, [pathname, controls, onReveal]);

  return (
    <div className="relative w-full min-h-screen">
      {displayChildren}

      <motion.div
        initial={{ y: "120%" }}
        animate={controls}
        className="fixed inset-0 w-full h-full z-50 flex flex-col justify-end bg-[#1A74E2] dark:bg-[#050C14] pointer-events-none"
      >
        <div className="w-full overflow-hidden absolute top-0 left-0 right-0 transform -translate-y-[98%]">
          <svg
            className="relative block w-[200%] h-[120px]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            xmlns="http://w3.org"
          >
            <path
              d="M0,60 C150,90 350,30 500,60 C650,90 850,30 1000,60 L1200,60 L1200,120 L0,120 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold text-2xl gap-4 pointer-events-none">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
            className="relative w-50 h-50"
          >
            <Image
              src="/swimduck.webp"
              alt="Bebek Menyelam"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
          <span className="tracking-wider opacity-90 text-xl font-medium">
          {transitionMessage}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
