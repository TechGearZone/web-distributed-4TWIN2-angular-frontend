import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckoutRequest } from '../shared/models/checkout-request.model';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private baseUrl = 'http://localhost:8093/api/payment';

  constructor(private http: HttpClient) { }

  createCheckoutSession(request: CheckoutRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create-checkout-session`, request);
  }

  redirectToCheckout(sessionUrl: string): void {
    window.location.href = sessionUrl;
  }
}
