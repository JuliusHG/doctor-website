// @ts-nocheck
// Este archivo no está en uso y necesita actualizarse.
// Pertenece al formulario de recolección de datos del sitio.
// Se mantiene para no perder su funcionalidad. Será trasladado después.

"use client"

import { useState, useEffect } from "react"
import { Save, Plus, Trash } from "lucide-react"
import type { SiteContent } from "../../../interfaces/SiteContent"
import { initialFormData } from "./initialFormData"
import { customFieldInfo } from "./customFieldInfo"

export default function SiteInfoForm() {
  const [formData, setFormData] = useState<SiteContent>(initialFormData)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/site-content")
        if (!response.ok) {
          throw new Error("Failed to fetch site content")
        }
        const data = await response.json()
        setFormData((prevState) => ({
          ...prevState,
          doctorInfo: data.siteContent.doctorInfo || prevState.doctorInfo,
          heroSection: data.siteContent.heroSection || prevState.heroSection,
          navMenu: data.siteContent.navMenu || prevState.navMenu,
          certifications: {
            sectionTitle: data.siteContent.certifications?.sectionTitle || prevState.certifications.sectionTitle,
            entities: data.siteContent.certifications?.entities || prevState.certifications.entities,
          },
          experience: {
            sectionTitle: data.siteContent.experience?.sectionTitle || prevState.experience.sectionTitle,
            entities: data.siteContent.experience?.entities || prevState.experience.entities,
          },
          aboutUs: {
            sectionTitle: data.siteContent.aboutUs?.sectionTitle || prevState.aboutUs.sectionTitle,
            imagePath: data.siteContent.aboutUs?.imagePath || prevState.aboutUs.imagePath,
            title: data.siteContent.aboutUs?.title || prevState.aboutUs.title,
            description: data.siteContent.aboutUs?.description || prevState.aboutUs.description,
            yearsOfExperience: data.siteContent.aboutUs?.yearsOfExperience || prevState.aboutUs.yearsOfExperience,
          },
          purpose: {
            sectionTitle: data.siteContent.purpose?.sectionTitle || prevState.purpose.sectionTitle,
            entities: data.siteContent.purpose?.entities || prevState.purpose.entities,
          },
          services: {
            sectionTitle: data.siteContent.services?.sectionTitle || prevState.services.sectionTitle,
            linkText: data.siteContent.services?.linkText || prevState.services.linkText,
            entities: data.siteContent.services?.entities || prevState.services.entities,
            page: data.siteContent.services?.page || prevState.services.page,
            individualPage: data.siteContent.services?.individualPage || prevState.services.individualPage,
          },
          symptoms: {
            sectionTitle: data.siteContent.symptoms?.sectionTitle || prevState.symptoms.sectionTitle,
            linkText: data.siteContent.symptoms?.linkText || prevState.symptoms.linkText,
            buttonText: data.siteContent.symptoms?.buttonText || prevState.symptoms.buttonText,
            entities: data.siteContent.symptoms?.entities || prevState.symptoms.entities,
            page: data.siteContent.symptoms?.page || prevState.symptoms.page,
            individualPage: data.siteContent.symptoms?.individualPage || prevState.symptoms.individualPage,
          },
          photosGallery: {
            sectionTitle: data.siteContent.photosGallery?.sectionTitle || prevState.photosGallery.sectionTitle,
          },
          diseases: {
            sectionTitle: data.siteContent.diseases?.sectionTitle || prevState.diseases.sectionTitle,
            linkText: data.siteContent.diseases?.linkText || prevState.diseases.linkText,
            buttonText: data.siteContent.diseases?.buttonText || prevState.diseases.buttonText,
            entities: data.siteContent.diseases?.entities || prevState.diseases.entities,
            page: data.siteContent.diseases?.page || prevState.diseases.page,
            individualPage: data.siteContent.diseases?.individualPage || prevState.diseases.individualPage,
          },
          callToAction: data.siteContent.callToAction || prevState.callToAction,
          testimonials: {
            sectionTitle: data.siteContent.testimonials?.sectionTitle || prevState.testimonials.sectionTitle,
            linkText: data.siteContent.testimonials?.linkText || prevState.testimonials.linkText,
            entities: data.siteContent.testimonials?.entities || prevState.testimonials.entities,
            dataBlocks: data.siteContent.testimonials?.dataBlocks || prevState.testimonials.dataBlocks,
          },
          payments: {
            sectionTitle: data.siteContent.payments?.sectionTitle || prevState.payments.sectionTitle,
            methods: data.siteContent.payments?.methods || prevState.payments.methods,
            additionalInfo: data.siteContent.payments?.additionalInfo || prevState.payments.additionalInfo,
          },
          insurances: {
            sectionTitle: data.siteContent.insurances?.sectionTitle || prevState.insurances.sectionTitle,
            companies: data.siteContent.insurances?.companies || prevState.insurances.companies,
            additionalInfo: data.siteContent.insurances?.additionalInfo || prevState.insurances.additionalInfo,
          },
          footer: data.siteContent.footer || prevState.footer,
          generalCallToAction: data.siteContent.generalCallToAction || prevState.generalCallToAction,
          contact: data.siteContent.contact || prevState.contact,
          schedule: data.siteContent.schedule || prevState.schedule,
        }))
      } catch (error) {
        console.error("Error fetching site content:", error)
        setError("Failed to load site content. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
  
  
  const handleChange = <T extends keyof SiteContent>(
    section: T,
    field: keyof SiteContent[T],
    value: SiteContent[T][keyof SiteContent[T]],
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [section]: {
        ...(prevState[section] as object),
        [field]: value,
      },
    }))
  }

  const handleArrayChange = <T extends keyof SiteContent>(
    section: T,
    field: string | null,
    index: number,
    key: string,
    value: any,
  ) => {
    setFormData((prevState) => {
      if (field === null) {
        // Handle top-level arrays like navMenu
        if (Array.isArray(prevState[section])) {
          const updatedArray = [...(prevState[section] as any[])]
          updatedArray[index] = { ...updatedArray[index], [key]: value }
          return {
            ...prevState,
            [section]: updatedArray,
          }
        }
      } else {
        // Handle nested arrays
        const sectionData = { ...prevState[section] } as any
        if (sectionData[field] && Array.isArray(sectionData[field])) {
          const updatedArray = [...sectionData[field]]
          updatedArray[index] = { ...updatedArray[index], [key]: value }
          return {
            ...prevState,
            [section]: {
              ...sectionData,
              [field]: updatedArray,
            },
          }
        }
      }
      console.warn(`Couldn't update item in section ${String(section)}, field ${field}`)
      return prevState
    })
  }
  
  const handleAddItem = <T extends keyof SiteContent>(section: T, field: string | null, newItem: any) => {
    setFormData((prevState) => {
      if (field === null) {
        // Handle top-level arrays like navMenu
        if (Array.isArray(prevState[section])) {
          return {
            ...prevState,
            [section]: [...(prevState[section] as any[]), newItem],
          }
        }
      } else {
        // Handle nested arrays
        const sectionData = prevState[section] as any
        if (sectionData[field] && Array.isArray(sectionData[field])) {
          return {
            ...prevState,
            [section]: {
              ...sectionData,
              [field]: [...sectionData[field], newItem],
            },
          }
        }
      }
      console.warn(`Unhandled section type in handleAddItem: ${section}`)
      return prevState
    })
  }
  
  const handleRemoveItem = <T extends keyof SiteContent>(section: T, field: string | null, index: number) => {
    setFormData((prevState) => {
      if (field === null) {
        // Handle top-level arrays like navMenu
        if (Array.isArray(prevState[section])) {
          return {
            ...prevState,
            [section]: (prevState[section] as any[]).filter((_, i) => i !== index),
          }
        }
      } else {
        // Handle nested arrays
        const sectionData = { ...prevState[section] } as any
        if (sectionData[field] && Array.isArray(sectionData[field])) {
          return {
            ...prevState,
            [section]: {
              ...sectionData,
              [field]: sectionData[field].filter((_: any, i: number) => i !== index),
            },
          }
        }
      }
      console.warn(`Couldn't remove item from section ${String(section)}, field ${field}`)
      return prevState
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/site-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ siteContent: formData }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Failed to update site information")
      }
      alert("Site information updated successfully")
    } catch (error) {
      console.error("Error updating site information:", error)
      if (error instanceof Error) {
        setError(
          `An error occurred: ${error.message}. The changes may have been saved successfully, please check and try again if needed.`,
        )
      } else {
        setError(
          "An unexpected error occurred. The changes may have been saved successfully, please check and try again if needed.",
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Doctor Info Section */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Información del Doctor</h2>
        <div className="space-y-4">
          {Object.entries(customFieldInfo.doctorInfo).map(([key, value]) => (
            <div key={key} className="mb-4">
              <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                {value.label}
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={(formData.doctorInfo && formData.doctorInfo[key as keyof SiteContent['doctorInfo']]) || ''}
                onChange={(e) => handleChange('doctorInfo', key as keyof SiteContent['doctorInfo'], e.target.value)}
                className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <p className="mt-1 text-sm text-gray-500">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Sección Hero</h2>
        <div className="space-y-4">
          {Object.entries(customFieldInfo.heroSection).map(([key, value]) => (
            <div key={key} className="mb-4">
              <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                {value.label}
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={(formData.heroSection && formData.heroSection[key as keyof SiteContent["heroSection"]]) || ""}
                onChange={(e) => handleChange("heroSection", key as keyof SiteContent["heroSection"], e.target.value)}
                className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <p className="mt-1 text-sm text-gray-500">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NavMenu Section */}
      <section className="bg-white p-6 rounded-lg shadow">
  <h2 className="text-2xl font-semibold mb-4">Menú de Navegación</h2>
  {formData.navMenu.map((item, index) => (
    <div key={index} className="flex space-x-4 mb-4">
      <input
        type="text"
        value={item.label}
        onChange={(e) => handleArrayChange("navMenu", null, index, "label", e.target.value)}
        placeholder="Etiqueta"
        className="flex-1 p-2 border rounded"
      />
      <input
        type="text"
        value={item.path}
        onChange={(e) => handleArrayChange("navMenu", null, index, "path", e.target.value)}
        placeholder="Ruta"
        className="flex-1 p-2 border rounded"
      />
      <button
        type="button"
        onClick={() => handleRemoveItem("navMenu", null, index)}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        <Trash size={20} />
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={() => handleAddItem("navMenu", null, { label: "", path: "" })}
    className="mt-2 flex items-center text-blue-600"
  >
    <Plus size={20} className="mr-1" /> Agregar Elemento
  </button>
</section>

      {/* Certifications Section */}
    <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Certificaciones</h2>
        <div className="mb-4">
          <label htmlFor="certificationsSectionTitle" className="block text-sm font-medium text-gray-700 mb-1">
            {customFieldInfo.certifications.sectionTitle.label}
          </label>
          <input
            type="text"
            id="certificationsSectionTitle"
            name="certificationsSectionTitle"
            value={formData.certifications.sectionTitle}
            onChange={(e) => handleChange("certifications", "sectionTitle", e.target.value)}
            className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <p className="mt-1 text-sm text-gray-500">{customFieldInfo.certifications.sectionTitle.description}</p>
        </div>
        {formData.certifications.entities.map((cert, index) => (
          <div key={index} className="flex space-x-4 mb-4">
            <input
              type="text"
              value={cert.name}
              onChange={(e) => handleArrayChange("certifications", "entities", index, "name", e.target.value)}
              placeholder="Nombre de la certificación"
              className="flex-1 p-2 border rounded"
            />
            <input
              type="text"
              value={cert.imagePath}
              onChange={(e) => handleArrayChange("certifications", "entities", index, "imagePath", e.target.value)}
              placeholder="Ruta de la imagen"
              className="flex-1 p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => handleRemoveItem("certifications", "entities", index)}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              <Trash size={20} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("certifications", "entities", { name: "", imagePath: "" })}
          className="mt-2 flex items-center text-blue-600"
        >
          <Plus size={20} className="mr-1" /> Agregar Certificación
        </button>
      </section>

      {/* Experience Section */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Experiencia</h2>
        <div className="mb-4">
          <label htmlFor="experienceSectionTitle" className="block text-sm font-medium text-gray-700 mb-1">
            {customFieldInfo.experience.sectionTitle.label}
          </label>
          <input
            type="text"
            id="experienceSectionTitle"
            name="experienceSectionTitle"
            value={formData.experience.sectionTitle}
            onChange={(e) => handleChange("experience", "sectionTitle", e.target.value)}
            className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <p className="mt-1 text-sm text-gray-500">{customFieldInfo.experience.sectionTitle.description}</p>
        </div>
        {formData.experience.entities.map((item, index) => (
          <div key={index} className="flex items-center space-x-2 mb-4">
            <input
              type="text"
              value={item.icon}
              onChange={(e) => handleArrayChange("experience", "entities", index, "icon", e.target.value)}
              className="flex-grow px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Icono"
            />
            <input
              type="text"
              value={item.value}
              onChange={(e) => handleArrayChange("experience", "entities", index, "value", e.target.value)}
              className="flex-grow px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Valor"
            />
            <input
              type="text"
              value={item.label}
              onChange={(e) => handleArrayChange("experience", "entities", index, "label", e.target.value)}
              className="flex-grow px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Etiqueta"
            />
            <button
              type="button"
              onClick={() => handleRemoveItem("experience", "entities", index)}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              <Trash size={20} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("experience", "entities", { icon: "", value: "", label: "" })}
          className="mt-2 flex items-center text-blue-600"
        >
          <Plus size={20} className="mr-1" /> Agregar Experiencia
        </button>
      </section>

      {/* About Us Section */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Sobre Mí</h2>
        <div className="space-y-4">
          <div className="mb-4">
            <label htmlFor="aboutUs_SectionTitle" className="block text-sm font-medium text-gray-700 mb-1">
              {customFieldInfo.aboutUs.sectionTitle.label}
            </label>
            <input
              type="text"
              id="aboutUs_sectionTitle"
              name="aboutUs_sectionTitle"
              value={formData.aboutUs.sectionTitle}
              onChange={(e) => handleChange("aboutUs", "sectionTitle", e.target.value)}
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <p className="mt-1 text-sm text-gray-500">{customFieldInfo.aboutUs.sectionTitle.description}</p>
          </div>

          <div className="mb-4">
            <label htmlFor="aboutUs_imagePath" className="block text-sm font-medium text-gray-700 mb-1">
              {customFieldInfo.aboutUs.imagePath.label}
            </label>
            <input
              type="text"
              id="aboutUs_imagePath"
              name="aboutUs_imagePath"
              value={formData.aboutUs.imagePath}
              onChange={(e) => handleChange("aboutUs", "imagePath", e.target.value)}
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <p className="mt-1 text-sm text-gray-500">{customFieldInfo.aboutUs.imagePath.description}</p>
          </div>

          <div className="mb-4">
            <label htmlFor="aboutUs_title" className="block text-sm font-medium text-gray-700 mb-1">
              {customFieldInfo.aboutUs.title.label}
            </label>
            <input
              type="text"
              id="aboutUs_title"
              name="aboutUs_title"
              value={formData.aboutUs.title}
              onChange={(e) => handleChange("aboutUs", "title", e.target.value)}
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <p className="mt-1 text-sm text-gray-500">{customFieldInfo.aboutUs.title.description}</p>
          </div>

          <div className="mb-4">
            <label htmlFor="aboutUs_description" className="block text-sm font-medium text-gray-700 mb-1">
              {customFieldInfo.aboutUs.description.label}
            </label>
            <textarea
              id="aboutUs_description"
              name="aboutUs_description"
              value={formData.aboutUs.description}
              onChange={(e) => handleChange("aboutUs", "description", e.target.value)}
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows={8}
              style={{ whiteSpace: "pre-wrap" }}
            />
            <p className="mt-1 text-sm text-gray-500">{customFieldInfo.aboutUs.description.description}</p>
          </div>

          <div className="mb-4">
            <label htmlFor="aboutUs_yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-1">
              {customFieldInfo.aboutUs.yearsOfExperience.label}
            </label>
            <input
              type="number"
              id="aboutUs_yearsOfExperience"
              name="aboutUs_yearsOfExperience"
              value={formData.aboutUs.yearsOfExperience}
              onChange={(e) => handleChange("aboutUs", "yearsOfExperience", Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <p className="mt-1 text-sm text-gray-500">{customFieldInfo.aboutUs.yearsOfExperience.description}</p>
          </div>
        </div>
      </section>

{/* Purpose Section */}
<section className="bg-white p-6 rounded-lg shadow">
  <h2 className="text-2xl font-semibold mb-4">Propósito</h2>
  <div className="space-y-4">
    <div className="mb-4">
      <label htmlFor="purposeSectionTitle" className="block text-sm font-medium text-gray-700 mb-1">
        {customFieldInfo.purpose.sectionTitle.label}
      </label>
      <input
        type="text"
        id="purposeSectionTitle"
        name="purposeSectionTitle"
        value={formData.purpose.sectionTitle}
        onChange={(e) => handleChange("purpose", "sectionTitle", e.target.value)}
        className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      <p className="mt-1 text-sm text-gray-500">{customFieldInfo.purpose.sectionTitle.description}</p>
    </div>
          {formData.purpose.entities.map((entity, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    id={`purpose_entities_${index}_icon`}
                    name={`purpose_entities_${index}_icon`}
                    value={entity.icon}
                    onChange={(e) => handleArrayChange("purpose", "entities", index, "icon", e.target.value)}
                    className="w-2/12 px-2 py-1 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm"
                    placeholder="Ruta del icono"
                  />
                  <input
                    type="text"
                    id={`purpose_entities_${index}_title`}
                    name={`purpose_entities_${index}_title`}
                    value={entity.title}
                    onChange={(e) => handleArrayChange("purpose", "entities", index, "title", e.target.value)}
                    className="w-3/12 px-2 py-1 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-smlex-grow px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Título del propósito"
                  />
                  <input
                    id={`purpose_entities_${index}_description`}
                    name={`purpose_entities_${index}_description`}
                    value={entity.description}
                    onChange={(e) => handleArrayChange("purpose", "entities", index, "description", e.target.value)}
                    className="w-6/12 px-2 py-1 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm"
                    placeholder="Descripción del propósito"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem("purpose", "entities", index)}
                    className="w-1/12 text-red-600 hover:text-red-800 flex justify-center items-center"
                    >
                  </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem("purpose", "entities", { icon: "", title: "", description: "" })}
            className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
          >
            <Plus size={20} className="mr-1" /> Agregar propósito
          </button>
  </div>
</section>



      {/* Services Section */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Servicios</h2>
          <div className="space-y-4">
            <div className="mb-4">
              <label htmlFor="servicesSectionTitle" className="block text-sm font-medium text-gray-700 mb-1">
                {customFieldInfo.services.sectionTitle.label}
              </label>
              <input
                type="text"
                id="servicesSectionTitle"
                name="servicesSectionTitle"
                value={formData.services?.sectionTitle || ''}
                onChange={(e) => handleChange('services', 'sectionTitle', e.target.value)}
                className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <p className="mt-1 text-sm text-gray-500">{customFieldInfo.services.sectionTitle.description}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="servicesLinkText" className="block text-sm font-medium text-gray-700 mb-1">
              {customFieldInfo.services.linkText.label}
              </label>
              <input
                type="text"
                id="servicesLinkText"
                name="servicesLinkText"
                value={formData.services?.linkText || ''}
                onChange={(e) => handleChange('services', 'linkText', e.target.value)}
                className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <p className="mt-1 text-sm text-gray-500">{customFieldInfo.services.linkText.description}</p>
            </div>
            <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Página de Servicios</h3>
      <div className="space-y-2">
        {Object.entries(customFieldInfo.services.page).map(([key, value]) => (
          <div key={key}>
            <label htmlFor={`servicesPage_${key}`} className="block text-sm font-medium text-gray-700 mb-1">
              {value.label}
            </label>
            <input
              type="text"
              id={`servicesPage_${key}`}
              name={`servicesPage_${key}`}
              value={formData.services?.page[key as keyof typeof formData.services.page] || ''}
              onChange={(e) => handleChange('services', 'page', { ...formData.services.page, [key]: e.target.value })}
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <p className="mt-1 text-sm text-gray-500">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="mb-4">
      <h3 className="text-lg font-medium mb-2">Página Individual de Servicio</h3>
      <div className="space-y-2">
        <div>
          <label htmlFor="servicesContactButtonTitle" className="block text-sm font-medium text-gray-700 mb-1">
            {customFieldInfo.services.individualPage.contactButton.title.label}
          </label>
          <input
            type="text"
            id="servicesContactButtonTitle"
            name="servicesContactButtonTitle"
            value={formData.services?.individualPage.contactButton.title || ''}
            onChange={(e) => handleChange('services', 'individualPage', { 
              ...formData.services.individualPage, 
              contactButton: { 
                ...formData.services.individualPage.contactButton, 
                title: e.target.value 
              } 
            })}
            className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <p className="mt-1 text-sm text-gray-500">{customFieldInfo.services.individualPage.contactButton.title.description}</p>
        </div>
        <div>
          <label htmlFor="servicesContactButtonText" className="block text-sm font-medium text-gray-700 mb-1">
            {customFieldInfo.services.individualPage.contactButton.text.label}
          </label>
          <input
            type="text"
            id="servicesContactButtonText"
            name="servicesContactButtonText"
            value={formData.services?.individualPage.contactButton.text || ''}
            onChange={(e) => handleChange('services', 'individualPage', { 
              ...formData.services.individualPage, 
              contactButton: { 
                ...formData.services.individualPage.contactButton, 
                text: e.target.value 
              } 
            })}
            className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <p className="mt-1 text-sm text-gray-500">{customFieldInfo.services.individualPage.contactButton.text.description}</p>
        </div>
        <div>
          <label htmlFor="servicesReturnButtonText" className="block text-sm font-medium text-gray-700 mb-1">
            {customFieldInfo.services.individualPage.returnButton.text.label}
          </label>
          <input
            type="text"
            id="servicesReturnButtonText"
            name="servicesReturnButtonText"
            value={formData.services?.individualPage.returnButton.text || ''}
            onChange={(e) => handleChange('services', 'individualPage', { 
              ...formData.services.individualPage, 
              returnButton: { 
                ...formData.services.individualPage.returnButton, 
                text: e.target.value 
              } 
            })}
            className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <p className="mt-1 text-sm text-gray-500">{customFieldInfo.services.individualPage.returnButton.text.description}</p>
        </div>
      </div>
    </div>
  </div>
</section>

      
      {/* Symptoms Section */}
<section className="bg-white p-6 rounded-lg shadow">
  <h2 className="text-2xl font-semibold mb-4">Síntomas</h2>
  <div className="space-y-4">
    <div className="mb-4">
      <label htmlFor="symptomsSectionTitle" className="block text-sm font-medium text-gray-700 mb-1">
        {customFieldInfo.symptoms.sectionTitle.label}
      </label>
      <input
        type="text"
        id="symptomsSectionTitle"
        name="symptomsSectionTitle"
        value={formData.symptoms?.sectionTitle || ''}
        onChange={(e) => handleChange('symptoms', 'sectionTitle', e.target.value)}
        className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      <p className="mt-1 text-sm text-gray-500">{customFieldInfo.symptoms.sectionTitle.description}</p>
    </div>
    <div className="mb-4">
      <label htmlFor="symptomsLinkText" className="block text-sm font-medium text-gray-700 mb-1">
        {customFieldInfo.symptoms.linkText.label}
      </label>
      <input
        type="text"
        id="symptomsLinkText"
        name="symptomsLinkText"
        value={formData.symptoms?.linkText || ''}
        onChange={(e) => handleChange('symptoms', 'linkText', e.target.value)}
        className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      <p className="mt-1 text-sm text-gray-500">{customFieldInfo.symptoms.linkText.description}</p>
    </div>
    <div className="mb-4">
      <label htmlFor="symptomsButtonText" className="block text-sm font-medium text-gray-700 mb-1">
        {customFieldInfo.symptoms.buttonText.label}
      </label>
      <input
        type="text"
        id="symptomsButtonText"
        name="symptomsButtonText"
        value={formData.symptoms?.buttonText || ''}
        onChange={(e) => handleChange('symptoms', 'buttonText', e.target.value)}
        className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      <p className="mt-1 text-sm text-gray-500">{customFieldInfo.symptoms.buttonText.description}</p>
    </div>
    <div className="mb-4">
      <h3 className="text-lg font-medium mb-2">Página de Síntomas</h3>
      <div className="space-y-2">
        {Object.entries(customFieldInfo.symptoms.page).map(([key, value]) => (
          <div key={key}>
            <label htmlFor={`symptomsPage_${key}`} className="block text-sm font-medium text-gray-700 mb-1">
              {value.label}
            </label>
            <input
              type="text"
              id={`symptomsPage_${key}`}
              name={`symptomsPage_${key}`}
              value={formData.symptoms?.page[key as keyof typeof formData.symptoms.page] || ''}
              onChange={(e) => handleChange('symptoms', 'page', { ...formData.symptoms.page, [key]: e.target.value })}
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <p className="mt-1 text-sm text-gray-500">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="mb-4">
      <h3 className="text-lg font-medium mb-2">Página Individual de Síntoma</h3>
      <div className="space-y-2">
        <div>
          <label htmlFor="symptomsContactButtonTitle" className="block text-sm font-medium text-gray-700 mb-1">
            {customFieldInfo.symptoms.individualPage.contactButton.title.label}
          </label>
          <input
            type="text"
            id="symptomsContactButtonTitle"
            name="symptomsContactButtonTitle"
            value={formData.symptoms?.individualPage.contactButton.title || ''}
            onChange={(e) => handleChange('symptoms', 'individualPage', { 
              ...formData.symptoms.individualPage, 
              contactButton: { 
                ...formData.symptoms.individualPage.contactButton, 
                title: e.target.value 
              } 
            })}
            className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <p className="mt-1 text-sm text-gray-500">{customFieldInfo.symptoms.individualPage.contactButton.title.description}</p>
        </div>
        <div>
          <label htmlFor="symptomsContactButtonText" className="block text-sm font-medium text-gray-700 mb-1">
            {customFieldInfo.symptoms.individualPage.contactButton.text.label}
          </label>
          <input
            type="text"
            id="symptomsContactButtonText"
            name="symptomsContactButtonText"
            value={formData.symptoms?.individualPage.contactButton.text || ''}
            onChange={(e) => handleChange('symptoms', 'individualPage', { 
              ...formData.symptoms.individualPage, 
              contactButton: { 
                ...formData.symptoms.individualPage.contactButton, 
                text: e.target.value 
              } 
            })}
            className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <p className="mt-1 text-sm text-gray-500">{customFieldInfo.symptoms.individualPage.contactButton.text.description}</p>
        </div>
        <div>
          <label htmlFor="symptomsReturnButtonText" className="block text-sm font-medium text-gray-700 mb-1">
            {customFieldInfo.symptoms.individualPage.returnButton.text.label}
          </label>
          <input
            type="text"
            id="symptomsReturnButtonText"
            name="symptomsReturnButtonText"
            value={formData.symptoms?.individualPage.returnButton.text || ''}
            onChange={(e) => handleChange('symptoms', 'individualPage', { 
              ...formData.symptoms.individualPage, 
              returnButton: { 
                ...formData.symptoms.individualPage.returnButton, 
                text: e.target.value 
              } 
            })}
            className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <p className="mt-1 text-sm text-gray-500">{customFieldInfo.symptoms.individualPage.returnButton.text.description}</p>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Photos Gallery Section */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Galería de Fotos</h2>
        <div className="space-y-4">
          <div className="mb-4">
            <label htmlFor="photosGallerySectionTitle" className="block text-sm font-medium text-gray-700 mb-1">
              {customFieldInfo.photosGallery.sectionTitle.label}
            </label>
            <input
              type="text"
              id="photosGallerySectionTitle"
              name="photosGallerySectionTitle"
              value={formData.photosGallery?.sectionTitle || ''}
              onChange={(e) => handleChange('photosGallery', 'sectionTitle', e.target.value)}
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <p className="mt-1 text-sm text-gray-500">{customFieldInfo.photosGallery.sectionTitle.description}</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Llamada a la Acción</h2>
        <div className="space-y-4">
          <div className="mb-4">
            <label htmlFor="callToActionTitle" className="block text-sm font-medium text-gray-700 mb-1">
              {customFieldInfo.callToAction.title.label}
            </label>
            <input
              type="text"
              id="callToActionTitle"
              name="callToActionTitle"
              value={formData.callToAction?.title || ''}
              onChange={(e) => handleChange('callToAction', 'title', e.target.value)}
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <p className="mt-1 text-sm text-gray-500">{customFieldInfo.callToAction.title.description}</p>
          </div>
          <div className="mb-4">
            <label htmlFor="callToActionDescription" className="block text-sm font-medium text-gray-700 mb-1">
              {customFieldInfo.callToAction.description.label}
            </label>
            <textarea
              id="callToActionDescription"
              name="callToActionDescription"
              value={formData.callToAction?.description || ''}
              onChange={(e) => handleChange('callToAction', 'description', e.target.value)}
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows={3}
            />
            <p className="mt-1 text-sm text-gray-500">{customFieldInfo.callToAction.description.description}</p>
          </div>
          <div className="mb-4">
            <label htmlFor="callToActionButtonCall" className="block text-sm font-medium text-gray-700 mb-1">
              {customFieldInfo.callToAction.buttons.call.label}
            </label>
            <input
              type="text"
              id="callToActionButtonCall"
              name="callToActionButtonCall"
              value={formData.callToAction?.buttons.call || ''}
              onChange={(e) => handleChange('callToAction', 'buttons', { ...formData.callToAction.buttons, call: e.target.value })}
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <p className="mt-1 text-sm text-gray-500">{customFieldInfo.callToAction.buttons.call.description}</p>
          </div>
          <div className="mb-4">
            <label htmlFor="callToActionButtonSchedule" className="block text-sm font-medium text-gray-700 mb-1">
              {customFieldInfo.callToAction.buttons.schedule.label}
            </label>
            <input
              type="text"
              id="callToActionButtonSchedule"
              name="callToActionButtonSchedule"
              value={formData.callToAction?.buttons.schedule || ''}
              onChange={(e) => handleChange('callToAction', 'buttons', { ...formData.callToAction.buttons, schedule: e.target.value })}
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <p className="mt-1 text-sm text-gray-500">{customFieldInfo.callToAction.buttons.schedule.description}</p>
          </div>
        </div>
      </section>

      
{/* Payments Section */}
<section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Métodos de Pago</h2>
        <div className="space-y-4">
          <div className="mb-4">
            <label htmlFor="paymentsSectionTitle" className="block text-sm font-medium text-gray-700 mb-1">
              {customFieldInfo.payments.sectionTitle.label}
            </label>
            <input
              type="text"
              id="paymentsSectionTitle"
              name="paymentsSectionTitle"
              value={formData.payments.sectionTitle}
              onChange={(e) => handleChange("payments", "sectionTitle", e.target.value)}
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <p className="mt-1 text-sm text-gray-500">{customFieldInfo.payments.sectionTitle.description}</p>
          </div>


          {formData.payments.methods.map((method, index) => (
            <div key={index} className="flex items-center space-x-2">
                              
                  <input
                    type="text"
                    id={`payments_methods_${index}_name`}
                    name={`payments_methods_${index}_name`}
                    value={method.name}
                    onChange={(e) => handleArrayChange("payments", "methods", index, "name", e.target.value)}
                    className="flex-grow px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Nombre del método de pago"
                  />

                  <input
                    type="text"
                    id={`payments_methods_${index}_iconPath`}
                    name={`payments_methods_${index}_iconPath`}
                    value={method.iconPath}
                    onChange={(e) => handleArrayChange("payments", "methods", index, "iconPath", e.target.value)}
                    className="flex-grow px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Ruta del logo"
                  />
                 <button type="button" onClick={() => handleRemoveItem("payments", "companies", index)} className="text-red-600">
          <Trash size={20} />
        </button>
                </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem("payments", "methods", { name: "", iconPath: "" })}
            className="mt-2 flex items-center text-blue-600"
            >
            <Plus size={20} className="mr-1" /> Agregar método de pago
          </button>
      
    
          <div className="mb-4">
            <label htmlFor="paymentsAdditionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
              {customFieldInfo.payments.additionalInfo.label}
            </label>
            <input
              type="text"
              id="paymentsAdditionalInfo"
              name="paymentsAdditionalInfo"
              value={formData.payments.additionalInfo}
              onChange={(e) => handleChange("payments", "additionalInfo", e.target.value)}
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <p className="mt-1 text-sm text-gray-500">{customFieldInfo.payments.additionalInfo.description}</p>
          </div>
        </div>
      </section>


    {/* Insurances Section */}
    <section className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Seguros Aceptados</h2>
  <div className="space-y-4">
    <div className="mb-4">
      <label htmlFor="insurancesSectionTitle" className="block text-sm font-medium text-gray-700 mb-1">
        {customFieldInfo.insurances.sectionTitle.label}
      </label>
      <input
        type="text"
        id="insurancesSectionTitle"
        name="insurancesSectionTitle"
        value={formData.insurances.sectionTitle}
        onChange={(e) => handleChange("insurances", "sectionTitle", e.target.value)}
        className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      <p className="mt-1 text-sm text-gray-500">{customFieldInfo.insurances.sectionTitle.description}</p>
    </div>
    

     {formData.insurances.companies.map((company, index) => (
      <div key={index} className="flex items-center space-x-2">

        <input
          type="text"
          id={`insurances_companies_${index}_name`}
          name={`insurances_companies_${index}_name`}
          value={company.name}
          onChange={(e) => handleArrayChange("insurances", "companies", index, "name", e.target.value)}
          className="flex-grow px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Nombre de la compañía de seguros"
        />

        <input
          type="text"
          id={`insurances_companies_${index}_logoPath`}
          name={`insurances_companies_${index}_logoPath`}
          value={company.logoPath}
          onChange={(e) => handleArrayChange("insurances", "companies",  index, "logoPath", e.target.value)}
          className="flex-grow px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Ruta del logo"
        />
        <button type="button" onClick={() => handleRemoveItem("insurances", "companies", index)} className="text-red-600">
          <Trash size={20} />
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={() => handleAddItem("insurances", "companies", { name: "", logoPath: "" })}
      className="mt-2 flex items-center text-blue-600"
    >
      <Plus size={20} className="mr-1" /> Agregar compañía de seguros
    </button>

    <div className="mb-4">
      <label htmlFor="insurancesAdditionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
        {customFieldInfo.insurances.additionalInfo.label}
      </label>
      <textarea
        id="insurancesAdditionalInfo"
        name="insurancesAdditionalInfo"
        value={formData.insurances.additionalInfo}
        onChange={(e) => handleChange("insurances", "additionalInfo", e.target.value)}
        className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        rows={3}
      />
      <p className="mt-1 text-sm text-gray-500">{customFieldInfo.insurances.additionalInfo.description}</p>
    </div>
  </div>
</section>




      



      {/* Testimonials Section */}
<section className="bg-white p-6 rounded-lg shadow">
  <h2 className="text-2xl font-semibold mb-4">Testimoniales</h2>
  <div className="space-y-4">
    <div className="mb-4">
      <label htmlFor="testimonialsSectionTitle" className="block text-sm font-medium text-gray-700 mb-1">
        {customFieldInfo.testimonials.sectionTitle.label}
      </label>
      <input
        type="text"
        id="testimonialsSectionTitle"
        name="testimonialsSectionTitle"
        value={formData.testimonials?.sectionTitle || ''}
        onChange={(e) => handleChange('testimonials', 'sectionTitle', e.target.value)}
        className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      <p className="mt-1 text-sm text-gray-500">{customFieldInfo.testimonials.sectionTitle.description}</p>
    </div>
    <div className="mb-4">
      <label htmlFor="testimonialsLinkText" className="block text-sm font-medium text-gray-700 mb-1">
        {customFieldInfo.testimonials.linkText.label}
      </label>
      <input
        type="text"
        id="testimonialsLinkText"
        name="testimonialsLinkText"
        value={formData.testimonials?.linkText || ''}
        onChange={(e) => handleChange('testimonials', 'linkText', e.target.value)}
        className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      <p className="mt-1 text-sm text-gray-500">{customFieldInfo.testimonials.linkText.description}</p>
    </div>
    <div className="mb-4">
      <h3 className="text-lg font-medium mb-2">Bloques de Datos</h3>
      <div className="space-y-2">
        {Object.entries(customFieldInfo.testimonials.dataBlocks).map(([key, value]) => (
          <div key={key}>
            <label htmlFor={`testimonialsDataBlocks_${key}`} className="block text-sm font-medium text-gray-700 mb-1">
              {value.label}
            </label>
            <input
              type="text"
              id={`testimonialsDataBlocks_${key}`}
              name={`testimonialsDataBlocks_${key}`}
              value={formData.testimonials?.dataBlocks[key as keyof typeof formData.testimonials.dataBlocks] || ''}
              onChange={(e) => handleChange('testimonials', 'dataBlocks', { ...formData.testimonials.dataBlocks, [key]: e.target.value })}
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <p className="mt-1 text-sm text-gray-500">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


      
      {/* Diseases Section */}
<section className="bg-white p-6 rounded-lg shadow">
  <h2 className="text-2xl font-semibold mb-4">Enfermedades</h2>
  <div className="space-y-4">
    <div className="mb-4">
      <label htmlFor="diseasesSectionTitle" className="block text-sm font-medium text-gray-700 mb-1">
        {customFieldInfo.diseases.sectionTitle.label}
      </label>
      <input
        type="text"
        id="diseasesSectionTitle"
        name="diseasesSectionTitle"
        value={formData.diseases?.sectionTitle || ''}
        onChange={(e) => handleChange('diseases', 'sectionTitle', e.target.value)}
        className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      <p className="mt-1 text-sm text-gray-500">{customFieldInfo.diseases.sectionTitle.description}</p>
    </div>
    <div className="mb-4">
      <label htmlFor="diseasesLinkText" className="block text-sm font-medium text-gray-700 mb-1">
        {customFieldInfo.diseases.linkText.label}
      </label>
      <input
        type="text"
        id="diseasesLinkText"
        name="diseasesLinkText"
        value={formData.diseases?.linkText || ''}
        onChange={(e) => handleChange('diseases', 'linkText', e.target.value)}
        className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      <p className="mt-1 text-sm text-gray-500">{customFieldInfo.diseases.linkText.description}</p>
    </div>
    <div className="mb-4">
      <label htmlFor="diseasesButtonText" className="block text-sm font-medium text-gray-700 mb-1">
        {customFieldInfo.diseases.buttonText.label}
      </label>
      <input
        type="text"
        id="diseasesButtonText"
        name="diseasesButtonText"
        value={formData.diseases?.buttonText || ''}
        onChange={(e) => handleChange('diseases', 'buttonText', e.target.value)}
        className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      <p className="mt-1 text-sm text-gray-500">{customFieldInfo.diseases.buttonText.description}</p>
    </div>
    <div className="mb-4">
      <h3 className="text-lg font-medium mb-2">Página de Enfermedades</h3>
      <div className="space-y-2">
        {Object.entries(customFieldInfo.diseases.page).map(([key, value]) => (
          <div key={key}>
            <label htmlFor={`diseasesPage_${key}`} className="block text-sm font-medium text-gray-700 mb-1">
              {value.label}
            </label>
            <input
              type="text"
              id={`diseasesPage_${key}`}
              name={`diseasesPage_${key}`}
              value={formData.diseases?.page[key as keyof typeof formData.diseases.page] || ''}
              onChange={(e) => handleChange('diseases', 'page', { ...formData.diseases.page, [key]: e.target.value })}
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <p className="mt-1 text-sm text-gray-500">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="mb-4">
      <h3 className="text-lg font-medium mb-2">Página Individual de Enfermedad</h3>
      <div className="space-y-2">
        <div>
          <label htmlFor="diseasesContactButtonTitle" className="block text-sm font-medium text-gray-700 mb-1">
            {customFieldInfo.diseases.individualPage.contactButton.title.label}
          </label>
          <input
            type="text"
            id="diseasesContactButtonTitle"
            name="diseasesContactButtonTitle"
            value={formData.diseases?.individualPage.contactButton.title || ''}
            onChange={(e) => handleChange('diseases', 'individualPage', { 
              ...formData.diseases.individualPage, 
              contactButton: { 
                ...formData.diseases.individualPage.contactButton, 
                title: e.target.value 
              } 
            })}
            className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <p className="mt-1 text-sm text-gray-500">{customFieldInfo.diseases.individualPage.contactButton.title.description}</p>
        </div>
        <div>
          <label htmlFor="diseasesContactButtonText" className="block text-sm font-medium text-gray-700 mb-1">
            {customFieldInfo.diseases.individualPage.contactButton.text.label}
          </label>
          <input
            type="text"
            id="diseasesContactButtonText"
            name="diseasesContactButtonText"
            value={formData.diseases?.individualPage.contactButton.text || ''}
            onChange={(e) => handleChange('diseases', 'individualPage', { 
              ...formData.diseases.individualPage, 
              contactButton: { 
                ...formData.diseases.individualPage.contactButton, 
                text: e.target.value 
              } 
            })}
            className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <p className="mt-1 text-sm text-gray-500">{customFieldInfo.diseases.individualPage.contactButton.text.description}</p>
        </div>
        <div>
          <label htmlFor="diseasesReturnButtonText" className="block text-sm font-medium text-gray-700 mb-1">
            {customFieldInfo.diseases.individualPage.returnButton.text.label}
          </label>
          <input
            type="text"
            id="diseasesReturnButtonText"
            name="diseasesReturnButtonText"
            value={formData.diseases?.individualPage.returnButton.text || ''}
            onChange={(e) => handleChange('diseases', 'individualPage', { 
              ...formData.diseases.individualPage, 
              returnButton: { 
                ...formData.diseases.individualPage.returnButton, 
                text: e.target.value 
              } 
            })}
            className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <p className="mt-1 text-sm text-gray-500">{customFieldInfo.diseases.individualPage.returnButton.text.description}</p>
        </div>
      </div>
    </div>
  </div>
</section>


      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors flex items-center"
          disabled={isLoading}
        >
          <Save className="w-5 h-5 mr-2" />
          {isLoading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>
    </form>
  )
}

