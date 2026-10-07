"use client";
import { Button, Drawer } from "@heroui/react";
import { useState } from "react";
import type { User } from "../model/api";
import { Account, Brand, Nav } from "./nav";

type Props = {
  user: User; labels: Record<string, string>; section: string; onSelect: (id: string) => void;
  onTheme: () => void; onLogout: () => void; children: React.ReactNode;
};

export function Shell({ user, labels, section, onSelect, onTheme, onLogout, children }: Props) {
  const [open, setOpen] = useState(false);
  const pick = (id: string) => { onSelect(id); setOpen(false); };
  return <div className="min-h-dvh bg-background lg:grid lg:grid-cols-[260px_1fr]">
    <aside className="sticky top-0 hidden h-dvh flex-col gap-8 border-r border-separator bg-surface p-5 lg:flex">
      <Brand /><Nav labels={labels} section={section} onSelect={onSelect} />
      <div className="mt-auto"><Account user={user} onTheme={onTheme} onLogout={onLogout} /></div>
    </aside>
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-separator bg-surface/90 px-4 py-3 backdrop-blur lg:hidden">
      <Brand />
      <Drawer isOpen={open} onOpenChange={setOpen}>
        <Button isIconOnly variant="ghost" aria-label="Abrir menú">☰</Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog aria-label="Menú">
              <Drawer.Header><Drawer.Heading>Menú</Drawer.Heading></Drawer.Header>
              <Drawer.Body className="flex flex-col gap-6">
                <Nav labels={labels} section={section} onSelect={pick} />
                <Account user={user} onTheme={() => { setOpen(false); onTheme(); }} onLogout={onLogout} />
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </header>
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">{children}</main>
  </div>;
}
