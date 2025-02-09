interface ComplicationsSectionProps {
    complications?: string[];
  }
  
  export default function ComplicationsSection({ complications = [] }: ComplicationsSectionProps) {
    return (
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Complicaciones</h2>
          {complications.length > 0 ? (
            <ul className="list-disc list-inside">
              {complications.map((complication, index) => (
                <li key={index} className="text-gray-700 mb-2">{complication}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No hay complicaciones disponibles para esta enfermedad.</p>
          )}
        </div>
      </section>
    )
  }
  
  