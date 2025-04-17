import { northIndiaMonuments } from './north';
import { westIndiaMonuments } from './west';
import { rajasthanMonuments } from './rajasthan';
import { southIndiaMonuments } from './south';
import { otherMonuments } from './other';

export type { Monument } from './types';

export const indianMonuments: Monument[] = [
  ...northIndiaMonuments,
  ...westIndiaMonuments,
  ...rajasthanMonuments,
  ...southIndiaMonuments,
  ...otherMonuments
];

export const getMonumentsByRegion = (region: 'north' | 'west' | 'south' | 'rajasthan' | 'other') => {
  const regionMap = {
    north: northIndiaMonuments,
    west: westIndiaMonuments,
    south: southIndiaMonuments,
    rajasthan: rajasthanMonuments,
    other: otherMonuments
  };
  return regionMap[region];
};

export const getMonumentsByType = (type: Monument['type']) => {
  return indianMonuments.filter(monument => monument.type === type);
};

export const getMonumentById = (id: string) => {
  return indianMonuments.find(monument => monument.id === id);
};
