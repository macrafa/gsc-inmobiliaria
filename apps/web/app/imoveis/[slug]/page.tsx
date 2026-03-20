import { supabase } from '@/lib/supabase'
import PropertyGallery from '@/components/PropertyGallery'
import { notFound } from 'next/navigation'
import { MessageCircle, Bed, Bath, MoveDiagonal } from 'lucide-react'
import { siteConfig } from '@/config/site-config'
import ViewTracker from '@/components/ViewTracker'

// Next.js 15: params are a Promise
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data: property } = await supabase
    .from('properties')
    .select('title, type, operation, property_images(url)')
    .eq('slug', slug)
    .single()

  if (!property) return { title: 'Inmueble no encontrado' }
  const firstImage = property.property_images?.[0]?.url

  return {
    title: `${property.title} | GSC Inmobiliaria`,
    description: `Excelente ${property.type} en ${property.operation} en la Isla de Margarita.`,
    openGraph: {
      images: firstImage ? [firstImage] : []
    }
  }
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data: property } = await supabase
    .from('properties')
    .select('*, property_images(url)')
    .eq('slug', slug)
    .single()

  if (!property) return notFound()

  const images = property.property_images?.map((img: any) => img.url) || []
  const whatsappNumber = siteConfig.whatsapp.primary
  const message = encodeURIComponent(`Hola Gustavo, estoy interesado(a) en el inmueble "${property.title}" que vi en el catálogo web. ¿Me podrías brindar más información?`)
  
  return (
    <div className="container mx-auto px-4 pt-28 pb-32">
      <ViewTracker propertyId={property.id} />
      
      {property.is_sold && (
        <div className="max-w-3xl mx-auto bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-3xl mb-8 font-semibold flex items-center justify-center shadow-sm text-center">
          ¡Aviso! Este inmueble ya ha sido {property.operation === 'venta' ? 'vendido' : 'alquilado'} y actualmente no está disponible.
        </div>
      )}

      <PropertyGallery images={images} />
      
      <div className="mt-8 max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-3xl border border-border shadow-sm">
        <div className="flex flex-wrap gap-2 text-sm font-semibold mb-4 uppercase tracking-wide">
          <span className="bg-brand/10 text-brand px-3 py-1 rounded-full">{property.type}</span>
          <span className="bg-panel text-slate-900 px-3 py-1 rounded-full border border-border">{property.operation}</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-ink">{property.title}</h1>
        <p className="text-3xl font-bold mb-8 text-brand">${property.price.toLocaleString()}</p>
        
        <div className="flex flex-wrap items-center gap-6 py-5 border-y border-border mb-8">
          <div className="flex items-center gap-2 text-ink/80">
            <Bed className="text-ink/40 w-5 h-5" />
            <span className="font-semibold text-lg">{property.bedrooms || 0}</span>
            <span className="text-sm hidden sm:inline">Habitaciones</span>
          </div>
          <div className="flex items-center gap-2 text-ink/80">
            <Bath className="text-ink/40 w-5 h-5" />
            <span className="font-semibold text-lg">{property.bathrooms || 0}</span>
            <span className="text-sm hidden sm:inline">Baños</span>
          </div>
          <div className="flex items-center gap-2 text-ink/80">
            <MoveDiagonal className="text-ink/40 w-5 h-5" />
            <span className="font-semibold text-lg">{property.area_m2 || 0}</span>
            <span className="text-sm hidden sm:inline">m²</span>
          </div>
        </div>
        
        <div className="prose prose-lg max-w-none text-ink/80 whitespace-pre-wrap leading-relaxed">
          {property.description}
        </div>
      </div>
      
      {/* Floating Action Button for WhatsApp */}
      <a 
        href={`https://wa.me/${whatsappNumber}?text=${message}`}
        target="_blank"
        rel="noreferrer"
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 text-white px-5 py-4 rounded-full shadow-xl transition-all flex items-center gap-3 z-50 ${property.is_sold ? 'bg-ink/50 hover:bg-ink' : 'bg-[#25D366] hover:scale-105 hover:shadow-2xl hover:shadow-[#25D366]/20'}`}
      >
        <MessageCircle className="w-6 h-6" />
        <span className="font-semibold hidden sm:inline pr-2 tracking-wide">
          {property.is_sold ? 'Consultar similares' : 'Contactar por WhatsApp'}
        </span>
      </a>
    </div>
  )
}
