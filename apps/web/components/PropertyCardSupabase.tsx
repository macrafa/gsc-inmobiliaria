import React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Bed, Bath, MoveDiagonal } from 'lucide-react'

export default function PropertyCardSupabase({ property }: { property: any }) {
  const firstImage = property.property_images?.[0]?.url

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border">
      <Link href={`/imoveis/${property.slug}`}>
        <div className="relative overflow-hidden aspect-[3/4] w-full bg-bg border-b border-border">
          {firstImage ? (
            <img
              src={firstImage}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-panel text-muted text-sm border-b border-border">Sin imagen</div>
          )}
          
          {/* Overlay VENDIDO / ALQUILADO */}
          {property.is_sold && (
            <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
               <span className="bg-red-600/95 text-white font-black tracking-widest px-6 py-2 rounded-xl shadow-2xl -rotate-12 border-2 border-white/20 transform scale-110">
                 {property.operation === 'venta' ? 'VENDIDO' : 'ALQUILADO'}
               </span>
            </div>
          )}

          <div className="absolute top-4 left-4 bg-white/95 text-slate-900 px-3 py-1 text-xs uppercase tracking-wider font-extrabold z-20 rounded-full shadow-sm border border-slate-200">
            {property.operation}
          </div>
          <div className="absolute top-4 right-4 bg-brand text-slate-900 border border-brand/20 px-3 py-1 text-sm font-black shadow-md rounded-full z-20">
            ${property.price.toLocaleString()}
          </div>
        </div>
        <CardContent className="p-5">
          <h3 className="font-bold text-xl mb-1 text-ink line-clamp-1">{property.title}</h3>
          <p className="text-sm text-ink/60 capitalize mb-4 font-medium">{property.type}</p>
          
          <div className="flex items-center gap-4 text-ink/70 text-sm mb-4">
            <span className="flex items-center gap-1.5 font-medium"><Bed size={16} className="text-ink/40" /> {property.bedrooms || 0}</span>
            <span className="flex items-center gap-1.5 font-medium"><Bath size={16} className="text-ink/40" /> {property.bathrooms || 0}</span>
            <span className="flex items-center gap-1.5 font-medium"><MoveDiagonal size={16} className="text-ink/40" /> {property.area_m2 || 0} m²</span>
          </div>

          <div className="w-full text-center rounded-xl bg-panel py-2.5 text-sm font-semibold text-ink group-hover:bg-brand group-hover:text-white transition-colors">
            Ver detalles
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
