import type { Metadata } from "next"
import { notFound } from "next/navigation"
import IntroSection from "../../sections/common/IntroSection"
import TitleSection from "../../sections/common/TitleSection"
import ReturnButton from "../../sections/common/ReturnButton"
import SintomasPage from "../../sections/sintomas/SintomasPage-cleener"
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
      <SintomasPage symptom={symptom} />
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

