import { supabase } from '@/lib/supabase'
import PropertyCardSupabase from '@/components/PropertyCardSupabase'

export const revalidate = 0

export default async function PropertiesPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams
  const mode = typeof params.mode === 'string' ? params.mode : undefined
  
  let query = supabase.from('properties').select('*, property_images(url)').order('created_at', { ascending: false })
  
  if (mode === 'buy') {
    query = query.eq('operation', 'venta')
  } else if (mode === 'rent') {
    query = query.in('operation', ['alquiler', 'alquiler vacacional'])
  }

  const { data: list } = await query

  const heading = mode === 'buy' ? 'Propiedades en Venta' : mode === 'rent' ? 'Propiedades en Alquiler' : 'Todas las propiedades'
  const sub = mode === 'buy'
    ? 'Explora increíbles casas y departamentos para comprar.'
    : mode === 'rent'
      ? 'Encuentra tu próximo hogar o alquiler vacacional.'
      : 'El catálogo completo de GSC Inmobiliaria.'

  return (
    <main className="container mx-auto px-4 pt-28 pb-12 min-h-[60vh]">
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-ink mb-2">{heading}</h1>
        <p className="text-ink/60">{sub}</p>
      </section>

      {list && list.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => (
            <PropertyCardSupabase key={p.id} property={p} />
          ))}
        </div>
      ) : (
         <div className="text-center py-16 bg-white rounded-3xl border border-border">
          <h3 className="text-xl font-bold text-ink mb-2">No se encontraron propiedades</h3>
          <p className="text-ink/60">Aún no hay inmuebles publicados en esta categoría.</p>
        </div>
      )}
    </main>
  )
}
