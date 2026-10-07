"use client";
import { Card } from "@heroui/react";
import type { Key, ReactNode } from "react";
import { Empty } from "./feedback";

export type Column<T> = { label: string; render: (row: T) => ReactNode };

export function DataTable<T>({ columns, rows, rowKey, empty }: {
  columns: Column<T>[]; rows: T[]; rowKey: (row: T, index: number) => Key; empty: string;
}) {
  if (!rows.length) return <Empty>{empty}</Empty>;
  return <>
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full border-collapse text-left text-sm">
        <thead><tr>{columns.map(c => <th key={c.label}
          className="border-b border-separator px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted">{c.label}</th>)}</tr></thead>
        <tbody>{rows.map((row, i) => <tr key={rowKey(row, i)} className="hover:bg-surface-secondary">
          {columns.map(c => <td key={c.label} className="border-b border-separator px-3 py-3 align-middle">{c.render(row)}</td>)}
        </tr>)}</tbody>
      </table>
    </div>
    <ul className="grid gap-3 md:hidden">{rows.map((row, i) => <li key={rowKey(row, i)}>
      <Card variant="secondary" className="p-4"><dl className="grid gap-2 text-sm">
        {columns.map(c => <div key={c.label} className="flex items-start justify-between gap-3">
          <dt className="text-muted">{c.label}</dt><dd className="min-w-0 text-right">{c.render(row)}</dd>
        </div>)}
      </dl></Card>
    </li>)}</ul>
  </>;
}
