import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import IntroSection from "../sections/common/IntroSection"
import TitleSection from "../sections/common/TitleSection"
import servicesData from "../../data/servicesDataMetadata.json"
import siteContent from "../../data/site-content.json"
import ReturnButton from "../sections/common/ReturnButton"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: servicesData.serviciosMeta.main.title,
  description: servicesData.serviciosMeta.main.description,
  openGraph: servicesData.serviciosMeta.main.openGraph,
  alternates: servicesData.serviciosMeta.main.alternates,
}

export default function ServicesPage() {
  const { backgroundImage, pageTitle, sectionTitle, sectionSubtitle } = siteContent.services.page

  return (
    <main>
      <IntroSection backgroundImage={backgroundImage} text={pageTitle} />
      <TitleSection title={sectionTitle} subtitle={sectionSubtitle} />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {servicesData.services.map((service) => (
              <Link href={`/servicios/${service.id}`} key={service.id} className="block">
                <div className="bg-white rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={service.imageHome || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 h-64 text-center flex flex-col">
                    <h3 className="text-2xl text-dw-dark font-extrabold mb-2 h-16 overflow-hidden">{service.title}</h3>
                    <p className="text-gray-600 mb-2 h-24 overflow-hidden">{service.description}</p>
                    <div className="mt-auto flex justify-center">
                      <button className="bg-dw-dark text-white px-4 py-2 rounded-full flex items-center">
                        {siteContent.services.linkText}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8">
        <ReturnButton href="/" label="Volver al Inicio" />
      </div>
    </main>
  )
}

