import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplaintRoutingModule } from './complaint-routing.module';
import { ComplaintComponent } from './complaint/complaint.component';
import { ComplaintListComponent } from './complaint-list/complaint-list.component';
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ComplaintEditComponent } from './complaint-edit/complaint-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ComplaintComponent, ComplaintListComponent, ComplaintEditComponent],
  imports: [
    CommonModule,
    ComplaintRoutingModule,
    MatCardModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ]
})
export class ComplaintModule { }
