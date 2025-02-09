import type React from "react"
import Image from "next/image"

interface ImageButtonProps {
  linkUrl: string
  className?: string
}

const ImageButton: React.FC<ImageButtonProps> = ({ linkUrl, className = "" }) => {
  return (
    <a
      href={linkUrl}
      className={`inline-flex items-center px-4 py-2 bg-pink-600 hover:bg-pink-700 transition-colors duration-300 rounded-md ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src="/images/icons/doctoralia.svg"
        alt="Doctoralia icon"
        width={32}
        height={32}
        className="mr-2 text-white"
      />
      <span className="text-white font-semibold">Más opiniones</span>
    </a>
  )
}

export default ImageButton

