"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import type { SiteContent } from "@/src/interfaces/SiteContent"

type InsurancesContent = Pick<SiteContent, "insurances">

const settings = {
  dots: false,
  infinite: true,
  autoplaySpeed: 2000,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
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

export default function Insurance2() {
  const [content, setContent] = useState<InsurancesContent | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const siteContentModule = await import("@/src/data/site-content.json")
        setContent({ insurances: siteContentModule.default.insurances })
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

  const { insurances } = content

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold mb-12 text-center">{insurances.sectionTitle}</h2>
        <div className="px-8">
          <Slider {...settings}>
            {insurances.companies
              .filter((company) => company.visible)
              .map((company) => (
                <div key={company.name} className="!flex flex-col items-center justify-center h-32">
                  <div className="h-16 flex items-center justify-center mb-2">
                    <Image
                      src={company.logoPath || "/placeholder.svg"}
                      alt={company.name}
                      width={96}
                      height={64}
                      className="max-h-full w-auto object-contain"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                  <p className="text-center text-gray-600 text-sm">{company.name}</p>
                </div>
              ))}
          </Slider>
        </div>
        {insurances.additionalInfo && (
          <p className="mt-12 text-center text-gray-600 max-w-3xl mx-auto">{insurances.additionalInfo}</p>
        )}
      </div>
    </section>
  )
}

