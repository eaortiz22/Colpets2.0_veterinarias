export interface Veterinarian {
  id: number;
  name: string;
  last_name: string;
  gender: string;
  specialty: string;
  rating: number;
  reviews: number;
  image?: any;
  description?: string;
  certificates?: string[];
  education?: string[];
  availability: any;
}

export interface Service {
  id: string;
  name: string;
  price?: number;
}
export interface Veterinary {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviews: number;
  patientsCount: number;
  yearsExperience: number;
  image: any;
  schedule: string;
  address: string;
  neighborhood: string;
  city: string;
  services: Service[];
  description: string;
  veterinarians?: Veterinarian[]; // nueva propiedad
}
