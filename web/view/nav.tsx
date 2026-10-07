"use client";
import { Avatar, Button, Chip } from "@heroui/react";
import type { User } from "../model/api";

export function Brand() {
  return <div className="flex items-center gap-3">
    <span aria-hidden className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 19.5V5a2 2 0 0 1 2-2h14v16H6.5a2.5 2.5 0 0 0 0 5H20" /></svg>
    </span>
    <div className="leading-tight"><p className="text-lg font-semibold">Biblioteca</p>
      <p className="text-xs text-muted">Conocimiento a tu alcance</p></div>
  </div>;
}

export function Nav({ labels, section, onSelect }: {
  labels: Record<string, string>; section: string; onSelect: (id: string) => void;
}) {
  return <nav aria-label="Navegación principal" className="grid gap-1">{Object.entries(labels).map(([id, label]) =>
    <button key={id} type="button" aria-current={section === id ? "page" : undefined} onClick={() => onSelect(id)}
      className={`rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${section === id
        ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-surface-secondary"}`}>{label}</button>)}
  </nav>;
}

export function Account({ user, onTheme, onLogout }: { user: User; onTheme: () => void; onLogout: () => void }) {
  const initials = user.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  return <div className="grid gap-3 border-t border-separator pt-4">
    <div className="flex items-center gap-3">
      <Avatar color="accent" size="sm"><Avatar.Fallback>{initials}</Avatar.Fallback></Avatar>
      <div className="min-w-0"><p className="truncate text-sm font-medium">{user.name}</p>
        <Chip size="sm" variant="soft">{user.role}</Chip></div>
    </div>
    <Button variant="secondary" size="sm" onPress={onTheme}>Tema</Button>
    <Button variant="tertiary" size="sm" onPress={onLogout}>Cerrar sesión</Button>
  </div>;
}
