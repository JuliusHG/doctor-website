import Link from "next/link"

interface ButtonWhatsappProps {
  whatsapp: string
  text?: string
  defaultText: string
  className?: string
}

export default function ButtonWhatsapp({ whatsapp, text, defaultText, className = "" }: ButtonWhatsappProps) {
  return (
    <Link
      href={`https://wa.me/${whatsapp}`}
      className={`
        ${className}
        bg-dw-soft
        text-white
        hover:bg-white
        hover:text-blue-300
        font-bold
        text-center
        py-2
        px-4
        hover:bg-white
        hover:text-blue-300
        rounded-tl-none rounded-br-none rounded-tr-xl rounded-bl-xl
        hover:rounded-tl-xl hover:rounded-br-xl hover:rounded-tr-none hover:rounded-bl-none
        transition-all duration-300
        `}
    >
      {text || defaultText}
    </Link>
  )
}