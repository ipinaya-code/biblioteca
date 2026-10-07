"use client";
import { useCallback, useEffect, useState } from "react";
import { defaultTheme, palettes, ThemeSettings } from "../model/theme";

const KEY = "biblioteca-theme";

function applyTheme(settings: ThemeSettings) {
  const root = document.documentElement;
  const palette = palettes.find(p => p.id === settings.palette) ?? palettes[0];
  root.style.setProperty("--accent", palette.accent);
  root.style.setProperty("--focus", palette.accent);
  root.classList.toggle("dark", settings.dark);
  root.dataset.theme = settings.dark ? "dark" : "light";
}

function storedTheme(): ThemeSettings {
  try { return { ...defaultTheme, ...JSON.parse(localStorage.getItem(KEY) ?? "{}") }; }
  catch { return defaultTheme; }
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeSettings>(defaultTheme);
  useEffect(() => {
    const saved = storedTheme();
    applyTheme(saved);
    setTheme(saved);
  }, []);
  const update = useCallback((change: Partial<ThemeSettings>) => {
    setTheme(current => {
      const next = { ...current, ...change };
      localStorage.setItem(KEY, JSON.stringify(next));
      applyTheme(next);
      return next;
    });
  }, []);
  return { theme, update };
}
