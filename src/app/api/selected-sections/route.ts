import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const filePath = path.join(process.cwd(), "src", "data", "selected-sections.json")

export async function GET() {
  try {
    const fileContents = await fs.readFile(filePath, "utf8")
    return NextResponse.json(JSON.parse(fileContents))
  } catch (error) {
    console.error("Error reading selected sections:", error)
    return NextResponse.json({ error: "Failed to read selected sections" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    await fs.writeFile(filePath, JSON.stringify(body, null, 2))
    return NextResponse.json({ message: "Sectiones cambiadas con éxito" })
  } catch (error) {
    console.error("Error updating selected sections:", error)
    return NextResponse.json({ error: "No se pudieron actualizar las secciones" }, { status: 500 })
  }
}

