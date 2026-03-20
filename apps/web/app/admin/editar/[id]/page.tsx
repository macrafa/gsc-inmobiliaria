'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import slugify from 'slugify'
import Link from 'next/link'
import { ArrowLeft, X } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

export default function EditPropertyPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [bathrooms, setBathrooms] = useState('')
  const [area, setArea] = useState('')
  const [type, setType] = useState('casa')
  const [operation, setOperation] = useState('venta')
  
  const [existingImages, setExistingImages] = useState<any[]>([])
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  useEffect(() => {
    async function loadData() {
      if (!id) return
      const { data: property, error } = await supabase
        .from('properties')
        .select('*, property_images(id, url)')
        .eq('id', id)
        .single()
        
      if (property) {
        setTitle(property.title)
        setDescription(property.description)
        setPrice(property.price.toString())
        setBedrooms(property.bedrooms?.toString() || '0')
        setBathrooms(property.bathrooms?.toString() || '0')
        setArea(property.area_m2?.toString() || '0')
        setType(property.type)
        setOperation(property.operation)
        setExistingImages(property.property_images || [])
      } else {
        alert('No se pudo cargar el inmueble')
      }
      setLoading(false)
    }
    loadData()
  }, [id])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleRemoveExistingImage = (imageId: string) => {
    setImagesToDelete([...imagesToDelete, imageId])
    setExistingImages(existingImages.filter(img => img.id !== imageId))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      // 1. Generate slug
      let slug = slugify(title, { lower: true, strict: true })
      
      // Update properties table
      const { error: propError } = await supabase
        .from('properties')
        .update({
          title,
          slug,
          description,
          price: parseFloat(price),
          bedrooms: parseInt(bedrooms) || 0,
          bathrooms: parseFloat(bathrooms) || 0,
          area_m2: parseFloat(area) || 0,
          type,
          operation
        })
        .eq('id', id)

      if (propError) throw new Error(`Error actualizando: ${propError.message}`)

      // Handle image deletions
      if (imagesToDelete.length > 0) {
        // Technically we should also remove from Storage bucket, but for MVP we just remove DB reference
        await supabase.from('property_images').delete().in('id', imagesToDelete)
      }

      // Upload new images
      for (const file of files) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
        
        const { error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(fileName, file)
          
        if (uploadError) throw new Error(`Error en storage: ${uploadError.message}`)

        const publicUrl = `https://bxbxnrvexnscguxivajy.supabase.co/storage/v1/object/public/property-images/${fileName}`

        const { error: imgError } = await supabase.from('property_images').insert([{
          property_id: id,
          url: publicUrl
        }])

        if (imgError) throw new Error(`Error guardando fotos: ${imgError.message}`)
      }

      alert('¡Inmueble actualizado exitosamente!')
      router.push('/admin')
      
    } catch (err: any) {
      console.error(err)
      alert('Error: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-center p-12">Cargando...</div>

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow border border-border">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin" className="text-ink/60 hover:text-ink transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold">Editar Inmueble</h1>
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

        {existingImages.length > 0 && (
          <div>
            <label className="block text-sm font-medium mb-2">Fotos Actuales</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {existingImages.map(img => (
                <div key={img.id} className="relative group rounded-xl overflow-hidden border border-border aspect-square bg-bg">
                  <img src={img.url} className="w-full h-full object-cover" alt="Actual" />
                  <button 
                    type="button"
                    onClick={() => handleRemoveExistingImage(img.id)}
                    className="absolute top-1 right-1 bg-red-600/90 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Eliminar"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted mt-2">Pasa el ratón sobre una foto para ver la opción de eliminarla.</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Añadir más fotos</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-border rounded-xl px-4 py-2 focus:ring-2 focus:ring-brand/50 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-panel file:text-ink hover:file:bg-bg"
          />
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={saving}>
          {saving ? 'Guardando cambios...' : 'Guardar Inmueble'}
        </Button>
      </form>
    </div>
  )
}
