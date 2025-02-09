/**
 * @section-description Default para Header (jh) Aviso cofepris arriba, logo y NavMenu dinámico.
 */

"use client"

import type React from "react"
import Image from "next/image"
import { useState, useEffect } from "react"
import AvisoCofeprisTopBottom from "../common/AvisoCofepris-top-bottom"
import siteContent from "../../../data/site-content.json"

const Header: React.FC = () => {
  const { logoPath, logoHeight } = siteContent.doctorInfo
  const [NavMenuComponent, setNavMenuComponent] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    const loadNavMenu = async () => {
      try {
        const response = await fetch("/api/selected-sections")
        const data = await response.json()
        let selectedNavMenu

        if (data.NavMenu && data.NavMenu.component) {
          try {
            selectedNavMenu = await import(`../NavMenu/${data.NavMenu.component}`)
          } catch (importError) {
            console.error("Error importing selected NavMenu:", importError)
            // If import fails, fall back to default
            selectedNavMenu = await import("../NavMenu/NavMenu-_default")
          }
        } else {
          // Fallback to default NavMenu if not specified in selected-sections.json
          selectedNavMenu = await import("../NavMenu/NavMenu-_default")
        }

        setNavMenuComponent(() => selectedNavMenu.default)
      } catch (error) {
        console.error("Error loading NavMenu:", error)
        // Fallback to default NavMenu in case of error
        const defaultNavMenu = await import("../NavMenu/NavMenu-_default")
        setNavMenuComponent(() => defaultNavMenu.default)
      }
    }

    loadNavMenu()
  }, [])

  return (
    <header className="bg-white shadow-md">
      <AvisoCofeprisTopBottom />
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="mr-4">
            <a href="/">
              <Image
                src={logoPath || "/placeholder.svg"}
                alt="Logo"
                width={logoHeight * 1.5}
                height={logoHeight}
                className="w-auto h-auto"
              />
            </a>
          </div>
          {NavMenuComponent && <NavMenuComponent />}
        </div>
      </div>
    </header>
  )
}

export default Header

