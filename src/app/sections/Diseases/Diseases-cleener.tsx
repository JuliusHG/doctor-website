"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import type { SiteContent } from "../../../interfaces/SiteContent"

type DiseasesContent = Pick<SiteContent, "diseasesSection" | "diseasesDataMetadata">

const DiseasesSection = () => {
  const [content, setContent] = useState<DiseasesContent | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      const siteContentModule = await import("../../../data/site-content.json")
      const diseasesDataMetadataModule = await import("../../../data/diseasesDataMetadata.json")

      setContent({
        diseasesSection: siteContentModule.default.diseasesSection,
        diseasesDataMetadata: diseasesDataMetadataModule,
      } as DiseasesContent)
    }
    loadContent()
  }, [])

  if (!content) {
    return <div>Loading...</div>
  }

  // Limit to 6 diseases for the home page
  const displayedDiseases = content.diseasesDataMetadata.diseases.slice(0, 6)

  return (
    <div className="w-full py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="mb-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* <h2 className="text-3xl text-dw-dark font-bold mb-4">{content.diseasesSection.sectionTitle}</h2> */}
            <h2 className="text-6xl text-dw-darker font-bold mb-4">{content.diseasesSection.sectionSubtitle}</h2>
            <p className="text-gray-600">{content.diseasesSection.sectionText}</p>
          </div>
        </div>

        {/* Diseases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 justify-items-center">
          {displayedDiseases.map((disease) => (
            <div
              key={disease.id}
              className="group relative bg-white rounded-lg p-8 w-full max-w-[340px] h-[340px] transition-all duration-500 ease-in-out hover:bg-dw-dark"
            >
              {/* Icon Container */}
                            <div className="mb-8 relative">
                              <div className="w-64 h-64 mx-auto rounded-full bg-white flex items-center justify-center transition-colors duration-500 ease-in-out">
                                <div className="relative aspect-[4/2] w-full">
                                  <Image
                                  src={disease.imageHome || "/placeholder.svg"}
                                  alt={disease.name}
                                  fill
                                  className="object-cover rounded-lg transition-all duration-500 ease-in-out"
                                  />
                                </div>
                                {/* <div className="relative aspect-[4/2] w-full">
                                  <Image
                                    src={disease.imageIndividual || "/placeholder.svg"}
                                    alt={disease.name}
                                    fill
                                    className="object-cover rounded-lg"
                                  />
                                </div> */}
                              </div>
                            </div>

              {/* Content */}
              <div className="text-center relative z-10">
                <h3 className="text-xl text-dw-dark font-semibold mb-3 transition-colors duration-500 ease-in-out group-hover:text-white">
                  <Link href={`/enfermedades/${disease.id}`}>{disease.name}</Link>
                </h3>
                <p className="text-gray-500 mb-4 transition-colors duration-500 ease-in-out group-hover:text-white/90">
                  {disease.shortDescription}
                </p>
              </div>

              {/* Bottom Gradient Overlay */}
              <div
                className="absolute inset-x-0 bottom-0 h-[60%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out rounded-b-lg"
                style={{
                  background: "linear-gradient(to top, rgba(255,255,255,0.4) 0%, rgba(59,130,246,0) 100%)",
                }}
              />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/enfermedades"
            className="border-2 border-dw-dark text-dw-dark px-8 py-3 rounded-lg hover:bg-dw-dark hover:text-white transition-colors text-lg font-semibold inline-block"
          >
            {content.diseasesSection.buttonText}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DiseasesSection

