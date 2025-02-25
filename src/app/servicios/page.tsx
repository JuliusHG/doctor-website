import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import IntroSection from '../sections/common/IntroSection'
import TitleSection from '../sections/common/TitleSection'
import servicesData from '../../data/servicesDataMetadata.json' // import servicesData from '../../data/services.json'
import siteContent from '../../data/site-content.json'
import ReturnButton from '../sections/common/ReturnButton'

export const metadata: Metadata = {
  title: servicesData.serviciosMeta.main.title,
  description: servicesData.serviciosMeta.main.description,
  openGraph: servicesData.serviciosMeta.main.openGraph,
  alternates: servicesData.serviciosMeta.main.alternates,
}

export default function ServicesPage() {
  const { backgroundImage, pageTitle, sectionTitle, sectionSubtitle } = siteContent.services.page;

  return (
    <main>
      <IntroSection 
        backgroundImage={backgroundImage}
        text={pageTitle}
      />
      <TitleSection 
        title={sectionTitle}
        subtitle={sectionSubtitle}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {servicesData.services.map((service) => (
              <Link href={`/servicios/${service.id}`} key={service.id} className="block">
                <div className="bg-white rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                  <Image
                    src={service.imageHome || "/placeholder.svg"}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  {/* <Image
                    src={service.iconIndividual || "/placeholder.svg"}
                    alt={service.title}
                    width={300}
                    height={200}
                    className="w-full h-32 object-contain"
                  /> */}
                  <div className="p-6 mb-16">
                    <h3 className="text-2xl text-dw-dark font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ReturnButton href="/" label="Volver al Inicio" />
    </main>
  )
}
