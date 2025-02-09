import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import IntroSection from "../../sections/common/IntroSection"
import TitleSection from "../../sections/common/TitleSection"
import CallToActionIndividual from "../../sections/CallToActionIndividual/CallToActionIndividual-_default"
import ReturnButton from "../../sections/common/ReturnButton"
import diseasesData from "../../../data/diseasesDataMetadata.json"
import siteContent from "../../../data/site-content.json"

type Params = {
  diseaseId: string
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { diseaseId } = await params
  const disease = diseasesData.diseases.find((d) => d.id === diseaseId)

  if (!disease) {
    return {
      title: "Enfermedad no encontrada",
      description: "La enfermedad que busca no se encuentra en nuestra base de datos.",
    }
  }

  return {
    title: disease.metadata.title,
    description: disease.metadata.description,
    openGraph: disease.metadata.openGraph,
    alternates: disease.metadata.alternates,
  }
}

export default async function DiseasePage({ params }: { params: Promise<Params> }) {
  const { diseaseId } = await params
  const disease = diseasesData.diseases.find((d) => d.id === diseaseId)

  if (!disease) {
    notFound()
  }

  return (
    <main className="bg-gray-50">
      <IntroSection backgroundImage={disease.imageIndividual} text={disease.name} />
      <TitleSection title={disease.name} subtitle={disease.technicalName} />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <Image
                  src={disease.imageIndividual || "/placeholder.svg"}
                  alt={disease.name}
                  width={500}
                  height={300}
                  className="rounded-lg mb-6"
                />
                <h2 className="text-2xl font-semibold mb-4">Descripción</h2>
                <p className="text-gray-700 mb-6">{disease.description}</p>
                <h2 className="text-2xl font-semibold mb-4">Síntomas</h2>
                <ul className="list-disc list-inside mb-6">
                  {disease.symptoms.map((symptom, index) => (
                    <li key={index} className="text-gray-700 mb-2">
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Causas</h2>
                <ul className="list-disc list-inside mb-6">
                  {disease.causes.map((cause, index) => (
                    <li key={index} className="text-gray-700 mb-2">
                      {cause}
                    </li>
                  ))}
                </ul>
                {/* <h2 className="text-2xl font-semibold mb-4">Tratamientos</h2>
                <ul className="list-disc list-inside mb-6">
                  {disease.treatments.map((treatment, index) => (
                    <li key={index} className="text-gray-700 mb-2">
                      {treatment}
                    </li>
                  ))}
                </ul> */}
                <h2 className="text-2xl font-semibold mb-4">Complicaciones</h2>
                <ul className="list-disc list-inside mb-6">
                  {disease.complications.map((complication, index) => (
                    <li key={index} className="text-gray-700 mb-2">
                      {complication}
                    </li>
                  ))}
                </ul>
                <h2 className="text-2xl font-semibold mb-4">Factores de Riesgo</h2>
                <ul className="list-disc list-inside mb-6">
                  {disease.riskFactors.map((factor, index) => (
                    <li key={index} className="text-gray-700 mb-2">
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Estadísticas en México</h2>
              <p className="text-gray-700 mb-6">{disease.mexicoStats}</p>
            </div>
          </div>
        </div>
      </section>
      <CallToActionIndividual id={diseaseId} type="disease" />
      <div className="container mx-auto px-4 py-8 flex space-x-4">
        <ReturnButton href="/enfermedades" label={siteContent.diseasesSection.individualPage.returnButton.text} />
      </div>
    </main>
  )
}

export function generateStaticParams(): { diseaseId: string }[] {
  return diseasesData.diseases.map((disease) => ({
    diseaseId: disease.id,
  }))
}

