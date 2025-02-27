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
      return (
        <div className="relative inline-flex justify-center items-center mb-4 w-12 h-12">
          <Target className="w-12 h-12 text-dw-dark" />
          <div className="absolute w-3 h-3 rounded-full bg-dw-soft animate-orbit" />
        </div>
      )
    case "Heart":
      return (
        <div className="relative inline-flex justify-center items-center mb-4 w-12 h-12">
          <Heart className="w-12 h-12 text-dw-dark" />
          <div className="absolute w-3 h-3 rounded-full bg-dw-soft animate-orbit" />
        </div>
      )
    case "Scale":
      return (
        <div className="relative inline-flex justify-center items-center mb-4 w-12 h-12">
          <Scale className="w-12 h-12 text-dw-dark" />
          <div className="absolute w-3 h-3 rounded-full bg-dw-soft animate-orbit" />
        </div>
      )
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-lg text-dw-soft font-bold uppercase mb-2 text-center">{purpose.sectionTitle}</h3>
        <h2 className="text-5xl text-dw-dark font-bold mb-2 text-center">{purpose.sectionSubtitle}</h2>
        <p className="text-gray-500 mb-12 text-center px-96">{purpose.sectionText}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {purpose.entities.map((item: PurposeItem, index: number) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-lg">
              {getIcon(item.icon)}
              <h3 className="text-2xl text-dw-dark font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

