"use client";
import { useState } from "react";
import { api, canManage, errorMessage } from "../model/api";
import { useLibrary } from "../controllers/use-library";
import { useTheme } from "../controllers/use-theme";
import { ErrorAlert, Loading } from "../view/feedback";
import { Loans } from "../view/loans";
import { Materials } from "../view/materials";
import { Overview } from "../view/overview";
import { Reports } from "../view/reports";
import { Shell } from "../view/shell";
import { ThemeSelector } from "../view/theme-selector";
import { Users } from "../view/users";

export default function Dashboard() {
  const data = useLibrary();
  const { theme, update } = useTheme();
  const [section, setSection] = useState("overview");
  const [error, setError] = useState("");
  const [showTheme, setShowTheme] = useState(false);
  const { user, materials, loans, users, summary, load } = data;
  if (!user) return <main className="grid min-h-dvh place-items-center p-4"><div className="w-full max-w-sm">
    {data.error ? <ErrorAlert message={data.error} onRetry={load} /> : <Loading label="Cargando biblioteca…" />}
  </div></main>;
  const manage = canManage(user);
  const labels: Record<string, string> = { overview: "Resumen", materials: "Catálogo", loans: "Préstamos",
    ...(manage ? { users: "Personas y roles", reports: "Reportes" } : {}) };
  async function logout() {
    try { await api("/auth/logout", { method: "POST" }); window.location.assign("/login"); }
    catch (reason) { setError(errorMessage(reason)); }
  }
  const stats = manage ? summary : { materiales: materials.length, prestamos_activos: loans.filter(x => !x.returnedAt).length };
  return <Shell user={user} labels={labels} section={section} onSelect={setSection}
    onTheme={() => setShowTheme(!showTheme)} onLogout={logout}>
    <span className="text-xs font-semibold uppercase tracking-widest text-accent">Tu biblioteca virtual</span>
    <h1 className="mb-6 mt-1 text-3xl font-semibold sm:text-4xl">{labels[section]}</h1>
    <ErrorAlert message={error || data.error} />
    {showTheme && <ThemeSelector theme={theme} update={update} close={() => setShowTheme(false)} />}
    {section === "overview" && <Overview stats={stats} onExplore={() => setSection("materials")} />}
    {section === "materials" && <Materials items={materials} manage={manage} reload={load} />}
    {section === "loans" && <Loans items={loans} materials={materials} users={users} manage={manage} reload={load} />}
    {section === "users" && manage && <Users items={users} admin={user.role === "administrador"} self={user.id} reload={load} />}
    {section === "reports" && manage && <Reports />}
  </Shell>;
}
