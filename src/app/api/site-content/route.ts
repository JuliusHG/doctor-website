import * as path from "path"
import * as fs from "fs/promises"

export async function GET() {
  try {
    const siteContent = await fs.readFile(path.join(process.cwd(), "src", "data", "site-content.json"), "utf8")
    const services = await fs.readFile(path.join(process.cwd(), "src", "data", "servicesDataMetadata.json"), "utf8")
    const symptoms = await fs.readFile(path.join(process.cwd(), "src", "data", "symptomsDataMetadata.json"), "utf8")
    const diseases = await fs.readFile(path.join(process.cwd(), "src", "data", "diseasesDataMetadata.json"), "utf8")
    const testimonials = await fs.readFile(path.join(process.cwd(), "src", "data", "testimonials.json"), "utf8")

    return new Response(
      JSON.stringify({
        siteContent: JSON.parse(siteContent),
        services: JSON.parse(services),
        symptoms: JSON.parse(symptoms),
        diseases: JSON.parse(diseases),
        testimonials: JSON.parse(testimonials),
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Error reading JSON files:", error)
    return new Response(JSON.stringify({ error: "Failed to read content" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Handle site-content.json partial updates
    if (body.siteContent) {
      const siteContentPath = path.join(process.cwd(), "src", "data", "site-content.json")
      const existingSiteContent = JSON.parse(await fs.readFile(siteContentPath, "utf8"))
      const updatedSiteContent = mergeDeep(existingSiteContent, body.siteContent)
      await fs.writeFile(siteContentPath, JSON.stringify(updatedSiteContent, null, 2))
    }

    // Handle other files as before
    if (body.services) {
      await fs.writeFile(
        path.join(process.cwd(), "src", "data", "services.json"),
        JSON.stringify(body.services, null, 2),
      )
    }
    if (body.symptoms) {
      await fs.writeFile(
        path.join(process.cwd(), "src", "data", "symptoms.json"),
        JSON.stringify(body.symptoms, null, 2),
      )
    }
    if (body.diseases) {
      await fs.writeFile(
        path.join(process.cwd(), "src", "data", "diseases.json"),
        JSON.stringify(body.diseases, null, 2),
      )
    }
    if (body.testimonials) {
      await fs.writeFile(
        path.join(process.cwd(), "src", "data", "testimonials.json"),
        JSON.stringify(body.testimonials, null, 2),
      )
    }

    return new Response(JSON.stringify({ message: "Contenido actualizado" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error writing to JSON files:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to update content: " + (error instanceof Error ? error.message : "Unknown error"),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

// Helper function to deep merge objects
function mergeDeep(target: any, source: any) {
  const output = Object.assign({}, target)
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] })
        else output[key] = mergeDeep(target[key], source[key])
      } else {
        Object.assign(output, { [key]: source[key] })
      }
    })
  }
  return output
}

function isObject(item: any) {
  return item && typeof item === "object" && !Array.isArray(item)
}

