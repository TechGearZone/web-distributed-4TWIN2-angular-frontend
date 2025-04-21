export interface ChatMessage {
  sender: 'user' | 'agent';
  message: string;
  timestamp?: string;
}

export interface ChatSession {
  _id?: string;
  userId: string;
  agentId?: string;
  messages: ChatMessage[];
  createdAt?: string;
}
