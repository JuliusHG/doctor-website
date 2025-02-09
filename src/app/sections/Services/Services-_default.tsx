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
          import("../../../data/services.json"),
        ])
        setContent(siteContent as ServicesContent)
        setServices(servicesData.default)
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
        <h2 className="text-3xl font-bold mb-12 text-center">{servicesContent.sectionTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedServices.map((service: Service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={service.imageHome || "/placeholder.svg"}
                alt={service.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link href={`/servicios/${service.id}`} className="text-pink-600 hover:text-pink-800 font-semibold">
                  {servicesContent.linkText}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/servicios"
            className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition-colors"
          >
            {servicesContent.buttonText}
          </Link>
        </div>
      </div>
    </section>
  )
}

