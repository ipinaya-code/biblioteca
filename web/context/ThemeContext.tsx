"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ThemeMode, ColorPalette, themePalettes, customPalettes } from "../model/theme";

interface ThemeContextType {
  theme: ColorPalette;
  themeMode: ThemeMode;
  customPaletteIndex: number;
  setThemeMode: (mode: ThemeMode) => void;
  setCustomPaletteIndex: (index: number) => void;
  applyTheme: (palette: ColorPalette) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children, user }: { children: ReactNode; user?: { gender?: string } }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>("neutral");
  const [customPaletteIndex, setCustomPaletteIndex] = useState(0);
  const [theme, setTheme] = useState<ColorPalette>(themePalettes.neutral);

  // Detectar tema inicial basado en género
  useEffect(() => {
    if (user?.gender) {
      const gender = user.gender.toLowerCase();
      if (gender === "f" || gender === "female" || gender === "femenino" || gender === "mujer") {
        setThemeMode("feminine");
      } else if (gender === "m" || gender === "male" || gender === "masculino" || gender === "hombre") {
        setThemeMode("masculine");
      }
    }
  }, [user?.gender]);

  // Aplicar tema cuando cambia el modo
  useEffect(() => {
    let palette: ColorPalette;
    if (themeMode === "custom") {
      palette = customPalettes[customPaletteIndex];
    } else {
      palette = themePalettes[themeMode];
    }
    setTheme(palette);
    applyTheme(palette);
  }, [themeMode, customPaletteIndex]);

  const applyTheme = (palette: ColorPalette) => {
    const root = document.documentElement;
    root.style.setProperty("--primary", palette.primary);
    root.style.setProperty("--secondary", palette.secondary);
    root.style.setProperty("--accent", palette.accent);
    root.style.setProperty("--background", palette.background);
    root.style.setProperty("--surface", palette.surface);
    root.style.setProperty("--text", palette.text);
    root.style.setProperty("--text-secondary", palette.textSecondary);
    root.style.setProperty("--border", palette.border);
    root.style.setProperty("--sidebar", palette.sidebar);
    root.style.setProperty("--sidebar-text", palette.sidebarText);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeMode, customPaletteIndex, setThemeMode, setCustomPaletteIndex, applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
