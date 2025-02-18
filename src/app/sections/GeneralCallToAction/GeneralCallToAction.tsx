//TODO David: Will this section change to vertical?

"use client"

import { useState, useEffect } from "react"
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
    <section
      className="py-12 bg-dw-dark text-white"
      style={{
        backgroundImage: `url(${generalCallToAction.sectionBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-8">{generalCallToAction.title}</h2>
        <h3 className="text-4xl md:text-4xl mb-6 md:mb-8 mx-4 md:mx-12 lg:mx-48">{generalCallToAction.description}</h3>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <ButtonCallNow phone={doctorInfo.phone} defaultText={buttons.btnCallText} />
          <ButtonWhatsapp whatsapp={doctorInfo.whatsapp} defaultText={buttons.btnMessageText} />
        </div>
      </div>
    </section>
  )
}

