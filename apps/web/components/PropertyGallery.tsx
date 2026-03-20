'use client'
import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function PropertyGallery({ images }: { images: string[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    })
  }, [emblaApi])

  if (!images || images.length === 0) {
    return <div className="w-full aspect-video bg-bg rounded-3xl flex items-center justify-center text-muted border border-border">Aún no hay fotos</div>
  }

  return (
    <div className="relative max-w-5xl mx-auto group">
      <div className="overflow-hidden rounded-3xl border border-border" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {images.map((url, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0 relative aspect-[3/4] md:aspect-square bg-bg">
              <img src={url} alt={`Foto del inmueble ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
      
      {images.length > 1 && (
        <>
          <button 
            onClick={scrollPrev}
            className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center text-slate-900 border border-slate-200 hover:bg-white md:opacity-0 group-hover:opacity-100 transition-all z-20"
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={scrollNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center text-slate-900 border border-slate-200 hover:bg-white md:opacity-0 group-hover:opacity-100 transition-all z-20"
            aria-label="Siguiente"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-white/10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === selectedIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
                aria-label={`Ir a la foto ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
