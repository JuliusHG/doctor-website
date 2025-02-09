import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import siteContent from '../../../data/site-content.json'

export default function ContactInfo() {
  const { address, phone, email } = siteContent.doctorInfo;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Información de contacto</h2>
      <div className="space-y-4">
        <div className="flex items-start">
          <MapPin className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
          <p>{address}</p>
        </div>
        <div className="flex items-center">
          <Phone className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0" />
          <p>{phone}</p>
        </div>
        <div className="flex items-center">
          <Mail className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0" />
          <p>{email}</p>
        </div>
        <div className="flex items-start">
          <Clock className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
          <div>
            <p className="font-bold">Horario de atención:</p>
            <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
            <p>Sábado: 9:00 AM - 2:00 PM</p>
            <p>Domingo: Cerrado</p>
          </div>
        </div>
      </div>
    </div>
  )
}

