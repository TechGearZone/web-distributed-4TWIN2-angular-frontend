// src/app/services/delivery.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Delivery } from '../models/delivery';
import { Driver } from '../models/driver';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private apiUrl = 'http://localhost:8084/api/deliveries';
  private apiUrlDrivers = 'http://localhost:8084/api/drivers';

  constructor(private http: HttpClient) {}

  getDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.apiUrl).pipe(
      tap(data => console.log('Livraisons récupérées :', data)),
      catchError(err => {
        console.error('Erreur lors de la récupération des livraisons :', err);
        throw err;
      })
    );
  }

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.apiUrlDrivers).pipe(
      tap(data => console.log('Livreurs récupérés :', data)),
      catchError(err => {
        console.error('Erreur lors de la récupération des livreurs :', err);
        throw err;
      })
    );
  }

  createDriver(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(this.apiUrlDrivers, driver).pipe(
      tap(data => console.log('Livreur créé :', data)),
      catchError(err => {
        console.error('Erreur lors de la création du livreur :', err);
        throw err;
      })
    );
  }

  updateDriver(id: number, driver: Driver): Observable<Driver> {
    return this.http.put<Driver>(`${this.apiUrlDrivers}/${id}`, driver).pipe(
      tap(data => console.log('Livreur mis à jour :', data)),
      catchError(err => {
        console.error('Erreur lors de la mise à jour du livreur :', err);
        throw err;
      })
    );
  }

  deleteDriver(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlDrivers}/${id}`).pipe(
      tap(() => console.log(`Livreur ${id} supprimé`)),
      catchError(err => {
        console.error('Erreur lors de la suppression du livreur :', err);
        throw err;
      })
    );
  }

  getDriverById(id: number): Observable<Driver> {
    return this.http.get<Driver>(`${this.apiUrlDrivers}/${id}`).pipe(
      tap(data => console.log('Livreur récupéré :', data)),
      catchError(err => {
        console.error('Erreur lors de la récupération du livreur :', err);
        throw err;
      })
    );
  }

  createDelivery(delivery: Delivery): Observable<Delivery> {
    return this.http.post<Delivery>(this.apiUrl, delivery).pipe(
      tap(data => console.log('Livraison créée :', data)),
      catchError(err => {
        console.error('Erreur lors de la création de la livraison :', err);
        throw err;
      })
    );
  }

  trackDelivery(trackingNumber: string): Observable<Delivery> {
    return this.http.get<Delivery>(`${this.apiUrl}/track?trackingNumber=${trackingNumber}`).pipe(
      tap(data => console.log('Livraison suivie :', data)),
      catchError(err => {
        console.error('Erreur lors du suivi de la livraison :', err);
        throw err;
      })
    );
  }

  assignDriver(deliveryId: number, driverId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${deliveryId}/assign-driver/${driverId}`, {}).pipe(
      tap(() => console.log(`Livreur ${driverId} affecté à la livraison ${deliveryId}`)),
      catchError(err => {
        console.error('Erreur lors de l\'affectation du livreur :', err);
        throw err;
      })
    );
  }

  unassignDriver(deliveryId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${deliveryId}/unassign-driver`, {}).pipe(
      tap(() => console.log(`Livreur désaffecté de la livraison ${deliveryId}`)),
      catchError(err => {
        console.error('Erreur lors de la désaffectation du livreur :', err);
        throw err;
      })
    );
  }

  deleteDelivery(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log(`Livraison ${id} supprimée`)),
      catchError(err => {
        console.error('Erreur lors de la suppression de la livraison :', err);
        throw err;
      })
    );
  }

  getDeliveryById(id: number): Observable<Delivery> {
    return this.http.get<Delivery>(`${this.apiUrl}/${id}`).pipe(
      tap(data => console.log('Livraison récupérée :', data)),
      catchError(err => {
        console.error('Erreur lors de la récupération de la livraison :', err);
        throw err;
      })
    );
  }

  updateDelivery(id: number, delivery: Delivery): Observable<Delivery> {
    return this.http.put<Delivery>(`${this.apiUrl}/${id}`, delivery).pipe(
      tap(data => console.log('Livraison mise à jour :', data)),
      catchError(err => {
        console.error('Erreur lors de la mise à jour de la livraison :', err);
        throw err;
      })
    );
  }
}
