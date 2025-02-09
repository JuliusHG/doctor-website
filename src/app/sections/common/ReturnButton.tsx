import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

interface ReturnButtonProps {
  href: string
  label: string
}

export default function ReturnButton({ href, label }: ReturnButtonProps) {
  return (
    <Link href={href} className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
      <ChevronLeft size={20} className="mr-2" />
      {label}
    </Link>
  )
}