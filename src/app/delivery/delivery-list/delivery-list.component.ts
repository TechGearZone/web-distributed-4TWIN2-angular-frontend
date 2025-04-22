// delivery-list.component.ts
import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';
import { Delivery } from '../../models/delivery.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DriverService } from '../../services/driver.service';
import { Driver } from '../../models/driver.interface';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.css']
})
export class DeliveryListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'status', 'trackingNumber', 'driverId', 'actions']; // Removed source and destination
  dataSource = new MatTableDataSource<Delivery>([]);
  isLoading = true;
  errorMessage: string | null = null;
  drivers: Driver[] = [];

  constructor(
    private deliveryService: DeliveryService,
    private driverService: DriverService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log('DeliveryListComponent initialized');
    this.loadDeliveries();
    this.loadDrivers();
  }

  loadDeliveries(): void {
    this.isLoading = true;
    this.errorMessage = null;
    console.log('Fetching deliveries...');
    this.deliveryService.getAllDeliveries().subscribe({
      next: (deliveries) => {
        console.log('Deliveries fetched:', deliveries);
        this.dataSource.data = deliveries;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load deliveries. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching deliveries:', err);
      }
    });
  }

  loadDrivers(): void {
    this.driverService.getAllDrivers().subscribe({
      next: (drivers) => {
        this.drivers = drivers;
        console.log('Drivers fetched:', drivers);
        if (drivers.length === 0) {
          this.snackBar.open('No drivers available for assignment.', 'Close', { duration: 3000 });
        }
      },
      error: (err) => {
        this.snackBar.open('Failed to load drivers.', 'Close', { duration: 3000 });
        console.error('Error fetching drivers:', err);
      }
    });
  }

  deleteDelivery(id: number): void {
    if (confirm('Are you sure you want to delete this delivery?')) {
      this.deliveryService.deleteDelivery(id).subscribe({
        next: () => {
          console.log(`Delivery ${id} deleted`);
          this.snackBar.open('Delivery deleted successfully', 'Close', { duration: 3000 });
          this.loadDeliveries();
        },
        error: (err) => {
          this.snackBar.open('Failed to delete delivery', 'Close', { duration: 3000 });
          console.error('Error deleting delivery:', err);
        }
      });
    }
  }

  searchByStatus(status: string): void {
    if (!status) {
      this.loadDeliveries();
      return;
    }
    this.isLoading = true;
    this.errorMessage = null;
    this.deliveryService.searchByStatus(status).subscribe({
      next: (deliveries) => {
        this.dataSource.data = deliveries;
        this.isLoading = false;
        this.snackBar.open(`Filtered by status: ${status}`, 'Close', { duration: 3000 });
      },
      error: (err) => {
        this.errorMessage = 'Failed to search deliveries by status.';
        this.isLoading = false;
        this.snackBar.open('Failed to search by status', 'Close', { duration: 3000 });
        console.error('Error searching deliveries:', err);
      }
    });
  }

  assignDriver(deliveryId: number, driverId: number): void {
    if (!driverId) {
      this.snackBar.open('Please select a driver', 'Close', { duration: 3000 });
      return;
    }
    this.deliveryService.assignDriver(deliveryId, driverId).subscribe({
      next: () => {
        this.snackBar.open('Driver assigned successfully', 'Close', { duration: 3000 });
        this.loadDeliveries();
      },
      error: (err) => {
        this.snackBar.open('Failed to assign driver', 'Close', { duration: 3000 });
        console.error('Error assigning driver:', err);
      }
    });
  }

  unassignDriver(deliveryId: number): void {
    this.deliveryService.unassignDriver(deliveryId).subscribe({
      next: () => {
        this.snackBar.open('Driver unassigned successfully', 'Close', { duration: 3000 });
        this.loadDeliveries();
      },
      error: (err) => {
        this.snackBar.open('Failed to unassign driver', 'Close', { duration: 3000 });
        console.error('Error unassigning driver:', err);
      }
    });
  }
}
