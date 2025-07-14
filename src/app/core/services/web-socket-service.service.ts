import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';

import { Subject } from 'rxjs';
import {Client, IMessage, Stomp} from "@stomp/stompjs";

@Injectable({
  providedIn: 'root'
})
export class WebSocketServiceService {
  private stompClient!: Client;
  //émettra les alertes de fraude dès qu’on les reçoit
  private fraudAlertSubject = new Subject<any>();
  public fraudAlerts$ = this.fraudAlertSubject.asObservable();

  constructor() {
    this.connect();
  }

  connect() {
    const socket = new SockJS('http://localhost:8099/ws');
    this.stompClient = Stomp.over(socket);

    // Active le délai de reconnexion automatique
    this.stompClient.reconnectDelay = 5000;

    // Heartbeats pour éviter la coupure de connexion pour inactivité
    this.stompClient.heartbeatIncoming = 10000; // attend un heartbeat toutes les 10s
    this.stompClient.heartbeatOutgoing = 10000; // envoie un heartbeat toutes les 10s

    // Callback quand la connexion est établie
    this.stompClient.onConnect = () => {
      console.log('✅ WebSocket connecté');

      this.stompClient.subscribe('/topic/fraud-alerts', (message: IMessage) => {
        const data = JSON.parse(message.body);
        console.log('📩 Alerte de fraude reçue :', data);
        this.fraudAlertSubject.next(data);
      });
    };

    // Callback quand une erreur STOMP survient
    this.stompClient.onStompError = (frame) => {
      console.error('❌ Erreur STOMP', frame.headers['message']);
      console.error('Cause:', frame.body);
    };

    // Callback si le WebSocket est fermé
    this.stompClient.onWebSocketClose = () => {
      console.warn('⚠️ WebSocket fermé, tentative de reconnexion automatique...');
      // STOMP se reconnectera automatiquement grâce à `reconnectDelay`
    };

    // N'oublie pas d'activer le client STOMP !
    this.stompClient.activate();
  }

  /* connect() {
     const socket = new SockJS('http://localhost:8099/ws');
     this.stompClient = Stomp.over(socket);
     this.stompClient.reconnectDelay = 5000;

     this.stompClient.onConnect = () => {
       console.log(' WebSocket connecté');
      // s’abonne au canal /topic/fraud-alerts.
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

    // this.stompClient.activate();
   }*/

  disconnect() {
    if (this.stompClient && this.stompClient.active) {
      this.stompClient.deactivate();
    }
  }
}
