
import { Monument } from './types';

export const rajasthanMonuments: Monument[] = [
  {
    id: "amber-fort",
    name: "Amber Fort",
    city: "Jaipur",
    state: "Rajasthan",
    type: "UNESCO",
    ticketPrice: {
      indian: 200,
      saarc: 750,
      foreign: 1000
    }
  },
  {
    id: "hawa-mahal",
    name: "Hawa Mahal",
    city: "Jaipur",
    state: "Rajasthan",
    type: "ASI",
    ticketPrice: {
      indian: 50,
      saarc: 200,
      foreign: 250
    }
  },
  {
    id: "jantar-mantar",
    name: "Jantar Mantar",
    city: "Jaipur",
    state: "Rajasthan",
    type: "UNESCO",
    ticketPrice: {
      indian: 50,
      saarc: 200,
      foreign: 250
    }
  },
  {
    id: "mehrangarh-fort",
    name: "Mehrangarh Fort",
    city: "Jodhpur",
    state: "Rajasthan",
    type: "ASI",
    ticketPrice: {
      indian: 70,
      saarc: 300,
      foreign: 600
    }
  }
];
