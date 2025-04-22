import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { PaymentCancelComponent } from './components/payment-cancel/payment-cancel.component';
import { CartComponent } from './components/cart/cart.component';
import { FaqComponent } from './components/faq/faq.component';
import { SupportTicketComponent } from './components/support-ticket/support-ticket.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'payment/success', component: PaymentSuccessComponent },
  { path: 'payment/cancel', component: PaymentCancelComponent },
  { path: 'cart', component: CartComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'ticket', component: SupportTicketComponent },
  {path:'delivery', loadChildren: () => import('./delivery/delivery.module').then(m => m.DeliveryModule)}, // Lazy loading for DeliveryModule
  // Updated lazy loading syntax for Angular 14+
  { path: 'deliveries', loadChildren: () => import('./delivery/delivery.module').then(m => m.DeliveryModule) },
  { path: 'drivers', loadChildren: () => import('./driver/driver.module').then(m => m.DriverModule) },
  { path: '**', redirectTo: 'products', pathMatch: 'full' } // Ensure full match for wildcard
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })], // Enable tracing for debugging (optional)
  exports: [RouterModule]
})
export class AppRoutingModule { }
