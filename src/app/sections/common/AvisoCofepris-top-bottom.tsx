"use client"

import { useState, useEffect } from "react"
import { Award } from "lucide-react"
import Link from "next/link"
import type { SiteContent } from "@/src/interfaces/SiteContent"
import Image from "next/image"

type AvisoCofeprisContent = Pick<SiteContent, "doctorInfo" | "doctorWorkInfo">

export default function AvisoCofeprisTopBottom() {
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
    <div className="bg-dw-dark text-white py-2 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-sm sm:text-base space-y-2 sm:space-y-0">
        <div className="flex items-center text-center sm:text-left">
          <Award className="mr-2 flex-shrink-0" size={16} />
          <span className="flex-wrap">
            AVISO COFEPRIS: {doctorWorkInfo.avisoCofepris} | CÉD. PROF.: {doctorInfo.cedProf} | CÉD ESP:{" "}
            {doctorInfo.cedEsp}{" "}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href={doctorInfo.facebookLink} target="_blank" rel="noopener noreferrer">
            <Image src="/images/icons/facebook.svg" alt="Facebook" width={20} height={20} />
          </Link>
          <Link href={doctorInfo.instagramLink} target="_blank" rel="noopener noreferrer">
            <Image src="/images/icons/instagram.svg" alt="Instagram" width={20} height={20} />
          </Link>
          <Link href={doctorInfo.googleMapsLink} target="_blank" rel="noopener noreferrer">
            <Image src="/images/icons/google.svg" alt="Google" width={20} height={20} />
          </Link>
          <Link href={doctorInfo.doctoraliaLink} target="_blank" rel="noopener noreferrer">
            <Image src="/images/icons/doctoralia.svg" alt="Doctoralia" width={20} height={20} />
          </Link>
        </div>
      </div>
    </div>
  )
}

