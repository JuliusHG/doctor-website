import { cache } from "react"

type SectionType =
  | "Hero"
  | "Certifications"
  | "Experience"
  | "AboutUs"
  | "Purpose"
  | "Services"
  | "Symptoms"
  | "PhotosGallery"
  | "Diseases"
  | "CallToAction"
  | "CallToActionIndividual"
  | "Testimonials"
  | "PaymentMethods"
  | "Insurance"
  | "GeneralCallToAction"
  | "Header"
  | "Footer"

interface SectionConfig {
  component: string
  display: boolean
}

interface SelectedSections {
  [key: string]: SectionConfig
}

export async function importSection(sectionType: SectionType, componentName: string) {
  try {
    console.log(`Attempting to import ${sectionType}/${componentName}`)
    const module = await import(`@/src/app/sections/${sectionType}/${componentName}`)
    console.log(`Successfully imported ${sectionType}/${componentName}`)
    return module.default
  } catch (error) {
    console.error(`Error importing ${sectionType} component ${componentName}:`, error)
    return null
  }
}

async function fetchSelectedSections(): Promise<SelectedSections> {
  if (typeof window === "undefined") {
    // Server-side: use file system
    const fs = await import("fs/promises")
    const path = await import("path")
    const filePath = path.join(process.cwd(), "src", "data", "selected-sections.json")
    const fileContents = await fs.readFile(filePath, "utf8")
    return JSON.parse(fileContents)
  } else {
    // Client-side: use fetch
    const response = await fetch("/api/selected-sections")
    if (!response.ok) {
      throw new Error("Failed to fetch selected sections")
    }
    return response.json()
  }
}

export const getSelectedSections = cache(fetchSelectedSections)

