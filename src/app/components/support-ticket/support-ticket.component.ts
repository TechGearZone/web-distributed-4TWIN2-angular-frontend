import { Component, OnInit } from '@angular/core';
import { SupportTicketService } from '../../services/support-ticket.service';
import { SupportTicket } from '../../models/support-ticket.model';

@Component({
  selector: 'app-support-ticket',
  templateUrl: './support-ticket.component.html',
  styleUrls: ['./support-ticket.component.css']
})
export class SupportTicketComponent implements OnInit {
  tickets: SupportTicket[] = [];
  newTicket: Partial<SupportTicket> = {
    userId: '',
    subject: '',
    description: '',
    status: 'open'
  };

  constructor(private ticketService: SupportTicketService) {}

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets(): void {
    this.ticketService.getTickets().subscribe(tickets => {
      this.tickets = tickets;
    });
  }

  createTicket(): void {
    if (!this.newTicket.userId || !this.newTicket.subject || !this.newTicket.description) return;

    this.ticketService.createTicket(this.newTicket as SupportTicket).subscribe(ticket => {
      this.tickets.push(ticket);
      this.newTicket = {
        userId: '',
        subject: '',
        description: '',
        status: 'open'
      };
    });
  }

  updateStatus(id: string, status: string): void {
    this.ticketService.updateTicketStatus(id, status).subscribe(updated => {
      const ticket = this.tickets.find(t => t._id === id);
      if (ticket) ticket.status = updated.status;
    });
  }

  deleteTicket(id: string): void {
    this.ticketService.deleteTicket(id).subscribe(() => {
      this.tickets = this.tickets.filter(t => t._id !== id);
    });
  }
}

