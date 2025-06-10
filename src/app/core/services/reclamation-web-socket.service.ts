import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';

import { Subject } from 'rxjs';
import {Client, IMessage, Stomp} from "@stomp/stompjs";

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
    const socket = new SockJS('http://localhost:8085/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.reconnectDelay = 5000;

    this.stompClient.onConnect = () => {
      console.log(' WebSocket réclamation connecté');
      this.stompClient.subscribe('/topic/reclamations', (message: IMessage) => {
        const data = JSON.parse(message.body);
        console.log(' Réclamation reçue :', data);
        this.reclamationSubject.next(data);
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Erreur STOMP Reclamation', frame.headers['message']);
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
