import type { Metadata } from "next"
import { notFound } from "next/navigation"
import IntroSection from "../../sections/common/IntroSection"
import TitleSection from "../../sections/common/TitleSection"
import ReturnButton from "../../sections/common/ReturnButton"
import ServiciosPage from "../../sections/servicios/ServiciosPage-cleener"
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
      <ServiciosPage service={service} />
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

