import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import IntroSection from "../sections/common/IntroSection"
import TitleSection from "../sections/common/TitleSection"
import ReturnButton from "../sections/common/ReturnButton"
import diseasesData from "../../data/diseasesDataMetadata.json"
import siteContent from "../../data/site-content.json"

export const metadata: Metadata = {
  title: diseasesData.enfermedadesMeta.main.title,
  description: diseasesData.enfermedadesMeta.main.description,
  openGraph: diseasesData.enfermedadesMeta.main.openGraph,
  alternates: diseasesData.enfermedadesMeta.main.alternates,
}

export default function DiseasesPage() {
  const { backgroundImage, pageTitle, sectionTitle, sectionSubtitle } = siteContent.diseasesSection.page
  
  return (
    <main>
      <IntroSection backgroundImage={backgroundImage} text={pageTitle} />
      <TitleSection title={sectionTitle} subtitle={sectionSubtitle} />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {diseasesData.diseases.map((disease) => (
              <Link href={`/enfermedades/${disease.id}`} key={disease.id} className="block">
                <div className="bg-white rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                  <Image
                    src={disease.imageHome || "/placeholder.svg"}
                    alt={disease.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl text-dw-dark font-semibold mb-2">{disease.name}</h3>
                    <p className="text-gray-600">{disease.shortDescription}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8 flex justify-between">
        <ReturnButton href="/" label="Volver al Inicio" />
        {/*<Link href="#" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors">
          {buttonText}
        </Link>*/}
      </div>
    </main>
  )
}

