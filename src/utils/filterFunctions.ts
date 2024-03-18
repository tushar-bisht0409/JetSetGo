import { FlightData } from "../types/flightData";
import { formatDurationInMinutes } from "./format";

export function filterFlightsByOriginAndDestination (flights: FlightData[], origin: string, destination: string): FlightData[] {
    return flights.filter((flight) => flight.origin === origin && flight.destination === destination);
};

export function sortFlightsByPrice (flights: FlightData[], order: 'asc' | 'desc'): FlightData[] {
    return flights.slice().sort((a, b) => {
        if (order === 'asc') {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });
};

export function sortFlightsByDuration (flights: FlightData[]): FlightData[] {
    return flights.slice().sort((a, b) => {
        const durationA = formatDurationInMinutes(a.duration);
        const durationB = formatDurationInMinutes(b.duration);
        return durationA - durationB;
    });
};

export function sortFlightsByDepartureTime (flights: FlightData[], order: 'asc' | 'desc'): FlightData[] {
    return flights.slice().sort((a, b) => {
        if(order === 'asc'){
            return new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime();
        } else {
            return new Date(b.departureTime).getTime() - new Date(a.departureTime).getTime();
        }
    });
};

export function sortFlightsByArrivalTime (flights: FlightData[], order: 'asc' | 'desc'): FlightData[] {
    return flights.slice().sort((a, b) => {
        if(order === 'asc'){
            return new Date(a.arrivalTime).getTime() - new Date(b.arrivalTime).getTime();
        } else {
            return new Date(b.arrivalTime).getTime() - new Date(a.arrivalTime).getTime();
        }
    });
};

export function filterFlightsByDepartureTime (flights: FlightData[], startHour: number, endHour: number): FlightData[] {
    return flights.filter((flight) => {
        const departureHour = new Date(flight.departureTime).getHours();
        return departureHour >= startHour && departureHour < endHour;
    });
};

export function filterFlightsByArrivalTime (flights: FlightData[], startHour: number, endHour: number): FlightData[] {
    return flights.filter((flight) => {
        const arrivalHour = new Date(flight.arrivalTime).getHours();
        return arrivalHour >= startHour && arrivalHour < endHour;
    });
};

export function filterFlightsByAircraftModel (flights: FlightData[], aircraft: string): FlightData[] {
    return flights.filter((flight) => {
        return flight.aircraft.toLowerCase() === aircraft.toLowerCase();
    });
};

export function filterFlightsByAirline (flights: FlightData[], airline: string): FlightData[] {
    return flights.filter((flight) => {
        return flight.airline.toLowerCase() === airline.toLowerCase();
    });
};


export function filterAndSortByFlightData (flights: FlightData[], byArrival: boolean, startHour: number, endHour: number, aircraft: string, airline: string, sortBy: string ) {
    let newData = flights;
    if(startHour !== endHour){
        if(byArrival){
            newData = filterFlightsByArrivalTime(newData, startHour,endHour);
        } else {
            newData = filterFlightsByDepartureTime(newData, startHour,endHour);
        }
    }
    if(aircraft !== ''){
        newData = filterFlightsByAircraftModel(newData,aircraft);
    }
    if(airline !== ''){
        newData = filterFlightsByAirline(newData,airline);
    }
    if(sortBy === 'Price High to Low'){
        newData = sortFlightsByPrice(newData, 'desc');
    } else if(sortBy === 'Price Low to High'){
        newData = sortFlightsByPrice(newData, 'asc');
    } else if(sortBy === 'Shortest Flight'){
        newData = sortFlightsByDuration(newData);
    } else if(sortBy === 'Earliest Departure Time'){
        newData = sortFlightsByDepartureTime(newData,'asc');
    } else if(sortBy === 'Latest Departure Time'){
        newData = sortFlightsByDepartureTime(newData,'desc');
    } else if(sortBy === 'Earliest Arrival Time'){
        newData = sortFlightsByArrivalTime(newData,'asc');
    } else if(sortBy === 'Latest Arrival Time'){
        newData = sortFlightsByArrivalTime(newData,'desc');
    }
    return newData;
}