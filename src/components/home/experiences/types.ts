
export interface Experience {
  id: number;
  title: string;
  location: string;
  duration: string;
  price: string;
  rating: number;
  reviews: number;
  languages: string[];
  guide: {
    name: string;
    image: string;
    experience: string;
    certified: boolean;
  };
  image: string;
}
