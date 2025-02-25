"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import type { SiteContent } from "../../../interfaces/SiteContent"
import ButtonCallNow from "../common/ButtonCallNow"
import ButtonWhatsapp from "../common/ButtonWhatsapp"

type GeneralCallToActionContent = Pick<SiteContent, "doctorInfo" | "generalCallToAction" | "buttons">

export default function GeneralCallToAction() {
  const [content, setContent] = useState<GeneralCallToActionContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const rawContent = (await import("../../../data/site-content.json")).default
        const generalCallToActionContent: GeneralCallToActionContent = {
          generalCallToAction: rawContent.generalCallToAction,
          doctorInfo: rawContent.doctorInfo,
          buttons: rawContent.buttons,
        }
        setContent(generalCallToActionContent)
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

  const { doctorInfo, generalCallToAction, buttons } = content

  return (
    <section className="flex flex-col md:flex-row px-[10%]">
      {/* Left column (1/3) */}
      <div className="w-full md:w-1/3 bg-dw-dark text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-8">{generalCallToAction.title}</h2>
          <h3 className="text-xl px-4 md:text-xl lg:text-2xl mb-6 md:mb-8">{generalCallToAction.description}</h3>
          <h3 className="text-base px-8 md:text-xl lg:text-2xl mb-6 md:mb-4">{generalCallToAction.price1}</h3>
          <h3 className="text-base px-8 md:text-xl lg:text-2xl mb-6 md:mb-8">{generalCallToAction.price2}</h3>
          <div className="flex flex-col sm:flex-col justify-center gap-8 px-16">
            <ButtonCallNow phone={doctorInfo.phone} defaultText={buttons.btnCallText} />
            <ButtonWhatsapp whatsapp={doctorInfo.whatsapp} defaultText={buttons.btnMessageText} />
          </div>
        </div>
      </div>

      {/* Right column (2/3) */}
      <div className="w-full md:w-2/3 relative" style={{ height: "600px" }}>
        <div
          style={{
            height: `${generalCallToAction.foregroundImagePercent}%`,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <Image
            src={generalCallToAction.foregroundImage || "/placeholder.svg"}
            alt="Call to Action"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </section>
  )
}

