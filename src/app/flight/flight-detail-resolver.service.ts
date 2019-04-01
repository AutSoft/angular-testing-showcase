import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Flight} from './flight.model';
import {Observable} from 'rxjs';
import {FlightService} from './flight.service';

@Injectable({
  providedIn: 'root'
})
export class FlightDetailResolverService implements Resolve<Flight> {

  constructor(private flightService: FlightService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Flight> | Promise<Flight> | Flight {
    const flightId = Number(route.paramMap.get('id'));

    return this.flightService.getFlight(flightId);
  }

}
