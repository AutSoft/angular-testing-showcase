import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FlightRoutingModule} from './flight-routing.module';
import {FlightComponent} from './flight/flight.component';
import {MatTableModule} from '@angular/material';
import {FlightListComponent} from './flight-list/flight-list.component';
import { FlightStopDetailsComponent } from './flight-stop-details/flight-stop-details.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [FlightComponent, FlightListComponent, FlightStopDetailsComponent],
  imports: [
  CommonModule,
    FlightRoutingModule,
    MatTableModule,
    FlexLayoutModule
  ]
})
export class FlightModule {
}
