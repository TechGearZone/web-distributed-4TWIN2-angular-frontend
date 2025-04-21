import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeliveryService } from '../../services/delivery.service';
import { Delivery } from '../../models/delivery.interface';

@Component({
  selector: 'app-delivery-track',
  template: `
    <mat-card>
      <mat-card-title>Track Delivery</mat-card-title>
      <form [formGroup]="trackForm" (ngSubmit)="onTrack()">
        <mat-form-field>
          <mat-label>Tracking Number</mat-label>
          <input matInput formControlName="trackingNumber" required>
          <mat-error *ngIf="trackForm.get('trackingNumber')?.hasError('required')">Tracking Number is required</mat-error>
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit" [disabled]="trackForm.invalid">Track</button>
      </form>
      <div *ngIf="delivery">
        <h3>Delivery Details</h3>
        <p><strong>ID:</strong> {{delivery.id}}</p>
        <p><strong>Order ID:</strong> {{delivery.orderId}}</p>
        <p><strong>Status:</strong> {{delivery.status}}</p>
        <p><strong>Shipping Address:</strong> {{delivery.shippingAddress}}</p>
        <p><strong>Tracking Number:</strong> {{delivery.trackingNumber}}</p>
        <p><strong>Estimated Delivery:</strong> {{delivery.estimatedDeliveryDate || 'N/A'}}</p>
        <p><strong>Driver ID:</strong> {{delivery.driverId || 'None'}}</p>
      </div>
      <mat-spinner *ngIf="loading"></mat-spinner>
    </mat-card>
  `,
  styles: [`
    mat-card {
      margin: 20px;
      padding: 20px;
      max-width: 600px;
    }
    form {
      margin-bottom: 20px;
    }
  `]
})
export class DeliveryTrackComponent {
  trackForm: FormGroup;
  delivery?: Delivery;
  loading = false;

  constructor(private fb: FormBuilder, private deliveryService: DeliveryService) {
    this.trackForm = this.fb.group({
      trackingNumber: ['', Validators.required]
    });
  }

  onTrack() {
    const trackingNumber = this.trackForm.get('trackingNumber')?.value;
    this.loading = true;
    this.deliveryService.trackDelivery(trackingNumber).subscribe({
      next: (delivery) => {
        this.delivery = delivery;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
