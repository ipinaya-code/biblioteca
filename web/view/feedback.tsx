"use client";
import { Alert, Button, Card, Spinner } from "@heroui/react";

export function ErrorAlert({ message, onRetry }: { message: string; onRetry?: () => void }) {
  if (!message) return null;
  return <Alert status="danger" className="my-3">
    <Alert.Indicator />
    <Alert.Content><Alert.Description role="alert">{message}</Alert.Description></Alert.Content>
    {onRetry && <Button size="sm" variant="danger-soft" onPress={onRetry}>Reintentar</Button>}
  </Alert>;
}

export function Loading({ label }: { label: string }) {
  return <div className="flex items-center justify-center gap-3 py-10 text-muted">
    <Spinner size="sm" /><span>{label}</span>
  </div>;
}

export function Empty({ children }: { children: React.ReactNode }) {
  return <p className="rounded-2xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted">{children}</p>;
}

export function Panel({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return <Card className="p-4 sm:p-6">
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-lg font-semibold sm:text-xl">{title}</h2>{action}
    </div>
    {children}
  </Card>;
}
