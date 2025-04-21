import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';
import { DriverService } from '../../services/driver.service';
import { Driver } from '../../models/driver.interface';
import { Router } from '@angular/router';
import { Delivery } from '../../models/delivery.interface';

@Component({
  selector: 'app-delivery-list',
  template: `
    <mat-card>
      <mat-card-title>Deliveries</mat-card-title>
      <mat-card-actions>
        <button mat-raised-button color="primary" routerLink="/deliveries/create">Create Delivery</button>
        <button mat-raised-button color="accent" routerLink="/deliveries/track">Track Delivery</button>
      </mat-card-actions>
      <mat-table [dataSource]="deliveries" matSort>
        <ng-container matColumnDef="id">
          <mat-header-cell *matHeaderCellDef>ID</mat-header-cell>
          <mat-cell *matCellDef="let delivery">{{delivery.id}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="orderId">
          <mat-header-cell *matHeaderCellDef>Order ID</mat-header-cell>
          <mat-cell *matCellDef="let delivery">{{delivery.orderId}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="status">
          <mat-header-cell *matHeaderCellDef>Status</mat-header-cell>
          <mat-cell *matCellDef="let delivery">{{delivery.status}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="shippingAddress">
          <mat-header-cell *matHeaderCellDef>Address</mat-header-cell>
          <mat-cell *matCellDef="let delivery">{{delivery.shippingAddress}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="trackingNumber">
          <mat-header-cell *matHeaderCellDef>Tracking</mat-header-cell>
          <mat-cell *matCellDef="let delivery">{{delivery.trackingNumber}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="driver">
          <mat-header-cell *matHeaderCellDef>Driver</mat-header-cell>
          <mat-cell *matCellDef="let delivery">{{getDriverName(delivery.driverId)}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="actions">
          <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
          <mat-cell *matCellDef="let delivery">
            <button mat-button (click)="editDelivery(delivery.id)">Edit</button>
            <button mat-button color="warn" (click)="deleteDelivery(delivery.id)">Delete</button>
            <button mat-button *ngIf="!delivery.driverId" (click)="assignDriver(delivery.id)">Assign Driver</button>
            <button mat-button *ngIf="delivery.driverId" (click)="unassignDriver(delivery.id)">Unassign Driver</button>
          </mat-cell>
        </ng-container>
        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
      </mat-table>
      <mat-spinner *ngIf="loading"></mat-spinner>
    </mat-card>
  `,
  styles: [`
    mat-card {
      margin: 20px;
      padding: 20px;
    }
    mat-table {
      width: 100%;
    }
  `]
})
export class DeliveryListComponent implements OnInit {
  deliveries: Delivery[] = [];
  drivers: Driver[] = [];
  displayedColumns = ['id', 'orderId', 'status', 'shippingAddress', 'trackingNumber', 'driver', 'actions'];
  loading = false;

  constructor(
    private deliveryService: DeliveryService,
    private driverService: DriverService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadDeliveries();
    this.loadDrivers();
  }

  loadDeliveries() {
    this.loading = true;
    this.deliveryService.getAllDeliveries().subscribe({
      next: (deliveries) => {
        this.deliveries = deliveries;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  loadDrivers() {
    this.driverService.getAllDrivers().subscribe(drivers => this.drivers = drivers);
  }

  getDriverName(driverId?: number): string {
    const driver = this.drivers.find(d => d.id === driverId);
    return driver ? driver.name : 'None';
  }

  editDelivery(id?: number) {
    if (id) this.router.navigate(['/deliveries/edit', id]);
  }

  deleteDelivery(id?: number) {
    if (id && confirm('Are you sure?')) {
      this.deliveryService.deleteDelivery(id).subscribe(() => this.loadDeliveries());
    }
  }

  assignDriver(deliveryId?: number) {
    if (deliveryId) {
      const driverId = prompt('Enter Driver ID:');
      if (driverId) {
        this.deliveryService.assignDriver(deliveryId, +driverId).subscribe(() => this.loadDeliveries());
      }
    }
  }

  unassignDriver(deliveryId?: number) {
    if (deliveryId) {
      this.deliveryService.unassignDriver(deliveryId).subscribe(() => this.loadDeliveries());
    }
  }
}
