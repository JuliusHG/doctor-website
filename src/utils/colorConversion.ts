function hexToHSL(hex: string): string {
    // Remove the hash if it exists
    hex = hex.replace(/^#/, "")
  
    // Parse the hex values
    const r = Number.parseInt(hex.slice(0, 2), 16) / 255
    const g = Number.parseInt(hex.slice(2, 4), 16) / 255
    const b = Number.parseInt(hex.slice(4, 6), 16) / 255
  
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0,
      s,
      l = (max + min) / 2
  
    if (max === min) {
      h = s = 0 // achromatic
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }
  
    // Convert to degrees, and percentages
    h = Math.round(h * 360)
    s = Math.round(s * 100)
    l = Math.round(l * 100)
  
    return `${h} ${s}% ${l}%`
  }
  
  export { hexToHSL }
  
  
  
  