import Image from 'next/image'

interface IntroSectionProps {
  backgroundImage: string;
  text: string;
}

export default function IntroSection({ backgroundImage, text }: IntroSectionProps) {
  return (
    <section className="relative h-96 flex items-center justify-center text-white">
      <Image
        src={backgroundImage || "/placeholder.svg"}
        alt="Background"
        fill
        style={{ objectFit: 'cover' }}
        className="absolute z-0"
      />
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
            
      <h1 className="text-5xl md:text-6xl font-bold relative z-20 text-center px-4">{text}</h1>
    </section>
  )
}