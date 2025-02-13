"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { initialFormData } from "@/src/app/sections/admin/initialFormData"
import { customFieldInfo } from "@/src/app/sections/admin/customFieldInfo"
import type { CustomFieldInfo, Entity } from "@/src/interfaces/customFieldTypes"
import type { SiteContent } from "@/src/interfaces/SiteContent"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Plus, Trash } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export default function SiteInfoForm() {
  const [formData, setFormData] = useState<SiteContent>(initialFormData)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/site-content")
        if (!response.ok) {
          throw new Error("Falla al extraer la información del sitio")
        }
        const data = await response.json()
        setFormData(data.siteContent)
      } catch (error) {
        console.error("Error al extraer la información del sitio:", error)
        setError("Falla al extraer la información del sitio. Intentar de nuevo.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleChange = (section: keyof SiteContent, field: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: value,
      },
    }))
  }

  const handleEntityChange = (
    section: keyof SiteContent,
    subSection: string,
    index: number,
    field: string,
    value: string | boolean,
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [subSection]: (prevState[section] as any)[subSection].map((entity: Entity, i: number) =>
          i === index ? { ...entity, [field]: field === "visible" ? Boolean(value) : value } : entity,
        ),
      },
    }))
  }

  const addEntity = (section: keyof SiteContent, subSection: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [subSection]: [...(prevState[section] as any)[subSection], {}],
      },
    }))
  }

  const removeEntity = (section: keyof SiteContent, subSection: string, index: number) => {
    setFormData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [subSection]: (prevState[section] as any)[subSection].filter((_: any, i: number) => i !== index),
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/site-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ siteContent: formData }),
      })
      if (!response.ok) {
        throw new Error("Falla al actualizar la información del sitio")
      }
      toast({
        title: "Éxito",
        description: "Información del sitio actualizada correctamente",
      })
    } catch (error) {
      console.error("Error actualizando información del sitio:", error)
      setError("Falla al actualizar la información del sitio. Intentar de nuevo.")
      toast({
        title: "Error",
        description: "Falla al actualizar la información del sitio",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div className="text-center py-12">Cargando...</div>
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>
  }

  const renderField = (sectionName: keyof SiteContent, key: string, value: any) => {
    const fieldValue = (formData[sectionName] as any)[key]

    if (typeof fieldValue === "string") {
      return (
        <div key={key} className="space-y-2">
          <Label htmlFor={key} className="text-xl font-bold">
            {value.label}
          </Label>
          {sectionName === "aboutUs" && key === "description" ? (
            <div>
              <Textarea
                id={key}
                value={fieldValue}
                onChange={(e) => handleChange(sectionName, key, e.target.value)}
                className="min-h-[200px]"
              />
              <div className="mt-2 p-4 border rounded-md bg-gray-50">
                <p className="text-sm text-gray-500 mb-2">Preview:</p>
                {fieldValue.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ) : value.description.length > 100 ? (
            <Textarea
              id={key}
              value={fieldValue}
              onChange={(e) => handleChange(sectionName, key, e.target.value)}
              className="min-h-[100px]"
            />
          ) : (
            <Input id={key} value={fieldValue} onChange={(e) => handleChange(sectionName, key, e.target.value)} />
          )}
          <p className="text-sm text-muted-foreground pl-4">{value.description}</p>
        </div>
      )
    }
    return null
  }

  const renderSection = (sectionName: keyof CustomFieldInfo & keyof SiteContent) => (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-12">
          {Object.entries(customFieldInfo[sectionName]).map(([key, value]) => {
            if (key === "sectionTitle" || !value.fields) {
              return renderField(sectionName, key, value)
            } else if (value.fields && Array.isArray((formData[sectionName] as any)[key])) {
              return (
                <div key={key} className="space-y-4">
                  <Label className="text-xl font-bold">{value.label}</Label>
                  <p className="text-sm text-muted-foreground pl-4">{value.description}</p>
                  {((formData[sectionName] as any)[key] as Entity[]).map((entity: Entity, index: number) => (
                    <div key={index} className="space-y-2 p-4 border rounded">
                      {Object.entries(value.fields as Record<string, { label: string; description: string }>).map(
                        ([fieldKey, fieldValue]) => (
                          <div key={fieldKey} className="flex items-center space-x-2">
                            <Label htmlFor={`entity-${index}-${fieldKey}`} className="flex-1">
                              {fieldValue.label}
                            </Label>
                            {fieldKey === "visible" ? (
                              <div className="flex items-center space-x-2 min-w-[100px]">
                                <Switch
                                  id={`entity-${index}-${fieldKey}`}
                                  checked={Boolean(entity[fieldKey])}
                                  onCheckedChange={(checked) =>
                                    handleEntityChange(sectionName, key, index, fieldKey, checked)
                                  }
                                />
                                <Label htmlFor={`entity-${index}-${fieldKey}`} className="text-sm font-medium">
                                  {entity[fieldKey] ? "Visible" : "No visible"}
                                </Label>
                              </div>
                            ) : (
                              <Input
                                id={`entity-${index}-${fieldKey}`}
                                value={(entity[fieldKey] as string) || ""}
                                onChange={(e) => handleEntityChange(sectionName, key, index, fieldKey, e.target.value)}
                                className="flex-1"
                              />
                            )}
                            <p className="text-sm text-muted-foreground pl-4 flex-1">{fieldValue.description}</p>
                          </div>
                        ),
                      )}
                      <Button type="button" variant="destructive" onClick={() => removeEntity(sectionName, key, index)}>
                        <Trash className="w-4 h-4 mr-2" />
                        Eliminar {key === "entities" ? "certificación" : "documento"}
                      </Button>
                    </div>
                  ))}
                  <Button type="button" onClick={() => addEntity(sectionName, key)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar {key === "entities" ? "certificación" : "documento"}
                  </Button>
                </div>
              )
            } else {
              return renderField(sectionName, key, value)
            }
          })}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Información del Sitio</h1>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>

      <Tabs defaultValue="doctorInfo">
        <TabsList className="mb-4">
          {Object.keys(customFieldInfo).map((section) => (
            <TabsTrigger key={section} value={section}>
              {section === "doctorInfo"
                ? "Información del Doctor"
                : section === "doctorWorkInfo"
                  ? "Información Laboral"
                  : section === "experience"
                    ? "Experiencia"
                    : section === "certifications"
                      ? "Certificaciones"
                      : section === "heroSection"
                        ? "Sección Hero"
                        : section === "aboutUs"
                          ? "Acerca de mí"
                          : section}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.keys(customFieldInfo).map((section) => (
          <TabsContent key={section} value={section}>
            {renderSection(section as keyof CustomFieldInfo & keyof SiteContent)}
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-end mt-8">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>
    </form>
  )
}

