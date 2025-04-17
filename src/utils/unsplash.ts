
import { createApi } from 'unsplash-js';

export const unsplash = createApi({
  accessKey: 'KE2-ggaJwTdQXjo42V7lm9_7H3muPZ-gVU2Qsc5vZVE'
});

/**
 * Fetches a random image from Unsplash based on a search query
 * @param query The search term to find an image
 * @returns The image data or null if an error occurs
 */
export const getRandomImage = async (query: string) => {
  try {
    const result = await unsplash.photos.getRandom({
      query,
      orientation: 'landscape'
    });
    
    if (result.type === 'success') {
      const response = result.response;
      // Handle both single object and array responses
      if (Array.isArray(response)) {
        return response[0]; // Return the first item if it's an array
      }
      return response;
    }
    throw new Error('Failed to fetch image');
  } catch (error) {
    console.error('Error fetching Unsplash image:', error);
    return null;
  }
};

/**
 * Searches for images on Unsplash based on a query
 * @param query The search term
 * @param page Optional page number for pagination
 * @param perPage Optional number of results per page
 * @returns The search results or null if an error occurs
 */
export const searchImages = async (query: string, page = 1, perPage = 10) => {
  try {
    const result = await unsplash.search.getPhotos({
      query,
      orientation: 'landscape',
      page,
      perPage
    });
    
    if (result.type === 'success') {
      return result.response;
    }
    throw new Error('Failed to fetch images');
  } catch (error) {
    console.error('Error searching Unsplash images:', error);
    return null;
  }
};
