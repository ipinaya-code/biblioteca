# Sistema de Temas Dinámicos - Frontend

## Características Implementadas

- ✅ **Sistema de temas dinámicos** con detección automática por género
- ✅ **Paletas de colores**: Femenino, Masculino, Neutro, y 4 personalizadas
- ✅ **Responsive design**: Mobile, Tablet, Laptop
- ✅ **HeroUI** y **Tailwind CSS** integrados
- ✅ **Selector de temas** interactivo en el dashboard

## Instalación

### 1. Instalar dependencias

```bash
cd web
npm install
# o si tienes pnpm:
pnpm install
```

### 2. Ejecutar en desarrollo

```bash
npm run dev
# o
pnpm dev
```

El frontend estará disponible en `http://localhost:3000`

## Sistema de Temas

### Detección Automática

El sistema detecta automáticamente el género del usuario y aplica el tema correspondiente:
- **Femenino**: Si el género es `f`, `female`, `femenino`, o `mujer`
- **Masculino**: Si el género es `m`, `male`, `masculino`, o `hombre`
- **Neutro**: Si no hay género o no coincide

### Paletas de Colores

#### Tema Femenino
- Primary: Rosa (#E91E63)
- Secondary: Púrpura (#9C27B0)
- Accent: Rosa claro (#FF69B4)

#### Tema Masculino
- Primary: Azul (#1976D2)
- Secondary: Azul oscuro (#0D47A1)
- Accent: Azul claro (#42A5F5)

#### Tema Neutro
- Primary: Gris oscuro (#37474F)
- Secondary: Gris medio (#455A64)
- Accent: Gris azulado (#78909C)

#### Paletas Personalizadas
1. Naranja/Coral
2. Verde
3. Púrpura
4. Naranja ámbar

### Uso del Selector de Temas

1. Inicia sesión en la aplicación
2. Haz clic en el botón **"🎨 Tema"** en la sidebar
3. Selecciona el modo de tema (Femenino, Masculino, Neutro)
4. O selecciona una paleta personalizada de las 4 opciones disponibles

## Responsive Design

El diseño se adapta automáticamente a diferentes tamaños de pantalla:

- **Desktop (>1024px)**: Sidebar de 250px, 4 columnas de estadísticas
- **Tablet (768px-1024px)**: Sidebar de 200px, 3 columnas de estadísticas
- **Mobile (480px-768px)**: Sidebar horizontal, 2 columnas de estadísticas
- **Small Mobile (<480px)**: Sidebar compacto, 1 columna de estadísticas

## Configuración del Backend

Para que la detección de género funcione, el backend debe incluir el campo `gender` en el objeto User:

```typescript
export type User = { 
  id: number; 
  name: string; 
  email: string; 
  role: string; 
  active: boolean; 
  gender?: string; // Campo opcional para detección de tema
};
```

## Archivos Modificados/Creados

### Archivos Nuevos
- `web/model/theme.ts` - Definición de paletas de colores
- `web/context/ThemeContext.tsx` - Contexto y hook para gestión de temas
- `web/view/ThemeSelector.tsx` - Componente selector de temas
- `web/components/ThemeWrapper.tsx` - Wrapper para ThemeProvider
- `web/tailwind.config.ts` - Configuración de Tailwind CSS
- `web/postcss.config.js` - Configuración de PostCSS

### Archivos Modificados
- `web/package.json` - Agregadas dependencias (HeroUI, Tailwind, Framer Motion)
- `web/app/globals.css` - Integración de Tailwind y variables CSS del tema
- `web/app/layout.tsx` - Integración de ThemeWrapper
- `web/app/page.tsx` - Integración de ThemeProvider y ThemeSelector
- `web/model/api.ts` - Agregado campo `gender` al tipo User

## Dependencias Agregadas

```json
{
  "dependencies": {
    "@heroui/react": "^2.6.0",
    "framer-motion": "^11.11.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

## Notas

- Los errores de TypeScript que aparecen en el IDE son normales hasta que instales las dependencias
- El sistema usa CSS variables para cambios de tema en tiempo real sin recarga
- Las transiciones suaves mejoran la experiencia de usuario
- El tema seleccionado se mantiene mientras la sesión esté activa
