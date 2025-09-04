import { type ComponentProps } from 'react'

type SvgProps = ComponentProps<'svg'>

export function IconFloors(props: SvgProps) {
return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <rect x="3" y="5" width="18" height="4" rx="1" />
      <rect x="3" y="10" width="18" height="4" rx="1" />
      <rect x="3" y="15" width="18" height="4" rx="1" />
    </svg>
)
}

export function IconBed(props: SvgProps) {
return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M3 11h18a2 2 0 0 1 2 2v3H1v-3a2 2 0 0 1 2-2Z" />
      <rect x="3" y="7" width="9" height="3" rx="1" />
    </svg>
)
}

export function IconBath(props: SvgProps) {
return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M5 10h14v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-5Z" />
      <rect x="6" y="6" width="4" height="3" rx="1" />
    </svg>
)
}

export function IconArea(props: SvgProps) {
return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <rect x="5" y="5" width="14" height="14" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="2" />
    </svg>
)
}

export function IconBudget(props: SvgProps) {
return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M3 7h18v10H3z" />
      <circle cx="12" cy="12" r="3" fill="white" />
    </svg>
)
}