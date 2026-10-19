"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type ThemeContextValue = {
  theme: TimeTheme;
  isDarkMode: boolean;
  hasManualOverride: boolean;
  resetToAutomatic: () => void;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const THEME_STORAGE_KEY = "duckyfolio-theme-override";

export type TimeTheme = "dawn" | "day" | "sunset" | "midnight";

function getTimeTheme(date: Date): TimeTheme {
  const hour = date.getHours();

  if (hour >= 4 && hour < 8) {
    return "dawn";
  }

  if (hour >= 8 && hour < 15) {
    return "day";
  }

  if (hour >= 15 && hour < 18) {
    return "sunset";
  }

  return "midnight";
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [automaticTheme, setAutomaticTheme] = useState<TimeTheme>("day");
  const [manualTheme, setManualTheme] = useState<"day" | "midnight" | null>(
    null,
  );
  const hasLoadedTheme = useRef(false);

  useEffect(() => {
    const updateAutomaticTheme = () => {
      setAutomaticTheme(getTimeTheme(new Date()));
    };

    updateAutomaticTheme();
    const intervalId = window.setInterval(updateAutomaticTheme, 60_000);

    try {
      const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

      if (storedTheme === "day" || storedTheme === "midnight") {
        setManualTheme(storedTheme);
      }
    } catch (error) {
      console.error("Unable to load the saved color mode.", error);
    } finally {
      hasLoadedTheme.current = true;
    }

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!hasLoadedTheme.current) {
      return;
    }

    try {
      if (manualTheme === null) {
        window.localStorage.removeItem(THEME_STORAGE_KEY);
      } else {
        window.localStorage.setItem(THEME_STORAGE_KEY, manualTheme);
      }
    } catch (error) {
      console.error("Unable to save the selected color mode.", error);
    }
  }, [manualTheme]);

  const toggleDarkMode = useCallback(() => {
    setManualTheme((currentTheme) =>
      currentTheme === "midnight" ? "day" : "midnight",
    );
  }, []);

  const resetToAutomatic = useCallback(() => {
    setManualTheme(null);
  }, []);

  const theme = manualTheme ?? automaticTheme;
  const isDarkMode = theme === "midnight";

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDarkMode,
        hasManualOverride: manualTheme !== null,
        resetToAutomatic,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
