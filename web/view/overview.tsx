"use client";
import { Button, Card } from "@heroui/react";
import type { Summary } from "../model/api";

export function Overview({ stats, onExplore }: { stats: Summary; onExplore: () => void }) {
  return <div className="grid gap-6">
    <Card className="overflow-hidden bg-accent p-6 text-accent-foreground sm:p-10">
      <span className="text-xs font-semibold uppercase tracking-widest opacity-80">Un lugar para descubrir</span>
      <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">Tu próxima lectura<br />empieza aquí.</h2>
      <p className="mt-3 max-w-lg opacity-90">Explora el catálogo y consulta tus préstamos.</p>
      <Button className="mt-6 bg-white text-black sm:self-start" onPress={onExplore}>Explorar catálogo →</Button>
    </Card>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{Object.entries(stats).map(([label, value]) =>
      <Card key={label} className="p-5">
        <p className="text-3xl font-semibold text-accent">{value}</p>
        <p className="mt-1 text-sm capitalize text-muted">{label.replaceAll("_", " ")}</p>
      </Card>)}</div>
  </div>;
}
