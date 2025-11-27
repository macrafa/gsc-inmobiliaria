'use client'

import React from 'react'

type BadgeProps = {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'secondary'
}

export function Badge({ children, className = '', variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'border-white/20 bg-white/10 text-white backdrop-blur',
    secondary: 'border-border bg-panel text-ink',
  }
  
  return (
    <span className={[
      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
      variants[variant],
      className,
    ].join(' ')}>
      {children}
    </span>
  )
}

