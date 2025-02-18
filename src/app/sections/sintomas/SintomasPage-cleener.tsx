import Image from "next/image"
import CallToActionIndividual from "../CallToActionIndividual/CallToActionIndividual-cleener-vertical"

interface Symptom {
  id: string
  name: string
  imageIndividual: string
  description: string
  causes: string[]
  relatedConditions: string[]
  managementTips: string[]
}

interface SintomasPageProps {
  symptom: Symptom
}

export default function SintomasPage({ symptom }: SintomasPageProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg pr-8">
              <Image
                src={symptom.imageIndividual || "/placeholder.svg"}
                alt={symptom.name}
                width={500}
                height={300}
                className="rounded-lg mb-6 w-full object-cover"
              />
              <h2 className="text-3xl text-dw-dark font-semibold mb-4">Descripción</h2>
              <p className="text-gray-700 mb-6">{symptom.description}</p>

              <h2 className="text-3xl text-dw-dark font-semibold mb-4">Causas comunes</h2>
              <ul className="list-disc list-inside mb-6">
                {symptom.causes.map((cause, index) => (
                  <li key={index} className="text-gray-700 mb-2">
                    {cause}
                  </li>
                ))}
              </ul>

              {/* <h2 className="text-2xl font-semibold mb-4">Condiciones relacionadas</h2>
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
              </ul> */}
              
            </div>
          </div>
          <div className="lg:w-1/3">
            <CallToActionIndividual id={symptom.id} type="symptom" />
          </div>
        </div>
      </div>
    </section>
  )
}

