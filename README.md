# GSC Inmobiliaria

Monorepo de un portal inmobiliario (MVP) con `apps/web` (Next.js) y `apps/cms` (Strapi, opcional en esta fase). Enfocado en aprender construyendo con decisiones explícitas y código limpio.

## Estructura
- `apps/web`: frontend público (Next.js 15, App Router, Tailwind v4).
- `apps/cms`: backend/admin (Strapi 4 + PostgreSQL) via Docker.
- `docs/`: especificaciones y tareas.
- `.env.example`, `docker-compose.yml`: configuración base.

## Ejecutar el frontend
```
cd apps/web
npm install
npm run dev
```
Abrir http://localhost:3000. Comandos útiles:
- `npm run build` — build de producción
- `npm start` — iniciar build
- `npm run lint` — ESLint (Next + TS)

## Ejecutar CMS (opcional)
```
cp .env.example .env
docker compose up -d
```
Strapi en http://localhost:1337 (primera vez: crea usuario admin).

## Destacados actuales
- Hero optimizado (`next/image`, blur) con `apps/web/public/hero.avif`.
- SearchBar con transparencia/blur, ancho responsivo (md≈62%) y botón compacto.
- Orden Home: Novedades → Resultados → Propiedades → FAQ → Vendedores → CTA.
- Grid: 1×/2×/4× y hasta 12 propiedades (fotos cuadradas con fallback).
- Títulos limpios (sin H/B); formato corto H/B solo en mensajes de WhatsApp.

## Contribución
- Flujo de un solo dev con verificación previa al push: `cd apps/web && npm run lint && npm run build`.
- Ver más en AGENTS.md.

## Recursos
- Especificaciones: `technical-specifications.md`
- Roadmap/tareas: `docs/tasks.md`
