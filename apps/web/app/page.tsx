import { supabase } from '@/lib/supabase'
import PropertyCardSupabase from '@/components/PropertyCardSupabase'
import Hero from '@/components/Hero'

export const revalidate = 0 // Para el MVP, desactivamos ISR/SSG y hacemos SSR asegurando datos frescos

export default async function HomePage() {
  const { data: properties, error } = await supabase
    .from('properties')
    .select('*, property_images(url)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching properties:', error)
  }

  return (
    <main className="min-h-screen">
      <Hero />
      <section id="properties" className="container mx-auto px-4 py-10 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">Inmuebles Disponibles</h2>
          <p className="text-ink/60 max-w-2xl mx-auto">Explora nuestro catálogo de propiedades en la Isla de Margarita.</p>
        </div>
        
        {properties && properties.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.map((p) => (
              <PropertyCardSupabase key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-border">
            <h3 className="text-xl font-bold text-ink mb-2">No hay inmuebles aún</h3>
            <p className="text-ink/60">El administrador no ha publicado ninguna propiedad.</p>
          </div>
        )}
      </section>
    </main>
  )
}
