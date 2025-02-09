import fs from "fs/promises"
import path from "path"

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

export async function getSelectedSections(): Promise<SelectedSections> {
  const filePath = path.join(process.cwd(), "src", "data", "selected-sections.json")
  const fileContents = await fs.readFile(filePath, "utf8")
  return JSON.parse(fileContents)
}

