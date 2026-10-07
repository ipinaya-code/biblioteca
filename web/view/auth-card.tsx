"use client";
import { Card } from "@heroui/react";
import { useTheme } from "../controllers/use-theme";

export function AuthCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  useTheme();
  return <main className="grid min-h-dvh place-items-center bg-gradient-to-br from-accent/90 to-black/80 p-4">
    <Card className="w-full max-w-md p-6 sm:p-8">
      <span className="text-xs font-semibold uppercase tracking-widest text-accent">Biblioteca virtual</span>
      <h1 className="mt-2 text-3xl font-semibold">{title}</h1>
      {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </Card>
  </main>;
}
