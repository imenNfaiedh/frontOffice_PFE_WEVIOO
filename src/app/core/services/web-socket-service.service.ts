import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';

import { Subject } from 'rxjs';
import {Client, IMessage, Stomp} from "@stomp/stompjs";

@Injectable({
  providedIn: 'root'
})
export class WebSocketServiceService {
  private stompClient!: Client;
  private fraudAlertSubject = new Subject<any>();

  public fraudAlerts$ = this.fraudAlertSubject.asObservable();

  constructor() {
    this.connect();
  }

  connect() {
    const socket = new SockJS('http://localhost:8099/ws'); // même URL que ton endpoint WebSocket côté backend
    this.stompClient = Stomp.over(socket);
    this.stompClient.reconnectDelay = 5000;

    this.stompClient.onConnect = () => {
      console.log(' WebSocket connecté');

      this.stompClient.subscribe('/topic/fraud-alerts', (message: IMessage) => {
        const data = JSON.parse(message.body);
        console.log(' Alerte de fraude reçue :', data);
        this.fraudAlertSubject.next(data);
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error(' Erreur STOMP', frame.headers['message']);
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
