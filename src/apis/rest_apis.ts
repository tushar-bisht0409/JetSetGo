import { DOMAIN_URL } from "../config";
import { FlightData } from "../types/flightData";
import { ApiEndPoints } from "../utils/apiEndPoints";

export async function fetchFlightData(): Promise<FlightData[]> {
    try {
        const response = await fetch(`${DOMAIN_URL}/${ApiEndPoints.dummyData}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: FlightData[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('There was a problem with the API request:', error);
        return [];
    }
}