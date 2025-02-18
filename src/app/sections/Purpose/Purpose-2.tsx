"use client"

import { useState, useEffect } from "react"
import { Target, Heart, Scale } from "lucide-react"
import type { SiteContent } from "../../../interfaces/SiteContent"

type PurposeContent = Pick<SiteContent, "purpose">

interface PurposeItem {
  icon: string
  title: string
  description: string
  imagePath: string
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Target":
      return <Target className="w-16 h-16 text-white mb-6" />
    case "Heart":
      return <Heart className="w-16 h-16 text-white mb-6" />
    case "Scale":
      return <Scale className="w-16 h-16 text-white mb-6" />
    default:
      return null
  }
}

export default function PurposeSection() {
  const [content, setContent] = useState<PurposeContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const siteContent = await import("../../../data/site-content.json")
        setContent(siteContent as PurposeContent)
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

  const { purpose } = content

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl text-dw-dark font-bold mb-12 text-center">{purpose.sectionTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {purpose.entities.map((item: PurposeItem, index: number) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center p-12 min-h-[300px] group"
              style={{
                backgroundImage: `url(${item.imagePath})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay */}
              <div
                className={`absolute inset-0 ${
                  index === 0 ? "bg-dw-dark/90" : index === 1 ? "bg-dw-darker/75" : "bg-dw-dark/90"
                }`}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center">
                {getIcon(item.icon)}
                <h3 className={`text-2xl font-bold mb-4 text-white`}>{item.title}</h3>
                <p className={`text-white max-w-md`}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

