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
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-36 px-48">
        {/* Address Box */}
        <div className="flex flex-col items-center text-center">
          <MapPin className="w-12 h-12 text-[#39B8B0] mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">{doctorWorkInfo.consultingHeader}</h2>
          <p className="text-gray-500">{doctorWorkInfo.consultingAddress}</p>
        </div>

        {/* Consulting Hours Box */}
        <div className="flex flex-col items-center text-center">
          <Clock className="w-12 h-12 text-[#39B8B0] mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{doctorWorkInfo.consultingHoursDaysHeader}</h2>
          <div>
            <p className="text-gray-500">{doctorWorkInfo.consultingHoursDaysSubheader1}</p>
            <p className="text-gray-500">{doctorWorkInfo.consultingHours1}</p>
            <p className="text-gray-500 mt-2">{doctorWorkInfo.consultingHoursDaysSubheader2}</p>
            <p className="text-gray-500">{doctorWorkInfo.consultingHours2}</p>
          </div>
        </div>

        {/* Phone Numbers Box */}
        <div className="flex flex-col items-center text-center">
          <Phone className="w-12 h-12 text-[#39B8B0] mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{doctorWorkInfo.consultingPhonesHeader}</h2>
          <div>
            <div className="text-gray-500">{doctorWorkInfo.consultingSchedulePhonesSubheader} : {doctorWorkInfo.consultingSchedulePhone}</div>
            <div className="text-gray-500">{doctorWorkInfo.consultingUrgenciesPhonesSubheader} : {doctorWorkInfo.consultingUrgenciesPhone}</div>
          </div>
        </div>
      </div>

      {/* Google Maps Frame */}
      {/* <div className="w-full h-[400px]">
        <iframe
          src={googleMapsLink}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div> */}
    </div>
  )
}

export default ContactoPage
