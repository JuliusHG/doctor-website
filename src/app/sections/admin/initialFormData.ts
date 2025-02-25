//@ts-nocheck

import type { SiteContent } from "../../../interfaces/SiteContent";

export const initialFormData: SiteContent = {
  doctorInfo: {
    name: "",
    specialty: "",
    specialtyShort: "",
    specialist: "",
    address: "",
    phone: "",
    whatsapp: "",
    email: "",
    cedProf: "",
    cedEsp: "",
    websiteUrl: "",
    facebookLink: "",
    instagramLink: "",
    linkedinLink: "",
    xLink: "",
    twitterLink: "",
    youtubeLink: "",
    googleMapsLink: "",
    doctoraliaLink: "",
    doctoraliaReviewsLink: "",
    logoPath: "",
    logoHeight: 100, // Valor por defecto
    favicon: "",
  },
  doctorWorkInfo: {
    avisoCofepris: "",
    consultingHeader: "",
    consultingAddress: "",
    consultingHoursDaysHeader: "",
    consultingHoursDaysSubheader1: "",
    consultingHours1: "",
    consultingHoursDaysSubheader2: "",
    consultingHours2: "",
    consultingPhonesHeader: "",
    consultingSchedulePhonesSubheader: "",
    consultingSchedulePhone: "",
    consultingUrgenciesPhonesSubheader: "",
    consultingUrgenciesPhone: "",
    hospitalHeader: "",
    hospitalAddress: "",
    hospitalHoursDaysHeader: "",
    hospitalHoursDaysSubheader1: "",
    hospitalHours1: "",
    hospitalHoursDaysSubheader2: "",
    hospitalHours2: "",
    hospitalPhonesHeader: "",
    hospitalSchedulePhonesSubheader: "",
    hospitalSchedulePhone: "",
    hospitalUrgenciesPhonesSubheader: "",
    hospitalUrgenciesPhone: "",
  },
  heroSection: {
    heroSectionHeight: 400, // Valor por defecto
    mainImage: "",
    logoHeight: 350,
    backgroundHeroImage: "",
    backgroundHeroImageHeightPercent: 100,
    foregroundHeroImage: "",
    foregroundHeroImageHeightPercent: 90,
    overlayColor: "",
    overlayOpacity: 0.1,
    subTitle: "",
    title: "",
    description: "",
  },
  navMenu: [
    // Puedes ajustarlos a los del JSON o dejarlos así:
    { label: "INICIO", path: "/" },
    { label: "ENFERMEDADES", path: "/enfermedades" },
    { label: "SÍNTOMAS", path: "/sintomas" },
    { label: "SERVICIOS", path: "/servicios" },
    { label: "CONTACTO", path: "/contacto" },
  ],
  certifications: {
    sectionTitle: "",
    entities: [],
    documents: [],
  },
  experience: {
    sectionTitle: "",
    sectionSubtitle: "",
    entities: [],
    itemFrame: "",
  },
  aboutUs: {
    sectionTitle: "",
    imagePath: "",
    backgroundImagePath: "",
    title: "",
    description: "",
    yearsOfExperience: 5, // Valor por defecto
  },
  purpose: {
    sectionTitle: "",
    sectionSubtitle: "",
    sectionText: "",
    entities: [],
  },
  services: {
    sectionTitle: "",
    sectionSubtitle: "",
    sectionText: "",
    linkText: "",
    buttonText: "",
    page: {
      backgroundImage: "",
      pageTitle: "",
      sectionTitle: "",
      sectionSubtitle: "",
    },
    individualPage: {
      contactButton: {
        title: "",
        text: "",
      },
      returnButton: {
        text: "",
      },
    },
  },
  servicesDataMetadata: {
    serviciosMeta: {
      main: {
        title: "",
        description: "",
        openGraph: {
          title: "",
          description: "",
          url: "",
        },
        alternates: {
          canonical: "",
        },
      },
    },
    services: [
      // Ejemplo vacío según la estructura deseada
      {
        id: "",
        title: "",
        description: "",
        imageHome: "",
        imageIndividual: "",
        benefits: [],
        process: [],
        types: [],
        painful: "",
        forWhat: "",
        myths: [],
        hospitalOrAmbulatory: [],
        procedureTime: "",
        anesthesia: "",
        recoveryTime: "",
        postProcedureRecommendations: [],
        ctaText: "",
        metadata: {
          title: "",
          description: "",
          keywords: [],
          openGraph: {
            title: "",
            description: "",
            url: "",
          },
          alternates: {
            canonical: "",
          },
        },
      },
    ],
  },
  symptoms: {
    sectionTitle: "",
    sectionSubtitle: "",
    sectionText: "",
    linkText: "",
    buttonText: "",
    page: {
      backgroundImage: "",
      pageTitle: "",
      sectionTitle: "",
      sectionSubtitle: "",
    },
    individualPage: {
      contactButton: {
        title: "",
        text: "",
      },
      returnButton: {
        text: "",
      },
    },
  },
  symptomsDataMetadata: {
    sintomasMeta: {
      main: {
        title: "",
        description: "",
        openGraph: {
          title: "",
          description: "",
          url: "",
        },
        alternates: {
          canonical: "",
        }
      }
    },
    symptoms: [
      {
      id: "",
      name: "",
      shortDescription: "",
      description: "",
      causes: [],
      relatedConditions: [],
      managementTips: [],
      ctaText: "",
      imageHome: "",
      imageIndividual: "",
      iconIndividual: "",
      metadata: {
        title: "",
        description: "",
        keywords: [],
        openGraph: {
          title: "",
          description: "",
          url: "",
        },
        alternates: {
          canonical: "",
        }
      }
    }
    ],
  },
  photosGallery: {
    sectionTitle: "",
  },
  diseasesSection: {
    sectionTitle: "",
    sectionSubtitle: "",
    linkText: "",
    buttonText: "",
    page: {
      backgroundImage: "",
      pageTitle: "",
      sectionTitle: "",
      sectionSubtitle: "",
    },
    individualPage: {
      contactButton: {
        title: "",
        text: "",
      },
      returnButton: {
        text: "",
      },
    },
  },
  diseasesDataMetadata: {
    enfermedadesMeta: {
      main: {
        title: "",
        description: "",
        openGraph: {
          title: "",
          description: "",
          url: "",
        },
        alternates: {
          canonical: "",
        }
      }
    },
    diseases: [
      {
      id: "",
      name: "",
      technicalName: "",
      description: "",
      shortDescription: "",
      causes: [],
      symptoms: [],
      complications: [],
      riskFactors: [],
      mexicoStats: "",
      ctaText: "",
      treatments: [],
      imageHome: "",
      imageIndividual: "",
      metadata: {
        title: "",
        description: "",
        keywords: [],
        openGraph: {
          title: "",
          description: "",
          url: "",
        },
        alternates: {
          canonical: "",
        }
      }
    }
  ]
  },
  callToAction: {
    title: "",
    description: "",
    backgroundImage: "",
  },
  callToActionIndividual: {
    backgroundImage: "",
  },
  testimonials: {
    sectionTitle: "",
    sectionDescription: "",
    sectionBackground: "",
    linkText: "",
    dataBlocks: {
      procedure: "",
      weightLoss:"",
      timeElapsed: "",
    },
  },
  payments: {
    sectionTitle: "",
    sectionSubtitle: "",
    methods: [],
    additionalInfo: "",
  },
  insurances: {
    sectionTitle: "",
    companies: [],
    additionalInfo: "",
  },
  footer: {
    backgroundImage: "",
  },
  generalCallToAction: {
    sectionBackground: "",
    title: "",
    description: "",
  },
  contact: {
    page: {
      backgroundImage: "",
      pageTitle: "",
    },
  },
  buttons: {
     btnCallText: "",
     btnMessageText: "",
 }
};
