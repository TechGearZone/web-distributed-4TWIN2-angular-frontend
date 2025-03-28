// src/app/edit-driver/edit-driver.component.ts
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DeliveryService } from '../services/delivery.service';
import { Driver } from '../models/driver';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-driver',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.css']
})
export class EditDriverComponent implements OnInit {
  driver: Driver = { id: 0, name: '', phone: '' };
  isBrowser: boolean;

  constructor(
    private deliveryService: DeliveryService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.deliveryService.getDriverById(id).subscribe({
      next: (driver) => this.driver = driver,
      error: (err) => console.error('Erreur lors du chargement du livreur:', err)
    });
  }

  onSubmit(): void {
    if (this.isBrowser && this.driver.name && this.driver.phone) {
      this.deliveryService.updateDriver(this.driver.id, this.driver).subscribe({
        next: () => this.router.navigate(['/drivers']),
        error: (err) => {
          console.error('Erreur lors de la mise à jour:', err);
          alert('Une erreur est survenue lors de la mise à jour.');
        }
      });
    } else {
      alert('Veuillez remplir tous les champs requis.');
    }
  }
}
