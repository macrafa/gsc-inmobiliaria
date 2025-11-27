import React from 'react'
import Link from 'next/link'
import { waLink } from '@/lib/wa'
import { siteConfig } from '@/config/site-config'

export default function Footer() {
  const year = new Date().getFullYear()
  const msg = 'Hola, me interesa publicar o consultar propiedades en Margarita.'
  const whatsappHref = waLink(siteConfig.whatsapp.primary, msg)
  return (
    <footer className="border-t border-border bg-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="text-lg font-semibold text-ink">GSC Inmobiliaria</div>
            <p className="mt-2 text-sm text-ink/70">Asesoría inmobiliaria en Margarita. Acompañamiento real, sin complicaciones.</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink">Navegación</h4>
            <ul className="mt-2 space-y-1 text-sm text-ink/70">
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/properties">Propiedades</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink">Recursos</h4>
            <ul className="mt-2 space-y-1 text-sm text-ink/70">
              <li><a href="#">Ayuda</a></li>
              <li><a href="#">Contacto</a></li>
              <li><a href="#">Privacidad</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink">Contáctanos</h4>
            <p className="mt-2 text-sm text-ink/70">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </p>
            <p className="text-sm text-ink/70">contacto@gscasesores.example</p>
          </div>
        </div>

        <div className="mt-8 text-xs text-ink/50">© {year} GSC Asesores Inmobiliarios. Todos los derechos reservados.</div>
      </div>
    </footer>
  )
}

