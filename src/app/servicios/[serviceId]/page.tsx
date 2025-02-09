import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import IntroSection from "../../sections/common/IntroSection"
import TitleSection from "../../sections/common/TitleSection"
import CallToActionIndividual from "../../sections/CallToActionIndividual/CallToActionIndividual-_default"
import ReturnButton from "../../sections/common/ReturnButton"
import servicesData from "../../../data/servicesDataMetadata.json"
import siteContent from "../../../data/site-content.json"

type Params = {
  serviceId: string
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { serviceId } = await params
  const service = servicesData.services.find((s) => s.id === serviceId)

  if (!service) {
    return {
      title: "Servicio no encontrado",
      description: "El servicio que busca no se encuentra en nuestra base de datos.",
    }
  }

  return {
    title: service.metadata.title,
    description: service.metadata.description,
    openGraph: service.metadata.openGraph,
    alternates: service.metadata.alternates,
  }
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { serviceId } = await params
  const service = servicesData.services.find((s) => s.id === serviceId)

  if (!service) {
    notFound()
  }

  return (
    <main className="bg-gray-50">
      <IntroSection backgroundImage={service.imageIndividual} text={service.title} />
      <TitleSection title={service.title} subtitle="Información detallada sobre el servicio" />
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
      <CallToActionIndividual id={serviceId} type="service" />
      <div className="container mx-auto px-4 py-8 flex space-x-4">
        <ReturnButton href="/servicios" label={siteContent.services.individualPage.returnButton.text} />
      </div>
    </main>
  )
}

export function generateStaticParams(): { serviceId: string }[] {
  return servicesData.services.map((service) => ({
    serviceId: service.id,
  }))
}

