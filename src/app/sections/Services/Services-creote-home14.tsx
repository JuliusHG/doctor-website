"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import type { SiteContent } from "../../../interfaces/SiteContent"

type ServicesContent = Pick<SiteContent, "services" | "servicesDataMetadata">

export default function ServicesSection() {
  const [content, setContent] = useState<ServicesContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const siteContentModule = await import("../../../data/site-content.json")
        const servicesDataMetadataModule = await import("../../../data/servicesDataMetadata.json")

        setContent({
          services: siteContentModule.default.services,
          servicesDataMetadata: servicesDataMetadataModule,
        } as ServicesContent)
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
  if (!content) return null

  // Limit to 3 services for display
  const displayedServices = content.servicesDataMetadata.services.slice(0, 3)

  return (
    <section className="bg-dw-dark py-16">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-lg text-white uppercase md:text-lg font-bold mb-4 text-center text-white">
            {content.services.sectionSubtitle}
          </h2>
          <h3 className="text-5xl font-bold text-white max-w-4xl mx-auto text-center mb-16">{content.services.sectionText}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 px-16">
          {displayedServices.map((service) => (
            <div key={service.id} className="bg-dw-darker rounded-lg overflow-hidden group relative flex flex-col h-full">
                <div>
                    <h3 className="text-white/90 text-2xl text-center font-semibold my-6">{service.title}</h3>
                    <p className="text-white/90 text-base text-center mb-6 line-clamp-4 px-16">{service.shortDescription}</p>
                </div>
                <div className="relative h-64 overflow-hidden px-4">
                    <Image
                    src={service.imageHome || "/placeholder.svg?height=300&width=400"}
                    alt={service.title}
                    width={400}
                    height={300}
                    object-fit="contain"
                    className="w-full h-full rounded object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                </div>
              <div className="p-8 bg-dw-darker text-white flex-grow flex flex-col justify-between">
              <Link
                href={`/servicios/${service.id}`}
                className="inline-flex items-center justify-center text-white text-center font-semibold transition-colors mt-auto"
                >
                <ArrowRight className="w-4 h-4 mr-2" />
                {content.services.linkText}
              </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
        <Link
            href="/servicios"
            className="
                border-2
                border-white
                text-white
                bg-dw-dark
                px-8 py-3
                rounded-lg
                hover:bg-white
                hover:text-dw-dark
                transition-colors
                text-lg
                font-semibold
                inline-block
                rounded-tl-none rounded-br-none rounded-tr-lg rounded-bl-lg
                hover:rounded-tl-lg hover:rounded-br-lg hover:rounded-tr-none hover:rounded-bl-none
                transition-all duration-300 
                "
          >
            {content.services.buttonText}
        </Link>
        </div>
      </div>
    </section>
  )
}

