import type { CustomFieldInfo } from "../../../interfaces/customFieldTypes"

export const customFieldInfo: CustomFieldInfo = {
    doctorInfo: {
      name: { label: "Nombre", description: "Nombre completo del doctor" },
      specialty: { label: "Especialidad", description: "Especialidad principal del doctor" },
      specialtyShort: { label: "Especialidad (corta)", description: "Versión corta de la especialidad" },
      specialist: { label: "Especialista", description: "Título de especialista" },
      address: { label: "Dirección", description: "Dirección completa del consultorio" },
      phone: { label: "Teléfono", description: "Número de contacto principal" },
      whatsapp: { label: "Teléfono", description: "Número de WhatsApp principal" },
      email: { label: "Correo electrónico", description: "Dirección de correo electrónico profesional" },
      cedProf: { label: "Cédula Profesional", description: "Incluir clave e institución, por ejemplo: 14052385, UNAM" },
      cedEsp: { label: "Cédula de Especialidad", description: "Incluir clave e institución, por ejemplo: 14052385, UNAM" },
      websiteUrl: { label: "(Diseño) URL del sitio web", description: "OMITIR SI SE DESCONOCE" },
      facebookLink: { label: "URL de Facebook", description: "Incluir desde https://" },
      instagramLink: { label: "URL de Instagram", description: "Incluir desde https://" },
      linkedinLink: { label: "URL de LinkedIn", description: "Incluir desde https://" },
      xLink: { label: "URL de X (antes Twitter)", description: "Incluir desde https://" },
      twitterLink: { label: "URL de Twitter", description: "Incluir desde https:// (se mantiene por compatibilidad)" },
      youtubeLink: { label: "URL de YouTube", description: "Incluir desde https://" },
      googleMapsLink: { label: "URL de Google Maps", description: "Incluir desde https://" },
      doctoraliaLink: { label: "URL de Doctoralia (principal)", description: "Incluir desde https://" },
      doctoraliaReviewsLink: { label: "URL de Doctoralia (Opiniones)", description: "Incluir desde https://" },
      logoPath: { label: "(Diseño) Logo doctor", description: "Ruta del logo del doctor" },
      logoHeight: { label: "(Diseño) Logo altura",  description: "Altura del logo en px" },
      favicon: { label: "(Diseño) Ruta del favicon",  description: "Ruta del favicon" },
    },
    doctorWorkInfo: {
      avisoCofepris: { label: "Aviso COFEPRIS", description: "Si no está tramitado, poner XXXXXXXXXXXXXXXXX (X en diecisiete posiciones)" },
      consultingHeader: { label: "Encabezado de Consultas o Consultorio", description: "Ej.: 'Consultas', 'Consultorio' o 'Consultorio Peñaloza'" }, 
      consultingAddress: { label: "Dirección del consultorio", description: "Dirección del consultorio (hasta Estado)" },
      consultingHoursDaysHeader: { label: "Encabezado de horarios", description: "Ej. 'Horarios'" },
      consultingHoursDaysSubheader1: { label: "Días de consultas (1)", description: "Ej. 'Lunes a Viernes'" },
      consultingHours1: { label: "Horas", description: "Horas, ej.'9:00 AM a 5:00 PM'" },
      consultingHoursDaysSubheader2: { label: "Días de consultas (2)", description: "Ej.'Sábados'" }, 
      consultingHours2: { label: "Horas", description: "Ej.'10:00 AM a 2:00 PM'" },
      consultingPhonesHeader: { label: "Encabezado de Teléfonos", description: "Ej.'Teléfonos'" },
      consultingSchedulePhonesSubheader: { label: "Encabezado de tel. de citas", description: "Ej.'Citas'" },
      consultingSchedulePhone: { label: "Teléfono", description: "Ej.: +52 999 666 6666" },
      consultingUrgenciesPhonesSubheader: { label: "Encabezado de tel. de urgencias", description: "Ej.'Urgencias'" },
      consultingUrgenciesPhone: { label: "Teléfono", description: "Ej.: +52 999 666 6666" },
      hospitalHeader: { label: "Encabezado de Hospital", description: "'Hospital' u 'Hospital ABC'" },
      hospitalAddress: { label: "Dirección del hospital", description: "Dirección del hospital (hasta Estado)" },
      hospitalHoursDaysHeader: { label: "Encabezado de horarios", description: "Ej.:'Horarios'" },
      hospitalHoursDaysSubheader1: { label: "Días de consultas (1)", description: "Ej. 'Lunes a Viernes'" },
      hospitalHours1: { label: "Horario", description: "Horas, ejemplo: '9:00 AM a 5:00 PM'" },
      hospitalHoursDaysSubheader2: { label: "Días de consultas (2)", description: "Ej. Sábados" },
      hospitalHours2: { label: "Horario", description: "'10:00 AM a 2:00 PM'" },
      hospitalPhonesHeader: { label: "Encabezado de Teléfonos", description: "Ej. 'Teléfonos'" },
      hospitalSchedulePhonesSubheader: { label: "Encabezado de citas", description: "Ej.'Citas'" },
      hospitalSchedulePhone: { label: "Teléfono", description: "Ej.: +52 999 666 6666" },
      hospitalUrgenciesPhonesSubheader: { label: "Encabezado de urgencias", description: "Ej. 'Urgencias'" },
      hospitalUrgenciesPhone: { label: "Teléfono", description: "Ej.: +52 999 666 6666" },
    },
    heroSection: {
      heroSectionHeight: { label: "(Diseño) Altura Hero section", description: "Altura de la Hero section en px" },
      mainImage: { label: "(Diseño) Imagen de fondo Hero section", description: "Imagen grande de fondo de la Hero section" },
      logoHeight: { label: "(Diseño) Altura del logo en Hero section", description: "Altura en px del logo (si aplica) dentro de la Hero" },
      backgroundHeroImage: { label: "(Diseño) Capa superior, fondo ", description: "Capa frontal, imagen (fondo)" },
      backgroundHeroImageHeightPercent: { label: "(Diseño) Porcentaje de altura capa superior fondo", description: "Porcentaje para tamaño de esa imagen (sólo número del 1 al 100)" }, // 
      foregroundHeroImage: { label: "(Diseño) Capa superior, frente o máscara", description: "Capa frontal, imagen (frente) (puede ser cualquier cosa, incluyendo una mask)" },
      foregroundHeroImageHeightPercent: { label: "(Diseño) ", description: "Porcentaje para tamaño de imagen frontal (sólo número del 1 al 100)" },
      overlayColor: { label: "(Diseño) Clave del color del overlay ", description: "Opcional, para meterle una capa de color (Hex)" },
      overlayOpacity: { label: "(Diseño) Opacidad del overlay ", description: "Opacidad de esa capa (ej. 0.7) del 0 al 1" },
      subTitle: { label: "Subtítulo Hero section", description: "Subtítulo (si aplica)" },
      title: { label: "Título Hero section", description: "Título (grande) (si aplica)" },
      description: { label: "Texto descripción Hero section", description: " Descripción (si aplica)" },
    },
    /* navMenu: {
      label: "Menú de Navegación",
      description: "Elementos del menú de navegación",
      type: "array",
      itemFields: {
        label: { label: "Etiqueta", type: "text" },
        path: { label: "Ruta", type: "text" },
      },
    }, */
    certifications: {
      sectionTitle: { label: "Título de la sección", description: "Título para la sección de certificaciones" },
      entities: {
        label: "Certificaciones",
        description: "Lista de certificaciones profesionales",
        fields: {
          nameTitle: { label: "Título", description: "Título de la certificación" },
          name: { label: "Nombre", description: "Nombre de la institución certificadora" },
          imagePath: { label: "Ruta de la imagen", description: "Ruta de la imagen de la certificación" },
          visible: { label: "Visible", description: "Indica si la certificación debe mostrarse" },
        },
      },
      documents: {
        label: "Documentos",
        description: "Lista de documentos de certificación",
        fields: {
          nameTitle: { label: "Título", description: "Título del documento" },
          name: { label: "Nombre", description: "Nombre del documento" },
          imagePath: { label: "Ruta de la imagen", description: "Ruta de la imagen del documento" },
          visible: { label: "Visible", description: "Indica si el documento debe mostrarse" },
        },
      },
    },
    aboutUs: {
      sectionTitle: { label: "Título de la sección", description: "Título para la sección Sobre mí" },
      imagePath: { label: "(Diseño) Ruta de la imagen", description: "Ruta de la imagen para la sección Sobre mí" },
      title: { label: "Título", description: "Título interno de la sección Sobre mí" },
      description: { label: "Descripción", description: "Texto sobre el médico. Usar el placeholder {yearsOfExperience} para sustituir los años de experiencia si es necesario. Usar 'backslash n backlash n' en el json para separar párrafos." },
      yearsOfExperience: { label: "Años de experiencia", description: "Número de años de experiencia (si se usa el placeholder en Descripción, se incorporará en el texto." },
    },
    experience: {
      sectionTitle: { label: "Título de la sección", description: "Título para la sección de experiencia" },
      sectionSubtitle: { label: "Subtítulo de la sección", description: "Subtítulo para la sección de experiencia" },
      entities: {
        label: "Entidades de experiencia",
        description: "Lista de entidades que muestran tu experiencia",
        fields: {
          icon: { label: "Icono", description: "URL del icono para esta entidad" },
          value: { label: "Valor", description: "Valor numérico o textual de la experiencia" },
          label: { label: "Etiqueta", description: "Descripción de la experiencia" },
        },
      },
      itemFrame: { label: "Marco del ítem", description: "URL del marco para los ítems de experiencia" },
    },
    /* purpose: {
      sectionTitle: { label: "Título de la sección", description: "Título para la sección de Propósito" },
    },
    services: {
      sectionTitle: { label: "Título de la sección", description: "Título para la sección de Servicios" },
      linkText: { label: "Texto del enlace", description: "Texto para el enlace 'Leer más'" },
      page: {
        backgroundImage: { label: "Imagen de fondo", description: "Ruta de la imagen de fondo para la página de servicios" },
        pageTitle: { label: "Título de la página", description: "Título principal de la página de servicios" },
        sectionTitle: { label: "Título de la sección", description: "Título de la sección en la página de servicios" },
        sectionSubtitle: { label: "Subtítulo de la sección", description: "Subtítulo de la sección en la página de servicios" },
      },
      individualPage: {
        contactButton: {
          title: { label: "Título del botón de contacto", description: "Título para el botón de contacto en la página individual de servicio" },
          text: { label: "Texto del botón de contacto", description: "Texto para el botón de contacto en la página individual de servicio" },
        },
        returnButton: {
          text: { label: "Texto del botón de retorno", description: "Texto para el botón de retorno en la página individual de servicio" },
        },
      },
    },
    symptoms: {
      sectionTitle: { label: "Título de la sección", description: "Título para la sección de Síntomas" },
      linkText: { label: "Texto del enlace", description: "Texto para el enlace 'Leer más'" },
      buttonText: { label: "Texto del botón", description: "Texto para el botón 'Ver todos los síntomas'" },
      page: {
        backgroundImage: { label: "Imagen de fondo", description: "Ruta de la imagen de fondo para la página de síntomas" },
        pageTitle: { label: "Título de la página", description: "Título principal de la página de síntomas" },
        sectionTitle: { label: "Título de la sección", description: "Título de la sección en la página de síntomas" },
        sectionSubtitle: { label: "Subtítulo de la sección", description: "Subtítulo de la sección en la página de síntomas" },
      },
      individualPage: {
        contactButton: {
          title: { label: "Título del botón de contacto", description: "Título para el botón de contacto en la página individual de síntoma" },
          text: { label: "Texto del botón de contacto", description: "Texto para el botón de contacto en la página individual de síntoma" },
        },
        returnButton: {
          text: { label: "Texto del botón de retorno", description: "Texto para el botón de retorno en la página individual de síntoma" },
        },
      },
    },
    photosGallery: {
      sectionTitle: { label: "Título de la sección", description: "Título para la sección de Galería de Fotos" },
    },
    diseases: {
      sectionTitle: { label: "Título de la sección", description: "Título para la sección de Enfermedades" },
      linkText: { label: "Texto del enlace", description: "Texto para el enlace 'Leer más'" },
      buttonText: { label: "Texto del botón", description: "Texto para el botón 'Ver todas las enfermedades'" },
      page: {
        backgroundImage: { label: "Imagen de fondo", description: "Ruta de la imagen de fondo para la página de enfermedades" },
        pageTitle: { label: "Título de la página", description: "Título principal de la página de enfermedades" },
        sectionTitle: { label: "Título de la sección", description: "Título de la sección en la página de enfermedades" },
        sectionSubtitle: { label: "Subtítulo de la sección", description: "Subtítulo de la sección en la página de enfermedades" },
      },
      individualPage: {
        contactButton: {
          title: { label: "Título del botón de contacto", description: "Título para el botón de contacto en la página individual de enfermedad" },
          text: { label: "Texto del botón de contacto", description: "Texto para el botón de contacto en la página individual de enfermedad" },
        },
        returnButton: {
          text: { label: "Texto del botón de retorno", description: "Texto para el botón de retorno en la página individual de enfermedad" },
        },
      },
    },
    callToAction: {
      title: { label: "Título", description: "Título principal para la sección de Llamada a la Acción" },
      description: { label: "Descripción", description: "Texto descriptivo para la Llamada a la Acción" },
      buttons: {
        call: { label: "Botón de Llamada", description: "Texto para el botón de llamada" },
        schedule: { label: "Botón de Agenda", description: "Texto para el botón de agendar" },
      },
    },
    testimonials: {
      sectionTitle: { label: "Título de la sección", description: "Título para la sección de Testimonios" },
      linkText: { label: "Texto del enlace", description: "Texto para el enlace 'Ver más'" },
      dataBlocks: {
        procedure: { label: "Procedimiento", description: "Etiqueta para el bloque de datos del procedimiento" },
        weightLoss: { label: "Peso perdido", description: "Etiqueta para el bloque de datos del peso perdido" },
        timeElapsed: { label: "Tiempo transcurrido", description: "Etiqueta para el bloque de datos del tiempo transcurrido" },
      },
    },
    payments: {
      sectionTitle: { label: "Título de la sección", description: "Título para la sección de Métodos de Pago" },
      additionalInfo: { label: "Información adicional", description: "Información adicional sobre los métodos de pago" },
    },
    insurances: {
      sectionTitle: { label: "Título de la sección", description: "Título para la sección de Seguros Aceptados" },
      additionalInfo: { label: "Información adicional", description: "Información adicional sobre los seguros aceptados" },
    },
    footer: {
      contactInfo: {
        address: { label: "Dirección", description: "Dirección completa para el pie de página" },
        phone: { label: "Teléfono", description: "Número de teléfono para el pie de página" },
        email: { label: "Correo electrónico", description: "Dirección de correo electrónico para el pie de página" },
      },
    },
    generalCallToAction: {
      title: { label: "Título", description: "Título para la llamada a la acción general" },
      consultationText: { label: "Texto de consulta", description: "Texto informativo sobre la consulta inicial" },
      buttons: {
        call: { label: "Botón de Llamada", description: "Texto para el botón de llamada" },
        schedule: { label: "Botón de Agenda", description: "Texto para el botón de agendar" },
        whatsapp: { label: "Botón de WhatsApp", description: "Texto para el botón de WhatsApp" },
      },
    },
    contact: {
      page: {
        backgroundImage: { label: "Imagen de fondo", description: "Ruta de la imagen de fondo para la página de contacto" },
        pageTitle: { label: "Título de la página", description: "Título principal de la página de contacto" },
      },
    },
    schedule: {
      page: {
        backgroundImage: { label: "Imagen de fondo", description: "Ruta de la imagen de fondo para la página de agendar cita" },
        pageTitle: { label: "Título de la página", description: "Título principal de la página de agendar cita" },
      },
    }, */
  }
  
  