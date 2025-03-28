// src/app/edit-delivery/edit-delivery.component.ts
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DeliveryService } from '../services/delivery.service';
import { Delivery } from '../models/delivery';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-delivery',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './edit-delivery.component.html',
  styleUrls: ['./edit-delivery.component.css']
})
export class EditDeliveryComponent implements OnInit {
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
  deliveryId: number | null = null;

  constructor(
    private deliveryService: DeliveryService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Récupérez l'ID de la livraison depuis les paramètres de la route
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.deliveryId = +id;
        this.loadDelivery(this.deliveryId);
      }
    });
  }

  loadDelivery(id: number): void {
    this.deliveryService.getDeliveryById(id).subscribe({
      next: (delivery) => {
        this.delivery = delivery;
        console.log('Livraison chargée pour modification :', this.delivery);
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la livraison :', err);
        alert('Une erreur est survenue lors du chargement de la livraison.');
      }
    });
  }

  onSubmit(): void {
    if (this.isBrowser && this.deliveryId) {
      this.deliveryService.updateDelivery(this.deliveryId, this.delivery).subscribe({
        next: () => {
          console.log('Livraison mise à jour avec succès');
          this.router.navigate(['/deliveries']);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de la livraison :', err);
          alert('Une erreur est survenue lors de la mise à jour de la livraison.');
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/deliveries']);
  }
}
