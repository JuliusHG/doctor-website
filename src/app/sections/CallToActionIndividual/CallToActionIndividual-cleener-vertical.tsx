"use client"

import { useState, useEffect } from "react"
import diseasesData from "../../../data/diseasesDataMetadata.json"
import symptomsData from "../../../data/symptomsDataMetadata.json"
import servicesData from "../../../data/servicesDataMetadata.json"
import type { SiteContent } from "../../../interfaces/SiteContent"
import ButtonCallNow from "../common/ButtonCallNow"
import ButtonWhatsapp from "../common/ButtonWhatsapp"

type CallToActionIndividualContent = Pick<SiteContent, "buttons" | "doctorInfo" | "callToActionIndividual">

export interface CallToActionIndividualProps {
  id: string
  type: "disease" | "symptom" | "service"
}

export default function CallToActionIndividual({ id, type }: CallToActionIndividualProps) {
  const [content, setContent] = useState<CallToActionIndividualContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [ctaText, setCtaText] = useState<string>("")

  useEffect(() => {
    const loadContent = async () => {
      try {
        const rawContent = (await import("../../../data/site-content.json")).default
        const callToActionIndividualContent: CallToActionIndividualContent = {
          buttons: rawContent.buttons,
          doctorInfo: rawContent.doctorInfo,
          callToActionIndividual: rawContent.callToActionIndividual,
        }
        setContent(callToActionIndividualContent)

        // Set CTA text based on the type and id
        switch (type) {
          case "disease":
            const disease = diseasesData.diseases.find((d) => d.id === id)
            setCtaText(disease?.ctaText || "")
            break
          case "symptom":
            const symptom = symptomsData.symptoms.find((s) => s.id === id)
            setCtaText(symptom?.ctaText || "")
            break
          case "service":
            const service = servicesData.services.find((s) => s.id === id)
            setCtaText(service?.ctaText || "")
            break
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load content"))
      } finally {
        setLoading(false)
      }
    }
    loadContent()
  }, [id, type])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!content || !ctaText) {
    return null // Or some fallback UI
  }

  const { btnCallText, btnMessageText } = content.buttons
  const { phone, whatsapp } = content.doctorInfo
  const { backgroundImage, ctaIndivHeader } = content.callToActionIndividual

  return (
    <div className="bg-dw-dark text-white rounded-lg shadow-lg overflow-hidden p-4">
      <div
        /* className="p-6 bg-opacity-80 bg-green-700"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }} */
      >
        <h3 className="text-5xl mb-4 leading-tight">{ctaIndivHeader}</h3>
        <p className="text-2xl mb-6 px-2 leading-tight">{ctaText}</p>
        <div className="space-y-3">
          <ButtonCallNow phone={phone} defaultText={btnCallText} className="block w-full text-center" />
          <ButtonWhatsapp whatsapp={whatsapp} defaultText={btnMessageText} className="block w-full text-center" />
        </div>
      </div>
    </div>
  )
}

