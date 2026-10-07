"use client";
import { useEffect, useState } from "react";
import { api, errorMessage } from "../model/api";
import { Column, DataTable } from "./data-table";
import { ErrorAlert, Loading, Panel } from "./feedback";
import { SelectField } from "./fields";

const REPORTS = { inventory: "Inventario", users: "Usuarios por rol", loans: "Préstamos", overdue: "Vencidos" };
const HEADERS: Record<string, string[]> = {
  inventory: ["Tipo", "Título", "ISBN", "Copias", "Disponibles"], users: ["Rol", "Nombre", "Correo", "Estado"],
  loans: ["Material", "Persona", "Vence", "Estado"], overdue: ["Material", "Persona", "Vence", "Días de retraso"],
};

export function Reports() {
  const [type, setType] = useState("inventory");
  const [rows, setRows] = useState<unknown[][]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true; setLoading(true); setError("");
    api<{ items: unknown[][] }>(`/reports/${type}`).then(data => { if (active) setRows(data.items); })
      .catch(reason => { if (active) setError(errorMessage(reason)); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [type]);
  const columns: Column<unknown[]>[] = HEADERS[type].map((label, j) => ({ label, render: row => String(row[j] ?? "—") }));
  return <Panel title="Reportes">
    <div className="mb-4 sm:max-w-xs">
      <SelectField label="Reporte" value={type} onChange={setType}
        options={Object.entries(REPORTS).map(([value, label]) => ({ value, label }))} />
    </div>
    {error ? <ErrorAlert message={error} /> : loading ? <Loading label="Cargando reporte…" /> :
      <DataTable columns={columns} rows={rows} rowKey={(_, i) => i} empty="No hay registros." />}
  </Panel>;
}
