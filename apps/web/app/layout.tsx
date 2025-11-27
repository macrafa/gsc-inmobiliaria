import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
title: 'GSC Inmobiliaria',
description: 'Catálogo de propiedades en Margarita.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-bg text-ink antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
)
}
