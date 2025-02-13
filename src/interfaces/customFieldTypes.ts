export interface FieldInfo {
    label: string
    description: string
  }
  
  export interface EntityField extends FieldInfo {
    type?: string
  }
  
  export interface SectionField extends FieldInfo {
    fields?: Record<string, EntityField>
  }
  
  export interface CustomFieldInfo {
    [section: string]: Record<string, SectionField>
  }
  
  export interface Entity {
    [key: string]: string
  }
  
  export interface Section {
    [key: string]: string | Entity[]
  }
  
