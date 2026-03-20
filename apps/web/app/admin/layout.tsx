export const metadata = {
  title: 'Admin - GSC Inmobiliaria'
}

import AdminAuth from '@/components/admin/AdminAuth'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminAuth>{children}</AdminAuth>
}
