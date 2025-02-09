/**
 * @section-description Sección AboutMe muy sencilla, título de sección, título y descripción, con una imagen de fondo que desvanece a blancos a la derecha. Puede invertirse en espejo.
 */

"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import type { SiteContent } from "../../../interfaces/SiteContent"
import type React from "react" // Added import for React

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
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={aboutUs.backgroundImagePath || "/placeholder.svg"}
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
        />
        <div
          className="absolute inset-0"
          style={
            {
              background:
                "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,1) 100%)",
              "--fade-start": "50%",
              "--fade-mid": "75%",
            } as React.CSSProperties
          }
        ></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-end">
          <div className="w-full md:w-1/2">
            <h5 className="text-lg font-bold text-gray-700 mb-2">{aboutUs.sectionTitle}</h5>
            <h3 className="text-4xl md:text-5xl font-extrabold mb-6 text-pink-600">{aboutUs.title}</h3>
            <p className="text-gray-500 text-xl leading-relaxed">{formattedDescription}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

