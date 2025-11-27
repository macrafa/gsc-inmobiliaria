'use client'

import React, { useState } from 'react'

type FAQItem = { q: string; a: string }

const DEFAULTS: FAQItem[] = [
  { q: '¿Cuál es el proceso y tiempos de compra?', a: '1) Visitas y selección. 2) Oferta y aceptación. 3) (Opcional) Promesa de compra. 4) Due diligence 3–7 días (gravámenes, condominio, catastro). 5) Firma en notaría. 6) Registro 3–15 días hábiles. Te acompañamos en cada paso.' },
  { q: '¿Qué documentos revisan antes de firmar?', a: 'Título de propiedad, cédula/RIF, solvencia de condominio y servicios, ficha catastral, libertad de gravamen/hipoteca, poder (si aplica). Verificamos identidad del propietario y cargas activas.' },
  { q: '¿Cómo se paga? ¿USD/BS/Zelle?', a: 'Usualmente USD (efectivo o transferencia) y/o bolívares al cambio del día. Podemos coordinar escrow/tercero de confianza y dejar condiciones en promesa/contrato.' },
  { q: '¿Cuáles son los gastos de cierre?', a: 'Registro y notaría, timbres fiscales, gestoría, certificaciones y ajuste de condominio/servicios. Definimos qué asume cada parte y te entregamos el cuadro antes de ofertar.' },
  { q: '¿Quiero invertir para renta turística, cómo calculan ROI?', a: 'Usamos comparativos reales de ocupación y tarifa por zona (Pampatar, Costa Azul, Playa El Agua), temporada y costos de operación para estimar retorno.' },
  { q: '¿Honorarios de GSC y confidencialidad?', a: 'Honorarios transparentes, firmados por escrito antes de iniciar. Resguardamos tu información y negociamos buscando el mejor precio/condición para ti.' },
]

export default function FAQ({ items = DEFAULTS }: { items?: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="rounded-3xl border border-border bg-white p-4 shadow-sm md:p-6">
      {items.map((item, i) => (
        <div key={i} className="border-b border-border last:border-none">
          <button
            className="flex w-full items-center justify-between gap-4 py-4 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="text-sm font-medium text-ink md:text-base">{item.q}</span>
            <span className={["text-xl leading-none transition", open === i ? 'rotate-90' : ''].join(' ')}>›</span>
          </button>
          {open === i && <div className="pb-4 text-sm text-ink/70">{item.a}</div>}
        </div>
      ))}
    </div>
  )
}

