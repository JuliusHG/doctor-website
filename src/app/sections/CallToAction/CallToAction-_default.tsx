"use client"

import { useState, useEffect } from "react"
import type { SiteContent } from "../../../interfaces/SiteContent"
import ButtonCallNow from "../common/ButtonCallNow"
import ButtonWhatsapp from "../common/ButtonWhatsapp"

type CallToActionContent = Pick<SiteContent, "callToAction" | "buttons" | "doctorInfo">

export default function CallToAction() {
  const [content, setContent] = useState<CallToActionContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const rawContent = (await import("../../../data/site-content.json")).default
        const callToActionContent: CallToActionContent = {
          callToAction: rawContent.callToAction,
          buttons: rawContent.buttons,
          doctorInfo: rawContent.doctorInfo,
        }
        setContent(callToActionContent)
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

  const { title, description } = content.callToAction
  const { btnCallText, btnMessageText } = content.buttons

  return (
    <section className="py-16 bg-dw-dark text-white"
    style={{
      backgroundImage: `url(${content.callToAction.backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">{title}</h2>
          <p className="text-2xl mb-8">{description}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <ButtonCallNow phone={content.doctorInfo.phone} defaultText={btnCallText} />
            <ButtonWhatsapp whatsapp={content.doctorInfo.whatsapp} defaultText={btnMessageText} />
          </div>
        </div>
      </div>
    </section>
  )
}

