'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  // State para el comportamiento de scroll
  const [visible, setVisible] = useState(true)
  const [isAtTop, setIsAtTop] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // Determina si el usuario está en la parte superior de la página
      setIsAtTop(currentScrollY < 50)

      // Oculta el header al hacer scroll hacia abajo, lo muestra al subir
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // El header es transparente solo en la página de inicio Y en la parte superior
  const transparent = pathname === '/' && isAtTop

  const headerClass = transparent
    ? 'absolute inset-x-0 top-5 z-50 bg-transparent'
    : 'border-b border-border bg-white'

  // Glass container for the nav pills
  const navContainer = transparent
    ? 'rounded-full bg-white/10 border border-white/20 backdrop-blur-xl shadow-lg px-2 py-2'
    : 'rounded-full bg-white border border-border/80 shadow-sm px-2 py-2'

  // Base pill link (inactive)
  const linkBase = 'rounded-full px-5 py-2 text-base font-semibold transition-colors focus:outline-none'
  
  // Active pill (solid white on home)
  const activeClass = transparent ? 'bg-white text-black shadow-md' : 'bg-panel text-ink'

  const item = (href: string, label: string, isActive?: boolean) => {
    const active = typeof isActive === 'boolean' ? isActive : pathname === href
    const color = transparent
      ? (active ? 'text-black' : 'text-white/95 hover:bg-white/20')
      : (active ? 'text-ink' : 'text-ink hover:bg-panel/80')
    return (
      <Link
        onClick={() => setIsOpen(false)}
        href={href}
        className={[linkBase, active ? activeClass : '', color].join(' ')}
        aria-current={active ? 'page' : undefined}
      >
        {label}
      </Link>
    )
  }

  const NavLinks = () => (
    <>
      {item('/', 'Inicio')}
      {item('/properties?mode=buy', 'Comprar', pathname === '/properties' && (searchParams?.get('mode') === 'buy'))}
      {item('/properties?mode=rent', 'Alquilar', pathname === '/properties' && (searchParams?.get('mode') === 'rent'))}
      {item('/#sell', 'Vender')}
      {item('/blog', 'Blog', pathname.startsWith('/blog'))}
    </>
  )

  return (
    <header
      className={`${headerClass} fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="justify-self-start">
          <Link href="/" className={`${transparent ? 'text-white' : 'text-ink'} font-bold text-xl`}>
            GSC Inmobiliaria
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:block justify-self-center">
          <div className={navContainer}>
            <div className="flex items-center gap-2">
              <NavLinks />
            </div>
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className={transparent ? 'text-white' : 'text-ink'}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="container mx-auto px-4 pb-4">
            <div className="flex flex-col gap-2 rounded-2xl border border-border bg-white p-4 shadow-lg">
              <NavLinks />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
