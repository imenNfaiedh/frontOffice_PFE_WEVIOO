import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { Subject } from 'rxjs';
import { Client, IMessage, Stomp } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationWebSocketService {
  private stompClient!: Client;
  private reclamationSubject = new Subject<any>();
  public reclamations$ = this.reclamationSubject.asObservable();

  constructor() {
    this.connect();
  }

  connect() {
    const socket = new SockJS('http://localhost:8099/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.reconnectDelay = 5000;

    this.stompClient.onConnect = () => {
      console.log('✅ WebSocket réclamation connecté');

      this.stompClient.subscribe('/topic/claim-response', (message: IMessage) => {
        const data = JSON.parse(message.body);
        const notification = {
          type: 'reclamation',
          message: `Votre réclamation #${data.id} a été traitée.`,
          isRead: false,
          timestamp: new Date().toISOString()
        };
        console.log('📩 Notification réclamation reçue :', notification);
        this.reclamationSubject.next(notification);
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('❌ Erreur STOMP Reclamation', frame.headers['message']);
      console.error('Cause:', frame.body);
    };

    this.stompClient.activate();
  }

  disconnect() {
    if (this.stompClient && this.stompClient.active) {
      this.stompClient.deactivate();
    }
  }
}
