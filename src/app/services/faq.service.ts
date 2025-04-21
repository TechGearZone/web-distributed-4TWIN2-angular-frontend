import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Faq } from '../models/faq.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FaqService {
  private baseUrl = 'http://localhost:3000/api/customers/faqs';

  constructor(private http: HttpClient) {}

  getFaqs(): Observable<Faq[]> {
    return this.http.get<Faq[]>(this.baseUrl);
  }

  createFaq(faq: Faq): Observable<Faq> {
    return this.http.post<Faq>(this.baseUrl, faq);
  }

  deleteFaq(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
