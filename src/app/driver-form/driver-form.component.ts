// src/app/driver-form/driver-form.component.ts
import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DeliveryService } from '../services/delivery.service';
import { Driver } from '../models/driver';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.css']
})
export class DriverFormComponent {
  driver: Driver = { id: 0, name: '', phone: '' };
  isBrowser: boolean;

  constructor(
    private deliveryService: DeliveryService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

// src/app/driver-form/driver-form.component.ts
  onSubmit(): void {
    if (this.isBrowser && this.driver.name && this.driver.phone) {
      this.deliveryService.createDriver(this.driver).subscribe({
        next: (createdDriver) => {
          console.log('Livreur ajouté avec succès :', createdDriver);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout du livreur :', err);
          alert('Une erreur est survenue lors de l\'ajout du livreur.');
        }
      });
    } else {
      alert('Veuillez remplir tous les champs requis.');
    }
  }
}
