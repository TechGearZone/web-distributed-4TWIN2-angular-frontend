export interface SupportTicket {
  _id?: string;
  userId: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved';
  createdAt?: string;
}
