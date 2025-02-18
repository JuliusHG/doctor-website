interface TitleSectionProps {
    title: string;
    subtitle: string;
  }
  
  export default function TitleSection({ title, subtitle }: TitleSectionProps) {
    return (
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl text-dw-dark font-bold mb-4">{title}</h2>
          <p className="text-2xl text-gray-600">{subtitle}</p>
        </div>
      </section>
    )
  }
  