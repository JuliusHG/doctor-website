/**
 * @section-description Certificaciones sección estática (jh) - default.
 */

"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import type { SiteContent } from "@/src/interfaces/SiteContent"

type CertificationsContent = Pick<SiteContent, "certifications">

export default function CertificationsSection() {
  const [content, setContent] = useState<CertificationsContent | null>(null)
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
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!content) {
    return <div>Loading...</div>
  }

  const { certifications } = content

  const visibleItems = [
    ...certifications.entities.filter((entity) => entity.visible),
    ...certifications.documents.filter((document) => document.visible),
  ]

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl text-[#4C8D90] font-bold mb-8 text-center">{certifications.sectionTitle}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {visibleItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center h-full">
              <div className="flex items-center justify-center h-40 mb-4 w-full">
                <Image
                  src={item.imagePath || "/placeholder.svg"}
                  alt={item.name}
                  width={160}
                  height={160}
                  className="object-contain max-h-full max-w-full"
                />
              </div>
              <h2 className="text-base font-bold">{item.nameTitle}</h2>
              <p className="text-center text-base">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

