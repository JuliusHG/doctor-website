import type React from "react"
import { importSection, getSelectedSections } from "@/src/app/utils/sectionsImports"

export default async function Home() {
  const selectedSections = await getSelectedSections()
  console.log("Selected sections in Home:", selectedSections)

  const sections = await Promise.all(
    Object.entries(selectedSections).map(async ([sectionType, config]) => {
      if (config && typeof config === "object" && "display" in config && "component" in config) {
        if (config.display && sectionType !== "Header" && sectionType !== "NavMenu" && sectionType !== "Footer") {
          try {
            const Component = await importSection(sectionType as any, config.component)
            console.log(`Imported component for ${sectionType}:`, Component)
            return Component ? { type: sectionType, Component } : null
          } catch (error) {
            console.error(`Error importing ${sectionType}:`, error)
            return null
          }
        }
      }
      return null
    }),
  )

  const filteredSections = sections.filter(
    (section): section is { type: string; Component: React.ComponentType } => section !== null,
  )

  return (
    <>
      {filteredSections.map(({ type, Component }) => (
        <Component key={type} />
      ))}
    </>
  )
}

