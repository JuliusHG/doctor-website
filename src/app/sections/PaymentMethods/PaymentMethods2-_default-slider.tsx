"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import type { SiteContent } from "@/src/interfaces/SiteContent"

type PaymentsContent = Pick<SiteContent, "payments">

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

export default function PaymentMethods2() {
  const [content, setContent] = useState<PaymentsContent | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const siteContentModule = await import("@/src/data/site-content.json")
        setContent({ payments: siteContentModule.default.payments })
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

  const { payments } = content

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <h3 className="text-xl font-bold mb-4 text-center">{payments.sectionTitle}</h3>
        <h2 className="text-4xl font-bold mb-12 text-center">{payments.sectionSubtitle}</h2>
        <div className="px-8">
          <Slider {...settings}>
            {payments.methods
              .filter((method) => method.visible)
              .map((method) => (
                <div key={method.name} className="!flex flex-col items-center justify-center h-32">
                  <div className="h-16 flex items-center justify-center mb-2">
                    <Image
                      src={method.iconPath || "/placeholder.svg"}
                      alt={method.name}
                      width={80}
                      height={80}
                      className="max-h-full w-auto object-contain"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                  <p className="text-center text-gray-600 text-sm">{method.name}</p>
                </div>
              ))}
          </Slider>
        </div>
        {payments.additionalInfo && (
          <p className="mt-12 text-center text-gray-600 max-w-3xl mx-auto">{payments.additionalInfo}</p>
        )}
      </div>
    </section>
  )
}

