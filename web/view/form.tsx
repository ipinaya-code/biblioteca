"use client";
import { Button, Card, Input, Label, TextField } from "@heroui/react";
import { FormEvent, useState } from "react";
import { api, errorMessage } from "../model/api";
import { ErrorAlert } from "./feedback";
import { Option, SelectField } from "./fields";

export type Field = { name: string; label: string; type?: string; value?: string | number; options?: Option[]; min?: number };

function FieldInput({ field }: { field: Field }) {
  if (field.options) return <SelectField label={field.label} name={field.name} options={field.options}
    defaultValue={field.value} placeholder="Seleccionar…" required />;
  return <TextField name={field.name} type={field.type ?? "text"} defaultValue={field.value?.toString()} isRequired
    maxLength={field.type === "email" ? 254 : 120} minLength={field.type === "password" ? 12 : undefined}>
    <Label>{field.label}</Label><Input min={field.min} />
  </TextField>;
}

export function Editor({ title, path, method, fields, done, cancel }: {
  title: string; path: string; method: string; fields: Field[]; done: () => void; cancel: () => void;
}) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    try { await api(path, { method, body: JSON.stringify(payload) }); done(); }
    catch (reason) { setError(errorMessage(reason)); }
    finally { setBusy(false); }
  }
  return <Card variant="secondary" className="mb-5 p-4 sm:p-5"><form onSubmit={submit}>
    <h3 className="mb-4 text-base font-semibold">{title}</h3>
    <div className="grid gap-4 sm:grid-cols-2">{fields.map(f => <FieldInput key={f.name} field={f} />)}</div>
    <ErrorAlert message={error} />
    <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
      <Button type="button" variant="tertiary" isDisabled={busy} onPress={cancel}>Cancelar</Button>
      <Button type="submit" isDisabled={busy}>{busy ? "Guardando…" : "Guardar"}</Button>
    </div>
  </form></Card>;
}

export function DeleteButton({ path, done }: { path: string; done: () => void }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function remove() {
    if (!window.confirm("¿Eliminar este registro? Esta operación no se puede deshacer.")) return;
    setBusy(true); setError("");
    try { await api(path, { method: "DELETE" }); done(); }
    catch (reason) { setError(errorMessage(reason)); }
    finally { setBusy(false); }
  }
  return <><Button size="sm" variant="danger-soft" isDisabled={busy} onPress={remove}>Eliminar</Button>
    {error && <span role="alert" className="block text-xs text-danger">{error}</span>}</>;
}
