// @ts-nocheck
// Este archivo no está en uso y necesita actualizarse.
// Pertenece al formulario de recolección de datos del sitio.
// Se mantiene para no perder su funcionalidad. Será trasladado después.

export const customFieldInfo = {
    doctorInfo: {
      name: { label: "Nombre", description: "Nombre completo del doctor" },
      specialty: { label: "Especialidad", description: "Especialidad principal del doctor" },
      specialtyShort: { label: "Especialidad (corta)", description: "Versión corta de la especialidad" },
      specialist: { label: "Especialista", description: "Título de especialista" },
      address: { label: "Dirección", description: "Dirección completa del consultorio" },
      phone: { label: "Teléfono", description: "Número de contacto principal" },
      email: { label: "Correo electrónico", description: "Dirección de correo electrónico profesional" },
      mainImagePath: { label: "Imagen principal", description: "Ruta de la imagen principal del doctor" },
      logoPath: {label: "Logo doctor", description: "Ruta del logo del doctor"},
      logoHeight: {  label: "Logo altura",  description: "Altura del logo en px"}
    },
    heroSection: {
      heroSectionHeight: { label: "Altura HeroSection", description: "Altura de la HeroSection en px" },
    },
    navMenu: {
      label: "Menú de Navegación",
      description: "Elementos del menú de navegación",
      type: "array",
      itemFields: {
        label: { label: "Etiqueta", type: "text" },
        path: { label: "Ruta", type: "text" },
      },
    },
    certifications: {
      sectionTitle: { label: "Título de la sección", description: "Título para la sección de certificaciones" },
    },
    experience: {
      sectionTitle: { label: "Título de la sección", description: "Título para la sección de experiencia" },
    },
    aboutUs: {
      sectionTitle: { label: "Título de la sección", description: "Título para la sección Sobre mí" },
      imagePath: { label: "Ruta de la imagen", description: "Ruta de la imagen para la sección Sobre mí" },
      title: { label: "Título", description: "Título interno de la sección Sobre mí" },
      description: { label: "Descripción", description: "Texto sobre el médico. Usar el placeholder {yearsOfExperience} para sustituir los años de experiencia si es necesario." },
      yearsOfExperience: { label: "Años de experiencia", description: "Número de años de experiencia" },
    },
    purpose: {
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
    },
  }
  
  