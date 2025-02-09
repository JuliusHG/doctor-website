import React from 'react'
import SiteSectionsSelector from '@/src/app/sections/admin/SiteSectionsSelector'

const SectionsManagerPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Selector de Secciones</h1>
      <SiteSectionsSelector />
    </div>
  )
}

export default SectionsManagerPage

