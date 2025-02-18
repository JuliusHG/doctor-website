"use client"

import { useState, useEffect } from "react"
import { Target, Heart, Scale } from "lucide-react"
import type { SiteContent } from "../../../interfaces/SiteContent"

type PurposeContent = Pick<SiteContent, "purpose">

interface PurposeItem {
  icon: string
  title: string
  description: string
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Target":
      return <Target className="w-16 h-16 transition-all duration-500 ease-in-out group-hover:text-white" />
    case "Heart":
      return <Heart className="w-16 h-16 transition-all duration-500 ease-in-out group-hover:text-white" />
    case "Scale":
      return <Scale className="w-16 h-16 transition-all duration-500 ease-in-out group-hover:text-white" />
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
    <div className="w-full py-24" style={{ backgroundColor: "white" }}> {/* "#F8F9FE" */}
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="mb-16">
            <h2 className="text-3xl text-center font-bold mb-2 text-dw-darker">{purpose.sectionTitle}</h2>
            <h3 className="text-6xl md:text-5xl font-bold mb-4 text-center text-dw-dark">{purpose.sectionSubtitle}</h3>
            <p className="text-gray-600 text-center">{purpose.sectionText}</p>
        </div>

        {/* Purpose Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {purpose.entities.map((item: PurposeItem, index: number) => (
            <div
              key={index}
              className="group relative bg-white rounded-lg p-8 h-[400px] transition-all duration-500 ease-in-out hover:bg-dw-dark"
            >
              {/* Icon Container */}
              <div className="mb-20 relative">
                <div className="w-24 h-24 mx-auto rounded-xl flex items-center justify-center transition-colors duration-500 ease-in-out">
                  <div className="w-16 h-16 relative flex items-center justify-center">
                    <div className="text-dw-dark transition-all duration-500 ease-in-out">{getIcon(item.icon)}</div>
                  </div>
                </div>
                {/* Decorative shadow */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-dw-soft/80 blur-sm rounded-full transition-colors duration-500 ease-in-out group-hover:bg-white/30"></div>
              </div>

              {/* Content */}
              <div className="text-center relative z-10">
                <h3 className="text-xl font-semibold mb-3 transition-colors duration-500 ease-in-out group-hover:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-500 mb-4 transition-colors duration-500 ease-in-out group-hover:text-white/90">
                  {item.description}
                </p>
              </div>

              {/* Bottom Gradient Overlay */}
              <div
                className="absolute inset-x-0 bottom-0 h-[60%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out rounded-b-lg"
                style={{
                  background: "linear-gradient(to top, rgba(255,255,255,0.4) 0%, rgba(219,85,144,0) 100%)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

