import { NextResponse } from "next/server"
import diseasesData from "./../../../data/diseasesDataMetadata.json"

export async function GET() {
  try {
    const diseases = diseasesData.diseases.map((disease) => ({
      id: disease.id,
      name: disease.name,
    }))

    return NextResponse.json(diseases)
  } catch (error) {
    console.error("Error fetching diseases:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
