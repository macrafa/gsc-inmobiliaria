export type NewsPost = {
  id: string
  title: string
  href: string
  img: string
  date: string
  author: string
  excerpt: string
}

export const news: NewsPost[] = [
  {
    id: '1',
    title: 'El mercado inmobiliario en la Isla de Margarita',
    href: '/blog',
    img: '/hero.avif',
    date: '2024-03-20T00:00:00Z',
    author: 'GSC Asesores',
    excerpt: 'Descubre las nuevas oportunidades de inversión en las zonas más exclusivas de la isla.'
  }
]
