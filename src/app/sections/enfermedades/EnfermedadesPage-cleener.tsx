import Image from "next/image"
import CallToActionIndividual from "../CallToActionIndividual/CallToActionIndividual-cleener-vertical"

interface Disease {
  id: string
  name: string
  technicalName: string
  imageIndividual: string
  description: string
  symptoms: string[]
  causes: string[]
  complications: string[]
  riskFactors: string[]
  mexicoStats: string
}

interface EnfermedadesPageProps {
  disease: Disease
}

export default function EnfermedadesPage({ disease }: EnfermedadesPageProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg pr-8">
              <Image
                src={disease.imageIndividual || "/placeholder.svg"}
                alt={disease.name}
                width={500}
                height={300}
                className="rounded-lg mb-6 w-full object-cover"
              />
              <h2 className="text-4xl font-semibold mb-4 text-dw-dark">Descripción</h2>
              <p className="text-gray-700 mb-6">{disease.description}</p>

              <h2 className="text-4xl font-semibold mb-4 text-dw-dark">Síntomas</h2>
              <ul className="list-disc list-inside mb-6">
                {disease.symptoms.map((symptom, index) => (
                  <li key={index} className="text-gray-700 mb-2">
                    {symptom}
                  </li>
                ))}
              </ul>

              <h2 className="text-4xl font-semibold mb-4 text-dw-dark">Causas</h2>
              <ul className="list-disc list-inside mb-6">
                {disease.causes.map((cause, index) => (
                  <li key={index} className="text-gray-700 mb-2">
                    {cause}
                  </li>
                ))}
              </ul>

              <h2 className="text-4xl font-semibold mb-4 text-dw-dark">Complicaciones</h2>
              <ul className="list-disc list-inside mb-6">
                {disease.complications.map((complication, index) => (
                  <li key={index} className="text-gray-700 mb-2">
                    {complication}
                  </li>
                ))}
              </ul>

              <h2 className="text-4xl font-semibold mb-4 text-dw-dark">Factores de Riesgo</h2>
              <ul className="list-disc list-inside mb-6">
                {disease.riskFactors.map((factor, index) => (
                  <li key={index} className="text-gray-700 mb-2">
                    {factor}
                  </li>
                ))}
              </ul>

              {/* <h2 className="text-4xl font-semibold mb-4 text-dw-dark">Estadísticas en México</h2>
              <p className="text-gray-700 mb-6">{disease.mexicoStats}</p> */}
            </div>
          </div>
          <div className="lg:w-1/3">
            <CallToActionIndividual id={disease.id} type="disease" />
          </div>
        </div>
      </div>
    </section>
  )
}

