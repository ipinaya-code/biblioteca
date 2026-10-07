"use client";
import { Button, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { api, errorMessage, User } from "../../model/api";
import { AuthCard } from "../../view/auth-card";
import { ErrorAlert } from "../../view/feedback";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    try {
      await api<{ user: User }>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
      router.push("/");
    } catch (reason) { setError(errorMessage(reason, "No se pudo iniciar sesión")); }
    finally { setLoading(false); }
  }
  return <AuthCard title="Bienvenido" subtitle="Accede al centro de gestión de tu biblioteca.">
    <form className="grid gap-4" onSubmit={submit}>
      <TextField type="email" autoComplete="username" isRequired value={email} onChange={setEmail}>
        <Label>Correo</Label><Input placeholder="tu@correo.com" />
      </TextField>
      <TextField type="password" autoComplete="current-password" isRequired value={password} onChange={setPassword}>
        <Label>Contraseña</Label><Input />
      </TextField>
      <ErrorAlert message={error} />
      <Button type="submit" fullWidth isDisabled={loading}>{loading ? "Entrando..." : "Iniciar sesión"}</Button>
      <Link className="text-center text-sm text-accent underline-offset-4 hover:underline" href="/auth/registro">Registro de usuarios</Link>
    </form>
  </AuthCard>;
}
