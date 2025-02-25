"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import type { SiteContent } from "@/src/interfaces/SiteContent"

type SocialIconsContent = Pick<SiteContent, "doctorInfo">

export default function SocialIcons() {
  const [content, setContent] = useState<SocialIconsContent | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const siteContent = await import("../../../data/site-content.json")
        setContent(siteContent as SocialIconsContent)
      } catch (err) {
        console.error("Failed to load content for SocialIcons", err)
      }
    }
    loadContent()
  }, [])

  if (!content) return null

  const { doctorInfo } = content

  return (
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
      {/* <Link href={doctorInfo.doctoraliaLink} target="_blank" rel="noopener noreferrer">
        <Image src="/images/icons/doctoralia.svg" alt="Doctoralia" width={20} height={20} />
      </Link> */}
      <Link href={doctorInfo.nimboLink} target="_blank" rel="noopener noreferrer">
        <Image src="/images/icons/nimbo.svg" alt="Nimbo" width={20} height={20} />
      </Link>
    </div>
  )
}