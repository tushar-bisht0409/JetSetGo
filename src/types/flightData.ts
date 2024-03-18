export interface FlightData {
    id: number;
    gate: string;
    price: number;
    origin: string;
    airline: string;
    aircraft: string;
    duration: string;
    arrivalTime: string;
    destination: string;
    flightNumber: string;
    departureTime: string;
    seatsAvailable: number;
  }
  
  export interface RootState {
    data: FlightData;
  }
  