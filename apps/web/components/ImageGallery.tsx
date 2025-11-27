'use client'

import { useMemo, useState } from 'react'

type Props = {
images: string[]
coverImage: string
alt: string
}

export default function ImageGallery({ images, coverImage, alt }: Props) {
const sources = useMemo(() => {
    const arr = [coverImage, ...images].filter(Boolean)
    // Unifica por si cover ya está en images
    return Array.from(new Set(arr))
}, [images, coverImage])

const [index, setIndex] = useState(0)
if (sources.length === 0) return null

return (
    <div>
      <div className="mb-3">
        <img
          src={sources[index]}
          alt={alt}
          className="w-full max-h-[380px] rounded-md bg-panel object-contain"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement
            if (img.dataset.fallback === '1') return
            img.dataset.fallback = '1'
            img.src = 'https://images.unsplash.com/photo-1560185008-b033106af2fb?q=80&w=1600&auto=format&fit=crop'
          }}
        />
      </div>

      {sources.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {sources.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ver imagen ${i + 1}`}
              className={`h-20 w-28 flex-shrink-0 overflow-hidden rounded-md border ${
                i === index ? 'border-brand ring-2 ring-brand' : 'border-border'
              } bg-panel`}
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement
                  if (img.dataset.fallback === '1') return
                  img.dataset.fallback = '1'
                  img.src = 'https://images.unsplash.com/photo-1560185008-b033106af2fb?q=80&w=1600&auto=format&fit=crop'
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
)
}
