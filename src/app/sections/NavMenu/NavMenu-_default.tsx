"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"
import diseasesData from "../../../data/diseasesDataMetadata.json"
import symptomsData from "../../../data/symptomsDataMetadata.json"
import servicesData from "../../../data/services.json"

interface NavMenuProps {
  hideHome?: boolean
}

interface SubMenuItem {
  name: string
  path: string
}

interface MenuItem {
  label: string
  path: string
  submenu?: SubMenuItem[]
}

const Dropdown: React.FC<{ item: MenuItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div
      className="relative group"
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={item.path}
        className="flex items-center text-black hover:bg-pink-600 hover:text-white transition-colors duration-300 font-semibold text-sm uppercase tracking-wide px-3 py-2 rounded-md"
      >
        {item.label}
        <ChevronDown className="ml-1 h-4 w-4" />
      </Link>
      {isOpen && (
        <ul className="absolute left-0 top-full z-50 w-48 bg-white rounded-md shadow-lg">
          <div className="absolute -top-1 left-0 right-0 h-2 bg-transparent" />
          {item.submenu?.map((subItem) => (
            <li key={subItem.path}>
              <Link
                href={subItem.path}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-600 hover:text-white"
              >
                {subItem.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function NavMenu({ hideHome = false }: NavMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("/api/site-content")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        console.log("API response:", data) // Debug log

        let items: MenuItem[] = []
        if (data && data.siteContent && Array.isArray(data.siteContent.navMenu)) {
          items = data.siteContent.navMenu.map((item: MenuItem) => {
            if (item.label === "Enfermedades") {
              return {
                ...item,
                path: "/enfermedades",
                submenu: diseasesData.diseases.map((disease) => ({
                  name: disease.name,
                  path: `/enfermedades/${disease.id}`,
                })),
              }
            } else if (item.label === "Síntomas") {
              return {
                ...item,
                path: "/sintomas",
                submenu: symptomsData.symptoms.map((symptom) => ({
                  name: symptom.name,
                  path: `/sintomas/${symptom.id}`,
                })),
              }
            } else if (item.label === "Servicios") {
              return {
                ...item,
                path: "/servicios",
                submenu: servicesData.map((service) => ({
                  name: service.title,
                  path: `/servicios/${service.id}`,
                })),
              }
            }
            return item
          })
        } else {
          console.warn("Unexpected data structure:", data)
          setError("Unexpected data structure received from API")
        }

        if (hideHome) {
          items = items.filter((item: MenuItem) => item.path !== "/")
        }

        setMenuItems(items)
      } catch (error) {
        console.error("Error fetching menu items:", error)
        setError("Failed to fetch menu items. Please try again later.")
      }
    }

    fetchMenuItems()
  }, [hideHome])

  useEffect(() => {
    setIsMenuOpen(false)
  }, []) // Removed pathname dependency

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <nav className="relative">
      {/* Mobile menu button */}
      <button className="md:hidden" onClick={toggleMenu}>
        {isMenuOpen ? <X className="text-black" /> : <Menu className="text-black" />}
      </button>

      {/* Navigation menu */}
      <div
        className={`absolute right-0 top-full mt-2 md:relative md:top-auto md:mt-0 z-50 bg-white bg-opacity-90 md:bg-transparent ${
          isMenuOpen ? "block" : "hidden"
        } md:block`}
      >
        <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0">
          {menuItems.map((item) => (
            <li key={item.path}>
              {item.submenu ? (
                <Dropdown item={item} />
              ) : (
                <Link
                  href={item.path}
                  className="text-black hover:bg-pink-600 hover:text-white transition-colors duration-300 font-semibold text-sm uppercase tracking-wide px-3 py-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

