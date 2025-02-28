"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import type { SiteContent } from "../../../interfaces/SiteContent"
import "../../../app/custom-styles.css"

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

  // Limit to 3 symptoms for the home page
  const displayedSymptoms = content.symptomsDataMetadata.symptoms.slice(0, 3)

  return (
    <section className="py-16 bg-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-lg text-dw-soft font-bold uppercase mb-4 text-center">{content.symptoms.sectionTitle}</h2>
        <h3 className="text-5xl text-dw-dark font-extrabold mb-12 text-center">{content.symptoms.sectionSubtitle}</h3>

        {/* Card container with centered cards */}
        <div className="flex flex-wrap justify-center gap-8">
          {displayedSymptoms.map((symptom) => (
            <div
              key={symptom.id}
              className="bg-white rounded-lg flex-shrink-0 w-full max-w-[360px] shadow-[0_0_15px_rgba(0,0,0,0.05)] overflow-hidden"
            >
              <div className="p-6 pb-0">
                <h3 className="text-2xl/6 font-extrabold mb-8 px-2 h-8 text-center">{symptom.name}</h3>
                <p className="text-base/5 text-gray-600 text-center border-t mb-12 px-4 pt-2 h-8">
                  {symptom.shortDescription}
                </p>
              </div>

              {/* Image container with hover effect */}
              <div className="w-full h-[380px] relative overflow-hidden group-curtain">
                <Image
                  src={symptom.imageHome || "/placeholder.svg?height=380&width=500"}
                  alt={symptom.name}
                  width={500}
                  height={380}
                  className="w-full h-full rounded-lg object-cover"
                />
                <div className="absolute inset-x-0 top-0 h-full bg-gray-800 bg-opacity-70 rounded-lg overlay-animation"></div>
                <Link
                  href={`/sintomas/${symptom.id}`}
                  className="
                    absolute
                    top-1/2 left-1/2
                    bg-white text-dw-soft
                    hover:bg-dw-soft hover:text-white
                    px-6 py-3
                    rounded-tl-none rounded-br-none rounded-tr-xl rounded-bl-xl
                    hover:rounded-tl-xl hover:rounded-br-xl hover:rounded-tr-none hover:rounded-bl-none
                    transition-all duration-800
                    font-semibold duration-300 button-animation"
                >
                  {content.symptoms.linkText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/sintomas"
            className="
            bg-dw-soft
            text-white
            px-6 py-3
            hover:bg-dw-dark
            transition-colors 
            rounded-tl-none rounded-br-none rounded-tr-xl rounded-bl-xl
            hover:rounded-tl-xl hover:rounded-br-xl hover:rounded-tr-none hover:rounded-bl-none
            transition-all duration-800"
          >
            {content.symptoms.buttonText}
          </Link>
        </div>
      </div>
    </section>
  )
}
