interface TitleSectionProps {
    title: string;
    subtitle: string;
  }
  
  export default function TitleSection({ title, subtitle }: TitleSectionProps) {
    return (
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 font-sans">{title}</h2>
          <p className="text-xl text-gray-600 font-sans">{subtitle}</p>
        </div>
      </section>
    )
  }
  