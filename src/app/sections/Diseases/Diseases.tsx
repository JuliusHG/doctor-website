"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import type { SiteContent } from "../../../interfaces/SiteContent"

type DiseasesContent = Pick<SiteContent, "diseasesSection" | "diseasesDataMetadata">

export default function DiseasesSection() {
  const [content, setContent] = useState<DiseasesContent | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      const siteContent = await import("../../../data/site-content.json")
      const diseasesDataMetadata = await import("../../../data/diseasesDataMetadata.json")
      setContent({
        diseasesSection: siteContent.diseasesSection,
        diseasesDataMetadata: diseasesDataMetadata,
      } as DiseasesContent)
    }
    loadContent()
  }, [])

  if (!content) {
    return <div>Loading...</div>
  }

  // Limit to 3 diseases for the home page
  const displayedDiseases = content.diseasesDataMetadata.diseases.slice(0, 3)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">{content.diseasesSection.sectionTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedDiseases.map((disease) => (
            <div key={disease.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={disease.imageHome || "/placeholder.svg"}
                alt={disease.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{disease.name}</h3>
                <p className="text-gray-600 mb-4">{disease.shortDescription}</p>
                <Link href={`/enfermedades/${disease.id}`} className="text-pink-600 hover:text-pink-800 font-semibold">
                  {content.diseasesSection.linkText}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/enfermedades"
            className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition-colors"
          >
            {content.diseasesSection.buttonText}
          </Link>
        </div>
      </div>
    </section>
  )
}

