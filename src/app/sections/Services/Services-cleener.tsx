"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import type { SiteContent } from "../../../interfaces/SiteContent"

type ServicesContent = Pick<SiteContent, "services" | "servicesDataMetadata">

const ServicesSection = () => {
  const [content, setContent] = useState<ServicesContent | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      const siteContentModule = await import("../../../data/site-content.json")
      const servicesDataMetadataModule = await import("../../../data/servicesDataMetadata.json")

      setContent({
        services: siteContentModule.default.services,
        servicesDataMetadata: servicesDataMetadataModule,
      } as ServicesContent)
    }
    loadContent()
  }, [])

  if (!content) {
    return <div>Loading...</div>
  }

  // Limit to 6 services for the home page
  const displayedServices = content.servicesDataMetadata.services.slice(0, 6)

  return (
    <div className="w-full py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="mb-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl text-dw-dark font-bold mb-4">{content.services.sectionTitle}</h2>
            <h2 className="text-6xl text-dw-darker font-bold mb-4">{content.services.sectionSubtitle}</h2>
            <p className="text-gray-600">{content.services.sectionText}</p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 justify-items-center">
          {displayedServices.map((service) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-lg p-8 w-full max-w-[340px] h-[340px] transition-all duration-500 ease-in-out hover:bg-dw-dark"
            >
              {/* Icon Container */}
              <div className="mb-8 relative">
                <div className="w-24 h-24 mx-auto rounded-full bg-white flex items-center justify-center transition-colors duration-500 ease-in-out">
                  <div className="w-16 h-16 relative">
                    <Image
                    src={service.iconIndividual || "/placeholder.svg"}
                    alt={service.title}
                    width={64}
                    height={64}
                    className="transition-all duration-500 ease-in-out filter-dw-dark"
                    />
                  </div>
                </div>
              </div>              

              {/* Content */}
              <div className="text-center relative z-10">
                <h3 className="text-xl text-dw-dark font-semibold mb-3 transition-colors duration-500 ease-in-out group-hover:text-white">
                  <Link href={`/servicios/${service.id}`}>{service.title}</Link>
                </h3>
                <p className="text-gray-500 mb-4 transition-colors duration-500 ease-in-out group-hover:text-white/90">
                  {service.shortDescription}
                </p>
              </div>

              {/* Bottom Gradient Overlay */}
              <div
                className="absolute inset-x-0 bottom-0 h-[60%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out rounded-b-lg"
                style={{
                  background: "linear-gradient(to top, rgba(255,255,255,0.4) 0%, rgba(59,130,246,0) 100%)",
                }}
              />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/servicios"
            className="border-2 border-dw-dark text-dw-dark px-8 py-3 rounded-lg hover:bg-dw-dark hover:text-white transition-colors text-lg font-semibold inline-block"
          >
            {content.services.buttonText}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ServicesSection

