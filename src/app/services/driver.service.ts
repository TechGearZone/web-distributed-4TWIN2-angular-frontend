// driver.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Driver } from '../models/driver.interface';

@Injectable({
  providedIn: 'root' // Add this
})
export class DriverService {
  private apiUrl = 'http://localhost:8084/api/drivers';

  constructor(private http: HttpClient) { }

  getAllDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.apiUrl);
  }

  getDriverById(id: number): Observable<Driver> {
    return this.http.get<Driver>(`${this.apiUrl}/${id}`);
  }

  createDriver(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(this.apiUrl, driver);
  }

  updateDriver(id: number, driver: Driver): Observable<Driver> {
    return this.http.put<Driver>(`${this.apiUrl}/${id}`, driver);
  }

  deleteDriver(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
