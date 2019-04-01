import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'szia-flight-stop-details',
  templateUrl: './flight-stop-details.component.html',
  styleUrls: ['./flight-stop-details.component.scss']
})
export class FlightStopDetailsComponent implements OnInit {
  @Input() city: string;
  @Input() airportCode: string;
  @Input() time: string;
  @Input() airportName: string;

  constructor() { }

  ngOnInit() {
  }

}
