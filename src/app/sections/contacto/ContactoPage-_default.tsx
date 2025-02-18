import type React from "react"
import type { SiteContent } from "../../../interfaces/SiteContent"
import type { LucideIcon } from "lucide-react"

type ContactPageProps = {
  doctorWorkInfo: SiteContent["doctorWorkInfo"]
  MapPin: LucideIcon
  Clock: LucideIcon
  Phone: LucideIcon
  googleMapsLink: string
}

const ContactoPage: React.FC<ContactPageProps> = ({ doctorWorkInfo, MapPin, Clock, Phone, googleMapsLink }) => {
  return (
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
            src={googleMapsLink}
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
  )
}

export default ContactoPage

