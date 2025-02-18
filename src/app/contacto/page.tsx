import type { Metadata } from "next"
import IntroSection from "../sections/common/IntroSection"
import ReturnButton from "../sections/common/ReturnButton"
import type { SiteContent } from "../../interfaces/SiteContent"
import { MapPin, Clock, Phone } from "lucide-react"
import ContactoPage from "../sections/contacto/ContactoPage-cleener"

type ContactPageContent = Pick<SiteContent, "contact" | "doctorWorkInfo" | "doctorInfo">

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await import("../../data/metadata.json")
  return {
    title: metadata.title,
    description: metadata.description,
  }
}

export default async function ContactPage() {
  const siteContent = await import("../../data/site-content.json")
  const content = siteContent as ContactPageContent
  const { contact, doctorWorkInfo, doctorInfo } = content
  const { backgroundImage, pageTitle } = contact.page

  return (
    <main className="bg-gray-50">
      <IntroSection backgroundImage={backgroundImage} text={pageTitle} />
      <section className="py-20">
        <ContactoPage
          doctorWorkInfo={doctorWorkInfo}
          MapPin={MapPin}
          Clock={Clock}
          Phone={Phone}
          googleMapsLink={doctorInfo.googleMapsLink}
        />
      </section>
      {/* <ReturnButton href="/" label="Volver al Inicio" /> */}
    </main>
  )
}

