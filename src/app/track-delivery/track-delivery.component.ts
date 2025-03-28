// src/app/track-delivery/track-delivery.component.ts
import { Component } from '@angular/core';
import { DeliveryService } from '../services/delivery.service';
import { Delivery } from '../models/delivery';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-track-delivery',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './track-delivery.component.html',
  styleUrls: ['./track-delivery.component.css']
})
export class TrackDeliveryComponent {
  trackingNumber: string = '';
  delivery: Delivery | null = null;
  error: string | null = null;

  constructor(private deliveryService: DeliveryService) {}

  trackDelivery(): void {
    if (this.trackingNumber) {
      this.deliveryService.trackDelivery(this.trackingNumber).subscribe({
        next: (delivery) => {
          this.delivery = delivery;
          this.error = null;
        },
        error: (err) => {
          this.delivery = null;
          this.error = 'Aucune livraison trouvée avec ce numéro de suivi';
          console.error('Erreur de suivi:', err);
        }
      });
    }
  }
}
