"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Stethoscope } from "lucide-react"
import type { SiteContent } from "../../../interfaces/SiteContent"

type SymptomsContent = Pick<SiteContent, "symptoms" | "symptomsDataMetadata">

export default function SymptomsSection() {
  const [content, setContent] = useState<SymptomsContent | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      const siteContentModule = await import("../../../data/site-content.json")
      const symptomsDataMetadataModule = await import("../../../data/symptomsDataMetadata.json")

      setContent({
        symptoms: siteContentModule.default.symptoms,
        symptomsDataMetadata: symptomsDataMetadataModule,
      } as SymptomsContent)
    }
    loadContent()
  }, [])

  if (!content) {
    return <div>Loading...</div>
  }

  // Limit to 6 symptoms for the home page
  const displayedSymptoms = content.symptomsDataMetadata.symptoms.slice(0, 3)

  return (
    <section className="py-16 bg-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-lg text-dw-soft font-bold uppercase mb-4 text-center">{content.symptoms.sectionTitle}</h2>
        <h3 className="text-4xl text-dw-dark font-extrabold mb-12 text-center">{content.symptoms.sectionSubtitle}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedSymptoms.map((symptom) => (
            <div key={symptom.id} className="bg-white p-6 rounded-lg flex items-start">
              <Stethoscope className="w-6 h-6 text-pink-500 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">{symptom.name}</h3>
                <p className="text-gray-600 mb-4">{symptom.shortDescription}</p>
                <Link href={`/sintomas/${symptom.id}`} className="text-pink-600 hover:text-pink-800 font-semibold">
                  {content.symptoms.linkText}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/sintomas"
            className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition-colors"
          >
            {content.symptoms.buttonText}
          </Link>
        </div>
      </div>
    </section>
  )
}

