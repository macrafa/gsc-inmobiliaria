import React from 'react'
import { news } from '@/data/news'
import NewsCard from '@/components/NewsCard'
import { SectionTitle } from '@/components/SectionTitle'

export default function BlogPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <SectionTitle kicker="Novedades" title="Blog y actualizaciones" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {news.map((post) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  )
}

