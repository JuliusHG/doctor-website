"use client"

import type React from "react"

import Image from "next/image"
import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import type { SiteContent } from "../../../interfaces/SiteContent"
import type { TestimonialData } from "../../../interfaces/TestimonialsData"
import ImageButton from "../common/ImageButton"

type TestimonialsContent = Pick<SiteContent, "testimonials" | "doctorInfo">

export default function TestimonialsSection() {
  const [content, setContent] = useState<TestimonialsContent | null>(null)
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const [siteContent, testimonialsData] = await Promise.all([
          import("../../../data/site-content.json"),
          import("../../../data/testimonials.json"),
        ])
        setContent(siteContent as TestimonialsContent)
        setTestimonials(testimonialsData.default)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load content"))
      } finally {
        setLoading(false)
      }
    }
    loadContent()
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!content || testimonials.length === 0) return null

  const { testimonials: testimonialsContent, doctorInfo } = content

  return (
    <section
      className="py-20 relative bg-cover bg-center"
      style={{
        backgroundImage: `url(${testimonialsContent.sectionBackground})`,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-dw-darker text-4xl uppercase font-semibold mb-4 cleener-bullets">
            {testimonialsContent.sectionSubtitle}
          </h3>
          <p className="text-gray-500 text-xl md:text-xl max-w-3xl mx-auto">{testimonialsContent.sectionDescription}</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Left column - Image */}
          <div className="w-full lg:w-1/2 flex justify-end items-center pr-4">
            <div className="relative w-3/4 h-[400px]">
              <Image
                src={testimonialsContent.testimonialsImage || "/placeholder.svg"}
                alt="Testimonials"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
          </div>
          {/* Right column - Slider */}
          <div className="w-full lg:w-1/2">
            <div className="overflow-visible py-8 pl-0">
              <div className="w-[75px] h-[150px] bg-dw-soft rounded-[20px] rounded-bl-none mb-4 flex items-center justify-center p-4">
                <Image src="/assets/quote-left.svg" alt="Quote" width={64} height={64} className="text-dw-dark" />      
              </div> {/* TODO align with the text bk */}  
              <Slider {...settings} className="ml-0">
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard key={index} testimonial={testimonial} />
                ))}
              </Slider>
            </div>
          </div>
        </div>
        <div className="mt-12 flex justify-center">
          <ImageButton linkUrl={doctorInfo.doctoraliaReviewsLink} className="shadow-md" />
        </div>
      </div>
    </section>
  )
}

interface TestimonialCardProps {
  testimonial: TestimonialData
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const [showFullTestimonial, setShowFullTestimonial] = useState(false)
  return (
    <div className="pr-4">
      <div className="relative" style={{ height: "280px" }}>
        <div
          className="absolute inset-0 bg-white p-5 rounded-lg flex flex-col justify-between max-w-[550px] mx-auto"
          style={{ top: "20px", height: "calc(100% - 40px)", zIndex: 1 }}
        >
          <div className="flex items-start gap-4 mb-3">
            <div className="flex-grow">
              <div className="flex gap-1 mb-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <h3 className="text-4xl text-dw-darker font-semibold">{testimonial.name}</h3>
              <p className="text-dw-soft text-sm text-dw-soft">Paciente verificado</p>
            </div>
          </div>
          <p className="text-gray-600 text-lg flex-grow overflow-y-auto">
            {showFullTestimonial ? testimonial.fullTestimonial : testimonial.shortTestimonial}
          </p>
          {testimonial.fullTestimonial !== testimonial.shortTestimonial && (
            <button
              onClick={() => setShowFullTestimonial(!showFullTestimonial)}
              className="text-dw-dark font-semibold mt-2"
            >
              {showFullTestimonial ? "Ver menos" : "Ver más"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
