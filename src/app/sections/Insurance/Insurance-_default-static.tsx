"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import type { SiteContent } from "@/src/interfaces/SiteContent"

type InsurancesContent = Pick<SiteContent, "insurances">

export default function InsuranceSection() {
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-8">
          {insurances.companies
            .filter((company) => company.visible)
            .map((company) => (
              <div key={company.name} className="flex flex-col items-center">
                <div className="w-24 h-16 relative mb-4 flex items-center justify-center">
                  <Image
                    src={company.logoPath || "/placeholder.svg"}
                    alt={company.name}
                    width={96}
                    height={64}
                    objectFit="contain"
                  />
                </div>
                <p className="text-center text-gray-600">{company.name}</p>
              </div>
            ))}
        </div>
        {insurances.additionalInfo && <p className="text-center text-gray-600">{insurances.additionalInfo}</p>}
      </div>
    </section>
  )
}

