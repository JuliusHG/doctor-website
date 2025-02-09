"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import type { SiteContent } from "../../../interfaces/SiteContent"
import type { TestimonialData } from "../../../interfaces/TestimonialsData"

type TestimonialsContent = Pick<SiteContent, "testimonials">

export default function TestimonialsSection() {
  const [content, setContent] = useState<TestimonialsContent | null>(null)
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showFullTestimonial, setShowFullTestimonial] = useState(false)
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

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    setShowFullTestimonial(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    setShowFullTestimonial(false)
  }

  const toggleFullTestimonial = () => {
    setShowFullTestimonial(!showFullTestimonial)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!content || testimonials.length === 0) return null

  const { testimonials: testimonialsContent } = content
  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">{testimonialsContent.sectionTitle}</h2>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 relative">
            <button
              onClick={prevTestimonial}
              className="absolute top-1/2 -left-3 md:-left-4 transform -translate-y-1/2 bg-white p-1 md:p-2 rounded-full shadow-md"
            >
              <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-gray-800" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute top-1/2 -right-3 md:-right-4 transform -translate-y-1/2 bg-white p-1 md:p-2 rounded-full shadow-md"
            >
              <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-gray-800" />
            </button>
            <div className="flex flex-col items-center">
              <Image
                src={currentTestimonial.image || "/placeholder.svg"}
                alt={currentTestimonial.name}
                width={100}
                height={100}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full mb-4 cover"
              />
              <h3 className="text-lg md:text-xl font-semibold mb-2">{currentTestimonial.name}</h3>
              <div className="flex mb-4">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-sm md:text-base text-gray-600 text-center italic mb-4">
                {showFullTestimonial ? currentTestimonial.fullTestimonial : currentTestimonial.shortTestimonial}
              </p>
              <button
                onClick={toggleFullTestimonial}
                className="text-blue-600 hover:text-blue-800 transition-colors mb-4 text-sm md:text-base"
              >
                {showFullTestimonial ? "Ver menos" : testimonialsContent.linkText}
              </button>
              {/* Uncomment to enable the data blocks */}
              {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center w-full">
                <div className="bg-gray-100 p-2 rounded">
                  <p className="font-semibold text-sm md:text-base">{testimonialsContent.dataBlocks.procedure}</p>
                  <p className="text-gray-600 text-sm">{currentTestimonial.procedure}</p>
                </div>
                <div className="bg-gray-100 p-2 rounded">
                  <p className="font-semibold text-sm md:text-base">{testimonialsContent.dataBlocks.weightLoss}</p>
                  <p className="text-gray-600 text-sm">{currentTestimonial.weightLoss}</p>
                </div>
                <div className="bg-gray-100 p-2 rounded">
                  <p className="font-semibold text-sm md:text-base">{testimonialsContent.dataBlocks.timeElapsed}</p>
                  <p className="text-gray-600 text-sm">{currentTestimonial.timeElapsed}</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

