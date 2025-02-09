import Link from 'next/link'
import Image from 'next/image'

interface Disease {
  id: string;
  name: string;
  image: string;
}

const diseases: Disease[] = [
  { id: 'enfermedad1', name: 'Enfermedad 1', image: '/images/enfermedad1.jpg' },
  { id: 'enfermedad2', name: 'Enfermedad 2', image: '/images/enfermedad2.jpg' },
  { id: 'enfermedad3', name: 'Enfermedad 3', image: '/images/enfermedad3.jpg' },
  { id: 'enfermedad4', name: 'Enfermedad 4', image: '/images/enfermedad4.jpg' },
  { id: 'enfermedad5', name: 'Enfermedad 5', image: '/images/enfermedad5.jpg' },
  { id: 'enfermedad6', name: 'Enfermedad 6', image: '/images/enfermedad6.jpg' },
]

export default function AllDiseasesSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {diseases.map((disease) => (
            <Link href={`/enfermedades/${disease.id}`} key={disease.id} className="block">
              <div className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
                <Image
                  src={disease.image}
                  alt={disease.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{disease.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
