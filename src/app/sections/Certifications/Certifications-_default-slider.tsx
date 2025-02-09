/**
 * @section-description Certificaciones con slider (jh), puede moverse con el mouse o con el dedo.
 */

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import type { SiteContent } from "@/src/interfaces/SiteContent"

type CertificationsContent = Pick<SiteContent, "certifications">

export default function CertificationsSliderSection() {
  const [content, setContent] = useState<CertificationsContent | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const siteContentModule = await import("@/src/data/site-content.json")
        setContent({ certifications: siteContentModule.default.certifications })
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load content"))
      }
    }
    loadContent()
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!content) {
    return <div>Loading...</div>
  }

  const { certifications } = content

  const visibleItems = [
    ...certifications.entities.filter((entity) => entity.visible),
    ...certifications.documents.filter((document) => document.visible),
  ]

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">{certifications.sectionTitle}</h2>
        <Slider {...settings}>
          {visibleItems.map((item, index) => (
            <div key={index} className="px-2">
              <div className="flex flex-col items-center h-full">
                <div className="flex items-center justify-center h-40 mb-4 w-full">
                  <Image
                    src={item.imagePath || "/placeholder.svg"}
                    alt={item.name}
                    width={160}
                    height={160}
                    className="object-contain max-h-full max-w-full"
                  />
                </div>
                <p className="text-center text-sm mt-2">{item.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

