import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { DeliveryFormComponent } from './delivery-form/delivery-form.component';
import { DeliveryTrackComponent } from './delivery-track/delivery-track.component';

const routes: Routes = [
  { path: '', component: DeliveryListComponent },
  { path: 'create', component: DeliveryFormComponent },
  { path: 'edit/:id', component: DeliveryFormComponent },
  { path: 'track', component: DeliveryTrackComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryRoutingModule { }
