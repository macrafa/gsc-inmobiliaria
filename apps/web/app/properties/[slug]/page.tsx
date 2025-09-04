import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { properties } from '@/data/properties' // usa rutas relativas si el alias falla
import ImageGallery from '@/components/ImageGallery'
import { siteConfig } from '@/config/site-config'
import { waLink } from '@/lib/wa'

export function generateStaticParams() {
return properties.map((p) => ({ slug: p.slug }))
}

export function generateMetadata(
{ params }: { params: { slug: string } }
): Metadata {
const p = properties.find((x) => x.slug === params.slug)
if (!p) return {}
const title = `${p.title} | GSC Inmobiliaria`
const desc = p.shortDescription ?? p.description.slice(0, 140)
const image = p.images?.[0] ?? p.coverImage
return { title, description: desc, openGraph: { title, description: desc, images: image ? [image] : [] } }
}

export default function PropertyDetail({ params }: { params: { slug: string } }) {
const p = properties.find((x) => x.slug === params.slug)
if (!p) return notFound()

const msg = `Hola, me interesa la propiedad: ${p.title} (${p.city}). ¿Sigue disponible?`
const phone = p.whatsappPhone || siteConfig.whatsapp.primary

return (
    <main className="container mx-auto px-4 py-6">
      <Link href="/" className="mb-4 inline-flex items-center text-brand hover:text-brand-hover">
        &larr; Volver
      </Link>

      <h1 className="mb-2 text-2xl font-bold text-ink">{p.title}</h1>
      <p className="mb-4 text-muted">
        {p.city}, {p.state} — {p.currency} {p.price.toLocaleString()}
      </p>

      <ImageGallery images={p.images} coverImage={p.coverImage} alt={p.title} />

      <p className="mb-4">{p.description}</p>

      <a
        href={waLink(phone, msg)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center rounded-md bg-brand px-4 py-2 font-semibold text-white
hover:bg-brand-hover"
      >
        Contactar por WhatsApp
      </a>
    </main>
)
}