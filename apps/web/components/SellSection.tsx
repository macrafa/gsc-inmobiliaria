'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { waLink } from '@/lib/wa'
import { siteConfig } from '@/config/site-config'

export default function SellSection({ onOpenLead }: { onOpenLead?: () => void }) {
  const openLead = () => {
    if (onOpenLead) return onOpenLead()
    const msg = 'Hola, soy propietario y quiero una evaluación profesional de mi propiedad en Margarita. ¿Pueden ayudarme?'
    const href = waLink(siteConfig.whatsapp.primary, msg)
    window.open(href, '_blank')
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="rounded-3xl border border-border bg-white p-6 shadow-sm md:p-7">
        <h3 className="text-base font-semibold text-ink">Evaluación profesional</h3>
        <ul className="mt-2 space-y-2 text-sm text-ink/80">
          <li>• Valoración en 24h con comparativos reales por zona.</li>
          <li>• Acompañamiento legal hasta el registro.</li>
        </ul>
        <div className="mt-5">
          <Button onClick={openLead}>Evaluación profesional</Button>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-white p-6 shadow-sm md:p-7">
        <h3 className="text-base font-semibold text-ink">Publica tu propiedad</h3>
        <ul className="mt-2 space-y-2 text-sm text-ink/80">
          <li>• Fotos y video profesionales incluidos.</li>
          <li>• Publicación en portales y redes.</li>
        </ul>
        <div className="mt-5">
          <Button variant="ghost" onClick={openLead}>Publicar ahora</Button>
        </div>
      </div>
    </div>
  )
}
