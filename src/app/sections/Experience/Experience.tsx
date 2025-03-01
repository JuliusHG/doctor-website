"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import type { SiteContent } from "@/src/interfaces/SiteContent"
import { cn } from "@/src/utils"

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
    <section className="py-16 bg-white-100">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl text-dw-dark font-bold mb-12 text-center">{experience.sectionTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experience.entities.map((item: ExperienceItem, index: number) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white rounded-lg transition-transform duration-300 hover:scale-105"
            >
              <div className={cn("w-12 h-12 relative", "filter-dw-soft")}>
                <Image src={item.icon || "/placeholder.svg"} alt={item.label} layout="fill" objectFit="contain" />
              </div>
              <p className="text-4xl font-bold mt-4 mb-2 text-dw-dark">{item.value}</p>
              <p className="text-dw-dark text-center">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

