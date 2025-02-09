import { Inter, Lato, Montserrat, Ballet } from "next/font/google"

export const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
})

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat"
})

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const ballet = Ballet({
  subsets: ["latin"],
  variable: "--font-ballet",
})