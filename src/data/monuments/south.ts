
import { Monument } from './types';

export const southIndiaMonuments: Monument[] = [
  {
    id: "mysore-palace",
    name: "Mysore Palace",
    city: "Mysore",
    state: "Karnataka",
    type: "State",
    ticketPrice: {
      indian: 70,
      saarc: 350,
      foreign: 400
    }
  },
  {
    id: "hampi",
    name: "Hampi Monuments",
    city: "Hampi",
    state: "Karnataka",
    type: "UNESCO",
    ticketPrice: {
      indian: 40,
      saarc: 570,
      foreign: 600
    }
  },
  {
    id: "mahabalipuram",
    name: "Mahabalipuram Temple",
    city: "Mahabalipuram",
    state: "Tamil Nadu",
    type: "UNESCO",
    ticketPrice: {
      indian: 40,
      saarc: 550,
      foreign: 600
    }
  }
];
