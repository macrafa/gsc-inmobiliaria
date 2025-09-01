# GSC Inmobiliaria

Proyecto educativo-práctico para construir un portal inmobiliario (MVP) con foco en aprendizaje guiado. Este repo está organizado como monorepo con `apps/web` (Next.js) y `apps/cms` (Strapi), más docs y configuración compartida.

Objetivo didáctico: entender el porqué de cada decisión, practicar conceptos de tus materias y evitar “copiar y pegar” sin comprender.

## Estructura

- `apps/web`: frontend público (Next.js 14, App Router)
- `apps/cms`: backend/admin (Strapi 4 + PostgreSQL)
- `docs/`: especificaciones, ADRs y material pedagógico
- `docker-compose.yml`: orquesta Postgres + Strapi para desarrollo
- `.env.example`: variables de entorno base

## Quickstart (Strapi + Postgres con Docker)

1) Copia variables de entorno:

```
cp .env.example .env
```

2) Arranca base de datos y CMS:

```
docker compose up -d
```

3) Abre Strapi en `http://localhost:1337` y crea el usuario admin.

4) Modela las colecciones `Property`, `PropertyImage`, `Lead` en Strapi.

- [ ] TODO(human): define enums y campos mínimos (ver `docs/tasks.md`).

5) Web (Next.js): por ahora el esqueleto es mínimo para guiar el aprendizaje. Más abajo verás cómo generarlo tú.

## Generar `apps/web` (local, sin Docker)

Recomendado para empezar a entender Next.js paso a paso:

```
cd apps/web
npx create-next-app@latest .
# Elige: TypeScript = Yes, App Router = Yes, ESLint/Prettier = Yes
npm run dev
```

- [ ] TODO(human): crear páginas Home, Listado y Detalle siguiendo `docs/tasks.md`.

## Enlaces útiles

- Especificaciones: `technical-specifications.md`
- Contrato de aprendizaje: `docs/learning-contract.md`
- Tareas guiadas: `docs/tasks.md`
- ADR (decisión técnica): `docs/adr/0001-use-strapi-in-mvp.md`

## Notas

- MVP prioriza: catálogo, filtros básicos, detalle, contacto/WhatsApp y gestión de leads. Posponemos comparador, favoritos y chatbot para después.
- El stack del MVP evita un backend Express separado porque Strapi ya cubre API + Admin, reduciendo piezas y complejidad.

