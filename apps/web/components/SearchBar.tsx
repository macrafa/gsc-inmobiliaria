'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'

export type SearchValues = {
  mode: string
  price: string
  zone: string
  rooms: string
}

export default function SearchBar({ onSearch, title }: { onSearch?: (values?: SearchValues) => void; title?: string }) {
  const [mode, setMode] = useState('Comprar')
  const [price, setPrice] = useState('Cualquiera')
  const [zone, setZone] = useState('Toda Margarita')
  const [rooms, setRooms] = useState('3+')

  const runSearch = () => onSearch?.({ mode, price, zone, rooms })

  return (
    <div className="w-full md:w-[62%] mx-auto rounded-[28px] border border-white/30 bg-white/50 p-3 shadow-xl shadow-black/20 backdrop-blur-md md:p-4">
      {title && (
        <div className="mb-3 md:mb-4">
          <h3 className="text-lg font-semibold text-ink text-center md:text-left">{title}</h3>
        </div>
      )}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-5">
        <Field label="Estoy buscando">
          <Select value={mode} onChange={setMode} options={["Comprar", "Alquilar", "Comercial"]} />
        </Field>
        <Field label="Precio">
          <Select value={price} onChange={setPrice} options={["Cualquiera", "$0–$250k", "$250k–$500k", "$500k–$1M", "$1M+"]} />
        </Field>
        <Field label="Zona">
          <Select value={zone} onChange={setZone} options={["Todas", "Pampatar", "Porlamar", "Playa El Agua", "La Asunción", "Costa Azul", "Los Robles"]} />
        </Field>
        <Field label="Habitaciones">
          <Select value={rooms} onChange={setRooms} options={["1+", "2+", "3+", "4+"]} />
        </Field>
        <div className="flex items-end md:col-span-1 w-full md:justify-center">
          <Button className="w-full md:w-[80%] rounded-xl px-3 py-1.5 text-[15px] leading-6" onClick={runSearch}>
            Buscar
          </Button>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-1">
      <span className="text-[11px] font-medium text-black/70 text-center">{label}</span>
      <div className="relative">
        {children}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-black/40">▾</span>
      </div>
    </label>
  )
}

function Select({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none rounded-xl border border-white/30 bg-white/90 px-3 py-1.5 text-sm/6 text-black shadow-inner outline-none focus:ring-2 focus:ring-brand/50"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  )
}
