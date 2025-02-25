export interface SiteContent {
  doctorInfo: {
    name: string // Nombre principal, incluye Dr./Dra., pienso agregarle una propiedad de título para separarlo. 
    specialty: string // Especialidad oficial ej. "Alergología e Inmunología Clínica"
    specialtyShort: string // Cualquier versión corta de la especialidad "Alergología Clínica"
    specialist: string // Como se nombra al especialista "Alergóloga e Inmunóloga Clínica"
    address: string // Dirección completa del médico (principal)
    phone: string
    whatsapp: string // Puede ser el mismo que phone, la mayoría de las veces
    email: string
    cedProf: string // Puede incluir entidad, por ejemplo "38700183 UNAM"
    cedEsp: string // Puede incluir entidad, por ejemplo "38700183 UAQ"
    cedEsp2: string // Puede incluir entidad, por ejemplo "38700183 UAQ"
    websiteUrl: string
    facebookLink: string
    instagramLink: string
    linkedinLink: string
    xLink: string
    twitterLink: string
    youtubeLink: string
    googleMapsLink: string
    googleMapsEmbedLink: string
    doctoraliaLink: string
    doctoraliaReviewsLink: string
    nimboLink: string
    logoPath: string // Ruta del logo principal
    logoHeight: number // Después se moverá a header si salen más propiedades
    logoHorizPath: string
    logoHorizHeight: number
    favicon: string
  }
  doctorWorkInfo: {
    avisoCofepris: string
    consultingHeader: string //Ej.: "Consultorio" o "Consultorio Peñaloza"
    consultingAddress: string // Dirección del consultorio (hasta Estado)
    consultingHoursDaysHeader: string // "Horarios"
    consultingHoursDaysSubheader1: string // "Lunes a Viernes"
    consultingHours1: string // Horas, ejemplo: "9:00 AM a 5:00 PM"
    consultingHoursDaysSubheader2: string // "Sábados"
    consultingHours2: string // "10:00 AM a 2:00 PM"
    consultingPhonesHeader: string // "Teléfonos"
    consultingSchedulePhonesSubheader: string // "Citas"
    consultingSchedulePhone: string // núm tel
    consultingUrgenciesPhonesSubheader: string // "Urgencias"
    consultingUrgenciesPhone: string // núm tel
    hospitalHeader: string // "Hospital" u "Hospital ABC"
    hospitalAddress: string // Dirección del hospital (hasta Estado)
    hospitalHoursDaysHeader: string // "Horarios"
    hospitalHoursDaysSubheader1: string // "Lunes a Viernes"
    hospitalHours1: string // Horas, ejemplo: "9:00 AM a 5:00 PM"
    hospitalHoursDaysSubheader2: string // "Sábados"
    hospitalHours2: string // "10:00 AM a 2:00 PM"
    hospitalPhonesHeader: string // "Teléfonos"
    hospitalSchedulePhonesSubheader: string // "Citas"
    hospitalSchedulePhone: string // núm tel
    hospitalUrgenciesPhonesSubheader: string // "Urgencias"
    hospitalUrgenciesPhone: string // núm tel
  }
  heroSection: {
    heroSectionHeight: number //altura de la Hero section en pixeles
    mainImage: string // Imagen fondo de la Hero
    logoHeight: number // Altura del logo (si aplica) dentro de la Hero
    backgroundHeroImage: string // capa frontal, imagen (fondo)
    backgroundHeroImageHeightPercent: number // porcentaje para tamaño de esa imagen
    foregroundHeroImage: string // capa frontal, imagen (frente) (puede ser cualquier cosa, incluyendo una mask)
    foregroundHeroImageHeightPercent: number // porcentaje para tamaño de imagen frontal
    overlayColor: string // Opcional, para meterle una capa de color
    overlayOpacity: number // Opacidad de esa capa (ej. 0.7)
    subTitle: string // Subtítulo (si aplica)
    title: string // Título (grande) (si aplica)
    description: string // Descripción (si aplica)
  }
  heroSlider: {
    slides: Array<{
      heroSlideImage: string
      title: string
      subtitle: string
      description: string
      alignment: "left" | "center" | "right"
      mobileOffset?: string
    }>
    autoplayDelay?: number
    transitionEffect?: "slide" | "fade" | "cube" | "coverflow"
    transitionSpeed?: number
  }
  navMenu: Array<{
    label: string // Etiqueta de elementos del menú
    path: string // Ruta de destino
  }>
  certifications: {
    sectionTitle: string
    entities: Array<{
      nameTitle : string
      name: string
      imagePath: string,
      visible: boolean
    }>
    documents: Array<{
      nameTitle: string
      name: string
      imagePath: string
      visible: boolean
    }>
  }
  experience: {
    sectionTitle: string
    sectionSubtitle: string
    entities: Array<{
      icon: string
      value: string
      label: string
    }>
    itemFrame: string
  }
  aboutUs: {
    sectionTitle: string
    imagePath: string
    backgroundImagePath: string
    title: string
    description: string
    yearsOfExperience: number
  }
  purpose: {
    sectionTitle: string
    sectionSubtitle: string
    sectionText: string
    sectionBackground: string
    entities: Array<{
      icon: string
      title: string
      description: string
      imagePath: string
    }>
  }
  services: {
    sectionTitle: string
    sectionSubtitle: string
    sectionText: string
    linkText: string
    buttonText: string
    page: {
      backgroundImage: string
      pageTitle: string
      sectionTitle: string
      sectionSubtitle: string
    }
    individualPage: {
      contactButton: {
        title: string
        text: string
      };
      returnButton: {
        text: string
      };
    }
  }
  servicesDataMetadata: {
    serviciosMeta: {
      main: {
        title: string
        description: string
        openGraph: {
          title: string
          description: string
          url: string
        }
        alternates: {
          canonical: string
        }
      }
    }
    services: Array<{
      id: string
      title: string
      description: string
      shortDescription: string
      imageHome: string
      imageIndividual: string
      iconIndividual: string
      benefits: string[]
      process: string[]
      types: string[]
      painful: string
      forWhat: string
      myths: string[]
      hospitalOrAmbulatory: string
      procedureTime: string
      anesthesia: string
      recoveryTime: string
      postProcedureRecommendations: string[]
      ctaText: string
      metadata: {
        title: string
        description: string
        keywords: string[]
        openGraph: {
          title: string
          description: string
          url: string
        }
        alternates: {
          canonical: string
        }
      }
    }>
  }
  symptoms: {
    sectionTitle: string
    sectionSubtitle: string
    sectionText: string
    linkText: string
    buttonText: string
    page: {
      backgroundImage: string
      pageTitle: string
      sectionTitle: string
      sectionSubtitle: string
    }
    individualPage: {
      contactButton: {
        title: string
        text: string
      };
      returnButton: {
        text: string
      };
    }
  }
  symptomsDataMetadata: {
    sintomasMeta: {
      main: {
        title: string
        description: string
        openGraph: {
          title: string
          description: string
          url: string
        }
        alternates: {
          canonical: string
        }
      }
    }
    symptoms: Array<{
      id: string
      name: string
      shortDescription: string
      description: string
      causes: string[]
      relatedConditions: string[]
      managementTips: string[]
      ctaText: string
      imageHome: string
      imageIndividual: string
      iconIndividual: string
      metadata: {
        title: string
        description: string
        keywords: string[]
        openGraph: {
          title: string
          description: string
          url: string
        }
        alternates: {
          canonical: string
        }
      }
    }>
  }
  photosGallery: {
    sectionTitle: string
  }
  diseasesSection: {
    sectionTitle: string
    sectionSubtitle: string
    sectionText: string
    linkText: string
    buttonText: string
    page: {
      backgroundImage: string
      pageTitle: string
      sectionTitle: string
      sectionSubtitle: string
    };
    individualPage: {
      contactButton: {
        title: string
        text: string
      };
      returnButton: {
        text: string
      };
    };
  }
  diseasesDataMetadata: {
    enfermedadesMeta: {
      main: {
        title: string
        description: string
        openGraph: {
          title: string
          description: string
          url: string
        }
        alternates: {
          canonical: string
        }
      }
    }
    diseases: Array<{
      id: string
      name: string
      technicalName: string
      description: string
      shortDescription: string
      causes: string[]
      symptoms: string[]
      complications: string[]
      riskFactors: string[]
      mexicoStats: string
      ctaText: string
      treatments: string[]
      imageHome: string
      imageIndividual: string
      iconIndividual: string
      metadata: {
        title: string
        description: string
        keywords: string[]
        openGraph: {
          title: string
          description: string
          url: string
        }
        alternates: {
          canonical: string
        }
      }
    }>
  }
  callToAction: {
    title: string
    description: string
    backgroundImage: string
  }
  callToActionIndividual: {
    backgroundImage: string
    ctaIndivHeader: string
  }
  testimonials: {
    sectionTitle: string
    sectionSubtitle: string
    sectionDescription: string
    sectionBackground: string
    testimonialsImage: string
    linkText: string
    dataBlocks: {
      procedure: string
      weightLoss: string
      timeElapsed: string
    }
  }
  payments: {
    sectionTitle: string
    sectionSubtitle: string
    methods: Array<{
      name: string
      iconPath: string
      visible: boolean
    }>
    additionalInfo: string
  }
  insurances: {
    sectionTitle: string
    companies: Array<{
      name: string
      logoPath: string
      visible: boolean
    }>
    additionalInfo: string
  }
  footer: {
    backgroundImage: string
    logoFooter: string
  }
  generalCallToAction: {
    sectionBackground: string
    foregroundImage: string
    foregroundImagePercent: number
    title: string
    description: string
    price1: string
    price2: string
  }
  contact: {
    page: {
      backgroundImage: string
      pageTitle: string
    }
  }
  buttons: {
    btnCallText: string
    btnMessageText: string
  }
}

