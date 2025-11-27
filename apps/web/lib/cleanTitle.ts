export function cleanTitle(title: string): string {
  if (!title) return title
  // Remueve sufijos como "• 120 m²" o "- 120 m²" o "– 120 m²" al final del título
  return title.replace(/\s*[•–-]\s*\d+\s*m²\s*$/i, '').trim()
}

