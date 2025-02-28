"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon } from "lucide-react"
import type { SiteContent } from "@/src/interfaces/SiteContent"
import AvisoCofeprisTopBottom from "../common/AvisoCofepris-top-bottom"

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
    <div className="relative w-full">
      {/* PNG Separator at the top of the footer */}
      {/* <div className="w-full overflow-hidden">
        <Image
          src={footer.topSeparator || "/placeholder.svg"}
          alt="Footer separator"
          width={2880}
          height={140}
          className="w-full h-auto object-cover"
        />
      </div> */}

      <footer className="bg-dw-dark text-white pt-8 pb-8 md:pt-12 md:pb-10 relative">
        <div className="absolute inset-0 z-0">
          <Image
            src={footer.backgroundImage || "/placeholder.svg"}
            alt="Footer background"
            fill
            style={{ objectFit: "cover" }}
            quality={100}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div className="flex flex-col items-center mb-2 md:items-center">
              <div className="mb-8">
                <Image src={footer.logoFooter || "/placeholder.svg"} alt={doctorInfo.name} width={350} height={150} />
              </div>
            </div>

            {/* Column 2 */}
            <div className="pl-4 md:pl-12">
              <h3 className="text-3xl md:text-3xl font-semibold mb-4 flex items-center">Consultas</h3>
              <h3 className="text-lg mt-4 md:text-xl font-semibold mb-4 flex items-center">
                <MapPinIcon size={20} className="mr-2" />
                {doctorWorkInfo.consultingHeader}
              </h3>
              <p className="mb-4 pl-8">
                <a
                  href={doctorInfo.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-dw-soft"
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
            <div className="flex flex-col items-center pl-4 md:pl-8 md:items-start">
              <h3 className="text-3xl md:text-3xl font-semibold mb-4 flex items-center">Contacto</h3>
              <div className="flex items-center mb-2 mt-4">
                <PhoneIcon size={20} className="mr-2" />
                <a href={`tel:${doctorInfo.phone}`} className="hover:text-dw-soft">
                  {doctorInfo.phone}
                </a>
              </div>
              <div className="flex items-center">
                <MailIcon size={20} className="mr-2" />
                <a href={`mailto:${doctorInfo.email}`} className="hover:text-dw-soft">
                  {doctorInfo.email}
                </a>
              </div>
              <div className="flex justify-center items-center space-x-4 my-4">
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
                  href={doctorInfo.nimboLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 rounded-md p-2 hover:bg-dw-darker transition-colors duration-200"
                >
                  <Image src="/images/icons/nimbo.svg" alt="Nimbo" width={20} height={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* AvisoCofeprisTopBottom positioned outside the footer content */}
      <div className="w-full bg-dw-dark text-white">
        <AvisoCofeprisTopBottom />
      </div>
    </div>
  )
}
