"use client"

import type React from "react"
import Image from "next/image"
import { useState, useEffect } from "react"
import AvisoCofeprisTopBottom from "../common/AvisoCofepris-top-bottom"
import SocialIcons from "../common/SocialIcons"
import siteContent from "../../../data/site-content.json"

const Header: React.FC = () => {
  const { logoPath, logoHeight, logoHorizPath, logoHorizHeight } = siteContent.doctorInfo
  const [NavMenuComponent, setNavMenuComponent] = useState<React.ComponentType | null>(null)
  const [isSticky, setIsSticky] = useState(false)

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

    const handleScroll = () => {
      setIsSticky(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      <header
        className={`bg-white shadow-md transition-all duration-300 ${isSticky ? "fixed top-0 left-0 right-0 z-50" : ""}`}
      >
        {!isSticky && <AvisoCofeprisTopBottom />}
        <div className={`container mx-auto px-4 ${isSticky ? "py-2" : "py-4"}`}>
          <div className="flex items-center justify-around">
            <div className="flex-shrink-0">
              <a href="/">
                <Image
                  src={isSticky ? logoHorizPath || "/placeholder.svg" : logoPath || "/placeholder.svg"}
                  alt="Logo"
                  width={isSticky ? logoHorizHeight * 1.5 : logoHeight * 1.5}
                  height={isSticky ? logoHorizHeight : logoHeight}
                  className="w-auto h-auto"
                />
              </a>
            </div>
            {NavMenuComponent && <NavMenuComponent />}
            <div className="flex-shrink-0">
              <SocialIcons />
            </div>
          </div>
        </div>
      </header>
      {isSticky && <div style={{ height: `${logoHorizHeight}px` }} />}
    </>
  )
}

export default Header