import { cache } from "react"

// Function to get selected sections
async function getSelectedSections() {
  const response = await fetch("/api/selected-sections", { next: { revalidate: 60 } })
  if (!response.ok) {
    throw new Error("Failed to fetch selected sections")
  }
  return response.json()
}

// Cache the result of getSelectedSections
const getCachedSelectedSections = cache(getSelectedSections)

// Function to dynamically import a component
export async function dynamicImport(sectionType: string) {
  const selectedSections = await getCachedSelectedSections()
  const componentFile = selectedSections[`${sectionType}-selected`]

  if (!componentFile) {
    console.warn(`No component selected for ${sectionType}`)
    return null
  }

  const [folder, filename] = componentFile.split("/")
  try {
    const module = await import(`@/src/app/components/${folder}/${filename}`)
    return module.default
  } catch (error) {
    console.error(`Error importing component ${componentFile}:`, error)
    return null
  }
}

