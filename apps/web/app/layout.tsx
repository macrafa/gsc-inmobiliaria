import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { waLink } from '@/lib/wa'
import { siteConfig } from '@/config/site-config'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
title: 'GSC Inmobiliaria',
description: 'Catálogo de propiedades en Margarita.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
const headerMsg = 'Hola, me interesa publicar o consultar propiedades en Margarita.'
const whatsappHref = waLink(siteConfig.whatsapp.primary, headerMsg)
return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-bg text-ink antialiased">
        <header className="border-b border-border bg-white">
          <nav className="container mx-auto flex h-14 items-center justify-between px-4">
            <span className="font-bold text-ink">GSC Inmobiliaria</span>
            <a 
              href={whatsappHref}
              target='_blank'
              rel="noopener noreferrer"
              className="rounded-md bg-brand px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-hover"
            >
              WhatsApp
            </a>
          </nav>
        </header>
        {children}
      </body>
    </html>
)
}