// THIS SECTION SERVES AS HEADER WITH SELECTOR FOR DISEASES, SERVICES OR SYMPTOMS SECTIONS IN CASE
// WE USE THE "TABBED" SECTIONS. IN THAT CASE, THE SECTION THAT WILL BE THE DEFAULT SECTION SHOULD
// BE "VISIBLE" AND THE OTHER TWO WILL BE NOT VISIBLE. THEN INCORPORATE THE SECTION HEADER IN EACH
// SECTION .IN CASE THE SECTIONS ARE NOT TABBED, COMMENT THE BUTTONS SECTION IN EACH ONE AND SET
// ALL SECTIONS TO VISIBLE.

//import { Button } from "@/components/ui/button"
import { Stethoscope, Syringe } from "lucide-react"

interface SectionHeaderProps {
  sectionTitle: string
  sectionSubtitle: string
  sectionText: string
  currentSection: "diseases" | "services"
  onSectionChange: (section: "diseases" | "services") => void
}

export default function SectionHeader({
  sectionTitle,
  sectionSubtitle,
  sectionText,
  currentSection,
  onSectionChange,
}: SectionHeaderProps) {
  return (
    <div className="mb-16 flex flex-col md:flex-row items-center justify-between">
      <div className="max-w-2xl text-center md:text-left mb-8 md:mb-0">
        {/* <h2 className="text-3xl text-dw-dark font-bold mb-4">{sectionTitle}</h2> */}
        <h2 className="text-5xl text-dw-soft font-extrabold mb-4">{sectionSubtitle}</h2>
        <p className="text-gray-600">{sectionText}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onSectionChange("diseases")}
          className={`group flex items-center px-6 py-3 text-lg font-semibold transition-colors rounded-tl-full rounded-tr-full rounded-bl-full ${
            currentSection === "diseases"
              ? "bg-dw-dark text-white"
              : "bg-dw-soft text-gray-500 hover:bg-dw-dark hover:text-white"
          }`}
        >
          <span>Enfermedades</span>
          <div
            className={`ml-2 p-1 rounded-tl-full rounded-tr-full rounded-bl-full ${
              currentSection === "diseases" ? "bg-white" : "bg-dw-soft"
            }`}
          >
            <Stethoscope
              className={`h-5 w-5 transition-all ${
                currentSection === "diseases"
                  ? "text-dw-dark"
                  : "text-gray-500 group-hover:[filter:var(--filter-dw-white)]"
              }`}
            />
          </div>
        </button>
        <button
          onClick={() => onSectionChange("services")}
          className={`group flex items-center px-6 py-3 text-lg font-semibold transition-colors rounded-tr-full rounded-br-full rounded-bl-full ${
            currentSection === "services"
              ? "bg-dw-dark text-white"
              : "bg-dw-soft text-gray-500 hover:bg-dw-dark hover:text-white"
          }`}
        >
          <div
            className={`mr-2 p-1 rounded-tr-full rounded-br-full rounded-bl-full ${
              currentSection === "services" ? "bg-white" : "bg-dw-soft"
            }`}
          >
            <Syringe
              className={`h-5 w-5 transition-all ${
                currentSection === "services"
                  ? "text-dw-dark"
                  : "text-gray-500 group-hover:[filter:var(--filter-dw-white)]"
              }`}
            />
          </div>
          <span>Servicios</span>
        </button>
      </div>
    </div>
  )
}

