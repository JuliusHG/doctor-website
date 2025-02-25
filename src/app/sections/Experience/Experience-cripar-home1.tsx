"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import type { SiteContent } from "@/src/interfaces/SiteContent"

type ExperienceContent = Pick<SiteContent, "experience">

interface ExperienceItem {
  icon: string
  value: string
  label: string
}

export default function ExperienceSection() {
  const [content, setContent] = useState<ExperienceContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const siteContent = await import("../../../data/site-content.json")
        setContent(siteContent as ExperienceContent)
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

  const { experience } = content

  return (
    <section className="py-16 bg-[#f8f8fa]">
      <h2 className="text-5xl text-dw-dark font-bold mb-12 text-center">{experience.sectionTitle}</h2>
      <div className="container mx-auto px-[5%]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
          {experience.entities.map((item: ExperienceItem, index: number) => (
            <div
              key={index}
              className="relative flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-105 mx-auto group"
              style={{
                height: "300px",
                width: "300px",
              }}
            >
              <div
                className="absolute inset-0 z-0 filter-dw-dark"
                style={{
                  backgroundImage: `url(${experience.itemFrame})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              />
              <Image
                src={item.icon || "/placeholder.svg"}
                alt={item.label}
                width={48}
                height={48}
                className="w-12 h-12 mb-2 relative z-10 filter-dw-soft"
              />
              <p className="text-5xl font-extrabold mb-1 text-dw-dark transition-colors duration-300 group-hover:text-black-500 relative z-10">
                {item.value}
              </p>
              <p className="text-xl px-8 font-bold text-gray-800 text-center transition-colors duration-300 group-hover:text-black-500 relative z-10">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
