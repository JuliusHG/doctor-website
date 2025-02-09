"use client"

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
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
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
          <h3 className="text-black uppercase font-semibold mb-4">{testimonialsContent.sectionTitle}</h3>
          <h2 className="text-pink-800 text-4xl md:text-5xl font-bold">{testimonialsContent.sectionDescription}</h2>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="overflow-visible py-8">
            <Slider {...settings}>
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} />
              ))}
            </Slider>
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
    <div className="px-8">
      <div className="relative" style={{ height: "280px" }}>
        <div className="absolute bg-pink-600 rounded-lg left-[-10px] w-1/2 h-[320px] top-1/2 -translate-y-1/2 z-0" />
        <div className="absolute bg-pink-600 rounded-lg right-0 w-4/5 h-[150px] top-1/2 -translate-y-1/2 z-0" />
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
              <h3 className="text-2xl font-semibold">{testimonial.name}</h3>
              <p className="text-gray-600 text-sm">Paciente verificado</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-left">
              <Image src="/assets/quote-left.svg" alt="Quote" width={64} height={64} />
            </div>
          </div>
          <p className="text-gray-600 text-lg flex-grow overflow-y-auto">
            {showFullTestimonial ? testimonial.fullTestimonial : testimonial.shortTestimonial}
          </p>
          {testimonial.fullTestimonial !== testimonial.shortTestimonial && (
            <button
              onClick={() => setShowFullTestimonial(!showFullTestimonial)}
              className="text-pink-600 font-semibold mt-2"
            >
              {showFullTestimonial ? "Ver menos" : "Ver más"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

