"use client";
import { Button, Chip } from "@heroui/react";
import { useState } from "react";
import type { Material } from "../model/api";
import { Column, DataTable } from "./data-table";
import { Panel } from "./feedback";
import { SearchField } from "./fields";
import { DeleteButton, Editor, Field } from "./form";

function materialFields(existing: Material | null): Field[] {
  const fields: Field[] = [{ name: "title", label: "Título", value: existing?.title },
    { name: "isbn", label: "ISBN / Código", value: existing?.isbn }];
  if (!existing) fields.push({ name: "type", label: "Tipo", value: "libro",
    options: ["libro", "revista", "tesis"].map(value => ({ value, label: value })) },
  { name: "copies", label: "Copias", type: "number", value: 1, min: 1 });
  return fields;
}

export function Materials({ items, manage, reload }: { items: Material[]; manage: boolean; reload: () => void }) {
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Material | "new" | null>(null);
  const existing = editing && editing !== "new" ? editing : null;
  const filtered = items.filter(x => `${x.title} ${x.isbn} ${x.type}`.toLowerCase().includes(query.toLowerCase()));
  const columns: Column<Material>[] = [
    { label: "Título", render: x => <span className="font-medium">{x.title}</span> },
    { label: "Tipo", render: x => <Chip size="sm" variant="soft">{x.type}</Chip> },
    { label: "ISBN", render: x => x.isbn },
    { label: "Disponibles", render: x => <Chip size="sm" color={x.availableCopies ? "success" : "danger"} variant="soft">
      {x.availableCopies} / {x.totalCopies}</Chip> },
  ];
  if (manage) columns.push({ label: "Acciones", render: x => <div className="flex flex-wrap justify-end gap-2 md:justify-start">
    <Button size="sm" variant="secondary" onPress={() => setEditing(x)}>Editar</Button>
    <DeleteButton path={`/materials/${x.id}`} done={reload} /></div> });
  return <Panel title="Catálogo de materiales"
    action={manage && <Button onPress={() => setEditing("new")}>Nuevo material</Button>}>
    <SearchField label="Buscar por título, tipo o ISBN" value={query} onChange={setQuery} />
    {editing && <Editor key={existing?.id ?? "new"} title={existing ? "Editar material" : "Nuevo material"}
      path={`/materials${existing ? `/${existing.id}` : ""}`} method={existing ? "PATCH" : "POST"}
      fields={materialFields(existing)} done={() => { setEditing(null); reload(); }} cancel={() => setEditing(null)} />}
    <DataTable columns={columns} rows={filtered} rowKey={x => x.id} empty="No hay materiales para esta búsqueda." />
  </Panel>;
}
