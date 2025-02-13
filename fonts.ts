import { Oswald, Teko, Nunito_Sans } from "next/font/google"

export const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald"
})

export const teko = Teko({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-teko"
})

export const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito-sans"
})
