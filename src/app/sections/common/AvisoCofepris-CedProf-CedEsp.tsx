"use client"

import { useState, useEffect } from "react"
import type { SiteContent } from "@/src/interfaces/SiteContent"

type AvisoCofeprisContent = Pick<SiteContent, "doctorInfo" | "doctorWorkInfo">

interface AvisoCofeprisCedProfCedEspProps {
  transparentBg?: boolean
}

export default function AvisoCofeprisCedProfCedEsp({ transparentBg = false }: AvisoCofeprisCedProfCedEspProps) {
  const [content, setContent] = useState<AvisoCofeprisContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const siteContent = await import("../../../data/site-content.json")
        setContent(siteContent as AvisoCofeprisContent)
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

  const { doctorInfo, doctorWorkInfo } = content

  return (
    <div className={`${transparentBg ? "bg-transparent" : "bg-pink-800"} text-white py-2 px-4`}>
      <div className="container mx-auto flex justify-center items-center text-xl uppercase">
        <div className="text-center">
          <span>
            AVISO COFEPRIS: {doctorWorkInfo.avisoCofepris} | Céd. Prof. {doctorInfo.cedProf} | Céd. Esp. {doctorInfo.cedEsp}
          </span>
        </div>
      </div>
    </div>
  )
}

