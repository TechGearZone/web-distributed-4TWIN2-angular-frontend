import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverService } from '../../services/driver.service';
import { Driver } from '../../models/driver.interface';

@Component({
  selector: 'app-driver-form',
  template: `
    <mat-card>
      <mat-card-title>{{editMode ? 'Edit' : 'Create'}} Driver</mat-card-title>
      <form [formGroup]="driverForm" (ngSubmit)="onSubmit()">
        <mat-form-field>
          <mat-label>Name</mat-label> <!-- Fix: Remove "Eunice" -->
          <input matInput formControlName="name" required>
          <mat-error *ngIf="driverForm.get('name')?.hasError('required')">Name is required</mat-error>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Phone</mat-label>
          <input matInput formControlName="phone" required>
          <mat-error *ngIf="driverForm.get('phone')?.hasError('required')">Phone is required</mat-error>
        </mat-form-field>
        <mat-card-actions>
          <button mat-raised-button color="primary" type="submit" [disabled]="driverForm.invalid">Save</button>
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
export class DriverFormComponent implements OnInit {
  driverForm: FormGroup;
  editMode = false;
  driverId?: number;

  constructor(
    private fb: FormBuilder,
    private driverService: DriverService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.driverForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
        this.driverId = +params['id'];
        this.driverService.getDriverById(this.driverId).subscribe(driver => {
          this.driverForm.patchValue(driver);
        });
      }
    });
  }

  onSubmit() {
    const driver: Driver = this.driverForm.value;
    if (this.editMode && this.driverId) {
      this.driverService.updateDriver(this.driverId, driver).subscribe(() => {
        this.router.navigate(['/drivers']);
      });
    } else {
      this.driverService.createDriver(driver).subscribe(() => {
        this.router.navigate(['/drivers']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/drivers']);
  }
}
