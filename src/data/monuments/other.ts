
import { Monument } from './types';

export const otherMonuments: Monument[] = [
  {
    id: "golden-temple",
    name: "Golden Temple",
    city: "Amritsar",
    state: "Punjab",
    type: "Other",
    ticketPrice: {
      indian: 0,
      saarc: 0,
      foreign: 0
    }
  },
  {
    id: "charminar",
    name: "Charminar",
    city: "Hyderabad",
    state: "Telangana",
    type: "ASI",
    ticketPrice: {
      indian: 20,
      saarc: 250,
      foreign: 300
    }
  },
  {
    id: "india-gate",
    name: "India Gate",
    city: "Delhi",
    state: "Delhi",
    type: "Other",
    ticketPrice: {
      indian: 0,
      saarc: 0,
      foreign: 0
    }
  }
];
