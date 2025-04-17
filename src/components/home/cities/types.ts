
export interface City {
  id: number;
  name: string;
  attractions: number;
  image: string;
  latitude?: number;
  longitude?: number;
  popularity: number;
}

export interface CityDisplayProps {
  city: City;
  onCityClick: (cityId: number) => void;
}

export interface PopularCitiesProps {
  userLocation?: {
    latitude: number;
    longitude: number;
    accuracy?: number;
  } | null;
}
