import type { Metadata } from "next"
import { notFound } from "next/navigation"
import IntroSection from "../../sections/common/IntroSection"
import TitleSection from "../../sections/common/TitleSection"
import ReturnButton from "../../sections/common/ReturnButton"
import EnfermedadesPage from "../../sections/enfermedades/EnfermedadesPage-cleener"
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
      <EnfermedadesPage disease={disease} />
      {/* <CallToActionIndividual id={diseaseId} type="disease" /> */}
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

