import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SupportTicket } from '../models/support-ticket.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SupportTicketService {
  private baseUrl = 'http://localhost:3000/api/customers/tickets';

  constructor(private http: HttpClient) {}

  getTickets(): Observable<SupportTicket[]> {
    return this.http.get<SupportTicket[]>(this.baseUrl);
  }

  createTicket(ticket: SupportTicket): Observable<SupportTicket> {
    return this.http.post<SupportTicket>(this.baseUrl, ticket);
  }

  updateTicketStatus(id: string, status: string): Observable<SupportTicket> {
    return this.http.put<SupportTicket>(`${this.baseUrl}/${id}`, { status });
  }

  deleteTicket(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
