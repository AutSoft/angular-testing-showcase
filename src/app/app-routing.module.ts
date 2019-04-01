import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { SkeletonComponent } from './core/skeleton/skeleton.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/flights'
  },
  {
    path: '',
    component: SkeletonComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'flights',
        loadChildren: './flight/flight.module#FlightModule'
      },
      {
        path: 'complaints',
        loadChildren: './complaint/complaint.module#ComplaintModule'
      },
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
