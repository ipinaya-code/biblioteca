"use client";
import { Button, Chip } from "@heroui/react";
import { useState } from "react";
import type { User } from "../model/api";
import { Column, DataTable } from "./data-table";
import { Panel } from "./feedback";
import { SearchField } from "./fields";
import { DeleteButton, Editor } from "./form";
import { userFields } from "./user-fields";

export function Users({ items, admin, self, reload }: { items: User[]; admin: boolean; self: number; reload: () => void }) {
  const [editing, setEditing] = useState<User | "new" | null>(null);
  const [query, setQuery] = useState("");
  const existing = editing && editing !== "new" ? editing : null;
  const filtered = items.filter(x => `${x.name} ${x.email} ${x.role}`.toLowerCase().includes(query.toLowerCase()));
  const columns: Column<User>[] = [
    { label: "Nombre", render: x => <span className="font-medium">{x.name}</span> },
    { label: "Correo", render: x => <span className="break-all">{x.email}</span> },
    { label: "Rol", render: x => <Chip size="sm" variant="soft">{x.role}</Chip> },
    { label: "Estado", render: x => <Chip size="sm" variant="soft" color={x.active ? "success" : "default"}>
      {x.active ? "Activo" : "Inactivo"}</Chip> },
  ];
  if (admin) columns.push({ label: "Acciones", render: x => <div className="flex flex-wrap justify-end gap-2 md:justify-start">
    <Button size="sm" variant="secondary" onPress={() => setEditing(x)}>Editar</Button>
    {x.id !== self && <DeleteButton path={`/users/${x.id}`} done={reload} />}</div> });
  return <Panel title="Personas y roles" action={admin && <Button onPress={() => setEditing("new")}>Nuevo usuario</Button>}>
    <SearchField label="Buscar persona" value={query} onChange={setQuery} />
    {editing && <Editor key={existing?.id ?? "new"} title={existing ? "Editar usuario" : "Nuevo usuario"}
      path={`/users${existing ? `/${existing.id}` : ""}`} method={existing ? "PATCH" : "POST"} fields={userFields(existing)}
      done={() => { setEditing(null); reload(); }} cancel={() => setEditing(null)} />}
    <DataTable columns={columns} rows={filtered} rowKey={x => x.id} empty="No hay personas para esta búsqueda." />
  </Panel>;
}
