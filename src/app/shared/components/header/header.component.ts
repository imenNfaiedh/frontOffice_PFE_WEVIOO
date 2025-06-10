import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {Toolbar} from "primeng/toolbar";
import {AvatarModule} from "primeng/avatar";
import {ButtonModule} from "primeng/button";
import {InputIcon} from "primeng/inputicon";
import {IconField} from "primeng/iconfield";
import {InputTextModule} from "primeng/inputtext";
import {WebSocketServiceService} from "../../../core/services/web-socket-service.service";
import {CommonModule} from "@angular/common";
import {Subscription} from "rxjs";
import {BadgeDirective} from "primeng/badge";
import {ScreenConfig} from "../../../core/utils/type";
import {APP_CONSTANTS} from "../../../core/utils/constants";

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {animate, style, transition, trigger} from "@angular/animations";
import {ReclamationWebSocketService} from "../../../core/services/reclamation-web-socket.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Toolbar, AvatarModule, ButtonModule,
    InputTextModule, IconField, InputIcon,
    CommonModule, BadgeDirective,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [
    trigger('dropdownAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' })),
      ]),
    ]),
  ]
})
export class HeaderComponent implements OnInit ,OnDestroy {
  notifications: any[] = [];           // Liste des notifications reçues
  showDropdown = false;               // Affiche ou non le menu déroulant
  subscription!: Subscription;        // Pour gérer l’abonnement WebSocket
  unreadCount: number = 0;           // Nombre de notifications non lues
  reclamationSubscription!: Subscription;  // Abonnement pour les réclamations


  //open and close navbar : Gestion du responsive
  protected readonly APP_CONSTANTS = APP_CONSTANTS;

  private readonly SCREEN_BREAKPOINTS: ScreenConfig[] = [
    { width: 768, class: 'header-trimmed' },
    { width: 0, class: 'header-md-screen' },
  ];


  @Input() collapsed: boolean = false;  // Navigation repliée
  @Input() screenWidth: number = 0;     // Largeur de l'écran
  //open and close navbar

  constructor(private webSocketService: WebSocketServiceService,
              private reclamationService: ReclamationWebSocketService) {
  }

  //open and close navbar
  getBodyClass(): string {
    if (!this.collapsed) return '';
    const config = this.SCREEN_BREAKPOINTS.find(
      (config) => this.screenWidth > config.width,
    );
    return config?.class || '';
  }

  ngOnInit() {
    // Récupérer les notifications sauvegardées localement
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      this.notifications = JSON.parse(savedNotifications);
      this.updateUnreadCount();

      // Abonnement aux réclamations traitées
      this.reclamationSubscription = this.reclamationService.reclamations$.subscribe(reclamation => {
        const notification = {
          title: 'Réclamation traitée',
          message: `Votre réclamation #${reclamation.id} a été traitée.`,
          isRead: false,
          timestamp: new Date().toISOString()
        };
        this.notifications.unshift(notification);

        // Ne garder que les 3 dernières notifications
        if (this.notifications.length > 3) {
          this.notifications = this.notifications.slice(0, 3);
        }

        localStorage.setItem('notifications', JSON.stringify(this.notifications));
        this.updateUnreadCount();
      });
    }

    this.updateUnreadCount(); // Met à jour le badge

    // Écoute des nouvelles alertes depuis le WebSocket
    this.subscription = this.webSocketService.fraudAlerts$.subscribe(alert => {
      alert.isRead = false; // Nouvelle notification non lue
      this.notifications.unshift(alert); // Ajout en haut de la liste

      // Garde seulement les 3 dernières
      if (this.notifications.length > 3) {
        this.notifications = this.notifications.slice(0, 3);
      }

      localStorage.setItem('notifications', JSON.stringify(this.notifications));
      this.updateUnreadCount();
    });
  }


 //Se désabonne du WebSocket à la destruction du composant
  ngOnDestroy() {
    this.subscription.unsubscribe(); // On se désabonne proprement
  }

  //ouvrir ou fermer le menu déroulant (dropdown) des notifications.
  toggleDropdown(event?: MouseEvent) {
    if (event) {
      event.stopPropagation(); // éviter que le clic se propage
    }

    this.showDropdown = !this.showDropdown;

    if (this.showDropdown) {
      // Quand on ouvre le menu, on marque toutes les notifications comme lues
      this.notifications.forEach(notification => {
        notification.isRead = true;
      });

      // Sauvegarder les notifications dans le localStorage
      localStorage.setItem('notifications', JSON.stringify(this.notifications));

      // Mettre à jour le compteur des notifications non lues
      this.updateUnreadCount();
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Vérifie que le clic est en dehors de l'icône de notification ou du dropdown
    if (!target.closest('.notification-popup') && !target.closest('.notification-wrapper')) {
      this.showDropdown = false;
    }
  }

  markAsRead(index: number): void {
    // Marquer la notification comme lue
    this.notifications[index].isRead = true;
    console.log("Updated notification:", this.notifications[index]);

    // Sauvegarder les notifications dans localStorage
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
  // Mettre à jour l'affichage des notifications non lues
    this.updateUnreadCount();


}
  updateUnreadCount() {
    this.unreadCount = this.notifications.filter(n => !n.isRead).length;
  }




}
