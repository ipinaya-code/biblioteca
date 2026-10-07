export type Palette = { id: string; label: string; accent: string };

export const palettes: Palette[] = [
  { id: "teal", label: "Verde azulado", accent: "#0b6b68" },
  { id: "blue", label: "Azul", accent: "#1976d2" },
  { id: "rose", label: "Rosa", accent: "#d81b60" },
  { id: "purple", label: "Púrpura", accent: "#7b1fa2" },
  { id: "orange", label: "Naranja", accent: "#e65100" },
  { id: "slate", label: "Gris", accent: "#37474f" },
];

export type ThemeSettings = { palette: string; dark: boolean };
export const defaultTheme: ThemeSettings = { palette: "teal", dark: false };
