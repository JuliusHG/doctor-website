"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import type { SiteContent } from "../../../interfaces/SiteContent"

type AboutUsContent = Pick<SiteContent, "aboutUs">

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

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!content) return null

  const { aboutUs } = content

  // Replace the placeholder with the actual years of experience
  const formattedDescription = aboutUs.description.replace("{yearsOfExperience}", aboutUs.yearsOfExperience.toString())

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{aboutUs.sectionTitle}</h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src={aboutUs.imagePath || "/placeholder.svg"}
              alt={aboutUs.title}
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h3 className="text-2xl font-bold mb-6">{aboutUs.title}</h3>
            <p className="text-gray-700 mb-4 whitespace-pre-wrap">{formattedDescription}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

