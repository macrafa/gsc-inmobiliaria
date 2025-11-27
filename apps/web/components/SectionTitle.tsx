import React from 'react'

export function SectionTitle({
  kicker,
  title,
  right,
  className = '',
}: {
  kicker?: string
  title: string
  right?: React.ReactNode
  className?: string
}) {
  return (
    <div className={['mb-6 flex items-end justify-between', className].join(' ')}>
      <div>
        {kicker && <div className="text-xs font-semibold uppercase tracking-wide text-muted">{kicker}</div>}
        <h2 className="text-4xl font-bold text-ink">{title}</h2>
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  )
}

