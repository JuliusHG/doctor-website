import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import IntroSection from "../sections/common/IntroSection"
import TitleSection from "../sections/common/TitleSection"
import ReturnButton from "../sections/common/ReturnButton"
import diseasesData from "../../data/diseasesDataMetadata.json"
import siteContent from "../../data/site-content.json"
import { ArrowRight } from "lucide-react"

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {diseasesData.diseases.map((disease) => (
              <Link href={`/enfermedades/${disease.id}`} key={disease.id} className="block">
                <div className="bg-white rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={disease.imageHome || "/placeholder.svg"}
                      alt={disease.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 h-56 text-center flex flex-col">
                    <h3 className="text-2xl text-dw-dark font-extrabold mb-2 h-24 overflow-hidden">{disease.name}</h3>
                    <p className="text-gray-600 mb-2 h-64 overflow-hidden">{disease.shortDescription}</p>
                    <div className="mt-4 flex justify-center">
                      <button className="bg-dw-dark text-white px-4 py-2 rounded-full flex items-center">
                        {siteContent.diseasesSection.linkText}
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
      <div className="container mx-auto px-4 py-8 flex justify-between">
        <ReturnButton href="/" label="Volver al Inicio" />
      </div>
    </main>
  )
}

