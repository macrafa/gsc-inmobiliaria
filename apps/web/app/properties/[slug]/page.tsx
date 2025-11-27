import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { properties } from '@/data/properties' // usa rutas relativas si el alias falla
import { cleanTitle } from '@/lib/cleanTitle'
import ImageGallery from '@/components/ImageGallery'
import { siteConfig } from '@/config/site-config'
import { waLink } from '@/lib/wa'
import { toHBFromParts } from '@/lib/msg'

export function generateStaticParams() {
return properties.map((p) => ({ slug: p.slug }))
}

export function generateMetadata(
{ params }: { params: { slug: string } }
): Metadata {
const p = properties.find((x) => x.slug === params.slug)
if (!p) return {}
const title = `${cleanTitle(p.title)} | GSC Inmobiliaria`
const desc = p.shortDescription ?? p.description.slice(0, 140)
const image = p.images?.[0] ?? p.coverImage
return { title, description: desc, openGraph: { title, description: desc, images: image ? [image] : [] } }
}

export default function PropertyDetail({ params }: { params: { slug: string } }) {
const p = properties.find((x) => x.slug === params.slug)
if (!p) return notFound()

const hbSpec = toHBFromParts(p.bedrooms, p.bathrooms, p.area_m2)
const msg = `Hola, me interesa la propiedad: ${p.title}${hbSpec ? ' • ' + hbSpec : ''} (${p.city}). ¿Sigue disponible?`
const phone = p.whatsappPhone || siteConfig.whatsapp.primary
const whatsappHref = waLink(phone, msg)

return (
    <>
      <main className="container mx-auto px-4 py-6">
        <nav className="mb-4 text-sm text-muted" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-ink">Inicio</Link>
            </li>
            <li><span className="px-1 text-muted">/</span></li>
            <li>
              <Link href="/properties" className="hover:text-ink">Propiedades</Link>
            </li>
            <li><span className="px-1 text-muted">/</span></li>
            <li className="text-ink">{cleanTitle(p.title)}</li>
          </ol>
        </nav>

        <h1 className="mb-2 text-2xl font-bold text-ink">{cleanTitle(p.title)}</h1>
        <p className="mb-4 text-muted">
          {p.city}, {p.state} — {p.currency} {p.price.toLocaleString()}
        </p>

        <ImageGallery images={p.images} coverImage={p.coverImage} alt={p.title} />

        <p className="mb-4">{p.description}</p>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-md bg-brand px-4 py-2 font-semibold text-white
hover:bg-brand-hover"
        >
          Contactar por WhatsApp
        </a>
      </main>

      {/* CTA flotante WhatsApp */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand-hover"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.14 1.6 5.94L0 24l6.2-1.62A11.9 11.9 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52ZM12 22a9.9 9.9 0 0 1-5.05-1.39l-.36-.21-3.68.96.98-3.58-.23-.37A9.98 9.98 0 1 1 22 12c0 5.52-4.48 10-10 10Zm5.41-7.59c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.18.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.46-.88-.78-1.48-1.74-1.66-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.5-.17 0-.38-.02-.58-.02s-.53.08-.8.38c-.27.3-1.05 1.03-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.13 3.25 5.17 4.55.72.31 1.28.5 1.72.64.73.23 1.4.2 1.93.12.59-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" fill="currentColor"/></svg>
        WhatsApp
      </a>
    </>
)
}
