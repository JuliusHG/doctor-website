/**
 * @section-description Galería de fotos sencilla (jh), con título de la sección arriba, imagen en slider y bullets redondos abajo.
 */

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { SiteContent } from "@/src/interfaces/SiteContent"

type PhotosGalleryContent = Pick<SiteContent, "photosGallery">

interface Photo {
  id: number
  src: string
  alt: string
}

const photos: Photo[] = [
  { id: 1, src: "/images/gallery/before-after-1.jpg", alt: "Antes y después 1" },
  { id: 2, src: "/images/gallery/clinic-1.jpg", alt: "Clínica 1" },
  { id: 3, src: "/images/gallery/surgery-team.jpg", alt: "Equipo quirúrgico" },
  { id: 4, src: "/images/gallery/before-after-2.jpg", alt: "Antes y después 2" },
  { id: 5, src: "/images/gallery/consultation.jpg", alt: "Consulta" },
  { id: 6, src: "/images/gallery/clinic-2.jpg", alt: "Clínica 2" },
]

export default function PhotosGallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [content, setContent] = useState<PhotosGalleryContent | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const siteContentModule = await import("@/src/data/site-content.json")
        setContent({ photosGallery: siteContentModule.default.photosGallery })
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load content"))
      }
    }

    loadContent()
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length)
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!content) {
    return <div>Loading...</div>
  }

  const { photosGallery } = content

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{photosGallery.sectionTitle}</h2>
        <div className="relative">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <Image
              src={photos[currentIndex].src || "/placeholder.svg"}
              alt={photos[currentIndex].alt}
              width={1200}
              height={800}
              className="w-full h-[300px] md:h-[400px] lg:h-[600px] object-cover"
            />
          </div>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-white p-1 md:p-2 rounded-full shadow-md"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-gray-800" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-white p-1 md:p-2 rounded-full shadow-md"
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-gray-800" />
          </button>
        </div>
        <div className="flex justify-center mt-4">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full mx-1 md:mx-2 ${
                index === currentIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

