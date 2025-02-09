"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/autoplay"
import type { SiteContent } from "@/src/interfaces/SiteContent"
import type { TestimonialData } from "@/src/interfaces/TestimonialsData"

type TestimonialsContent = Pick<SiteContent, "testimonials">

export default function TestimonialItechieHome5() {
  const [mounted, setMounted] = useState(false)
  const [content, setContent] = useState<TestimonialsContent | null>(null)
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([])

  useEffect(() => {
    const loadContent = async () => {
      const [siteContentModule, testimonialsModule] = await Promise.all([
        import("@/src/data/site-content.json"),
        import("@/src/data/testimonials.json"),
      ])

      setContent(siteContentModule as TestimonialsContent)
      setTestimonials(testimonialsModule.default)
    }

    loadContent()
    setMounted(true)
  }, [])

  if (!mounted || !content || testimonials.length === 0) {
    return null
  }

  const { testimonials: testimonialsContent } = content

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-12">{testimonialsContent.sectionTitle}</h2>
        <div className="flex flex-col lg:flex-row justify-center items-center">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <Image
              src="/images/AboutMe.jpg"
              alt="Dra. Martha Ruiz Peñaloza"
              width={400}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-8">
            <Swiper modules={[Autoplay]} spaceBetween={30} slidesPerView={1} autoplay={{ delay: 5000 }} loop={true}>
              {testimonials.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="bg-white p-12 rounded-lg">
                    <div className="relative mb-8">
                      <Image
                        src="/images/icons/quote-left.svg"
                        alt="Quote"
                        width={64}
                        height={64}
                        className="[&>path]:fill-gray-200"
                        style={{
                          filter:
                            "invert(92%) sepia(5%) saturate(168%) hue-rotate(177deg) brightness(96%) contrast(87%)",
                        }}
                      />
                    </div>
                    <p className="text-xl italic text-gray-400 mb-8">{item.fullTestimonial}</p>
                    <div className="flex items-center">
                      <div>
                        <h3 className="text-4xl font-semibold">{item.name}</h3>
                        <p className="text-gray-600">Paciente verificado</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}

