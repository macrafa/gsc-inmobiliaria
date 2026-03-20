'use client'

import { useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'

export default function ViewTracker({ propertyId }: { propertyId: string }) {
  const tracked = useRef(false)

  useEffect(() => {
    async function track() {
      if (tracked.current) return
      tracked.current = true

      // In a real production app, we would use an RPC function here for atomic increment.
      // But fetching & updating is enough for an MVP analytics tracker.
      const { data } = await supabase.from('properties').select('views').eq('id', propertyId).single()
      if (data) {
        await supabase.from('properties').update({ views: (data.views || 0) + 1 }).eq('id', propertyId)
      }
    }
    track()
  }, [propertyId])

  return null
}
