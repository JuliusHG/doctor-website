interface RiskFactorsSectionProps {
    riskFactors?: string[];
  }
  
  export default function RiskFactorsSection({ riskFactors = [] }: RiskFactorsSectionProps) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Factores de Riesgo</h2>
          {riskFactors.length > 0 ? (
            <ul className="list-disc list-inside">
              {riskFactors.map((factor, index) => (
                <li key={index} className="text-gray-700 mb-2">{factor}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No hay factores de riesgo disponibles para esta enfermedad.</p>
          )}
        </div>
      </section>
    )
  }
  
  