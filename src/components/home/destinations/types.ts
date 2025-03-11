
export interface Destination {
  id: number;
  name: string;
  location: string;
  image: string;
  latitude?: number;
  longitude?: number;
  popularity: number;
  price?: string;
  distance?: number;
}
