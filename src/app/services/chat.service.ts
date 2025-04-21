import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { ChatSession } from '../models/chat-session.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private socket: Socket;
  private restBaseUrl = 'http://localhost:8093/api/customers/chats';

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:8093/api/customers');
  }

  joinChat(sessionId: string) {
    this.socket.emit('join', { sessionId });
  }

  sendMessage(sessionId: string, sender: 'user' | 'agent', message: string) {
    this.socket.emit('sendMessage', { sessionId, sender, message });
  }

  onNewMessage(callback: (data: any) => void) {
    this.socket.on('newMessage', callback);
  }


  createChatSession(userId: string) {
    return this.http.post<ChatSession>(this.restBaseUrl, { userId });
  }

  getChatHistory(sessionId: string) {
    return this.http.get<ChatSession>(`${this.restBaseUrl}/${sessionId}`);
  }
}
