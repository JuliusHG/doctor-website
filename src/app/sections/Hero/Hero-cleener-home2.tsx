/**
 * @section-description Hero (cleener) con espacio para imagen en foreground, y texto descriptivo, con gradiente incluido entre imagen y fondo.
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

  useEffect(() => {
    const loadContent = async () => {
      const rawContent = (await import("../../../data/site-content.json")).default
      const heroSectionContent: HeroSectionContent = {
        doctorInfo: rawContent.doctorInfo,
        heroSection: rawContent.heroSection,
        buttons: rawContent.buttons
      }
      console.log("Processed content:", heroSectionContent)

      setContent(heroSectionContent)
    }
    loadContent()
  }, [])

  if (!content) {
    return <div>Loading...</div>
  }

  const {
    mainImage,
    heroSectionHeight,
    overlayOpacity,
    backgroundHeroImage,
    backgroundHeroImageHeightPercent,
  } = content.heroSection

  const { btnCallText, btnMessageText } = content.buttons

  // Create the gradient style
  const gradientStyle = {
    background: `linear-gradient(to right, 
      hsl(var(--dw-dark) / ${overlayOpacity}) 0%, 
      hsl(var(--dw-dark) / ${overlayOpacity}) 45%, 
      hsl(var(--dw-dark) / 0) 65%, 
      hsl(var(--dw-dark) / 0) 100%)`,
  }

  return (
    <section
      className="relative flex items-center justify-between text-white overflow-hidden"
      style={{ height: `${heroSectionHeight}px` }}
    >
      <Image
        src={mainImage || "/placeholder.svg"}
        alt="Doctor's office"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0" style={gradientStyle}></div>

      <div className="relative z-10 flex w-full h-full">
        {/* Left column */}
        <div className="w-full md:w-1/2 flex items-center justify-left px-4 md:px-8 lg:px-16 xl:px-24">
          <div className="flex flex-col justify-center h-full py-8 md:py-16">
            <h1 className="text-5xl font-bold md:font-stretch-75% md:text-6xl lg:text-7xl text-white text-left">
              {content.heroSection.title}
            </h1>
            <p className="text-lg md:text-xl lg:text-lg text-white border-l-2 pl-4 my-4">
              {content.heroSection.description}
            </p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              <ButtonCallNow phone={content.doctorInfo.phone} defaultText={btnCallText} />
              <ButtonWhatsapp whatsapp={content.doctorInfo.whatsapp} defaultText={btnMessageText} />
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="hidden md:flex w-1/2 items-end justify-center">
          {/* <div className="w-full relative" style={{ height: `${backgroundHeroImageHeightPercent}%` }}>
            <Image
              src={backgroundHeroImage || "/placeholder.svg"}
              alt={content.doctorInfo.name}
              layout="fill"
              objectFit="contain"
              objectPosition="bottom center"
              priority
            />
          </div> */}
        </div>
      </div>
    </section>
  )
}