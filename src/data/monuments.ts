
export interface Monument {
  id: string;
  name: string;
  city: string;
  state: string;
  type: 'UNESCO' | 'ASI' | 'State' | 'Other';
  ticketPrice: {
    indian: number;
    saarc: number;
    foreign: number;
  };
}

export const indianMonuments: Monument[] = [
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    city: "Agra",
    state: "Uttar Pradesh",
    type: "UNESCO",
    ticketPrice: {
      indian: 50,
      saarc: 540,
      foreign: 1100
    }
  },
  {
    id: "red-fort",
    name: "Red Fort",
    city: "Delhi",
    state: "Delhi",
    type: "UNESCO",
    ticketPrice: {
      indian: 35,
      saarc: 500,
      foreign: 600
    }
  },
  {
    id: "qutub-minar",
    name: "Qutub Minar",
    city: "Delhi",
    state: "Delhi",
    type: "UNESCO",
    ticketPrice: {
      indian: 35,
      saarc: 500,
      foreign: 600
    }
  },
  {
    id: "humayuns-tomb",
    name: "Humayun's Tomb",
    city: "Delhi",
    state: "Delhi",
    type: "UNESCO",
    ticketPrice: {
      indian: 35,
      saarc: 500,
      foreign: 600
    }
  },
  {
    id: "agra-fort",
    name: "Agra Fort",
    city: "Agra",
    state: "Uttar Pradesh",
    type: "UNESCO",
    ticketPrice: {
      indian: 50,
      saarc: 550,
      foreign: 650
    }
  },
  {
    id: "fatehpur-sikri",
    name: "Fatehpur Sikri",
    city: "Agra",
    state: "Uttar Pradesh",
    type: "UNESCO",
    ticketPrice: {
      indian: 50,
      saarc: 550,
      foreign: 650
    }
  },
  {
    id: "khajuraho-temples",
    name: "Khajuraho Group of Monuments",
    city: "Khajuraho",
    state: "Madhya Pradesh",
    type: "UNESCO",
    ticketPrice: {
      indian: 40,
      saarc: 570,
      foreign: 600
    }
  },
  {
    id: "konark-sun-temple",
    name: "Konark Sun Temple",
    city: "Konark",
    state: "Odisha",
    type: "UNESCO",
    ticketPrice: {
      indian: 40,
      saarc: 550,
      foreign: 600
    }
  },
  {
    id: "ajanta-caves",
    name: "Ajanta Caves",
    city: "Aurangabad",
    state: "Maharashtra",
    type: "UNESCO",
    ticketPrice: {
      indian: 40,
      saarc: 600,
      foreign: 700
    }
  },
  {
    id: "ellora-caves",
    name: "Ellora Caves",
    city: "Aurangabad",
    state: "Maharashtra",
    type: "UNESCO",
    ticketPrice: {
      indian: 40,
      saarc: 600,
      foreign: 700
    }
  },
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
  },
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
