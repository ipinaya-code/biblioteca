# Frontend web

Next.js 16 (React 19) + TypeScript + Tailwind CSS v4 + HeroUI v3. Gestor: pnpm.

```bash
pnpm install
pnpm dev     # http://localhost:3000, API en NEXT_PUBLIC_API_URL
pnpm lint    # tsc --noEmit
pnpm build
pnpm test    # Playwright contra servicios reales
```

## Capas

- `app/`: rutas de Next.js (`/`, `/login`, `/auth/registro`), layout y estilos globales.
- `model/`: cliente HTTP (`api.ts`), contratos y paletas de tema.
- `controllers/`: carga de datos (`use-library`) y tema (`use-theme`).
- `view/`: componentes HeroUI (shell, navegación, tablas, formularios, reportes).

## Responsive

- Escritorio (`lg`, ≥1024px): barra lateral fija con navegación y cuenta.
- Tablet y móvil: cabecera con botón "Abrir menú" que abre un `Drawer` lateral.
- Tablas: `<table>` desde `md` (≥768px); en móvil cada fila se muestra como tarjeta.
- Formularios en una columna en móvil y dos desde `sm`.

## Tema

Botón "Tema": modo oscuro y seis colores principales. La preferencia se guarda
en `localStorage` (solo apariencia, nunca credenciales) y ajusta la variable
`--accent` de HeroUI.
