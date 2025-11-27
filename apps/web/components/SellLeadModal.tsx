'use client'

import React, { useState } from 'react'
import { waLink } from '@/lib/wa'
import { siteConfig } from '@/config/site-config'
import { Button } from '@/components/ui/Button'

export default function SellLeadModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [zone, setZone] = useState('')
  const [type, setType] = useState('Apartamento')
  const [notes, setNotes] = useState('')

  const makeMsg = () =>
    `Hola, soy ${name || 'propietario'}. Quiero publicar mi propiedad (${type}) en ${
      zone || 'Margarita'
    }. Tel: ${phone || 'N/D'}. Detalles: ${notes || '—'}`

  const send = () => {
    const href = waLink(siteConfig.whatsapp.primary, makeMsg())
    window.open(href, '_blank')
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-5 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Cerrar"
          title="Cerrar"
          className="group absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/90 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-brand/70"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="transition group-active:scale-95"><path d="M6 6l12 12M18 6l-12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <h3 className="text-lg font-semibold text-ink">Enviar datos para evaluación</h3>
        <div className="mt-3 grid grid-cols-1 gap-3">
          <input value={name} onChange={(e)=>setName(e.target.value)} className="rounded-xl border border-black/10 px-3 py-2 text-sm" placeholder="Nombre y apellido" />
          <input value={phone} onChange={(e)=>setPhone(e.target.value)} className="rounded-xl border border-black/10 px-3 py-2 text-sm" placeholder="WhatsApp" type="tel" />
          <input value={zone} onChange={(e)=>setZone(e.target.value)} className="rounded-xl border border-black/10 px-3 py-2 text-sm" placeholder="Zona (Pampatar, Porlamar, La Asunción, etc.)" />
          <select value={type} onChange={(e)=>setType(e.target.value)} className="rounded-xl border border-black/10 px-3 py-2 text-sm">
            <option>Apartamento</option>
            <option>Casa</option>
            <option>Townhouse</option>
            <option>Terreno</option>
            <option>Local comercial</option>
          </select>
          <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} className="rounded-xl border border-black/10 px-3 py-2 text-sm" rows={3} placeholder="Metros, habitaciones, estacionamientos, estado, puntos fuertes" />
          <div className="mt-2 flex gap-2">
            <Button onClick={send}>Enviar por WhatsApp</Button>
            <Button variant="ghost" onClick={onClose}>Cerrar</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

