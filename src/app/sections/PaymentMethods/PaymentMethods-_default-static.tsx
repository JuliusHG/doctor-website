/**
 * @section-description Sección Métodos de pago default (jh), estática, solo muestra los iconos y el nombre.
 */

"use client"

import { useState, useEffect } from "react"
import type { SiteContent } from "@/src/interfaces/SiteContent"
import type React from "react" // Added import for React

type PaymentsContent = Pick<SiteContent, "payments">

interface PaymentMethod {
  name: string
  iconPath: string
  visible: boolean
}

const PaymentIcon: React.FC<{ iconPath: string; name: string }> = ({ iconPath, name }) => {
  const [svgContent, setSvgContent] = useState<string>("")

  useEffect(() => {
    fetch(iconPath)
      .then((response) => response.text())
      .then((svgText) => {
        // Add currentColor to the SVG
        const modifiedSvg = svgText.replace("<svg", '<svg fill="currentColor"')
        setSvgContent(modifiedSvg)
      })
      .catch((error) => console.error("Error loading SVG:", error))
  }, [iconPath])

  return (
    <div
      className="w-20 h-20 relative mb-4 flex items-center justify-center"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  )
}

export default function PaymentMethodsSection() {
  const [content, setContent] = useState<PaymentsContent | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const siteContentModule = await import("@/src/data/site-content.json")
        setContent({ payments: siteContentModule.default.payments })
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load content"))
      }
    }

    loadContent()
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!content) {
    return <div>Loading...</div>
  }

  const { payments } = content

  return (
    <section className="py-12">
      <h3 className="text-3xl font-bold mb-4 text-center text-dw-dark">{payments.sectionTitle}</h3>
      <h2 className="text-4xl font-bold mb-12 text-center text-dw-soft">{payments.sectionSubtitle}</h2>
      <div className="flex flex-wrap justify-center gap-8 mb-8">
        {payments.methods
          .filter((method: PaymentMethod) => method.visible)
          .map((method: PaymentMethod) => (
            <div
              key={method.name}
              className="flex flex-col items-center w-[calc(50%-1rem)] sm:w-[calc(33.333%-1rem)] lg:w-[calc(16.666%-1rem)]"
            >
              <div className="text-dw-dark">
                <PaymentIcon iconPath={method.iconPath} name={method.name} />
              </div>
              <p className="text-center text-gray-600">{method.name}</p>
            </div>
          ))}
      </div>
    </section>
  )
}

