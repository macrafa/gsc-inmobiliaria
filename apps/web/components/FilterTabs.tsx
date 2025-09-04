'use client'

type Tab = { label: string; value: string }

export default function FilterTabs({
tabs,
value,
onChange,
}: { tabs: Tab[]; value: string; onChange: (v: string) => void }) {
return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t) => {
        const active = t.value === value
        return (
          <button
            key={t.value}
            type="button"
            onClick={() => onChange(t.value)}
            aria-pressed={active}
            className={[
              'rounded-md px-4 py-2 text-sm font-semibold transition',
              active
                ? 'bg-ink text-white shadow-sm'
                : 'bg-white text-ink border border-border hover:bg-panel',
            ].join(' ')}
          >
            {t.label}
          </button>
        )
      })}
    </div>
)
}