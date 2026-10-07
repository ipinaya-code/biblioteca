"use client";
import { Button, Card, Switch } from "@heroui/react";
import { palettes, ThemeSettings } from "../model/theme";

export function ThemeSelector({ theme, update, close }: {
  theme: ThemeSettings; update: (change: Partial<ThemeSettings>) => void; close: () => void;
}) {
  return <Card className="mb-6 p-4 sm:p-6">
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-lg font-semibold">Personalizar tema</h2>
      <Button size="sm" variant="ghost" onPress={close}>Cerrar</Button>
    </div>
    <Switch isSelected={theme.dark} onChange={dark => update({ dark })}>
      <Switch.Control><Switch.Thumb /></Switch.Control>
      <Switch.Content>Modo oscuro</Switch.Content>
    </Switch>
    <p className="mb-2 mt-5 text-sm font-medium">Color principal</p>
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">{palettes.map(p =>
      <button key={p.id} type="button" aria-pressed={theme.palette === p.id} onClick={() => update({ palette: p.id })}
        className={`flex flex-col items-center gap-1 rounded-xl border-2 p-2 text-xs ${theme.palette === p.id
          ? "border-foreground" : "border-transparent hover:border-border"}`}>
        <span className="size-8 rounded-full" style={{ background: p.accent }} />{p.label}
      </button>)}</div>
  </Card>;
}
