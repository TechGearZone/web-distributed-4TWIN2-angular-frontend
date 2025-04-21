import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.css']
})
export class LiveChatComponent implements OnInit {
  isOpen = false;
  message = '';
  messages: { sender: string, message: string }[] = [];
  sessionId = 'abc123'; // This should be dynamic based on user

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.joinChat(this.sessionId);

    this.chatService.onNewMessage((data) => {
      this.messages.push(data);
    });
  }

  sendMessage(): void {
    if (this.message.trim()) {
      this.chatService.sendMessage(this.sessionId, 'user', this.message);
      this.messages.push({ sender: 'user', message: this.message });
      this.message = '';
    }
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
  }
}

