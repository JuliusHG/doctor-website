import { useEffect, useState, type RefObject } from "react"

export function useParallax(ref: RefObject<HTMLElement | null>, speed = 10) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    console.log("useParallax effect running")

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return

      const { left, top, width, height } = ref.current.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5

      const newPosition = { x: x * speed, y: y * speed }
      setPosition(newPosition)
      console.log("New parallax position:", newPosition)
    }

    console.log("Adding mousemove event listener")
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      console.log("Removing mousemove event listener")
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [ref, speed])

  return position
}


