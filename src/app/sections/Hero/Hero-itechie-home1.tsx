/**
 * @section-description Hero section adaptada de itechie home 1. Tiene info, máscara de recorte con parallax y movimiento con framer-motion.
 */

"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { useParallax } from "../../../hooks/useParallax"
import type { SiteContent } from "../../../interfaces/SiteContent"
import ButtonCallNow from "../common/ButtonCallNow"
import ButtonWhatsapp from "../common/ButtonWhatsapp"

type HeroSectionContent = Pick<SiteContent, "doctorInfo" | "heroSection" | "buttons">

export default function HeroSection() {
  const [content, setContent] = useState<HeroSectionContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const { x: parallaxX, y: parallaxY } = useParallax(containerRef, 20)
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      backgroundPositionX: `${50 + parallaxX * 5}%`,
      backgroundPositionY: `${50 + parallaxY * 5}%`,
    })
  }, [parallaxX, parallaxY, controls])

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

  const {
    mainImage,
    heroSectionHeight,
    overlayColor,
    overlayOpacity,
    logoHeight,
    foregroundHeroImage,
    foregroundHeroImageHeightPercent,
    backgroundHeroImage,
    backgroundHeroImageHeightPercent,
    subTitle,
    title,
    description,
  } = content.heroSection

  const { btnCallText, btnMessageText } = content.buttons

  return (
    <section
      className="banner-area banner-area-1 bg-banner bg-relative overflow-hidden flex items-center justify-center"
      ref={containerRef}
      style={{
        height: `${heroSectionHeight}px`,
        position: "relative",
      }}
    >
      <motion.div
        animate={controls} transition={{ type: "spring", stiffness: 100, damping: 30 }}
        className="banner-bg-img absolute inset-0"
        style={{backgroundImage: `url(${mainImage || "/placeholder.svg"})`, backgroundSize: "130% 130%", backgroundPosition: "center",}}>
        </motion.div>
      <div className="absolute inset-0" style={{ backgroundColor: overlayColor, opacity: overlayOpacity }}></div>
      <div className="container mx-auto max-w-6xl px-4 relative z-10 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-center w-full">
          <div className="lg:w-1/2 text-left mb-8 lg:mb-0">
            <motion.div className="banner-inner style-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="title text-6xl font-bold mb-4">{content.doctorInfo.name || title}</h2>
              <h4 className="sub-title text-2xl mb-6">{content.doctorInfo.specialty || subTitle}</h4>
              <div className="btn-wrap flex space-x-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <ButtonCallNow phone={content.doctorInfo.phone} defaultText={btnCallText} />
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <ButtonWhatsapp whatsapp={content.doctorInfo.whatsapp} defaultText={btnMessageText} />
                </motion.div>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="lg:w-1/2 mb-8 lg:mb-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              className="banner-mask-bg-wrap relative overflow-hidden"
              style={{
                height: `${Math.max(foregroundHeroImageHeightPercent, backgroundHeroImageHeightPercent)}%`,
                minHeight: "500px",
              }}
            >
              {/* Static mask container */}
              <div
                className="mask absolute inset-0"
                style={{
                  WebkitMaskImage: `url(${foregroundHeroImage})`,
                  WebkitMaskSize: `auto ${foregroundHeroImageHeightPercent}%`,
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "bottom center",
                  maskImage: `url(${foregroundHeroImage})`,
                  maskSize: `auto ${foregroundHeroImageHeightPercent}%`,
                  maskRepeat: "no-repeat",
                  maskPosition: "bottom center",
                }}
              >
                {/* Animated background image */}
                <motion.div
                  className="background-image w-full h-full"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    backgroundImage: `url(${backgroundHeroImage})`,
                    backgroundSize: `auto ${backgroundHeroImageHeightPercent}%`,
                    backgroundPosition: "bottom center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

