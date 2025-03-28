// src/app/driver-list/driver-list.component.ts
import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../services/delivery.service';
import { Driver } from '../models/driver';
import {Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-driver-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {
  drivers: Driver[] = [];
  displayedColumns: string[] = ['id', 'name', 'phone', 'actions'];

  constructor(
    private deliveryService: DeliveryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(): void {
    this.deliveryService.getDrivers().subscribe({
      next: (drivers) => this.drivers = drivers,
      error: (err) => console.error('Erreur lors du chargement des livreurs:', err)
    });
  }

  editDriver(id: number): void {
    this.router.navigate(['/edit-driver', id]);
  }

  deleteDriver(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce livreur ?')) {
      this.deliveryService.deleteDriver(id).subscribe({
        next: () => this.loadDrivers(),
        error: (err) => console.error('Erreur lors de la suppression:', err)
      });
    }
  }
}
