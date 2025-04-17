
import { Monument } from './types';
import { northIndiaMonuments } from './north';
import { westIndiaMonuments } from './west';
import { rajasthanMonuments } from './rajasthan';
import { southIndiaMonuments } from './south';
import { otherMonuments } from './other';

export type { Monument } from './types';

// Create a map of regions to their monument arrays for easier access
const monumentRegionMap = {
  north: northIndiaMonuments,
  west: westIndiaMonuments,
  south: southIndiaMonuments,
  rajasthan: rajasthanMonuments,
  other: otherMonuments
};

// Export the complete list of all Indian monuments
export const indianMonuments: Monument[] = Object.values(monumentRegionMap).flat();

/**
 * Get monuments by region
 * @param region The region to filter by
 * @returns Array of monuments in the specified region
 */
export const getMonumentsByRegion = (region: keyof typeof monumentRegionMap) => {
  return monumentRegionMap[region];
};

/**
 * Get monuments by type
 * @param type The monument type to filter by
 * @returns Array of monuments of the specified type
 */
export const getMonumentsByType = (type: Monument['type']) => {
  return indianMonuments.filter(monument => monument.type === type);
};

/**
 * Find a monument by its ID
 * @param id The monument ID to search for
 * @returns The monument with the specified ID or undefined if not found
 */
export const getMonumentById = (id: string) => {
  return indianMonuments.find(monument => monument.id === id);
};
