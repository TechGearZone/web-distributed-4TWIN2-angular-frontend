import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryRoutingModule } from './delivery-routing.module';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { DeliveryFormComponent } from './delivery-form/delivery-form.component';
import { DeliveryTrackComponent } from './delivery-track/delivery-track.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    DeliveryListComponent,
    DeliveryFormComponent,
    DeliveryTrackComponent
  ],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressSpinnerModule
  ]
})
export class DeliveryModule { }
