/**
 * @section-description Primera Hero section diseñada (j), como default. Contiene la información básica, botones y una imagen de fondo.
 */


"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import type { SiteContent } from "../../../interfaces/SiteContent"
import ButtonCallNow from "../common/ButtonCallNow"
import ButtonWhatsapp from "../common/ButtonWhatsapp"

type HeroSectionContent = Pick<SiteContent, "doctorInfo" | "heroSection" | "buttons">

export default function HeroSection() {
  const [content, setContent] = useState<HeroSectionContent | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
      const loadContent = async () => {
        try {
          const rawContent = (await import("../../../data/site-content.json")).default
          const heroSectionContent: HeroSectionContent = {
            doctorInfo: rawContent.doctorInfo,
            heroSection: rawContent.heroSection,
            buttons: rawContent.buttons
          }
          setContent(heroSectionContent)
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

  const { doctorInfo, heroSection } = content
  const { btnCallText, btnMessageText } = content.buttons

  return (
    <section
      className="relative flex flex-col items-center justify-center text-white overflow-hidden"
      style={{ height: `${heroSection.heroSectionHeight}px` }}
    >
      <Image
        src={heroSection.mainImage || "/placeholder.svg"}
        alt="Doctor's office"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">{doctorInfo.name}</h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white">{doctorInfo.specialty}</p>
        <div className="space-x-4">
          <ButtonCallNow phone={content.doctorInfo.phone} defaultText={btnCallText} />
          <ButtonWhatsapp whatsapp={content.doctorInfo.whatsapp} defaultText={btnMessageText} />
        </div>
      </div>
    </section>
  )
}

