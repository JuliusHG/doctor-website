import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import IntroSection from "../../sections/common/IntroSection"
import TitleSection from "../../sections/common/TitleSection"
import CallToActionIndividual from "../../sections/CallToActionIndividual/CallToActionIndividual-_default"
import ReturnButton from "../../sections/common/ReturnButton"
import symptomsData from "../../../data/symptomsDataMetadata.json"
import siteContent from "../../../data/site-content.json"

type Params = {
  symptomId: string
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { symptomId } = await params
  const symptom = symptomsData.symptoms.find((s) => s.id === symptomId)

  if (!symptom) {
    return {
      title: "Síntoma no encontrado",
      description: "El síntoma que busca no se encuentra en nuestra base de datos.",
    }
  }

  return {
    title: symptom.metadata.title,
    description: symptom.metadata.description,
    openGraph: symptom.metadata.openGraph,
    alternates: symptom.metadata.alternates,
  }
}

export default async function SymptomPage({ params }: { params: Promise<Params> }) {
  const { symptomId } = await params
  const symptom = symptomsData.symptoms.find((s) => s.id === symptomId)

  if (!symptom) {
    notFound()
  }

  return (
    <main className="bg-gray-50">
      <IntroSection backgroundImage={symptom.imageIndividual} text={symptom.name} />
      <TitleSection title={symptom.name} subtitle="Información detallada sobre el síntoma" />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <Image
                  src={symptom.imageIndividual || "/placeholder.svg"}
                  alt={symptom.name}
                  width={500}
                  height={300}
                  className="rounded-lg mb-6"
                />
                <h2 className="text-2xl font-semibold mb-4">Descripción</h2>
                <p className="text-gray-700 mb-6">{symptom.description}</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Causas comunes</h2>
                <ul className="list-disc list-inside mb-6">
                  {symptom.causes.map((cause, index) => (
                    <li key={index} className="text-gray-700 mb-2">
                      {cause}
                    </li>
                  ))}
                </ul>
                <h2 className="text-2xl font-semibold mb-4">Condiciones relacionadas</h2>
                <ul className="list-disc list-inside mb-6">
                  {symptom.relatedConditions.map((condition, index) => (
                    <li key={index} className="text-gray-700 mb-2">
                      {condition}
                    </li>
                  ))}
                </ul>
                <h2 className="text-2xl font-semibold mb-4">Consejos de manejo</h2>
                <ul className="list-disc list-inside mb-6">
                  {symptom.managementTips.map((tip, index) => (
                    <li key={index} className="text-gray-700 mb-2">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CallToActionIndividual id={symptomId} type="symptom" />
      <div className="container mx-auto px-4 py-8 flex space-x-4">
        <ReturnButton href="/sintomas" label={siteContent.symptoms.individualPage.returnButton.text} />
      </div>
    </main>
  )
}

export function generateStaticParams(): { symptomId: string }[] {
  return symptomsData.symptoms.map((symptom) => ({
    symptomId: symptom.id,
  }))
}

