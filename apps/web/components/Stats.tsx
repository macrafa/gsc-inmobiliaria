import React from 'react'

export type StatItem = { value: string; label: string }

export default function Stats({ items }: { items?: StatItem[] }) {
  const data =
    items || [
      { value: '100%', label: 'Clientes satisfechos' },
      { value: '500+', label: 'Propiedades vendidas' },
      { value: '20+', label: 'Urbanizaciones en cobertura' },
      { value: '2.000+', label: 'Reseñas verificadas' },
    ]
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {data.map((s) => (
        <div key={s.label} className="rounded-2xl border border-border bg-white p-3 text-center shadow-sm">
          <div className="text-xl font-bold text-ink">{s.value}</div>
          <div className="mt-1 text-xs text-ink/70">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

