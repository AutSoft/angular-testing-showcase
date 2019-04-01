import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FlightComponent} from './flight/flight.component';
import {FlightListComponent} from './flight-list/flight-list.component';
import {FlightDetailResolverService} from './flight-detail-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: FlightListComponent
  },
  {
    path: ':id',
    component: FlightComponent,
    resolve: {
      flight: FlightDetailResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightRoutingModule {
}
