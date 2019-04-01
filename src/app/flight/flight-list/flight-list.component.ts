import {Component, OnInit} from '@angular/core';
import {Flight} from '../flight.model';
import {FlightService} from '../flight.service';

@Component({
  selector: 'szia-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss']
})
export class FlightListComponent implements OnInit {
  flights: Flight[];
  displayedColumns: string[] = ['flightNumber', 'departureCity', 'arrivalCity'];

  constructor(private flightService: FlightService) {
  }

  ngOnInit() {
    this.flightService.listFlights().subscribe(flights => this.flights = flights);
  }

}
