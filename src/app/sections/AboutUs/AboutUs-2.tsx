"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import type { SiteContent } from "../../../interfaces/SiteContent"

type AboutUsContent = Pick<SiteContent, "aboutUs" | "doctorInfo">

export default function AboutUsSection() {
  const [content, setContent] = useState<AboutUsContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const siteContent = await import("../../../data/site-content.json")
        setContent(siteContent as AboutUsContent)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load content"))
      } finally {
        setLoading(false)
      }
    }
    loadContent()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!content) return null

  const { aboutUs, doctorInfo } = content

  // Replace the placeholder with the actual years of experience
  const formattedDescription = aboutUs.description.replace("{yearsOfExperience}", aboutUs.yearsOfExperience.toString())

  return (
    <section className="py-16 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 relative">
            <div className="relative h-[600px]">
              
              <Image
                src={aboutUs.imagePath || "/placeholder.svg"}
                alt="Doctor consultation"
                fill
                style={{ objectFit: "contain" }}
                className="rounded-xl"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            {/* <h5 className="text-lg font-bold text-dw-dark mb-2">{aboutUs.sectionTitle}</h5> */}
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-dw-darker">{aboutUs.title}</h3>
            {formattedDescription.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-gray-800 text-base md:text-lg leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
            <div className="flex flex-row items-center h-full mt-8">
              <div className="flex items-center justify-center h-40 mb-4 w-full">
                 <Image
                  src={"/images/certifications/UNACH.png"}
                  alt={"UNACH"}
                  width={230}
                  height={230}
                  className="object-contain max-h-full max-w-full"
                  />
              </div>
              <div className="flex items-center justify-center h-40 mb-4 w-full">
                 <Image
                  src={"/images/certifications/UNAM.png"}
                  alt={"UNAM"}
                  width={230}
                  height={230}
                  className="object-contain max-h-full max-w-full"
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

