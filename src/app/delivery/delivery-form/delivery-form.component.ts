import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliveryService } from '../../services/delivery.service';
import { Delivery } from '../../models/delivery.interface';

@Component({
  selector: 'app-delivery-form',
  template: `
    <mat-card>
      <mat-card-title>{{editMode ? 'Edit' : 'Create'}} Delivery</mat-card-title>
      <form [formGroup]="deliveryForm" (ngSubmit)="onSubmit()">
        <mat-form-field>
          <mat-label>Order ID</mat-label>
          <input matInput formControlName="orderId" type="number" required>
          <mat-error *ngIf="deliveryForm.get('orderId')?.hasError('required')">Order ID is required</mat-error>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Status</mat-label>
          <mat-select formControlName="status" required>
            <mat-option value="Pending">Pending</mat-option>
            <mat-option value="Shipped">Shipped</mat-option>
            <mat-option value="Delivered">Delivered</mat-option>
            <mat-option value="Cancelled">Cancelled</mat-option>
          </mat-select>
          <mat-error *ngIf="deliveryForm.get('status')?.hasError('required')">Status is required</mat-error>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Shipping Address</mat-label>
          <input matInput formControlName="shippingAddress" required>
          <mat-error *ngIf="deliveryForm.get('shippingAddress')?.hasError('required')">Address is required</mat-error>
          <mat-error *ngIf="deliveryForm.get('shippingAddress')?.hasError('minlength')">Minimum 5 characters</mat-error>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Tracking Number</mat-label>
          <input matInput formControlName="trackingNumber">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Estimated Delivery Date</mat-label>
          <input matInput formControlName="estimatedDeliveryDate">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Driver ID</mat-label>
          <input matInput formControlName="driverId" type="number">
        </mat-form-field>
        <mat-card-actions>
          <button mat-raised-button color="primary" type="submit" [disabled]="deliveryForm.invalid">Save</button>
          <button mat-raised-button type="button" (click)="cancel()">Cancel</button>
        </mat-card-actions>
      </form>
    </mat-card>
  `,
  styles: [`
    mat-card {
      margin: 20px;
      padding: 20px;
      max-width: 600px;
    }
    mat-form-field {
      width: 100%;
      margin-bottom: 10px;
    }
  `]
})
export class DeliveryFormComponent implements OnInit {
  deliveryForm: FormGroup;
  editMode = false;
  deliveryId?: number;

  constructor(
    private fb: FormBuilder,
    private deliveryService: DeliveryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.deliveryForm = this.fb.group({
      orderId: ['', Validators.required],
      status: ['', Validators.required],
      shippingAddress: ['', [Validators.required, Validators.minLength(5)]],
      trackingNumber: [''],
      estimatedDeliveryDate: [''],
      driverId: ['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
        this.deliveryId = +params['id'];
        this.deliveryService.getDeliveryById(this.deliveryId).subscribe(delivery => {
          this.deliveryForm.patchValue(delivery);
        });
      }
    });
  }

  onSubmit() {
    const delivery: Delivery = this.deliveryForm.value;
    if (this.editMode && this.deliveryId) {
      this.deliveryService.updateDelivery(this.deliveryId, delivery).subscribe(() => {
        this.router.navigate(['/deliveries']);
      });
    } else {
      this.deliveryService.createDelivery(delivery).subscribe(() => {
        this.router.navigate(['/deliveries']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/deliveries']);
  }
}
