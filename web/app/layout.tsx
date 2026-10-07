import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Biblioteca", description: "Gestión de biblioteca" };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" suppressHydrationWarning><body className="antialiased">{children}</body></html>;
}
