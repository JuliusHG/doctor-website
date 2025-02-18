"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import {MapPinIcon, PhoneIcon, MailIcon, ClockIcon} from "lucide-react"
import type { SiteContent } from "@/src/interfaces/SiteContent"
import AvisoCofeprisCedProfCedEsp from "../common/AvisoCofepris-CedProf-CedEsp"

type FooterContent = Pick<SiteContent, "doctorInfo" | "doctorWorkInfo" | "footer">

export default function Footer() {
  const [content, setContent] = useState<FooterContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const siteContent = await import("../../../data/site-content.json")
        setContent(siteContent as FooterContent)
        console.log("Footer background image:", siteContent.footer.backgroundImage)
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

  const { doctorInfo, doctorWorkInfo, footer } = content

  return (
    <footer className="bg-dw-dark text-white pt-8 pb-2 md:pt-12 md:pb-4 relative">
        {/* <div className="absolute inset-0 z-0">
            <Image
            src={footer.backgroundImage || "/placeholder.svg"}
            alt="Footer background"
            layout="fill"
            objectFit="cover"
            quality={100}
            />
        </div> */}
        <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Column 1 */}
                <div className="flex flex-col items-center mb-2 md:items-center">
                    <div className="mb-8">
                        <Image
                            src={footer.logoFooter}
                            alt={doctorInfo.name}
                            width={300}
                            height={100}
                        />
                    </div>
                    <div className="flex justify-center items-center space-x-4 mb-4">
                        <a
                            href={doctorInfo.facebookLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/10 rounded-md p-2 hover:bg-dw-darker transition-colors duration-200"
                        >
                            <Image src="/images/icons/facebook.svg" alt="Facebook" width={20} height={20} />
                        </a>
                        <a
                            href={doctorInfo.instagramLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/10 rounded-md p-2 hover:bg-dw-darker transition-colors duration-200"
                        >
                            <Image src="/images/icons/instagram.svg" alt="Instagram" width={20} height={20} />
                        </a>
                        <a
                            href={doctorInfo.googleMapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/10 rounded-md p-2 hover:bg-dw-darker transition-colors duration-200"
                        >
                            <Image src="/images/icons/google.svg" alt="Google" width={20} height={20} />
                        </a>
                        <a
                            href={doctorInfo.doctoraliaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/10 rounded-md p-2 hover:bg-dw-darker transition-colors duration-200"
                        >
                            <Image src="/images/icons/doctoralia.svg" alt="Doctoralia" width={20} height={20} />
                        </a>
                    </div>
                </div>

                {/* Column 2 */}
                <div className="pl-12">
                    <h3 className="text-3xl md:text-3xl font-semibold mb-4 flex items-center">
                        Consultas
                    </h3>
                    <h3 className="text-lg mt-4 md:text-xl font-semibold mb-4 flex items-center">
                        <MapPinIcon size={20} className="mr-2" />
                        {doctorWorkInfo.consultingHeader}
                    </h3>
                    <p className="mb-4 pl-8">
                        <a
                            href={doctorInfo.googleMapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400"
                        >
                            {doctorWorkInfo.consultingAddress}
                        </a>
                    </p>
                    <h4 className="font-semibold mb-2 flex items-center">
                        <ClockIcon size={20} className="mr-2" />
                        {doctorWorkInfo.consultingHoursDaysHeader}
                    </h4>
                    <div className="pl-6 mb-4">
                        <p className="font-medium mb-1 pl-4">{doctorWorkInfo.consultingHoursDaysSubheader1}</p>
                        <p className="mb-2 pl-8">{doctorWorkInfo.consultingHours1}</p>
                        <p className="font-medium mb-1 pl-4">{doctorWorkInfo.consultingHoursDaysSubheader2}</p>
                        <p className="pl-8">{doctorWorkInfo.consultingHours2}</p>
                    </div>
                    
                </div>

                {/* Column 3 */}

                <div className="flex flex-col items-center pl-8 md:items-start">
                    <h3 className="text-3xl md:text-3xl font-semibold mb-4 flex items-center">
                        Contacto
                    </h3>
                    <div className="flex items-center mb-2 mt-4">
                        <PhoneIcon size={20} className="mr-2" />
                        <a href={`tel:${doctorInfo.phone}`} className="hover:text-blue-400">
                            {doctorInfo.phone}
                        </a>
                    </div>
                    <div className="flex items-center">
                        <MailIcon size={20} className="mr-2" />
                        <a href={`mailto:${doctorInfo.email}`} className="hover:text-blue-400">
                            {doctorInfo.email}
                        </a>
                    </div>

                    <h4 className="font-semibold mb-2 mt-8 flex items-center">
                        <PhoneIcon size={20} className="mr-2" />
                        {doctorWorkInfo.hospitalPhonesHeader}
                    </h4>
                    <div className="pl-6 mb-4">
                        <p className="font-medium mb-1 pl-4">{doctorWorkInfo.hospitalSchedulePhonesSubheader}</p>
                        <p className="mb-2 pl-8">
                            <a href={`tel:${doctorWorkInfo.hospitalSchedulePhone}`} className="hover:text-blue-400">
                            {doctorWorkInfo.hospitalSchedulePhone}
                            </a>
                        </p>
                        <p className="font-medium mb-1 pl-4">{doctorWorkInfo.hospitalUrgenciesPhonesSubheader}</p>
                        <p className="pl-8">
                            <a href={`tel:${doctorWorkInfo.hospitalUrgenciesPhone}`} className="hover:text-blue-400">
                            {doctorWorkInfo.hospitalUrgenciesPhone}
                            </a>
                        </p>
                    </div>

                </div>
                
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                {/* Copyright section is commented out in the original code */}
            </div>
            <div className="mt-2 relative z-20">
                <AvisoCofeprisCedProfCedEsp transparentBg={true} />
            </div>
        </div>
    </footer>
  )
}

