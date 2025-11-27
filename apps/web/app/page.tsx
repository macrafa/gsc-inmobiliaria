'use client'
import { useState, useMemo } from 'react'
import { properties } from '@/data/properties'
import { PropertyCard } from '@/components/PropertyCard'
import { SectionTitle } from '@/components/SectionTitle'
import Hero from '@/components/Hero' // Importa SearchBar y sus tipos
import SearchBar, { type SearchValues } from '@/components/SearchBar'
import SellLeadModal from '@/components/SellLeadModal'
import PropertyModal from '@/components/PropertyModal'
import type { Property } from '@/data/properties'
import FAQ from '@/components/FAQ'
import Stats from '@/components/Stats'
import SellSection from '@/components/SellSection'
import NewsCard from '@/components/NewsCard'
import { news } from '@/data/news'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { waLink } from '@/lib/wa'
import { siteConfig } from '@/config/site-config'
import { Search } from 'lucide-react'

export default function HomePage() {
  const [sellOpen, setSellOpen] = useState(false)
  const [selected, setSelected] = useState<Property | null>(null)
  const [searchFilters, setSearchFilters] = useState<SearchValues | undefined>(undefined)

  // Optimizado con useMemo para evitar recalcular en cada render
  const filteredProperties = useMemo(() => {
    if (!searchFilters) {
      return properties.slice(0, 12)
    }

    const { mode, price, zone, rooms } = searchFilters

    const filtered = properties.filter(p => {
      // Filtro por modo (Comprar/Alquilar)
      let matchMode = true
      if (mode === 'Comprar') {
        matchMode = p.operation === 'sale'
      } else if (mode === 'Alquilar') {
        matchMode = p.operation === 'rent'
      }

      // Filtro por precio
      const priceRange = {
        'Cualquiera': true,
        '$0–$250k': p.price <= 250000,
        '$250k–$500k': p.price > 250000 && p.price <= 500000,
        '$500k–$1M': p.price > 500000 && p.price <= 1000000,
        '$1M+': p.price > 1000000,
      }
      const matchPrice = priceRange[price as keyof typeof priceRange] ?? true

      // Filtro por zona
      const matchZone = zone === 'Toda Margarita' || zone === 'Todas' || p.city.includes(zone) || p.state?.includes(zone)

      // Filtro por habitaciones
      const minRooms = parseInt(rooms.replace('+', ''), 10)
      const matchRooms = p.bedrooms >= minRooms

      return matchMode && matchPrice && matchZone && matchRooms
    })

    return filtered.slice(0, 12)
  }, [searchFilters])

  const handleSearch = (values: SearchValues | undefined) => {
    setSearchFilters(values)
  }

return (
    <main className="min-h-screen">
      <Hero />

      <section className="container mx-auto px-4 py-8 space-y-12">
        {/* 1) Propiedades destacadas con filtros */}
        <div id="properties" className="animate-fade-in text-center">
          <SectionTitle title="Todas las propiedades" className="justify-center" />
          <p className="mb-8 text-muted">Explora nuestra completa colección de propiedades en el Caribe.</p>
          {/* La SearchBar ahora vive aquí */}
          <div className="mb-8 animate-slide-up-delay"><SearchBar onSearch={handleSearch} /></div>
          
          {filteredProperties.length > 0 ? (
            <div id="properties-grid" className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 animate-slide-up">
              {filteredProperties.map((p) => (
                <PropertyCard key={p.id} p={p} onQuickView={setSelected} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/30 mb-4">
                <Search className="text-muted" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-ink mb-2">No se encontraron propiedades</h3>
              <p className="text-muted max-w-md mx-auto mb-6">
                No hay propiedades que coincidan con tus criterios de búsqueda. Intenta ajustar los filtros para ver más resultados.
              </p>
              <Button variant="ghost" onClick={() => handleSearch(undefined)}>
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>

        {/* 2) Novedades */}
        <div id="news">
          <SectionTitle
            kicker="Novedades"
            title="Lo último del mercado en Margarita"
            right={<Link href="/blog" className="rounded-2xl border border-border px-4 py-2 text-sm font-semibold text-ink hover:bg-panel">Ver todas</Link>}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {news.slice(0, 3).map((post) => <NewsCard key={post.id} post={post} />)}
          </div>
        </div>

        {/* 3) Resultados (Stats) */}
        <div id="stats">
          <SectionTitle kicker="Resultados" title="Nuestra experiencia en números" />
          <Stats />
        </div>

        {/* 4) FAQ */}
        <div id="faq">
          <SectionTitle kicker="FAQ" title="Preguntas frecuentes" />
          <FAQ />
        </div>

        {/* 5) Vendedores */}
        <div id="sell">
          <SectionTitle kicker="Vendedores" title="¿Quieres vender en Margarita?" />
          <SellSection onOpenLead={() => setSellOpen(true)} />
        </div>
      </section>
      {sellOpen && <SellLeadModal onClose={() => setSellOpen(false)} />}
      {selected && <PropertyModal p={selected} onClose={() => setSelected(null)} />}
    </main>
)
}
