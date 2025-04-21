import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Add for Angular Material
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './shared/filter.pipe';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { PaymentCancelComponent } from './components/payment-cancel/payment-cancel.component';
import { FooterComponent } from './components/footer/footer.component';
import { LiveChatComponent } from './components/live-chat/live-chat.component';
import { FaqComponent } from './components/faq/faq.component';
import { SupportTicketComponent } from './components/support-ticket/support-ticket.component';
import { DeliveryModule } from './delivery/delivery.module'; // Import DeliveryModule
import { DriverModule } from './driver/driver.module'; // Import DriverModule
// Angular Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    ProductsComponent,
    FilterPipe,
    CheckoutComponent,
    PaymentSuccessComponent,
    PaymentCancelComponent,
    FooterComponent,
    LiveChatComponent,
    FaqComponent,
    SupportTicketComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Add for Angular Material
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DeliveryModule, // Add DeliveryModule
    DriverModule,   // Add DriverModule
    // Angular Material Modules
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
