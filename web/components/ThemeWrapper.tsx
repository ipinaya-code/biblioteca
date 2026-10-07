"use client";
import { ThemeProvider } from "../context/ThemeContext";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
