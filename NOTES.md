# Project Notes — gsc-inmobiliaria

Last updated: 2025-09-14

## Resumen de la sesión (2025‑09‑14)
- Hero optimizado con `next/image` + blur, overlay accesible y tipografía Poppins 500; título en una línea; imagen local `public/hero.avif`.
- SearchBar más ligera: panel translúcido, ancho md≈62% (centrada), versión móvil bajo el Hero; botón “Buscar” compacto e integrado.
- Home reordenada: Novedades → Resultados → Propiedades (grid 1×/2×/4×, 12 cards) → FAQ → Vendedores (opción C) → CTA final con `public/CTA.avif` y WhatsApp.
- PropertyCard: fotos cuadradas (`aspect-square`), fallback si falla imagen, títulos limpios (sin H/B), specs legibles “habs/baños/m²”.
- Dataset ampliado a 12 propiedades con imágenes válidas; grid muestra 12 en móvil y desktop.
- Detalle/Modal: títulos limpios con `cleanTitle`, galería con fallback; mensajes de WhatsApp usan formato corto H/B (`toHBFromParts`).

## Snapshot
- App web (Next.js) vive en `apps/web` dentro del monorepo.
- Este archivo sirve como punto de corte para retomar trabajo rápidamente.

## Estado actual (resumen del día)
- Hero optimizado: `next/image` con `priority` y blur, overlay gradiente accesible, Poppins 500, título en una línea, copy a la izquierda. Imagen local `apps/web/public/hero.avif`.
- SearchBar: más transparente (frosted), ancho md≈62% y en móvil bajo el Hero; botón “Buscar” compacto y alineado.
- Home (orden): Novedades → Resultados → Propiedades → FAQ → Vendedores → CTA final con `/CTA.avif` y WhatsApp.
- Grid propiedades: 1×/2×/4× (mobile/tablet/desktop), 12 cards siempre visibles.
- Cards: fotos cuadradas (`aspect-square`), fallback si falla la URL; cinta “Vendido”; specs legibles (habs/baños/m²) y títulos sin H/B.
- Mensajería: formato corto H/B solo en WhatsApp; UI usa texto legible.
- Detalle: breadcrumb, galería con fallback y CTA flotante de WhatsApp.

## Estado actual (según conversaciones recientes)
- Cambios locales:
  - Modificado: `apps/web/tsconfig.json`
  - No trackeados: `apps/web/app/properties/page.tsx`, `apps/web/components/ImageGallery.tsx`, `apps/web/lib/`, `apps/web/data/`, `apps/web/design/`.
- Temas técnicos ya tratados:
  - Helper WhatsApp: `waLink(phone, message)` → limpia número y usa `encodeURIComponent`.
  - Seguridad enlaces externos: `target="_blank"` + `rel="noopener noreferrer"`.
  - Flujo de trabajo Git: commits pequeños/atómicos, ramas por feature, push frecuente.
  - “Espejo”/backup: remoto secundario opcional para respaldo.

## Contexto anterior (resumen de sesiones)
- 2025‑08‑30 (planificación): se decidió pausar el modo académico y priorizar un Nano MVP en 72h. Usar un prototipo visual existente como base e integrarlo en Next.js. Se sugirió ignorar la carpeta `apps/web/design/` para no versionar assets de diseño.
- 2025‑08‑31 (Git): dudas sobre “reiniciar” Git. Opciones vistas: re‑inicializar repo (`rm -rf .git && git init ...`) y conectar a remoto vacío; o limpiar historia. Conclusión práctica: como único dev, un flujo simple en `main` es suficiente.
- 2025‑09‑03 (código y flujo): explicación de `waLink`, seguridad con `target="_blank"` + `rel="noopener noreferrer"`, y estado `git` con archivos nuevos en `apps/web` listos para agregar, commitear y pushear.

## Git (flujo simple para 1 dev)
- Trabajar directo en `main` está bien si eres el único dev.
- Ciclo básico:
  - `git add -A`
  - `git commit -m "feat(web): <mensaje claro>"`
  - `git push origin main`
- Ignorar diseño (recomendado): añade `apps/web/design/` al `.gitignore` del repo si no quieres versionar assets de diseño.
- Re‑inicializar (solo si necesitas empezar de cero):
  - `rm -rf .git && git init && git add -A && git commit -m "initial"`
  - `git branch -M main && git remote add origin <url> && git push -u origin main`

## Próximos pasos sugeridos (checklist)
- [ ] Migrar imágenes de cards a `next/image` + `sizes` por breakpoint.
- [ ] Generar `blurDataURL` por imagen (mejor loading).
- [ ] Filtros/orden en Home (precio, recientes) y paginado simple si >12.
- [ ] Revisar `next.config.ts` si no quedan remotas necesarias.
- [ ] Añadir tests mínimos para helpers (`waLink`, `toHBFromParts`).

## Next 3 steps (compacto)
1) `next/image` para cards + `remotePatterns` definitivos.
2) Micro‑filtros en Home y “ordenar por”.
3) Ajuste fino de tipografías secundarias (SectionTitle/FAQ).

## Implementado — Sesión 2025-09-07
- UI base: `apps/web/components/ui/Badge.tsx`, `apps/web/components/ui/Button.tsx` (variants), `apps/web/components/SectionTitle.tsx`.
- SearchBar: `apps/web/components/SearchBar.tsx` e integración en `apps/web/components/Hero.tsx` y `apps/web/app/page.tsx` (scroll al grid).
- Helpers: `apps/web/lib/msg.ts` (`shortZone`, `toHB`, `toHBFromParts`, `isRecentlySold`) y `apps/web/lib/wa.ts`.
- Modales: `apps/web/components/SellLeadModal.tsx` (CTA vender) y `apps/web/components/PropertyModal.tsx` (quick view en grid).
- Secciones Home: Stats `apps/web/components/Stats.tsx`, FAQ `apps/web/components/FAQ.tsx`, Vendedores `apps/web/components/SellSection.tsx`, Novedades `apps/web/components/NewsCard.tsx` + datos en `apps/web/data/news.ts`.
- Blog: ruta `apps/web/app/blog/page.tsx` y botón “Ver todas” enlazado desde Home.
- Hero optimizado: `apps/web/components/Hero.tsx` usando `next/image`, overlay accesible y Poppins 500.
- Footer/Header: `apps/web/components/Footer.tsx` y `apps/web/components/Header.tsx` conectados en `apps/web/app/layout.tsx`.
- Propiedades: listado `apps/web/app/properties/page.tsx`, detalle `apps/web/app/properties/[slug]/page.tsx` con breadcrumb y CTA flotante WhatsApp; galería `apps/web/components/ImageGallery.tsx`.
- Grid/card: 12 cards visibles; `apps/web/components/PropertyCard.tsx` con fotos `aspect-square`, fallback, cinta “Vendido” (<=5 días), tags opcionales y WhatsApp con H/B.
- Limpieza/ignorar: tabs de filtro removidos del Home; `apps/web/.gitignore` incluye `design/`.

## Tareas de código posibles
- Integrar `components/ImageGallery.tsx` en páginas que lo requieran.
- Completar `app/properties/page.tsx` y vistas `[slug]` en `apps/web/app/properties/[slug]/page.tsx`.
- Usar `waLink` donde corresponda (botones de contacto/WhatsApp).

## Comandos útiles
- Revisar y preparar commit:
  - `git status`
  - `git diff tsconfig.json`
  - `git add -p tsconfig.json`
  - `git add app/properties/page.tsx components/ImageGallery.tsx lib data design`
  - `git status && git diff --staged`
  - `git commit -m "feat(web): add property page and gallery; update tsconfig"`
  - `git push origin main`
- Ramas por feature:
  - `git checkout -b feat/galeria`
  - `git push -u origin feat/galeria`
- Remoto de backup (opcional):
  - `git remote add backup <url-del-backup>`
  - `git push backup --all && git push backup --tags`
  - Mirror completo (cuidado): `git push --mirror backup`
- Retomar conversación con Codex:
  - Dentro del repo: `codex --resume`
  - Ver último log: `tail -n 200 "$(ls -t ~/.codex/sessions/*/*/*/rollout-*.jsonl | head -1)"`

## Decisiones y contexto breve
- Enlaces externos deben usar `rel="noopener noreferrer"` por seguridad.
- `waLink` codifica el mensaje y normaliza el número a dígitos.
- Estrategia de commits: granular, mensajes claros, rama por feature cuando aplique.
- Backup opcional empujando a un segundo remoto.

## Cómo usar este archivo
- Actualiza “Estado actual” y “Próximos pasos” al terminar cada sesión.
- Añade dudas abiertas y decisiones tomadas para mantener continuidad.
