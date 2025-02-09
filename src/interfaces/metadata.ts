import type { Metadata } from "next"
import metadataJson from "../data/metadata.json"

export const metadata: Metadata = {
  title: metadataJson.title,
  description: metadataJson.description,
  keywords: metadataJson.keywords,
  authors: [{ name: metadataJson.author }],
  openGraph: metadataJson.openGraph,
  twitter: metadataJson.twitter,
  icons: metadataJson.icons,
  manifest: metadataJson.manifest,
  alternates: metadataJson.alternates,
  verification: metadataJson.verification,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}