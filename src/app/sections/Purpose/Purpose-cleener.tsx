"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import type { SiteContent } from "../../../interfaces/SiteContent"

type PurposeContent = Pick<SiteContent, "purpose">

interface PurposeItem {
  title: string
  description: string
  imagePath: string
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
    <section className="py-16 bg-gray-50 relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${purpose.sectionBackground})`,
          opacity: 0.1,
        }}
      ></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl text-dw-dark font-bold mb-4 text-center">{purpose.sectionTitle}</h2>
        <p className="text-xl text-gray-600 mb-12 text-center">{purpose.sectionSubtitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {purpose.entities.map((item: PurposeItem, index: number) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-lg">
              {index === 1 ? (
                // Center item - title first, waterdrop below
                <>
                  <div className="mb-16">
                    <h3 className="text-2xl text-dw-dark font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  <div className="w-48 h-48 relative overflow-visible">
                    <div className="absolute inset-0 pb-6 rounded-tl-[120px] rounded-tr-[120px] rounded-bl-[120px] rounded-br-[24px] transform rotate-[225deg] overflow-hidden">
                      <Image
                        src={item.imagePath || "/placeholder.svg"}
                        alt={item.title}
                        layout="fill"
                        objectFit="cover"
                        className="transform -rotate-[225deg] scale-150"
                      />
                    </div>
                  </div>
                </>
              ) : (
                // Side items - waterdrop first, title below
                <>
                  <div className="w-48 h-48 mb-16 relative overflow-visible">
                    <div className="absolute inset-0 pb-6 rounded-tl-[120px] rounded-tr-[120px] rounded-bl-[120px] rounded-br-[24px] transform rotate-45 overflow-hidden">
                      <Image
                        src={item.imagePath || "/placeholder.svg"}
                        alt={item.title}
                        layout="fill"
                        objectFit="cover"
                        className="transform -rotate-45 scale-150"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl text-dw-dark font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}





{/* REPLACE WITH THIS SECTION IF ALL WATERDROPS WILL BE TOP AND THE SAME
    
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl text-dw-dark font-bold mb-4 text-center">{purpose.sectionTitle}</h2>
        <p className="text-xl text-gray-600 mb-12 text-center">{purpose.sectionSubtitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {purpose.entities.map((item: PurposeItem, index: number) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-lg">
              <div className="w-48 h-48 mb-16 relative overflow-visible">
                <div className="absolute inset-0 pb-6 rounded-tl-[120px] rounded-tr-[120px] rounded-bl-[120px] rounded-br-[24px] transform rotate-45 overflow-hidden">
                  <Image
                    src={item.imagePath || "/placeholder.svg"}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="transform -rotate-45 scale-150"
                  />
                </div>
              </div>
              <h3 className="text-2xl text-dw-dark font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section> */}

