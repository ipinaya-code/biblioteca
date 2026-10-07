"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api, errorMessage, User } from "../../../model/api";
import { AuthCard } from "../../../view/auth-card";
import { ErrorAlert } from "../../../view/feedback";
import { Editor } from "../../../view/form";
import { userFields } from "../../../view/user-fields";

export default function RegistrationPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [created, setCreated] = useState(false);
  useEffect(() => {
    let active = true;
    api<{ user: User | null }>("/auth/me")
      .then(data => { if (active) setUser(data.user); })
      .catch(reason => { if (active) setError(errorMessage(reason)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  const body = loading ? <p role="status" className="text-sm text-muted">Comprobando sesión…</p>
    : error ? <ErrorAlert message={error} onRetry={() => window.location.reload()} />
    : user?.role !== "administrador" ? <p className="text-sm text-muted">El registro de cuentas lo realiza un administrador de la
      biblioteca. Solicita tu cuenta al administrador o inicia sesión con una cuenta autorizada.</p>
    : created ? <p role="status" className="rounded-xl bg-success-soft p-3 text-sm text-success-soft-foreground">Usuario registrado correctamente.</p>
    : <Editor title="Nuevo usuario" path="/users" method="POST" fields={userFields()}
      done={() => setCreated(true)} cancel={() => window.location.assign("/")} />;
  return <AuthCard title="Registro de usuarios">
    {body}
    <p className="mt-4 text-center text-sm"><Link className="text-accent underline-offset-4 hover:underline"
      href={user ? "/" : "/login"}>{user ? "Volver al panel" : "Iniciar sesión"}</Link></p>
  </AuthCard>;
}
