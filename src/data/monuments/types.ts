
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
