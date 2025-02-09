import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const componentsDir = path.join(process.cwd(), "src" , "app", "sections")
const sectionModelsPath = path.join(process.cwd(), "src" , "data", "section-models.json")

interface SectionModel {
  file: string
  imagePath: string | null
  description: string | null
}

interface SectionModels {
  [key: string]: SectionModel[]
}

async function updateSectionModels(): Promise<void> {
  const sectionTypes = [
    "Header",
    "NavMenu",
    "Hero",
    "Certifications",
    "AboutUs",
    "Experience",
    "Purpose",
    "CallToAction",
    "Services",
    "Symptoms",
    "Diseases",
    "Testimonials",
    "PaymentMethods",
    "Insurance",
    "GeneralCallToAction",
    "CallToActionIndividual",
    "Footer",
  ]

  let sectionModels: SectionModels = {}

  // First, read the existing section-models.json file
  try {
    const existingData = await fs.readFile(sectionModelsPath, "utf-8")
    sectionModels = JSON.parse(existingData)
    console.log("Existing section models:", sectionModels)
  } catch (error) {
    console.error("Error reading existing section-models.json:", error)
    // If the file doesn't exist or can't be read, we'll start with an empty object
  }

  for (const sectionType of sectionTypes) {
    const folderPath = path.join(componentsDir, sectionType)
    try {
      const files = await fs.readdir(folderPath)
      console.log(`Files in ${sectionType}:`, files)
      sectionModels[sectionType] = []

      for (const file of files) {
        if (file.endsWith(".tsx")) {
          const filePath = path.join(folderPath, file)
          const imagePath = file.replace(".tsx", ".jpg")
          const imageExists = files.includes(imagePath)
          console.log(`${file}: Image ${imageExists ? "exists" : "does not exist"} (${imagePath})`)

          // Read the file content and parse the description
          const content = await fs.readFile(filePath, "utf-8")
          const descriptionMatch = content.match(/@section-description\s+(.*?)(?:\s*\*\/|\n)/s)
          const description = descriptionMatch ? descriptionMatch[1].trim() : null

          sectionModels[sectionType].push({
            file,
            imagePath: imageExists ? imagePath : null,
            description,
          })
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${folderPath}:`, error)
      // If the directory doesn't exist, we'll keep the existing data for this section type
      if (!sectionModels[sectionType]) {
        sectionModels[sectionType] = []
      }
    }
  }

  // Only write to the file if we have data
  if (Object.keys(sectionModels).length > 0) {
    console.log("Writing section models:", JSON.stringify(sectionModels, null, 2))
    await fs.writeFile(sectionModelsPath, JSON.stringify(sectionModels, null, 2))
  } else {
    console.error("No data to write to section-models.json")
  }
}

export async function POST() {
  try {
    await updateSectionModels()
    return NextResponse.json({ message: "Sections updated successfully" })
  } catch (error) {
    console.error("Error updating sections:", error)
    return NextResponse.json({ error: "Failed to update sections" }, { status: 500 })
  }
}

