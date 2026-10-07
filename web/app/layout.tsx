import type { Metadata } from "next";
import "./globals.css";
import { ThemeWrapper } from "../components/ThemeWrapper";

export const metadata: Metadata = { title: "Biblioteca", description: "Gestion de biblioteca" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body><ThemeWrapper>{children}</ThemeWrapper></body></html>;
}
