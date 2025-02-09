import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ message: "This route is under maintenance" }, { status: 503 })
}

// import { NextResponse } from "next/server"
// import servicesData from "../../../data/services.json"

// export async function GET() {
//   try {
//     const services = servicesData.services.map((service) => ({
//       id: service.id,
//       name: service.name,
//     }))

//     return NextResponse.json(services)
//   } catch (error) {
//     console.error("Error fetching services:", error)
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//   }
// }

