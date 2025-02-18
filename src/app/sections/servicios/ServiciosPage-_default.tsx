import Image from "next/image"
import CallToActionIndividual from "../CallToActionIndividual/CallToActionIndividual-_default"

interface Service {
  id: string
  title: string
  imageIndividual: string
  description: string
  benefits: string[]
  process: string[]
  painful: string
  forWhat: string
}

interface ServiciosPageProps {
  service: Service
}

export default function ServiciosPage({ service }: ServiciosPageProps) {
  return (
    <>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <Image
                  src={service.imageIndividual || "/placeholder.svg"}
                  alt={service.title}
                  width={500}
                  height={300}
                  className="rounded-lg mb-6"
                />
                <h2 className="text-2xl font-semibold mb-4">Descripción</h2>
                <p className="text-gray-700 mb-6">{service.description}</p>
                <h2 className="text-2xl font-semibold mb-4">Beneficios</h2>
                <ul className="list-disc list-inside mb-6">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="text-gray-700 mb-2">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Proceso</h2>
                <ol className="list-decimal list-inside mb-6">
                  {service.process.map((step, index) => (
                    <li key={index} className="text-gray-700 mb-2">
                      {step}
                    </li>
                  ))}
                </ol>
                <h2 className="text-2xl font-semibold mb-4">¿Es doloroso?</h2>
                <p className="text-gray-700 mb-6">{service.painful}</p>
                <h2 className="text-2xl font-semibold mb-4">¿Para qué sirve?</h2>
                <p className="text-gray-700 mb-6">{service.forWhat}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CallToActionIndividual id={service.id} type="service" />
    </>
  )
}

