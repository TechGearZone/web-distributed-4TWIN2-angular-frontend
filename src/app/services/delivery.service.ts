// delivery.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Delivery } from '../models/delivery.interface';

@Injectable({
  providedIn: 'root' // Add this to make the service available application-wide
})
export class DeliveryService {
  private apiUrl = 'http://localhost:8084/api/deliveries';

  constructor(private http: HttpClient) { }

  getAllDeliveries(sortBy: string = 'id'): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.apiUrl, { params: new HttpParams().set('sortBy', sortBy) });
  }

  getDeliveryById(id: number): Observable<Delivery> {
    return this.http.get<Delivery>(`${this.apiUrl}/${id}`);
  }

  searchByStatus(status: string): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(`${this.apiUrl}/search/by-status`, { params: new HttpParams().set('status', status) });
  }

  trackDelivery(trackingNumber: string): Observable<Delivery> {
    return this.http.get<Delivery>(`${this.apiUrl}/track`, { params: new HttpParams().set('trackingNumber', trackingNumber) });
  }

  createDelivery(delivery: Delivery): Observable<Delivery> {
    return this.http.post<Delivery>(this.apiUrl, delivery);
  }

  updateDelivery(id: number, delivery: Delivery): Observable<Delivery> {
    return this.http.put<Delivery>(`${this.apiUrl}/${id}`, delivery);
  }

  assignDriver(deliveryId: number, driverId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${deliveryId}/assign-driver/${driverId}`, {});
  }

  unassignDriver(deliveryId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${deliveryId}/unassign-driver`, {});
  }

  deleteDelivery(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
