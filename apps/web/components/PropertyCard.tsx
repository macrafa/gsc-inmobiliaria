'use client'
import type { Property } from '@/data/properties'
import { formatPrice } from '@/lib/formatPrice'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { isRecentlySold, shortZone, toHBFromParts } from '@/lib/msg'
import { waLink } from '@/lib/wa'
import { siteConfig } from '@/config/site-config'
import Link from 'next/link'
import { cleanTitle } from '@/lib/cleanTitle'
import { Bed, Bath, Square, MapPin } from 'lucide-react'

export function PropertyCard({ p, onQuickView }: { p: Property; onQuickView?: (p: Property) => void }) {
  const price = formatPrice(p.price, p.currency)
  const location = `${p.city}${p.state ? ' – ' + p.state : ''}`
  const factsParts: string[] = []
  if (typeof p.bedrooms === 'number') factsParts.push(`${p.bedrooms} hab${p.bedrooms === 1 ? '' : 's'}`)
  if (typeof p.bathrooms === 'number') factsParts.push(`${p.bathrooms} baño${p.bathrooms === 1 ? '' : 's'}`)
  if (typeof p.area_m2 === 'number') factsParts.push(`${p.area_m2} m²`)
  const facts = factsParts.join(' • ')
  const hbSpec = toHBFromParts(p.bedrooms, p.bathrooms, p.area_m2)
  const message = `Hola, me interesa la propiedad: ${p.title} • ${hbSpec} (${shortZone(location)}). ¿Sigue disponible?`
  const whatsappHref = waLink(siteConfig.whatsapp.primary, message)

  const clickable = Boolean(onQuickView)
  const handleKey = (e: any) => {
    if (!clickable) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onQuickView?.(p)
    }
  }

  return (
    <Card 
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : -1}
      onKeyDown={handleKey}
      onClick={() => clickable && onQuickView?.(p)}
      className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative overflow-hidden h-64">
        <img
          src={p.coverImage}
          alt={cleanTitle(p.title)}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement
            if (img.dataset.fallback === '1') return
            img.dataset.fallback = '1'
            img.src = 'https://images.unsplash.com/photo-1560185008-b033106af2fb?q=80&w=1600&auto=format&fit=crop'
          }}
        />
        {isRecentlySold(p.soldAt) && (
          <Badge className="absolute top-4 left-4 bg-red-600 border-red-600">
            Vendido
          </Badge>
        )}
        {p.tag && !isRecentlySold(p.soldAt) && (
          <Badge variant="secondary" className="absolute top-4 left-4">
            {p.tag}
          </Badge>
        )}
        <Badge variant="secondary" className="absolute top-4 right-4">
          {price}
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="font-semibold text-xl mb-2 text-ink">{cleanTitle(p.title)}</h3>
        <div className="flex items-center gap-2 text-muted mb-4">
          <MapPin size={16} />
          <span className="text-sm">{location}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted mb-4">
          {typeof p.bedrooms === 'number' && (
            <div className="flex items-center gap-1">
              <Bed size={16} />
              <span>{p.bedrooms} {p.bedrooms === 1 ? 'Hab' : 'Habs'}</span>
            </div>
          )}
          {typeof p.bathrooms === 'number' && (
            <div className="flex items-center gap-1">
              <Bath size={16} />
              <span>{p.bathrooms} {p.bathrooms === 1 ? 'Baño' : 'Baños'}</span>
            </div>
          )}
          {typeof p.area_m2 === 'number' && (
            <div className="flex items-center gap-1">
              <Square size={16} />
              <span>{p.area_m2} m²</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {onQuickView ? (
            <Button variant="ghost" className="px-3 py-1 text-xs" onClick={(e) => { e.stopPropagation(); onQuickView(p) }}>Detalles</Button>
          ) : (
            <Link
              href={`/properties/${p.slug}`}
              className="rounded-2xl border border-border px-3 py-1 text-xs font-semibold text-ink hover:bg-panel"
            >
              Detalles
            </Link>
          )}
          <Button className="px-3 py-1 text-xs" onClick={(e) => { e.stopPropagation(); window.open(whatsappHref, '_blank') }}>WhatsApp</Button>
        </div>
      </CardContent>
    </Card>
  )
}
