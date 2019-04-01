import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Flight} from './flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private baseUrl = `${environment.baseUrl}/Flights`;

  constructor(private http: HttpClient) {
  }

  getFlight(id: number) {
    return this.http.get<Flight>(`${this.baseUrl}/${id}`);
  }

  listFlights() {
    return this.http.get<Flight[]>(`${this.baseUrl}`);
  }
}
