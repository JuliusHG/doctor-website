import Link from "next/link"

interface ButtonCallNowProps {
  phone: string
  text?: string
  defaultText: string
  className?: string
}

export default function ButtonCallNow({ phone, text, defaultText, className = "" }: ButtonCallNowProps) {
  return (
    <Link
      href={`tel:${phone}`}
      className={`border-2 border-white hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded-full transition duration-300 ${className}`}
    >
      {text || defaultText}
    </Link>
  )
}




/* import Link from "next/link"

interface ButtonCallNowProps {
  phone: string
  text?: string
  defaultText: string
}

export default function ButtonCallNow({ phone, text, defaultText }: ButtonCallNowProps) {
  return (
    <Link
      href={`tel:${phone}`}
      className="border-2 border-white hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded-md transition duration-300"
    >
      {text || defaultText}
    </Link>
  )
}
 */