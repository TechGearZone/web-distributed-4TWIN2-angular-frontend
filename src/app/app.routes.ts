// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { DeliveryFormComponent } from './delivery-form/delivery-form.component';
import { DriverFormComponent } from './driver-form/driver-form.component';
import { EditDeliveryComponent } from './edit-delivery/edit-delivery.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { EditDriverComponent } from './edit-driver/edit-driver.component';
import { TrackDeliveryComponent } from './track-delivery/track-delivery.component';
export const routes: Routes = [
  { path: '', redirectTo: '/drivers', pathMatch: 'full' },
  { path: 'deliveries', component: DeliveryListComponent },
  { path: 'drivers', component: DriverListComponent },
  { path: 'create-delivery', component: DeliveryFormComponent },
  { path: 'create-driver', component: DriverFormComponent },
  { path: 'edit-delivery/:id', component: EditDeliveryComponent },
  { path: 'edit-driver/:id', component: EditDriverComponent },
  { path: 'track-delivery', component: TrackDeliveryComponent },
  { path: '**', redirectTo: '/drivers' }
];
