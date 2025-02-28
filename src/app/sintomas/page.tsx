import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import IntroSection from "../sections/common/IntroSection"
import TitleSection from "../sections/common/TitleSection"
import symptomsData from "../../data/symptomsDataMetadata.json"
import siteContent from "../../data/site-content.json"
import ReturnButton from "../sections/common/ReturnButton"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: symptomsData.sintomasMeta.main.title,
  description: symptomsData.sintomasMeta.main.description,
  openGraph: symptomsData.sintomasMeta.main.openGraph,
  alternates: symptomsData.sintomasMeta.main.alternates,
}

export default function SymptomsPage() {
  const { backgroundImage, pageTitle, sectionTitle, sectionSubtitle } = siteContent.symptoms.page

  return (
    <main>
      <IntroSection backgroundImage={backgroundImage} text={pageTitle} />
      <TitleSection title={sectionTitle} subtitle={sectionSubtitle} />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {symptomsData.symptoms.map((symptom) => (
              <Link href={`/sintomas/${symptom.id}`} key={symptom.id} className="block">
                <div className="bg-white rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={symptom.imageHome || "/placeholder.svg"}
                      alt={symptom.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 h-64 text-center flex flex-col">
                    <h3 className="text-2xl text-dw-dark font-extrabold mb-2 h-16 overflow-hidden">{symptom.name}</h3>
                    <p className="text-gray-600 mb-2 h-24 overflow-hidden">{symptom.shortDescription}</p>
                    <div className="mt-auto flex justify-center">
                      <button className="bg-dw-dark text-white px-4 py-2 rounded-full flex items-center">
                        {siteContent.symptoms.linkText}
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

