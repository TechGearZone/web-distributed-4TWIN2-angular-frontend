// src/app/delivery-form/delivery-form.component.ts
import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DeliveryService } from '../services/delivery.service';
import { Delivery } from '../models/delivery';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.css']
})
export class DeliveryFormComponent {
  delivery: Delivery = {
    id: 0,
    orderId: 0,
    status: '',
    shippingAddress: '',
    trackingNumber: '',
    estimatedDeliveryDate: '',
    driverId: null
  };
  isBrowser: boolean;

  constructor(
    private deliveryService: DeliveryService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  onSubmit(): void {
    if (this.isBrowser) {
      this.deliveryService.createDelivery(this.delivery).subscribe({
        next: (newDelivery) => {
          console.log('Livraison créée avec succès :', newDelivery);
          this.router.navigate(['/']); // Redirige après la création réussie
        },
        error: (err) => {
          console.error('Erreur lors de la création de la livraison :', err);
          alert('Une erreur est survenue lors de la création de la livraison.');
        }
      });
    }
  }
}
