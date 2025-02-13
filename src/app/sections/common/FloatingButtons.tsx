"use client"

import { useState, useEffect } from "react"
import styles from "./FloatingButtons.module.css"
import { FaPhone, FaWhatsapp } from "react-icons/fa"

interface DoctorInfo {
  phone: string
  whatsapp: string
}

const FloatingButtons = () => {
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo | null>(null)

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const response = await fetch("/api/site-content")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (data && data.siteContent && data.siteContent.doctorInfo) {
          setDoctorInfo(data.siteContent.doctorInfo)
        } else {
          console.warn("Unexpected data structure:", data)
        }
      } catch (error) {
        console.error("Error fetching doctor info:", error)
      }
    }

    fetchDoctorInfo()
  }, [])

  if (!doctorInfo) {
    return null // or a loading indicator
  }

  const whatsappLink = `https://wa.me/${doctorInfo.whatsapp}`
  const phoneLink = `tel:${doctorInfo.phone}`

  return (
    <div>
      <a target="_blank" href={whatsappLink} className={styles.whatsapp} rel="noreferrer">
        <FaWhatsapp size={22} />
      </a>

      <a href={phoneLink} className={styles.phonecall}>
        <FaPhone size={12} />
      </a>
    </div>
  )
}

export default FloatingButtons



