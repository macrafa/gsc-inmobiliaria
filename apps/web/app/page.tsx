'use client'
import { useState } from 'react'
import { properties } from '@/data/properties'
import { PropertyCard } from '@/components/PropertyCard'
import FilterTabs from '@/components/FilterTabs'

const TABS = [
{ label: 'Apartamentos', value: 'apartment' },
{ label: 'Casas', value: 'house' },
{ label: 'Terrenos', value: 'land' },
{ label: 'Comercial', value: 'commercial' },
]

export default function HomePage() {
const [tab, setTab] = useState('apartment')
const filtered = properties.filter(p => p.type === tab)

return (
    <main className="min-h-screen">
      <section className="relative bg-bg">
        {/* Degradado suave opcional (puedes quitar este div si no te gusta) */}
        <div className="pointer-events-none absolute inset-0
bg-[radial-gradient(1200px_600px_at_20%_20%,rgba(255,255,255,0.9),transparent),radial-gradient(1200px_600px_at_80%_80%,rgba(255,255,255,0.85),transparent)]" /
>
        <div className="relative container mx-auto px-4 py-8">
          <h2 className="mb-2 text-3xl font-bold text-ink">Nuestros Proyectos Exclusivos</h2>
          <p className="mb-6 text-muted">Más de 50 propiedades disponibles en Margarita, Venezuela.</p>

          <FilterTabs tabs={TABS} value={tab} onChange={setTab} />

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {(filtered.length ? filtered : properties).slice(0, 9).map((p) => (
              <PropertyCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>
    </main>
)
}