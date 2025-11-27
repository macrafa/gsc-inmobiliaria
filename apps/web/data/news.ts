export type NewsPost = {
  id: string
  title: string
  date: string // ISO string
  author: string
  img: string
  excerpt: string
  href: string
}

export const news: NewsPost[] = [
  {
    id: 'news-1',
    title: 'Cómo elegir zona en Margarita según tu objetivo (vivienda vs. renta)',
    date: '2025-09-01',
    author: 'Equipo GSC',
    img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1400&auto=format&fit=crop',
    excerpt:
      'Pampatar y Costa Azul dominan la renta turística; Playa El Agua atrae por ticket medio y ocupación estable. Pros y contras de cada zona.',
    href: '#',
  },
  {
    id: 'news-2',
    title: 'Gastos de cierre en Venezuela: guía rápida 2025',
    date: '2025-08-26',
    author: 'Legal GSC',
    img: 'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1400&auto=format&fit=crop',
    excerpt:
      'Registro, notaría, gestoría, condominio al día y verificación de cargas: qué pagar, cuándo y quién asume cada costo.',
    href: '#',
  },
  {
    id: 'news-3',
    title: 'Checklist de due diligence para comprar sin sorpresas',
    date: '2025-08-18',
    author: 'Equipo GSC',
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1400&auto=format&fit=crop',
    excerpt:
      'Documentos del propietario, gravámenes, catastro, servicios y actas de condominio: lo mínimo que revisamos antes de firmar.',
    href: '#',
  },
]

