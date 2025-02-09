"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import type { SiteContent } from "../../../interfaces/SiteContent"

type DiseasesContent = Pick<SiteContent, "diseasesSection" | "diseasesDataMetadata">

export default function DiseasesSection2() {
  const [content, setContent] = useState<DiseasesContent | null>(null)
  const [activeTab, setActiveTab] = useState(0)

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

  // Limit to 5 diseases
  const displayedDiseases = content.diseasesDataMetadata.diseases.slice(0, 5)

  return (
    <section
      className="py-16 relative"
      style={{
        backgroundImage: `url(${content.diseasesSection.page.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-pink-900/80" />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-2xl mb-2 text-center text-white">{content.diseasesSection.sectionTitle}</h2>
        <h2 className="text-4xl font-extrabold mb-12 text-center text-white">
          {content.diseasesSection.sectionSubtitle}
        </h2>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex flex-wrap border-b">
            {displayedDiseases.map((disease, index) => (
              <button
                key={disease.id}
                onClick={() => setActiveTab(index)}
                className={`py-4 px-2 sm:px-6 text-center font-semibold transition-colors
                  ${index < 3 ? "w-1/3" : "w-1/2"}
                  ${activeTab === index ? "bg-pink-600 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
              >
                <div className="text-sm md:text-base">{disease.name}</div>
                <div className="text-xs text-green-50/80">Enfermedades</div>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {displayedDiseases.map((disease, index) => (
              <div key={disease.id} className={`${activeTab === index ? "grid md:grid-cols-2 gap-8" : "hidden"}`}>
                <div className="flex flex-col justify-between min-h-[360px] p-8 bg-white rounded-lg">
                  <div className="space-y-8 flex-grow flex flex-col justify-center">
                    <h3 className="text-4xl font-bold text-gray-800">{disease.name}</h3>
                    <p className="text-gray-600 text-2xl leading-relaxed">{disease.shortDescription}</p>
                  </div>
                  <div className="mt-8">
                    <Link
                      href={`/enfermedades/${disease.id}`}
                      className="inline-block bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors"
                    >
                      {content.diseasesSection.linkText}
                    </Link>
                  </div>
                </div>
                <div className="relative aspect-[4/2] w-full">
                  <Image
                    src={disease.imageIndividual || "/placeholder.svg"}
                    alt={disease.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

