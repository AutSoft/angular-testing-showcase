import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from './skeleton/skeleton.component';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule, MatSnackBarConfig,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthModule } from '../auth/auth.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorInterceptorService } from './error-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

const snackBarConfig: MatSnackBarConfig = { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top'};

@NgModule({
  declarations: [SkeletonComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    AuthModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    FlexLayoutModule,
    MatSnackBarModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [SkeletonComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: snackBarConfig
    }
  ]
})
export class CoreModule { }
