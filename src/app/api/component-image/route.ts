import { type NextRequest, NextResponse } from "next/server"
import { readFile } from "fs/promises"
import path from "path"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const image = searchParams.get("image")

  if (!type || !image) {
    return new NextResponse("Missing type or image parameter", { status: 400 })
  }

  const imagePath = path.join(process.cwd(), "src" , "app", "sections", type, image)

  try {
    const imageBuffer = await readFile(imagePath)
    const response = new NextResponse(imageBuffer)
    response.headers.set("Content-Type", "image/jpeg")
    return response
  } catch (error) {
    console.error("Error reading image:", error)
    return new NextResponse("Image not found", { status: 404 })
  }
}

