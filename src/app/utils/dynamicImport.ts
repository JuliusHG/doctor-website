import { cache } from "react"
import fs from "fs/promises"
import path from "path"

// Function to get selected sections
async function getSelectedSections() {
  const filePath = path.join(process.cwd(), "data", "selected-sections.json")
  const fileContents = await fs.readFile(filePath, "utf8")
  return JSON.parse(fileContents)
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
    const module = await import(`../components/${folder}/${filename}`)
    return module.default
  } catch (error) {
    console.error(`Error importing component ${componentFile}:`, error)
    return null
  }
}

