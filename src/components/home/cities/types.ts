
/**
 * Represents a city with its details and location
 */
export interface City {
  id: number;
  name: string;
  attractions: number;
  image: string;
  popularity: number;
  latitude?: number;
  longitude?: number;
}

/**
 * Props for the CityDisplay component
 */
export interface CityDisplayProps {
  city: City;
  onCityClick: (cityId: number) => void;
}

/**
 * User location coordinates
 */
export interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

/**
 * Props for the PopularCities component
 */
export interface PopularCitiesProps {
  userLocation?: UserLocation | null;
}
