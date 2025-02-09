/**
 * @section-description Sección Métodos de pago default (jh), estática, solo muestra los iconos y el nombre.
 */

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import type { SiteContent } from "@/src/interfaces/SiteContent"

type PaymentsContent = Pick<SiteContent, "payments">

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
      <h3 className="text-xl font-bold mb-4 text-center">{payments.sectionTitle}</h3>
      <h2 className="text-5xl font-bold mb-12 text-center text-pink-800">{payments.sectionSubtitle}</h2>
      <div className="flex flex-wrap justify-center gap-8 mb-8">
        {payments.methods
          .filter((method) => method.visible)
          .map((method) => (
            <div
              key={method.name}
              className="flex flex-col items-center w-[calc(50%-1rem)] sm:w-[calc(33.333%-1rem)] lg:w-[calc(16.666%-1rem)]"
            >
              <div className="w-20 h-20 relative mb-4 flex items-center justify-center">
                <Image
                  src={method.iconPath || "/placeholder.svg"}
                  alt={method.name}
                  width={80}
                  height={80}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className="text-center text-gray-600">{method.name}</p>
            </div>
          ))}
      </div>
    </section>
  )
}

