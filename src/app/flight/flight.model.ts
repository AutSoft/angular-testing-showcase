export class Flight {
  flightNumber: string;
  departure: string;
  arrival: string;
  departureCity?: string;
  departureCode?: string;
  arrivalCity?: string;
  arrivalCode?: string;
  departureTime: string;
  arrivalTime: string;
  status: string;
  checkinDeskNumber: number;
  gateNumber: number;
  delay: number;
  comment?: string;
  id?: number;
  airlineId?: number;

  constructor(flightNumber: string, departure: string, arrival: string, departureTime: string, arrivalTime: string, status: string,
              checkinDeskNumber: number, gateNumber: number, delay: number, departureCity?: string, departureCode?: string,
              arrivalCity?: string, arrivalCode?: string, comment?: string, id?: number, airlineId?: number) {
    this.flightNumber = flightNumber;
    this.departure = departure;
    this.arrival = arrival;
    this.departureCity = departureCity;
    this.departureCode = departureCode;
    this.arrivalCity = arrivalCity;
    this.arrivalCode = arrivalCode;
    this.departureTime = departureTime;
    this.arrivalTime = arrivalTime;
    this.status = status;
    this.checkinDeskNumber = checkinDeskNumber;
    this.gateNumber = gateNumber;
    this.delay = delay;
    this.comment = comment;
    this.id = id;
    this.airlineId = airlineId;
  }
}
