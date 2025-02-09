import Link from "next/link"

interface ButtonWhatsappProps {
  whatsapp: string
  text?: string
  defaultText: string
}

export default function ButtonWhatsapp({ whatsapp, text, defaultText }: ButtonWhatsappProps) {
  return (
    <Link
      href={`https://wa.me/${whatsapp}`}
      className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-sm transition duration-300"
    >
      {text || defaultText}
    </Link>
  )
}

