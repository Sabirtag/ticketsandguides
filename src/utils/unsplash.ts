
import { createApi } from 'unsplash-js';

export const unsplash = createApi({
  accessKey: 'KE2-ggaJwTdQXjo42V7lm9_7H3muPZ-gVU2Qsc5vZVE'
});

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

export const searchImages = async (query: string, page = 1, perPage = 10) => {
  try {
    const result = await unsplash.search.getPhotos({
      query,
      orientation: 'landscape'
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
