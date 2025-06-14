
/**
 * Pexels API utility functions
 * Provides functions to fetch images from Pexels API
 */

const PEXELS_API_KEY = '1QHiKMx6pH3ZkLWLLuAnfO39SJoJLLmwPjSBMaRkzwApeHGwAFuSqQU3';
const PEXELS_BASE_URL = 'https://api.pexels.com/v1';

interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

interface PexelsSearchResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  next_page?: string;
}

/**
 * Fetches a random image from Pexels based on a search query
 * @param query The search term to find an image
 * @returns The image data or null if an error occurs
 */
export const getRandomImage = async (query: string): Promise<PexelsPhoto | null> => {
  try {
    const randomPage = Math.floor(Math.random() * 10) + 1; // Random page between 1-10
    const response = await fetch(
      `${PEXELS_BASE_URL}/search?query=${encodeURIComponent(query)}&orientation=landscape&page=${randomPage}&per_page=1`,
      {
        headers: {
          'Authorization': PEXELS_API_KEY,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }
    
    const data: PexelsSearchResponse = await response.json();
    
    if (data.photos && data.photos.length > 0) {
      return data.photos[0];
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching Pexels image:', error);
    return null;
  }
};

/**
 * Searches for images on Pexels based on a query
 * @param query The search term
 * @param page Optional page number for pagination
 * @param perPage Optional number of results per page
 * @returns The search results or null if an error occurs
 */
export const searchImages = async (
  query: string, 
  page = 1, 
  perPage = 10
): Promise<PexelsSearchResponse | null> => {
  try {
    const response = await fetch(
      `${PEXELS_BASE_URL}/search?query=${encodeURIComponent(query)}&orientation=landscape&page=${page}&per_page=${perPage}`,
      {
        headers: {
          'Authorization': PEXELS_API_KEY,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }
    
    const data: PexelsSearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching Pexels images:', error);
    return null;
  }
};

/**
 * Gets curated photos from Pexels
 * @param page Optional page number for pagination
 * @param perPage Optional number of results per page
 * @returns The curated photos or null if an error occurs
 */
export const getCuratedPhotos = async (
  page = 1, 
  perPage = 15
): Promise<PexelsSearchResponse | null> => {
  try {
    const response = await fetch(
      `${PEXELS_BASE_URL}/curated?page=${page}&per_page=${perPage}`,
      {
        headers: {
          'Authorization': PEXELS_API_KEY,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }
    
    const data: PexelsSearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching curated Pexels photos:', error);
    return null;
  }
};
