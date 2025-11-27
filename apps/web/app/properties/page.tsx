import { properties } from '@/data/properties'
import { PropertyCard } from '@/components/PropertyCard'

export default function PropertiesPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const mode = typeof searchParams?.mode === 'string' ? searchParams?.mode : undefined
  const list = properties.filter((p) => {
    if (mode === 'buy') return p.operation === 'sale'
    if (mode === 'rent') return p.operation === 'rent'
    return true
  })
  const heading = mode === 'buy' ? 'Propiedades en venta' : mode === 'rent' ? 'Propiedades en alquiler' : 'Propiedades'
  const sub = mode === 'buy'
    ? 'Explora oportunidades para comprar en Margarita.'
    : mode === 'rent'
      ? 'Encuentra propiedades en alquiler en Margarita.'
      : 'Más de 50 propiedades disponibles en Margarita, Venezuela.'
  return (
    <main className="container mx-auto px-4 py-6">
      <section className="mb-6">
        <h1 className="text-2xl font-bold text-ink">{heading}</h1>
        <p className="text-muted">{sub}</p>
      </section>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => (
          <PropertyCard key={p.id} p={p} />
        ))}
      </div>
    </main>
  )
}
