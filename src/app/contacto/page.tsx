import type { Metadata } from "next"
import IntroSection from "../sections/common/IntroSection"
import ReturnButton from "../sections/common/ReturnButton"
import type { SiteContent } from "../../interfaces/SiteContent"
import { MapPin, Clock, Phone } from "lucide-react"

type ContactPageContent = Pick<SiteContent, "contact" | "doctorWorkInfo">

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await import("../../data/metadata.json")
  return {
    title: metadata.title,
    description: metadata.description,
  }
}

export default async function ContactoPage() {
  const siteContent = await import("../../data/site-content.json")
  const content = siteContent as ContactPageContent
  const { contact, doctorWorkInfo } = content
  const { backgroundImage, pageTitle } = contact.page

  return (
    <main className="bg-gray-50">
      <IntroSection backgroundImage={backgroundImage} text={pageTitle} />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="contact-info space-y-12">
              <div>
                <h2 className="text-3xl font-extrabold text-pink-600 mb-4 flex items-center">
                  <MapPin className="w-8 h-8 mr-2" />
                  {doctorWorkInfo.hospitalHeader}
                </h2>
                <p className="text-gray-600 text-lg">{doctorWorkInfo.consultingAddress}</p>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-pink-600 mb-6 flex items-center">
                  <Clock className="w-8 h-8 mr-2" />
                  {doctorWorkInfo.consultingHoursDaysHeader}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{doctorWorkInfo.consultingHoursDaysSubheader1}</h3>
                    <p className="text-gray-600 text-lg">{doctorWorkInfo.consultingHours1}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{doctorWorkInfo.consultingHoursDaysSubheader2}</h3>
                    <p className="text-gray-600 text-lg">{doctorWorkInfo.consultingHours2}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-pink-600 mb-6 flex items-center">
                  <Phone className="w-8 h-8 mr-2" />
                  {doctorWorkInfo.consultingPhonesHeader}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{doctorWorkInfo.consultingSchedulePhonesSubheader}</h3>
                    <p className="text-gray-600 text-lg">{doctorWorkInfo.consultingSchedulePhone}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{doctorWorkInfo.consultingUrgenciesPhonesSubheader}</h3>
                    <p className="text-gray-600 text-lg">{doctorWorkInfo.consultingUrgenciesPhone}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="map-container h-[400px] rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.8891666666665!2d-100.40213674959127!3d20.584148786246476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d3456e427a4971%3A0xcf330644f648d943!2sDra.%20Martha%20Ruiz%20Alergologa!5e0!3m2!1sen!2smx!4v1705276144959!5m2!1sen!2smx"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
      <ReturnButton href="/" label="Volver al Inicio" />
    </main>
  )
}

