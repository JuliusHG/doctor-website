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
        <h2 className="text-lg text-dw-soft font-bold uppercase mb-4 text-center">{content.diseasesSection.sectionTitle}</h2>
        <h3 className="text-5xl text-dw-dark font-extrabold mb-12 text-center">{content.diseasesSection.sectionSubtitle}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedDiseases.map((disease) => (
            <div key={disease.id} className="bg-white rounded-lg overflow-hidden">
              <Image
                src={disease.imageHome || "/placeholder.svg"}
                alt={disease.name}
                width={400}
                height={400}
                className="
                w-full h-48
                object-cover
                transition-transform duration-300 hover:scale-105
                rounded-tl-none rounded-br-none rounded-tr-xl rounded-bl-xl
                hover:rounded-tl-xl hover:rounded-br-xl hover:rounded-tr-none hover:rounded-bl-none
                transition-all duration-800
                "
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{disease.name}</h3>
                <p className="text-gray-600 mb-4">{disease.shortDescription}</p>
                <Link href={`/enfermedades/${disease.id}`} className="text-dw-dark hover:text-0 hover:bg-dw-dark font-semibold">
                  {content.diseasesSection.linkText}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
            <Link
                href="/enfermedades"
                className="
                bg-dw-soft
                text-white
                px-6 py-3
                hover:bg-dw-dark
                transition-colors 
                rounded-tl-none rounded-br-none rounded-tr-xl rounded-bl-xl
                hover:rounded-tl-xl hover:rounded-br-xl hover:rounded-tr-none hover:rounded-bl-none
                transition-all duration-800
            ">
            {content.diseasesSection.buttonText}
          </Link>
        </div>
      </div>
    </section>
  )
}

