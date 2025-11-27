export function shortZone(loc: string = ''): string {
  if (!loc) return 'Margarita'
  let first = loc.split('–')[0]
  first = first.split('-')[0]
  first = first.split(',')[0]
  return (first || 'Margarita').trim()
}

// Convierte una cadena de facts como "3 habs • 2 baños • 115 m²" a "3H/2B • 115 m²"
export function toHB(facts: string = ''): string {
  const parts = facts.split('•').map((s) => s.trim())
  const digits = (s: string) => {
    let out = ''
    for (const c of s) if (c >= '0' && c <= '9') out += c
    return out
  }
  let h = '', b = '', m = ''
  for (const p of parts) {
    const pl = p.toLowerCase()
    if (pl.includes('hab')) h = digits(p)
    else if (pl.includes('bañ')) b = digits(p)
    else if (pl.includes('m²')) m = digits(p)
  }
  const res: string[] = []
  if (h || b) res.push(`${h || '?'}H/${b || '?'}B`)
  if (m) res.push(`${m} m²`)
  return res.join(' • ')
}

// A partir de números sueltos (habitaciones, baños, m²) genera "3H/2B • 115 m²"
export function toHBFromParts(
  bedrooms?: number,
  bathrooms?: number,
  area_m2?: number
): string {
  const res: string[] = []
  const hb = `${typeof bedrooms === 'number' ? bedrooms : '?'}H/${
    typeof bathrooms === 'number' ? bathrooms : '?'
  }B`
  res.push(hb)
  if (typeof area_m2 === 'number') res.push(`${area_m2} m²`)
  return res.join(' • ')
}

// Utilidades de fecha y estado de venta
export function daysDiff(from: string | Date): number {
  const now = new Date()
  const d = new Date(from)
  return (Number(now) - Number(d)) / (1000 * 60 * 60 * 24)
}

export function isRecentlySold(soldAt?: string): boolean {
  if (!soldAt) return false
  return daysDiff(soldAt) <= 5
}
