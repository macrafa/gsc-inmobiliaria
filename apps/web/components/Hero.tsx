'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Poppins } from 'next/font/google'
import { ArrowRight } from 'lucide-react'

const fontPoppins = Poppins({ subsets: ['latin'], weight: ['500'] })

// Imagen local en public; coloca el archivo en apps/web/public/hero.avif
const defaultImage = '/hero.avif'

interface HeroProps {
  onSearch?: () => void;
  imageUrl?: string;
}

export default function Hero({ onSearch, imageUrl = defaultImage }: HeroProps) {

  return (
    <>
    <section className="relative isolate min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {/* Placeholder blur para carga suave del LCP */}
        <Image
          src={imageUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Crect width='10' height='6' fill='%23161616'/%3E%3C/svg%3E"
          className="object-cover object-center"
        />
      </div>

      {/* Capa de overlay para mejorar el contraste del texto sobre la imagen */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20" />

      <div className="relative z-10 container mx-auto px-4 text-center text-white animate-fade-in">
            <h1 className={`${fontPoppins.className} text-4xl md:text-7xl font-bold mb-6`}>
              <span className="block whitespace-nowrap">¿Necesitas dónde vivir?</span>
              <span className="block">Busquemos juntos.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white/90">
              Margarita te espera. Conversemos y hagamos que pase.
            </p>
            <Button
                variant="hero"
                size="lg"
                className="group"
                onClick={() => {
                  const element = document.getElementById('properties');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Ver propiedades
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
    </>
  )
}
