/**
 * @section-description Certificaciones (experimental/demostrativa), sólo se hizo para mostrar que puede seleccionarse uno de los elementos y mostrarlo a la derecha y/o en una lightbox.
 */

"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import type { SiteContent } from "@/src/interfaces/SiteContent"
import type React from "react" // Added import for React

type CertificationsContent = Pick<SiteContent, "certifications">

interface LightboxProps {
  imagePath: string
  alt: string
  onClose: () => void
}

const Lightbox: React.FC<LightboxProps> = ({ imagePath, alt, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative w-full h-full max-w-screen-lg max-h-screen flex items-center justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="absolute top-2 right-2 text-white hover:text-gray-300 z-10"
          aria-label="Close lightbox"
        >
          <X size={24} />
        </button>
        <div className="relative w-full h-full">
          <Image
            src={imagePath || "/placeholder.svg"}
            alt={alt}
            fill
            style={{ objectFit: "contain" }}
            className="max-w-full max-h-full"
          />
        </div>
      </div>
    </div>
  )
}

export default function CertificationsSection() {
  const [content, setContent] = useState<CertificationsContent | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [lightbox, setLightbox] = useState<{ open: boolean; image: string; alt: string }>({
    open: false,
    image: "",
    alt: "",
  })
  const [isMobile, setIsMobile] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const siteContentModule = await import("@/src/data/site-content.json")
        setContent({ certifications: siteContentModule.default.certifications })
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load content"))
      }
    }
    loadContent()

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (content && content.certifications.entities.length > 0) {
      const firstVisibleEntity = content.certifications.entities.find((entity) => entity.visible)
      if (firstVisibleEntity) {
        setSelectedImage(firstVisibleEntity.imagePath)
      }
    }
  }, [content])

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!content) {
    return <div>Loading...</div>
  }

  const { certifications } = content

  const openLightbox = (imagePath: string, alt: string) => {
    setLightbox({ open: true, image: imagePath, alt })
  }

  const closeLightbox = () => {
    setLightbox({ open: false, image: "", alt: "" })
  }

  const handleImageClick = (imagePath: string, alt: string) => {
    if (isMobile) {
      openLightbox(imagePath, alt)
    } else {
      setSelectedImage(imagePath)
    }
  }

  const visibleImages = [
    ...certifications.entities.filter((entity) => entity.visible),
    ...certifications.documents.filter((document) => document.visible),
  ]

  return (
    <section className="py-12 bg-white-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">{certifications.sectionTitle}</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-3/5">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
              {visibleImages.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => handleImageClick(item.imagePath, item.name)}
                >
                  <div className="aspect-square relative w-full mb-3">
                    <Image
                      src={item.imagePath || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="rounded-lg"
                    />
                  </div>
                  <p className="text-xs text-center mt-1">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:block md:w-2/5">
            {selectedImage && (
              <div
                className="relative h-[400px] cursor-pointer"
                onClick={() => openLightbox(selectedImage, "Selected Image")}
              >
                <Image
                  src={selectedImage || "/placeholder.svg"}
                  alt="Certificate"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {lightbox.open && <Lightbox imagePath={lightbox.image} alt={lightbox.alt} onClose={closeLightbox} />}
    </section>
  )
}

