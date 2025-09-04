import Link from 'next/link'
import type { Property } from '@/data/properties'
import { formatPrice } from '@/lib/formatPrice'
import { IconArea, IconBath, IconBed, IconBudget, IconFloors } from '@/components/icons'

function Stat({ icon, value, label }: { icon: React.ReactNode; value: React.ReactNode; label: string }) {
return (
    <div className="rounded border border-white/10 bg-white/5 p-2 text-center">
      <div className="mb-1 flex items-center justify-center gap-1 text-white/90">
        {icon} <span className="text-[12px] font-semibold">{value}</span>
      </div>
      <div className="text-[10px] text-white/70">{label}</div>
    </div>
)
}

export function PropertyCard({ p }: { p: Property }) {
return (
    <article className="group overflow-hidden rounded-lg border border-border bg-white shadow-sm transition
hover:shadow-md">
      <div className="relative aspect-[16/10] overflow-hidden bg-panel">
        <img
          src={p.coverImage}
          alt={p.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
        />
        {/* Badge opcional */}
        {/* <span className="absolute left-2 top-2 rounded bg-white/90 px-2 py-0.5 text-[11px] font-semibold
text-ink">GLOBAL</span> */}
      </div>

      <div className="bg-ink p-4 text-white">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div>
            <h3 className="text-[16px] font-semibold leading-tight">{p.title}</h3>
            <p className="mt-1 text-xs text-white/80">📍 {p.city}, {p.state}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-white/70">Package</p>
            <p className="rounded bg-brand px-1.5 py-0.5 text-[11px] font-bold text-white">Prime+</p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2">
          <Stat icon={<IconFloors className="text-white/85" />} value="G+2" label="Floors" />
          <Stat icon={<IconBed className="text-white/85" />} value={p.bedrooms ?? '-'} label="Beds" />
          <Stat icon={<IconBath className="text-white/85" />} value={p.bathrooms ?? '-'} label="Baths" />
          <Stat icon={<IconArea className="text-white/85" />} value={p.area_m2 ?? '-'} label="Total Area" />
          <Stat icon={<IconBudget className="text-white/85" />} value={formatPrice(p.price, p.currency)}
label="Budget" />
        </div>

        <div className="mt-3 flex gap-2">
          <Link
            href={`/properties/${p.slug}`}
            className="flex-1 rounded-md bg-[#2A2B2B] px-3 py-2 text-center text-sm font-semibold text-white
hover:bg-[#323333]"
          >
            View Project Images
          </Link>
          <Link
            href={`/properties/${p.slug}`}
            className="flex-1 rounded-md bg-brand px-3 py-2 text-center text-sm font-semibold text-white
hover:bg-brand-hover"
          >
            Get Project Details
          </Link>
        </div>
      </div>
    </article>
)
}