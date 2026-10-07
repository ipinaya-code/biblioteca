export type ThemeMode = "feminine" | "masculine" | "neutral" | "custom";

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  sidebar: string;
  sidebarText: string;
}

export const themePalettes: Record<ThemeMode, ColorPalette> = {
  feminine: {
    primary: "#E91E63",
    secondary: "#9C27B0",
    accent: "#FF69B4",
    background: "#FFF0F5",
    surface: "#FFFFFF",
    text: "#2C2C2C",
    textSecondary: "#757575",
    border: "#F8BBD0",
    sidebar: "#880E4F",
    sidebarText: "#FFFFFF",
  },
  masculine: {
    primary: "#1976D2",
    secondary: "#0D47A1",
    accent: "#42A5F5",
    background: "#F5F5F5",
    surface: "#FFFFFF",
    text: "#212121",
    textSecondary: "#616161",
    border: "#90CAF9",
    sidebar: "#0D47A1",
    sidebarText: "#FFFFFF",
  },
  neutral: {
    primary: "#37474F",
    secondary: "#455A64",
    accent: "#78909C",
    background: "#FAFAFA",
    surface: "#FFFFFF",
    text: "#263238",
    textSecondary: "#546E7A",
    border: "#CFD8DC",
    sidebar: "#263238",
    sidebarText: "#FFFFFF",
  },
  custom: {
    primary: "#0b6b68",
    secondary: "#123f43",
    accent: "#226b68",
    background: "#f5f7f4",
    surface: "#FFFFFF",
    text: "#17212b",
    textSecondary: "#62717e",
    border: "#dbe4e2",
    sidebar: "#123f43",
    sidebarText: "#FFFFFF",
  },
};

export const customPalettes: ColorPalette[] = [
  {
    primary: "#FF5722",
    secondary: "#E64A19",
    accent: "#FF8A65",
    background: "#FFF3E0",
    surface: "#FFFFFF",
    text: "#2C2C2C",
    textSecondary: "#757575",
    border: "#FFCCBC",
    sidebar: "#BF360C",
    sidebarText: "#FFFFFF",
  },
  {
    primary: "#4CAF50",
    secondary: "#388E3C",
    accent: "#81C784",
    background: "#F1F8E9",
    surface: "#FFFFFF",
    text: "#2C2C2C",
    textSecondary: "#757575",
    border: "#C8E6C9",
    sidebar: "#1B5E20",
    sidebarText: "#FFFFFF",
  },
  {
    primary: "#9C27B0",
    secondary: "#7B1FA2",
    accent: "#BA68C8",
    background: "#F3E5F5",
    surface: "#FFFFFF",
    text: "#2C2C2C",
    textSecondary: "#757575",
    border: "#E1BEE7",
    sidebar: "#4A148C",
    sidebarText: "#FFFFFF",
  },
  {
    primary: "#FF9800",
    secondary: "#F57C00",
    accent: "#FFB74D",
    background: "#FFF8E1",
    surface: "#FFFFFF",
    text: "#2C2C2C",
    textSecondary: "#757575",
    border: "#FFE0B2",
    sidebar: "#E65100",
    sidebarText: "#FFFFFF",
  },
];
