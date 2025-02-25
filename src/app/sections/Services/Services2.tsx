"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import type { SiteContent } from "../../../interfaces/SiteContent"

type ServicesContent = Pick<SiteContent, "services">

interface Service {
  id: string
  title: string
  description: string
  imageHome: string
}

export default function ServicesSection() {
  const [content, setContent] = useState<ServicesContent | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const [siteContent, servicesData] = await Promise.all([
          import("../../../data/site-content.json"),
          import("../../../data/servicesDataMetadata.json"),
        ])
        setContent(siteContent as ServicesContent)
        setServices(services)
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
  if (!content || !services) return null

  const { services: servicesContent } = content
  const displayedServices = services.slice(0, 3)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          {/* <h2 className="text-xl md:text-2xl font-bold mb-6 text-center text-black-800">
            {servicesContent.sectionTitle}
          </h2> */}
          <h2 className="text-5xl text-dw-dark md:text-5xl font-bold mb-4 text-center text-dw-dark">
            {servicesContent.sectionSubtitle}
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto text-center mb-16">{servicesContent.sectionText}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedServices.map((service: Service) => (
            <div key={service.id} className="rounded-lg overflow-hidden group relative flex flex-col h-full">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.imageHome || "/placeholder.svg?height=300&width=400"}
                  alt={service.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-8 bg-dw-dark text-white flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-white/90 mb-6 line-clamp-4">{service.description}</p>
                </div>
                <Link
                  href={`/servicios/${service.id}`}
                  className="inline-block text-white hover:text-white/90 font-semibold transition-colors mt-auto"
                >
                  {servicesContent.linkText}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/servicios"
            className="border-2 border-dw-dark text-dw-dark px-8 py-3 rounded-lg hover:bg-dw-dark hover:text-white transition-colors text-lg font-semibold inline-block"
          >
            {servicesContent.buttonText}
          </Link>
        </div>
      </div>
    </section>
  )
}

