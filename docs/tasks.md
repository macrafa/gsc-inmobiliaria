# Backlog Semanal (MVP)

Semana 1 — Fundaciones
1) Docker + Strapi + Postgres corriendo
   - [ ] TODO(human): `cp .env.example .env` y `docker compose up -d`
   - [ ] TODO(human): Crear usuario admin Strapi en `http://localhost:1337`
2) Modelado en Strapi
   - [ ] TODO(human): Colección `Property` con campos mínimos:
        title, description, property_type(enum), operation(enum), price(decimal), currency, bedrooms, bathrooms, area_m2, city, state, latitude, longitude, status(enum), featured(boolean)
   - [ ] TODO(human): Colección `PropertyImage` (relación many-to-one con Property), campos: image (media), alt_text, is_primary, order_index
   - [ ] TODO(human): Colección `Lead` con: name, email, phone, message, property (relación opcional), source, status(enum)
   - [ ] TODO(human): Definir enums (tipos y operaciones) según el spec
3) Cloudinary
   - [ ] TODO(human): Crear cuenta y obtener `CLOUDINARY_*`
   - [ ] TODO(human): Instalar plugin Cloudinary en Strapi (GUI) y configurarlo
4) API pública
   - [ ] TODO(human): Habilitar permisos públicos para `find` y `findOne` en `Property`

Semana 2 — Web pública (Next.js)
1) Scaffold
   - [ ] TODO(human): `cd apps/web && npx create-next-app@latest . && npm run dev`
2) Páginas
   - [ ] TODO(human): Home con buscador básico
   - [ ] TODO(human): Listado `/properties` con filtros en URL (type, op, price range, city)
   - [ ] TODO(human): Detalle `/properties/[id]` con galería y botón WhatsApp
3) Datos
   - [ ] TODO(human): Consumir API de Strapi (`/api/properties`)
   - [ ] TODO(human): Configurar ISR/SSG en listado y detalle

Semana 3 — Leads y UX
1) Formulario contacto
   - [ ] TODO(human): Form con validación (zod/yup), POST a `/api/leads`
   - [ ] TODO(human): Confirmación visual + envío al dashboard de Strapi
2) Mapa en detalle
   - [ ] TODO(human): Google Maps con marker de la propiedad
3) Responsive y accesibilidad
   - [ ] TODO(human): Revisar con Lighthouse y axe DevTools

Semana 4 — Pulido y Deploy
1) SEO
   - [ ] TODO(human): Metadatos, OG tags, sitemap, robots
2) Rendimiento
   - [ ] TODO(human): Optimización de imágenes (Cloudinary), lazy load, WebP
3) Seguridad
   - [ ] TODO(human): Rate limiting en formularios, sanitización inputs
4) Deploy
   - [ ] TODO(human): Vercel (web) y Render/Railway (Strapi + DB)

Notas de aprendizaje
- Relaciona cada tarea con tus materias (ver `docs/learning-contract.md`).
- Cada checkbox debería tomarte 15–45 minutos.

