import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../services/driver.service';
import { Driver } from '../../models/driver.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-list',
  template: `
    <mat-card>
      <mat-card-title>Drivers</mat-card-title>
      <mat-card-actions>
        <button mat-raised-button color="primary" routerLink="/drivers/create">Create Driver</button>
      </mat-card-actions>
      <mat-table [dataSource]="drivers" matSort>
        <ng-container matColumnDef="id">
          <mat-header-cell *matHeaderCellDef>ID</mat-header-cell>
          <mat-cell *matCellDef="let driver">{{driver.id}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="name">
          <mat-header-cell *matHeaderCellDef>Name</mat-header-cell>
          <mat-cell *matCellDef="let driver">{{driver.name}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="phone">
          <mat-header-cell *matHeaderCellDef>Phone</mat-header-cell>
          <mat-cell *matCellDef="let driver">{{driver.phone}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="actions">
          <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
          <mat-cell *matCellDef="let driver">
            <button mat-button (click)="editDriver(driver.id)">Edit</button>
            <button mat-button color="warn" (click)="deleteDriver(driver.id)">Delete</button>
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
export class DriverListComponent implements OnInit {
  drivers: Driver[] = [];
  displayedColumns = ['id', 'name', 'phone', 'actions'];
  loading = false;

  constructor(private driverService: DriverService, private router: Router) { }

  ngOnInit() {
    this.loadDrivers();
  }

  loadDrivers() {
    this.loading = true;
    this.driverService.getAllDrivers().subscribe({
      next: (drivers) => {
        this.drivers = drivers;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  editDriver(id?: number) {
    if (id) this.router.navigate(['/drivers/edit', id]);
  }

  deleteDriver(id?: number) {
    if (id && confirm('Are you sure?')) {
      this.driverService.deleteDriver(id).subscribe(() => this.loadDrivers());
    }
  }
}
