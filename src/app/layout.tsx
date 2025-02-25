import "./globals.css"
import type React from "react"
import { metadata as baseMetadata } from "../interfaces/metadata"
import metadataJson from "../data/metadata.json"
import { importSection, getSelectedSections } from "@/src/app/utils/sectionsImports"
import { teko, nunitoSans } from "@/fonts"
import FloatingButtons from "./sections/common/FloatingButtons"
import { Toaster } from "@/components/ui/toaster"

// Extend the base metadata with favicon information
export const metadata = {
  ...baseMetadata,
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png" }],
    other: [
      { url: "/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const selectedSections = await getSelectedSections()
  console.log("Selected sections:", selectedSections)

  const HeaderComponent = selectedSections["Header"].display
    ? await importSection("Header", selectedSections["Header"].component).catch((err) => {
        console.error("Error importing Header:", err)
        return null
      })
    : null
  console.log("Header component:", HeaderComponent)

  const FooterComponent = selectedSections["Footer"].display
    ? await importSection("Footer", selectedSections["Footer"].component).catch((err) => {
        console.error("Error importing Footer:", err)
        return null
      })
    : null
  console.log("Footer component:", FooterComponent)

  return (
    <html lang={metadataJson.language} className={`${teko.variable} ${nunitoSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(metadataJson.locationSchema) }}
        />
        <meta name="google-site-verification" content="gtWVXwlFv5DLfjlFhgVr0YTAnLTIsZZP9SvIJub6cFs" />
      </head>
      <body>
        {HeaderComponent && <HeaderComponent />}
        <main>{children}</main>
        <Toaster />
        {FooterComponent && <FooterComponent />}
        <FloatingButtons />
      </body>
    </html>
  )
}

