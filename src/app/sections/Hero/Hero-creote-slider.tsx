"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { SiteContent } from "../../../interfaces/SiteContent"
import ButtonCallNow from "../common/ButtonCallNow"
import ButtonWhatsapp from "../common/ButtonWhatsapp"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

// Add these custom styles
const customStyles = `
  .swiper-button-next,
  .swiper-button-prev {
    width: 50px !important;
    height: 50px !important;
  }
  .swiper-button-next::after,
  .swiper-button-prev::after {
    content: '' !important;
  }
  .swiper-button-disabled {
    opacity: 0.5 !important;
    cursor: not-allowed !important;
  }
`

type HeroSliderContent = Pick<SiteContent, "doctorInfo" | "heroSlider" | "heroSection" | "buttons">

export default function HeroCreoteSlider() {
  const [content, setContent] = useState<HeroSliderContent | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      const rawContent = (await import("../../../data/site-content.json")).default
      const heroSliderContent: HeroSliderContent = {
        doctorInfo: rawContent.doctorInfo,
        heroSlider: {
          ...rawContent.heroSlider,
          slides: rawContent.heroSlider.slides.map((slide) => ({
            ...slide,
            alignment: slide.alignment as "left" | "center" | "right",
          })),
          transitionEffect: rawContent.heroSlider.transitionEffect as
            | "slide"
            | "fade"
            | "cube"
            | "coverflow"
            | undefined,
        },
        heroSection: rawContent.heroSection,
        buttons: rawContent.buttons,
      }
      setContent(heroSliderContent)
    }
    loadContent()
  }, [])

  useEffect(() => {
    const styleElement = document.createElement("style")
    styleElement.textContent = customStyles
    document.head.appendChild(styleElement)
    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  if (!content) {
    return <div>Loading...</div>
  }

  const { heroSlider, heroSection, buttons } = content

  return (
    <section className="relative" style={{ height: `${heroSection.heroSectionHeight}px` }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          disabledClass: "swiper-button-disabled",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: heroSlider.autoplayDelay || 5000 }}
        loop={true}
        effect={heroSlider.transitionEffect || "slide"}
        speed={heroSlider.transitionSpeed || 500}
        className="h-full"
      >
        {heroSlider.slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative h-full">
            {slide.heroSlideImage ? (
              <div className="absolute inset-0">
                <Image
                  src={slide.heroSlideImage || "/placeholder.svg"}
                  alt={slide.title}
                  layout="fill"
                  objectFit="cover"
                  priority={index === 0}
                />
              </div>
            ) : (
              <div className="absolute inset-0 bg-dw-dark" />
            )}
            <div className={`absolute inset-0 flex items-center mx-16 ${getAlignment(slide.alignment)}`}>
              <div className={`text-white max-w-6xl ${getTextAlignment(slide.alignment)}`}>
                <h2 className="text-2xl md:text-3xl font-semibold mb-2">{slide.subtitle}</h2>
                <h1 className="text-8xl md:text-8xl font-extrabold mb-4">{slide.title}</h1>
                <p className="text-lg md:text-xl mb-8">{slide.description}</p>
                <div
                  className={`flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 ${getButtonAlignment(slide.alignment)}`}
                >
                  <ButtonCallNow phone={content.doctorInfo.phone} defaultText={buttons.btnCallText} />
                  <ButtonWhatsapp whatsapp={content.doctorInfo.whatsapp} defaultText={buttons.btnMessageText} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-dw-dark bg-opacity-70 rounded-full p-3 flex items-center justify-center">
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button className="swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-dw-dark bg-opacity-70 rounded-full p-3 flex items-center justify-center">
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </section>
  )
}

function getAlignment(alignment: "left" | "center" | "right"): string {
  switch (alignment) {
    case "left":
      return "justify-start"
    case "center":
      return "justify-center"
    case "right":
      return "justify-end"
    default:
      return "justify-start"
  }
}

function getTextAlignment(alignment: "left" | "center" | "right"): string {
  switch (alignment) {
    case "left":
      return "text-left"
    case "center":
      return "text-center"
    case "right":
      return "text-right"
    default:
      return "text-left"
  }
}

function getButtonAlignment(alignment: "left" | "center" | "right"): string {
  switch (alignment) {
    case "left":
      return "justify-start"
    case "center":
      return "justify-center"
    case "right":
      return "justify-end"
    default:
      return "justify-start"
  }
}

