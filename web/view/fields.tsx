"use client";
import { Input, Label, TextField } from "@heroui/react";
import type { ChangeEvent } from "react";

export type Option = { value: string | number; label: string };

const selectClass = "h-10 w-full min-w-0 rounded-[var(--field-radius)] border border-[var(--field-border)] "
  + "bg-[var(--field-background)] px-3 text-sm text-[var(--field-foreground)] shadow-[var(--field-shadow)]";

export function SelectField({ label, options, name, value, defaultValue, onChange, placeholder, required }: {
  label: string; options: Option[]; name?: string; value?: string; defaultValue?: string | number;
  onChange?: (value: string) => void; placeholder?: string; required?: boolean;
}) {
  return <label className="grid min-w-0 gap-1.5 text-sm font-medium">{label}
    <select className={selectClass} name={name} value={value} defaultValue={defaultValue} required={required}
      onChange={(event: ChangeEvent<HTMLSelectElement>) => onChange?.(event.target.value)}>
      {placeholder !== undefined && <option value="">{placeholder}</option>}
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </label>;
}

export function SearchField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <TextField className="mb-4 w-full sm:max-w-md" value={value} onChange={onChange}>
    <Label>{label}</Label><Input type="search" placeholder="Escribe para filtrar…" />
  </TextField>;
}
