'use client'

import React, { useState } from 'react'
import type { Property } from '@/data/properties'
import { siteConfig } from '@/config/site-config'
import { waLink } from '@/lib/wa'
import { shortZone, toHBFromParts } from '@/lib/msg'
import { cleanTitle } from '@/lib/cleanTitle'
import { Button } from '@/components/ui/Button'

export default function PropertyModal({ p, onClose }: { p: Property; onClose: () => void }) {
  const imgs = (Array.isArray(p.images) && p.images.length ? p.images : [p.coverImage]).filter(Boolean)
  const [idx, setIdx] = useState(0)
  const next = () => setIdx((i) => (i + 1) % imgs.length)
  const prev = () => setIdx((i) => (i - 1 + imgs.length) % imgs.length)

  const zone = shortZone(`${p.city}${p.state ? ' – ' + p.state : ''}`)
  const specParts: string[] = []
  if (typeof p.bedrooms === 'number') specParts.push(`${p.bedrooms} hab${p.bedrooms === 1 ? '' : 's'}`)
  if (typeof p.bathrooms === 'number') specParts.push(`${p.bathrooms} baño${p.bathrooms === 1 ? '' : 's'}`)
  if (typeof p.area_m2 === 'number') specParts.push(`${p.area_m2} m²`)
  const spec = specParts.join(' • ')
  const hbSpec = toHBFromParts(p.bedrooms, p.bathrooms, p.area_m2)
  const message = `Hola, me interesa la propiedad: ${p.title} • ${hbSpec} (${zone}). ¿Sigue disponible?`

  const handleKeys = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
    if (e.key === 'ArrowRight') { e.preventDefault(); next() }
    if (e.key === 'Escape') { e.preventDefault(); onClose() }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
      <div
        className="relative grid w-full max-w-5xl grid-cols-1 gap-6 rounded-3xl bg-white p-4 shadow-2xl md:grid-cols-2 md:p-6"
        tabIndex={0}
        onKeyDown={handleKeys}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          title="Cerrar"
          className="group absolute right-2 top-2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/95 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-brand/70 md:right-3 md:top-3"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="transition group-active:scale-95"><path d="M6 6l12 12M18 6l-12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        {/* Carrusel */}
        <div className="relative overflow-hidden rounded-2xl border border-black/10">
          <img src={imgs[idx]} alt={`Foto ${idx + 1} de ${cleanTitle(p.title)}`} className="h-80 w-full object-cover md:h-full" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/15 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/15 to-transparent" />

          <button
            aria-label="Anterior"
            onClick={prev}
            className="group absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-brand/70 md:h-11 md:w-11"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="transition group-active:scale-95"><path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button
            aria-label="Siguiente"
            onClick={next}
            className="group absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-brand/70 md:h-11 md:w-11"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="transition group-active:scale-95"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
            {imgs.map((_, i) => (
              <button
                key={i}
                aria-label={`Ir a foto ${i + 1}`}
                className={`h-2 w-2 rounded-full ring-1 ring-black/10 ${i === idx ? 'bg-white' : 'bg-white/50'}`}
                onClick={() => setIdx(i)}
              />
            ))}
          </div>
        </div>

        {/* Detalle */}
        <div>
          <h3 className="text-xl font-semibold text-ink">{cleanTitle(p.title)}</h3>
          <p className="mt-1 text-sm text-ink/60">{p.city}{p.state ? `, ${p.state}` : ''}</p>
          <p className="mt-1 text-sm text-ink/60">{spec}</p>
          <p className="mt-4 text-sm text-ink/80">{p.shortDescription || p.description}</p>
          <div className="mt-5 flex gap-2">
            <Button onClick={() => window.open(waLink(siteConfig.whatsapp.primary, message), '_blank')}>WhatsApp</Button>
            <Button variant="ghost" onClick={onClose}>Cerrar</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
