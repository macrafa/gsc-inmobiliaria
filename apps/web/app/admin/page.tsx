'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Plus, Edit2, Trash2, CheckCircle, XCircle, Eye } from 'lucide-react'

export default function AdminDashboard() {
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setProperties(data)
    setLoading(false)
  }

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar "${title}"? Esta acción no se puede deshacer.`)) {
      return
    }

    // Attempt to delete images from database (Cascade should handle this if configured, but doing it explicitly guarantees it)
    await supabase.from('property_images').delete().eq('property_id', id)
    
    // Delete property
    const { error } = await supabase.from('properties').delete().eq('id', id)
    
    if (error) {
      alert(`Error eliminando: ${error.message}`)
    } else {
      setProperties(properties.filter(p => p.id !== id))
    }
  }

  const handleToggleSold = async (id: string, currentStatus: boolean) => {
    // We assume the DB has boolean column `is_sold`. If it crashes, user needs to run the SQL query.
    const { error } = await supabase.from('properties').update({ is_sold: !currentStatus }).eq('id', id)
    if (error) {
      alert(`Error actualizando estado: ${error.message}`)
    } else {
      setProperties(properties.map(p => p.id === id ? { ...p, is_sold: !currentStatus } : p))
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inmuebles</h1>
        <Link href="/admin/novo">
          <Button><Plus className="w-4 h-4 mr-2" /> Nuevo inmueble</Button>
        </Link>
      </div>
      
      {loading ? (
        <p>Cargando inmuebles...</p>
      ) : (
        <div className="bg-white rounded-xl shadow border border-border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-panel border-b border-border">
              <tr>
                <th className="p-4 font-medium text-sm text-ink/70">Título</th>
                <th className="p-4 font-medium text-sm text-ink/70">Tipo</th>
                <th className="p-4 font-medium text-sm text-ink/70">Operación</th>
                <th className="p-4 font-medium text-sm text-ink/70">Precio</th>
                <th className="p-4 font-medium text-sm text-ink/70 text-center">Visitas</th>
                <th className="p-4 font-medium text-sm text-ink/70 text-center">Status</th>
                <th className="p-4 font-medium text-sm text-ink/70 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p: any) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-bg/50 transition-colors">
                  <td className="p-4 font-medium">{p.title}</td>
                  <td className="p-4 capitalize">{p.type}</td>
                  <td className="p-4 capitalize">{p.operation}</td>
                  <td className="p-4 font-semibold text-brand">${p.price.toLocaleString()}</td>
                  <td className="p-4 text-center text-ink/60 font-medium">
                    <span className="flex items-center justify-center gap-1.5" title="Visualizaciones exclusivas de esta página">
                      <Eye className="w-4 h-4" /> {p.views || 0}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${p.is_sold ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {p.is_sold ? (p.operation === 'venta' ? 'Vendido' : 'Alquilado') : 'Disponible'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        onClick={() => handleToggleSold(p.id, p.is_sold)}
                        className={`p-2 h-auto ${p.is_sold ? 'text-green-600 hover:text-green-700' : 'text-ink/40 hover:text-ink'}`} 
                        aria-label="Marcar como vendido/disponible"
                        title={p.is_sold ? 'Marcar como disponible' : 'Marcar como vendido/alquilado'}
                      >
                        {p.is_sold ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                      </Button>
                      <Link href={`/admin/editar/${p.id}`}>
                        <Button variant="ghost" className="p-2 h-auto text-ink/60 hover:text-brand" aria-label="Editar">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        onClick={() => handleDelete(p.id, p.title)}
                        className="p-2 h-auto text-ink/60 hover:text-red-600" 
                        aria-label="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {properties.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted">No hay inmuebles registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
