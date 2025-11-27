import React from 'react'
import type { NewsPost } from '@/data/news'

export default function NewsCard({ post }: { post: NewsPost }) {
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <article className="group rounded-3xl border border-border bg-white p-4 shadow-sm transition hover:shadow-md">
      <a href={post.href} className="block overflow-hidden rounded-2xl" aria-label={post.title}>
        <img src={post.img} alt="" className="h-36 w-full object-cover transition group-hover:scale-[1.02]" />
      </a>
      <div className="mt-3 flex items-center gap-2 text-xs text-ink/60">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>· {post.author}</span>
      </div>
      <h3 className="mt-1 text-base font-semibold leading-snug text-ink">
        <a href={post.href} className="hover:underline">
          {post.title}
        </a>
      </h3>
      <p className="mt-1 line-clamp-3 text-sm text-ink/70">{post.excerpt}</p>
      <div className="mt-3">
        <a href={post.href} className="inline-flex items-center text-sm font-semibold text-brand hover:text-brand-hover">
          Leer más →
        </a>
      </div>
    </article>
  )
}

