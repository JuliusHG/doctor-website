"use client"

import { useState, useEffect } from "react"
import type { SiteContent } from "@/src/interfaces/SiteContent"
//import { Award } from "lucide-react"
//import Link from "next/link"
//import Image from "next/image"

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
      <div className="container mx-auto flex justify-center items-center text-sm sm:text-base">
        {/* <Award className="mr-2 flex-shrink-0" size={16} /> */}
        <span className="text-center">
          AVISO COFEPRIS: {doctorWorkInfo.avisoCofepris} | Céd. Prof. {doctorInfo.cedProf} | Céd. Esp. {doctorInfo.cedEsp}{/*  | Céd. Esp. {doctorInfo.cedEsp2} */}
        </span>
        {/* <div className="flex items-center space-x-4">
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
        </div> */}
      </div>
    </div>
  )
}

