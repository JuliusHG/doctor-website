interface DescriptionSectionProps {
    description: string;
  }
  
  export default function DescriptionSection({ description }: DescriptionSectionProps) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Descripción</h2>
          <p className="text-gray-700">{description}</p>
        </div>
      </section>
    )
  }
  
  