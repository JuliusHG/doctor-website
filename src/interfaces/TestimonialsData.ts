export interface TestimonialData {
    id: number
    name: string
    image: string
    shortTestimonial: string
    fullTestimonial: string
    procedure: string
    weightLoss: string
    timeElapsed: string
    rating: number
    visible: boolean
  }
  
  export interface TestimonialsData {
    default: TestimonialData[]
  }
  
  