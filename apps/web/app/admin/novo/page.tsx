'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import slugify from 'slugify'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewPropertyPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [bathrooms, setBathrooms] = useState('')
  const [area, setArea] = useState('')
  const [type, setType] = useState('casa')
  const [operation, setOperation] = useState('venta')
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [resultLink, setResultLink] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // 1. Generate slug
      let slug = slugify(title, { lower: true, strict: true })
      
      // Check if slug exists to avoid unique constraint errors (simplistic approach)
      const { data: existing } = await supabase.from('properties').select('id').eq('slug', slug).single()
      if (existing) {
        slug = `${slug}-${Date.now().toString().slice(-4)}`
      }

      // 2. Insert into properties table
      const { data: property, error: propError } = await supabase
        .from('properties')
        .insert([{
          title,
          slug,
          description,
          price: parseFloat(price),
          bedrooms: parseInt(bedrooms) || 0,
          bathrooms: parseFloat(bathrooms) || 0,
          area_m2: parseFloat(area) || 0,
          type,
          operation
        }])
        .select()
        .single()

      if (propError || !property) {
        throw new Error(propError?.message || 'Error creating property')
      }

      // 3. Upload images and insert into property_images
      for (const file of files) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
        
        const { error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(fileName, file)
          
        if (uploadError) {
          throw new Error(`Error en storage: ${uploadError.message}`)
        }

        const publicUrl = `https://bxbxnrvexnscguxivajy.supabase.co/storage/v1/object/public/property-images/${fileName}`

        const { error: imgError } = await supabase.from('property_images').insert([{
          property_id: property.id,
          url: publicUrl
        }])

        if (imgError) {
          throw new Error(`Error guardando URL en BD: ${imgError.message}`)
        }
      }

      const link = `${window.location.origin}/imoveis/${slug}`
      setResultLink(link)
      
    } catch (err: any) {
      console.error(err)
      alert('Error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  if (resultLink) {
    return (
      <div className="bg-white p-8 rounded-xl shadow border border-border max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">¡Inmueble guardado con éxito!</h2>
        <p className="mb-4 text-ink/80">Puedes ver la página pública del inmueble en el siguiente enlace:</p>
        <div className="flex items-center gap-2 justify-center mb-8">
          <input 
            type="text" 
            readOnly 
            value={resultLink} 
            className="w-full max-w-md border border-border rounded-xl px-4 py-2 bg-bg text-ink"
          />
          <Button onClick={() => navigator.clipboard.writeText(resultLink)}>Copiar</Button>
        </div>
        <div className="flex justify-center gap-4">
          <Link href="/admin"><Button variant="ghost">Volver al inicio</Button></Link>
          <Button onClick={() => {
            setTitle('')
            setDescription('')
            setPrice('')
            setBedrooms('')
            setBathrooms('')
            setArea('')
            setFiles([])
            setResultLink('')
          }}>Crear otro</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow border border-border">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin" className="text-ink/60 hover:text-ink transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold">Nuevo Inmueble</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Título</label>
          <input
            type="text"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border border-border rounded-xl px-4 py-2 focus:ring-2 focus:ring-brand/50 outline-none"
            placeholder="Ej: Apartamento con vista al mar"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descripción</label>
          <textarea
            required
            rows={5}
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full border border-border rounded-xl px-4 py-2 focus:ring-2 focus:ring-brand/50 outline-none resize-none"
            placeholder="Detalles sobre el inmueble..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Precio (USD)</label>
            <input
              type="number"
              required
              min="0"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full border border-border rounded-xl px-4 py-2 focus:ring-2 focus:ring-brand/50 outline-none"
              placeholder="Ej: 150000"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-medium mb-1">Quartos</label>
              <input
                type="number"
                min="0"
                value={bedrooms}
                onChange={e => setBedrooms(e.target.value)}
                className="w-full border border-border rounded-xl px-2 py-2 focus:ring-2 focus:ring-brand/50 outline-none text-center"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Banh.</label>
              <input
                type="number"
                step="0.5"
                min="0"
                value={bathrooms}
                onChange={e => setBathrooms(e.target.value)}
                className="w-full border border-border rounded-xl px-2 py-2 focus:ring-2 focus:ring-brand/50 outline-none text-center"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Área m²</label>
              <input
                type="number"
                min="0"
                value={area}
                onChange={e => setArea(e.target.value)}
                className="w-full border border-border rounded-xl px-2 py-2 focus:ring-2 focus:ring-brand/50 outline-none text-center"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-medium mb-1">Tipo</label>
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="w-full border border-border rounded-xl px-4 py-2 focus:ring-2 focus:ring-brand/50 outline-none bg-white"
            >
              <option value="casa">Casa</option>
              <option value="apartamento">Apartamento</option>
              <option value="comercial">Comercial</option>
              <option value="industrial">Industrial</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Operación</label>
            <select
              value={operation}
              onChange={e => setOperation(e.target.value)}
              className="w-full border border-border rounded-xl px-4 py-2 focus:ring-2 focus:ring-brand/50 outline-none bg-white"
            >
              <option value="venta">Venta</option>
              <option value="alquiler">Alquiler</option>
              <option value="alquiler vacacional">Alquiler Vacacional</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fotos</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-border rounded-xl px-4 py-2 focus:ring-2 focus:ring-brand/50 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-panel file:text-ink hover:file:bg-bg"
          />
          <p className="text-xs text-muted mt-2">Puedes seleccionar múltiples imágenes.</p>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Guardando publicando...' : 'Publicar inmueble'}
        </Button>
      </form>
    </div>
  )
}
