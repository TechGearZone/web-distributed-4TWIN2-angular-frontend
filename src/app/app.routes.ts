// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { DeliveryFormComponent } from './delivery-form/delivery-form.component';
import { DriverFormComponent } from './driver-form/driver-form.component';
import { EditDeliveryComponent } from './edit-delivery/edit-delivery.component';

export const routes: Routes = [
  { path: '', redirectTo: '/deliveries', pathMatch: 'full' },
  { path: 'deliveries', component: DeliveryListComponent },
  { path: 'create-delivery', component: DeliveryFormComponent },
  { path: 'create-driver', component: DriverFormComponent },
  { path: 'edit-delivery/:id', component: EditDeliveryComponent }, // Nouvelle route pour la modification
  { path: '**', redirectTo: '/deliveries' }
];
