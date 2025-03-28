// src/app/delivery-list/delivery-list.component.ts
import { Component, OnInit, ViewChild, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DeliveryService } from '../services/delivery.service';
import { Delivery } from '../models/delivery';
import { Driver } from '../models/driver';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-delivery-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatSortModule
  ],
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.css']
})
export class DeliveryListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'orderId', 'status', 'shippingAddress', 'trackingNumber', 'estimatedDeliveryDate', 'driverId', 'actions'];
  dataSource = new MatTableDataSource<Delivery>();
  drivers: Driver[] = [];
  searchTrackingNumber: string = '';
  searchStatus: string = '';
  selectedDriverIds: { [key: number]: number | null } = {}; // Stocke les sélections par livraison
  isBrowser: boolean;
  private routerSubscription!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private deliveryService: DeliveryService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.loadDeliveries();
    this.loadDrivers();

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/deliveries') {
        this.loadDeliveries();
      }
    });
  }

  ngAfterViewInit() {
    if (this.isBrowser && this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  loadDeliveries(): void {
    this.deliveryService.getDeliveries().subscribe({
      next: (deliveries) => {
        this.dataSource.data = deliveries;
        this.applyFilter();
        // Réinitialisez les sélections après le chargement des livraisons
        this.selectedDriverIds = {};
        deliveries.forEach(delivery => {
          this.selectedDriverIds[delivery.id] = null;
        });
      },
      error: (err) => console.error('Erreur lors du chargement des livraisons :', err)
    });
  }

  loadDrivers(): void {
    this.deliveryService.getDrivers().subscribe({
      next: (drivers) => {
        this.drivers = drivers;
        console.log('Livreurs chargés :', this.drivers);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des livreurs :', err);
        alert('Impossible de charger les livreurs. Vérifiez que le back-end est en cours d\'exécution.');
      }
    });
  }

  getDriverName(driverId: number | null): string {
    if (!driverId) return 'Non affecté';
    const driver = this.drivers.find(d => d.id === driverId);
    return driver ? driver.name : 'Livreur #' + driverId;
  }

  applyFilter(): void {
    const filterValueTracking = this.searchTrackingNumber.trim().toLowerCase();
    const filterValueStatus = this.searchStatus.trim().toLowerCase();
    this.dataSource.data = this.dataSource.data.filter(delivery =>
      (!filterValueTracking || delivery.trackingNumber.toLowerCase().includes(filterValueTracking)) &&
      (!filterValueStatus || delivery.status.toLowerCase().includes(filterValueStatus))
    );
  }

  assignDriver(deliveryId: number): void {
    const selectedDriverId = this.selectedDriverIds[deliveryId];
    if (selectedDriverId) {
      this.deliveryService.assignDriver(deliveryId, selectedDriverId).subscribe({
        next: () => {
          this.loadDeliveries();
          console.log(`Livreur ${selectedDriverId} affecté à la livraison ${deliveryId}`);
        },
        error: (err) => {
          console.error('Erreur lors de l\'affectation du livreur :', err);
          alert('Une erreur est survenue lors de l\'affectation du livreur.');
        }
      });
    } else {
      alert('Veuillez sélectionner un livreur.');
    }
  }

  unassignDriver(deliveryId: number): void {
    this.deliveryService.unassignDriver(deliveryId).subscribe({
      next: () => {
        this.loadDeliveries();
        console.log(`Livreur désaffecté de la livraison ${deliveryId}`);
      },
      error: (err) => {
        console.error('Erreur lors de la désaffectation du livreur :', err);
        alert('Une erreur est survenue lors de la désaffectation du livreur.');
      }
    });
  }

  deleteDelivery(id: number): void {
    if (this.isBrowser && confirm('Êtes-vous sûr de vouloir supprimer cette livraison ?')) {
      this.deliveryService.deleteDelivery(id).subscribe({
        next: () => this.loadDeliveries(),
        error: (err) => console.error('Erreur lors de la suppression de la livraison :', err)
      });
    }
  }

  editDelivery(deliveryId: number): void {
    console.log("Modification de la livraison avec ID:", deliveryId);
    this.router.navigate(['/edit-delivery', deliveryId]);
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
