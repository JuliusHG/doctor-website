interface CausesSectionProps {
    causes?: string[];
  }
  
  export default function CausesSection({ causes = [] }: CausesSectionProps) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Causas</h2>
          {causes.length > 0 ? (
            <ul className="list-disc list-inside">
              {causes.map((cause, index) => (
                <li key={index} className="text-gray-700 mb-2">{cause}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No hay causas disponibles para esta enfermedad.</p>
          )}
        </div>
      </section>
    )
  }
  