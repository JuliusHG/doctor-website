import { Metadata } from 'next'
import SiteInfoForm from '../../../app/sections/admin/SiteInfoForm'

export const metadata: Metadata = {
  title: 'Site Info Form | Admin',
  description: 'Update site information for Dr. Julius Hernández González website',
}

export default function SiteInfoPage() {
  return (
    <main className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Editor del Sitio</h1>
        <SiteInfoForm />
      </div>
    </main>
  )
}

