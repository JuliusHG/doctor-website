/**
 * @section-description Hero default (jh) con imagen para una silueta recortada del médico.
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
    overlayColor,
    overlayOpacity,
    logoHeight,
    backgroundHeroImage,
    backgroundHeroImageHeightPercent,
  } = content.heroSection

  const { btnCallText, btnMessageText } = content.buttons

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
      <div className="absolute inset-0" style={{ backgroundColor: overlayColor, opacity: overlayOpacity }}></div>

      <div className="relative z-10 flex w-full h-full">
        {/* Left column */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-4 md:px-8 lg:px-16">
          <div className="flex flex-col items-center md:items-center space-y-4 text-center md:text-left">
            {/* <Image
              src={content.doctorInfo.logoPath || "/placeholder.svg"}
              alt="Doctor's logo"
              width={logoHeight}
              height={logoHeight}
              className="mb-4"
            /> */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl uppercase text-white text-center w-full">
              {content.doctorInfo.name}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white">{content.doctorInfo.specialty}</p>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4">
              <ButtonCallNow phone={content.doctorInfo.phone} defaultText={btnCallText} />
              <ButtonWhatsapp whatsapp={content.doctorInfo.whatsapp} defaultText={btnMessageText} />
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="hidden md:flex w-1/2 items-end justify-center">
          <div className="w-full relative" style={{ height: `${backgroundHeroImageHeightPercent}%` }}>
            <Image
              src={backgroundHeroImage || "/placeholder.svg"}
              alt={content.doctorInfo.name}
              layout="fill"
              objectFit="contain"
              objectPosition="bottom center"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

