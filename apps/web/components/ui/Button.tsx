'use client'

import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'hero'
  size?: 'default' | 'lg'
}

export function Button({ variant = 'primary', size = 'default', className = '', children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-2xl font-semibold transition-all duration-300 active:scale-[.98] focus:outline-none focus:ring-2 focus:ring-brand/50'
  const variants = {
    primary: 'bg-brand text-white hover:bg-brand-hover',
    ghost: 'border border-border hover:bg-panel text-ink',
    hero: 'bg-white text-black hover:scale-105 hover:shadow-lg',
  }
  const sizes = { default: 'px-4 py-2 text-sm', lg: 'px-8 py-3 text-lg' }

  return <button className={[base, sizes[size], variants[variant], className].join(' ')} {...props}>{children}</button>
}
