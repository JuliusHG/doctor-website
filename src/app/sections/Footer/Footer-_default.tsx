"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import {FacebookIcon,InstagramIcon,XIcon,LinkedinIcon,YoutubeIcon,MapPinIcon,PhoneIcon,MailIcon,ClockIcon} from "lucide-react"
import type { SiteContent } from "@/src/interfaces/SiteContent"
import AvisoCofeprisCedProfCedEsp from "../common/AvisoCofepris-CedProf-CedEsp"

type FooterContent = Pick<SiteContent, "doctorInfo" | "doctorWorkInfo">

export default function Footer() {
  const [content, setContent] = useState<FooterContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const siteContent = await import("../../../data/site-content.json")
        setContent(siteContent as FooterContent)
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
    <footer className="bg-pink-800 text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl md:text-2xl font-bold mb-2">{doctorInfo.name}</h2>
            <p className="mb-4">{doctorInfo.specialist}</p>
            <div className="flex space-x-4 mb-4">
              <a
                href={doctorInfo.facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <FacebookIcon size={20} />
              </a>
              <a
                href={doctorInfo.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <InstagramIcon size={20} />
              </a>
              <a href={doctorInfo.xLink} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                <XIcon size={20} />
              </a>
              <a
                href={doctorInfo.linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href={doctorInfo.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <YoutubeIcon size={20} />
              </a>
            </div>
            <div className="flex items-center mb-2">
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
          </div>

          {/* Column 2 */}
          <div>
            <Image
              src="/images/logos/DraMarthaRuiz_Logo_bco.png"
              alt={doctorInfo.name}
              width={400}
              height={150}
              className="mb-4"
            />
          </div>

          {/* Column 3 */}
          <div className="pl-12">
            <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center">
              <MapPinIcon size={20} className="mr-2" />
              {doctorWorkInfo.hospitalHeader}
            </h3>
            <p className="mb-4 pl-8">
              <a
                href={doctorInfo.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                {doctorWorkInfo.hospitalAddress}
              </a>
            </p>
            <h4 className="font-semibold mb-2 flex items-center">
              <ClockIcon size={20} className="mr-2" />
              {doctorWorkInfo.hospitalHoursDaysHeader}
            </h4>
            <div className="pl-6 mb-4">
              <p className="font-medium mb-1 pl-4">{doctorWorkInfo.hospitalHoursDaysSubheader1}</p>
              <p className="mb-2 pl-8">{doctorWorkInfo.hospitalHours1}</p>
              <p className="font-medium mb-1 pl-4">{doctorWorkInfo.hospitalHoursDaysSubheader2}</p>
              <p className="pl-8">{doctorWorkInfo.hospitalHours2}</p>
            </div>
            <h4 className="font-semibold mb-2 flex items-center">
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
      </div>
      <AvisoCofeprisCedProfCedEsp />
    </footer>
  )
}

