"use client";
import { Button, Chip } from "@heroui/react";
import { useState } from "react";
import { api, errorMessage, Loan, Material, User } from "../model/api";
import { Column, DataTable } from "./data-table";
import { ErrorAlert, Panel } from "./feedback";
import { SelectField } from "./fields";
import { Editor } from "./form";

const STATES = ["todos", "Activo", "Vencido", "Devuelto"];
const COLORS = { Activo: "accent", Vencido: "danger", Devuelto: "success" } as const;
const status = (x: Loan) => x.returnedAt ? "Devuelto" : new Date(x.dueAt) < new Date() ? "Vencido" : "Activo";

export function Loans({ items, materials, users, manage, reload }: {
  items: Loan[]; materials: Material[]; users: User[]; manage: boolean; reload: () => void;
}) {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState("todos");
  async function returnLoan(id: number) {
    setBusy(true); setError("");
    try { await api(`/loans/${id}/return`, { method: "POST" }); reload(); }
    catch (reason) { setError(errorMessage(reason)); }
    finally { setBusy(false); }
  }
  const filtered = items.filter(x => filter === "todos" || status(x) === filter);
  const columns: Column<Loan>[] = [
    { label: "Material", render: x => <span className="font-medium">{x.material.title}</span> },
    { label: "Persona", render: x => x.user.name },
    { label: "Vence", render: x => new Date(x.dueAt).toLocaleDateString("es-BO") },
    { label: "Estado", render: x => <Chip size="sm" variant="soft" color={COLORS[status(x)]}>{status(x)}</Chip> },
  ];
  if (manage) columns.push({ label: "Acciones", render: x => !x.returnedAt &&
    <Button size="sm" variant="secondary" isDisabled={busy} onPress={() => returnLoan(x.id)}>Devolver</Button> });
  return <Panel title={manage ? "Préstamos" : "Mis préstamos"}
    action={manage && <Button onPress={() => setCreating(true)}>Nuevo préstamo</Button>}>
    <div className="mb-4 sm:max-w-xs">
      <SelectField label="Estado" value={filter} onChange={setFilter} options={STATES.map(x => ({ value: x, label: x }))} />
    </div>
    {creating && <Editor title="Registrar préstamo" path="/loans" method="POST" cancel={() => setCreating(false)}
      done={() => { setCreating(false); reload(); }} fields={[
        { name: "materialId", label: "Material disponible", options: materials.filter(x => x.availableCopies > 0)
          .map(x => ({ value: x.id, label: `${x.title} · ${x.isbn}` })) },
        { name: "personId", label: "Persona", options: users.filter(x => x.active).map(x => ({ value: x.id, label: `${x.name} · ${x.email}` })) },
        { name: "days", label: "Días", type: "number", value: 14, min: 1 },
      ]} />}
    <ErrorAlert message={error} />
    <DataTable columns={columns} rows={filtered} rowKey={x => x.id} empty="No hay préstamos en este estado." />
  </Panel>;
}
