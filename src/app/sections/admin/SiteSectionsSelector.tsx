"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import Image from "next/image"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import sectionModels from "../../../data/section-models.json"

const Lightbox: React.FC<{ src: string; onClose: () => void }> = ({ src, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="relative  w-[80vw] h-[80vh]"> {/* max-w-6xl max-h-6xl */}
        <Image
          src={src || "/placeholder.svg"}
          alt="Enlarged preview"
          fill
          objectFit="contain"
          className="rounded-lg"
        />
      </div>
    </div>
  )
}

type SectionType = keyof typeof sectionModels

interface SectionModel {
  file: string
  imagePath: string | null
  description: string | null
}

interface SectionOption {
  type: SectionType
  name: string
  options: SectionModel[]
}

interface SelectedSection {
  component: string
  display: boolean
}

const sectionNames: Record<string, string> = {
  Header: "Header",
  NavMenu: "Nav Menu",
  Hero: "Hero section",
  Certifications: "Certifications",
  AboutUs: "About Us",
  Experience: "Experience",
  Purpose: "Purpose",
  CallToAction: "Call to Action",
  Services: "Services",
  Symptoms: "Síntomas",
  Diseases: "Enfermedades",
  Testimonials: "Testimoniales",
  PhotosGallery: "Galería de fotos",
  PaymentMethods: "Métodos de Pago",
  Insurance: "Seguros Aceptados",
  GeneralCallToAction: "Call to Action (general)",
  CallToActionIndividual: "Call to Action (individual)",
  Footer: "Footer",
}

const SiteSectionsSelector: React.FC = () => {
  const selectedSectionsRef = useRef<Record<string, SelectedSection>>({})
  const [, forceUpdate] = useState({})
  const [imageSrc, setImageSrc] = useState<Record<string, string | null>>({})
  const [descriptions, setDescriptions] = useState<Record<string, string | null>>({})
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const sectionOptions: SectionOption[] = useMemo(
    () =>
      Object.entries(sectionModels).map(([key, value]) => ({
        type: key as SectionType,
        name: sectionNames[key] || key,
        options: (value as SectionModel[]).sort((a, b) => a.file.localeCompare(b.file)),
      })),
    [],
  )

  const fetchSelectedSections = useCallback(async () => {
    const response = await fetch("/api/selected-sections")
    const data = await response.json()
    selectedSectionsRef.current = data
    forceUpdate({})

    // Set initial image sources and descriptions
    const initialImageSrc: Record<string, string | null> = {}
    const initialDescriptions: Record<string, string | null> = {}
    Object.entries(data).forEach(([type, section]) => {
      const selectedOption = sectionOptions
        .find((s): s is SectionOption => s.type === type)
        ?.options.find((option) => option.file === (section as SelectedSection).component)

      if (selectedOption?.imagePath) {
        initialImageSrc[type] = `/api/component-image?type=${type}&image=${selectedOption.imagePath}`
      } else {
        initialImageSrc[type] = null
      }

      initialDescriptions[type] = selectedOption?.description || null
    })
    setImageSrc(initialImageSrc)
    setDescriptions(initialDescriptions)
  }, [sectionOptions])

  useEffect(() => {
    fetchSelectedSections()
  }, [fetchSelectedSections])

  const handleSectionChange = (type: string, value: string) => {
    console.log(`Changing section ${type} to ${value}`)

    // Update the ref directly
    selectedSectionsRef.current = {
      ...selectedSectionsRef.current,
      [type]: {
        ...selectedSectionsRef.current[type],
        component: value,
      },
    }
    // Force a re-render
    forceUpdate({})

    const selectedOption = sectionOptions
      .find((section): section is SectionOption => section.type === type)
      ?.options.find((option) => option.file === value)

    if (selectedOption?.imagePath) {
      const newImageSrc = `/api/component-image?type=${type}&image=${selectedOption.imagePath}`
      console.log(`Setting image src for ${type} to: ${newImageSrc}`)
      setImageSrc((prev) => ({
        ...prev,
        [type]: newImageSrc,
      }))
    } else {
      console.log(`No image path found for ${type} - ${value}`)
      setImageSrc((prev) => ({
        ...prev,
        [type]: null,
      }))
    }

    setDescriptions((prev) => ({
      ...prev,
      [type]: selectedOption?.description || null,
    }))
  }

  const handleDisplayToggle = (type: string) => {
    selectedSectionsRef.current = {
      ...selectedSectionsRef.current,
      [type]: {
        ...selectedSectionsRef.current[type],
        display: !selectedSectionsRef.current[type]?.display,
      },
    }
    forceUpdate({})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/selected-sections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedSectionsRef.current),
      })
      if (response.ok) {
        alert("Secciones seleccionadas guardadas.")
      } else {
        throw new Error("No pudieron guardarse las secciones")
      }
    } catch (error) {
      console.error("Error al actualizar las secciones:", error)
      alert("No pudieron actualizarse las secciones. Intentar de nuevo.")
    }
  }

  const handleUpdateSections = async () => {
    try {
      const response = await fetch("/api/update-sections", { method: "POST" })
      if (response.ok) {
        alert("Componentes de secciones actualizados")
        window.location.reload()
      } else {
        throw new Error("Error al actualizar componentes")
      }
    } catch (error) {
      console.error("Error al actualizar componentes:", error)
      alert("Error al actualizar componentes. Intentar de nuevo.")
    }
  }

  const openLightbox = (src: string) => {
    setLightboxImage(src)
  }

  const closeLightbox = () => {
    setLightboxImage(null)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10 p-8 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Secciones</h2>
      {sectionOptions.map((section) => (
        <div key={section.type} className="space-y-2 pb-6 mb-6 border-b border-gray-200">
          <label htmlFor={section.type} className="block text-2xl font-bold text-gray-900 mb-2">
            {section.name}
          </label>
          <div className="flex items-start space-x-4 mt-2">
            <div className="w-2/5 space-y-2">
              <select
                id={section.type}
                value={selectedSectionsRef.current[section.type]?.component || ""}
                onChange={(e) => handleSectionChange(section.type, e.target.value)}
                className="w-full pl-3 pr-10 py-3 text-lg border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
              >
                <option value="">Select a section</option>
                {section.options.map((option) => (
                  <option key={option.file} value={option.file}>
                    {option.file.replace(".tsx", "")}
                  </option>
                ))}
              </select>
              <div className="flex items-center space-x-2">
                <Switch
                  id={`display-${section.type}`}
                  checked={selectedSectionsRef.current[section.type]?.display ?? true}
                  onCheckedChange={() => handleDisplayToggle(section.type)}
                />
                <Label htmlFor={`display-${section.type}`}>Visible</Label>
              </div>
            </div>
            <div className="w-3/5 space-y-2">
              <div className="h-[250px] relative">
                {imageSrc[section.type] ? (
                  <Image
                    src={imageSrc[section.type] || "/placeholder.svg"}
                    alt={`Preview of ${selectedSectionsRef.current[section.type]?.component}`}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-md cursor-pointer"
                    onClick={() => openLightbox(imageSrc[section.type] || "")}
                    onError={(e) => {
                      console.error(`Error loading image: ${imageSrc[section.type]}`, e)
                      setImageSrc((prev) => ({
                        ...prev,
                        [section.type]: null,
                      }))
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-md">
                    No hay imagen disponible
                  </div>
                )}
              </div>
              {descriptions[section.type] && <p className="text-sm text-gray-600 mt-2">{descriptions[section.type]}</p>}
            </div>
          </div>
        </div>
      ))}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
        <div className="container mx-auto flex space-x-4">
          <button
            type="submit"
            className="w-3/5 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Guardar secciones
          </button>
          <button
            type="button"
            onClick={handleUpdateSections}
            className="w-2/5 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Actualizar secciones
          </button>
        </div>
      </div>
      {lightboxImage && <Lightbox src={lightboxImage} onClose={closeLightbox} />}
    </form>
  )
}

export default SiteSectionsSelector
