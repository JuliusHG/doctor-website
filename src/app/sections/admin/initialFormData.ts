// @ts-nocheck
// Este archivo no está en uso y necesita actualizarse.
// Pertenece al formulario de recolección de datos del sitio.
// Se mantiene para no perder su funcionalidad. Será trasladado después.

import type { SiteContent } from "../../../interfaces/SiteContent"

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
    mainImagePath: "",
    logoPath: "",
    logoHeight: 100, // Default value
    facebookLink: "",
    instagramLink: "",
    linkedinLink: "",
    xLink: "",
    twitterLink: "",
    youtubeLink: "",
    googleMapsLink: "",
    googleMapsLink2: "",
  },
  doctorWorkInfo: {
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
    heroSectionHeight: 400, // Default value
  },
  navMenu: [
    { label: "INICIO", path: "/" },
    { label: "ENFERMEDADES", path: "/enfermedades" },
    { label: "SÍNTOMAS", path: "/sintomas" },
    { label: "SERVICIOS", path: "/servicios" },
    { label: "CONTACTO", path: "/contacto" },
  ],
  certifications: {
    sectionTitle: "",
    entities: [],
  },
  experience: {
    sectionTitle: "",
    entities: [],
  },
  aboutUs: {
    sectionTitle: "",
    imagePath: "",
    title: "",
    description: "",
    yearsOfExperience: 0,
  },
  purpose: {
    sectionTitle: "",
    entities: [],
  },
  services: {
    sectionTitle: "",
    linkText: "",
    entities: [], // Add this line
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
  symptoms: {
    sectionTitle: "",
    linkText: "",
    buttonText: "",
    entities: [], // Add this line
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
  photosGallery: {
    sectionTitle: "",
  },
  diseases: {
    sectionTitle: "",
    linkText: "",
    buttonText: "",
    entities: [], // Add this line
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
  callToAction: {
    title: "",
    description: "",
    buttons: {
      call: "",
      schedule: "",
    },
  },
  testimonials: {
    sectionTitle: "",
    linkText: "",
    entities: [],
    dataBlocks: {
      procedure: "",
      weightLoss: "",
      timeElapsed: "",
    },
  },
  payments: {
    sectionTitle: "",
    methods: [],
    additionalInfo: "",
  },
  insurances: {
    sectionTitle: "",
    companies: [],
    additionalInfo: "",
  },
  footer: {
    contactInfo: {
      address: "",
      phone: "",
      email: "",
    },
  },
  generalCallToAction: {
    title: "",
    consultationText: "",
    buttons: {
      call: "",
      schedule: "",
      whatsapp: "",
    },
  },
  contact: {
    page: {
      backgroundImage: "",
      pageTitle: "",
    },
  },
  schedule: {
    page: {
      backgroundImage: "",
      pageTitle: "",
    },
  },
}

