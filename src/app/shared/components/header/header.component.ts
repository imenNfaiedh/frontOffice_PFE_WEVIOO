import {
  Component, HostListener, Input, OnDestroy, OnInit
} from '@angular/core';
import { Toolbar } from "primeng/toolbar";
import { AvatarModule } from "primeng/avatar";
import { ButtonModule } from "primeng/button";
import { InputIcon } from "primeng/inputicon";
import { IconField } from "primeng/iconfield";
import { InputTextModule } from "primeng/inputtext";
import { WebSocketServiceService } from "../../../core/services/web-socket-service.service";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";
import { BadgeDirective } from "primeng/badge";
import { ScreenConfig } from "../../../core/utils/type";
import { APP_CONSTANTS } from "../../../core/utils/constants";
import { animate, style, transition, trigger } from "@angular/animations";
import { ReclamationWebSocketService } from "../../../core/services/reclamation-web-socket.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    Toolbar, AvatarModule, ButtonModule,
    InputTextModule, IconField, InputIcon,
    CommonModule, BadgeDirective
  ],
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
export class HeaderComponent implements OnInit, OnDestroy {
  notifications: any[] = [];
  showDropdown = false;
  subscription!: Subscription;
  reclamationSubscription!: Subscription;
  unreadCount: number = 0;

  protected readonly APP_CONSTANTS = APP_CONSTANTS;

  private readonly SCREEN_BREAKPOINTS: ScreenConfig[] = [
    { width: 768, class: 'header-trimmed' },
    { width: 0, class: 'header-md-screen' },
  ];

  @Input() collapsed: boolean = false;
  @Input() screenWidth: number = 0;

  firstName: string = '';
  lastName: string = '';
  role: string = '';
  constructor(
    private webSocketService: WebSocketServiceService,
    private reclamationService: ReclamationWebSocketService,
    private authService: AuthService, private router: Router
  ) {}

  ngOnInit() {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      this.notifications = JSON.parse(savedNotifications);
    }

    this.updateUnreadCount();

    this.subscription = this.webSocketService.fraudAlerts$.subscribe(alert => {
      const notif = { ...alert, type: 'fraude', isRead: false };
      this.notifications.unshift(notif);
      this.notifications = this.notifications.slice(0, 3);
      localStorage.setItem('notifications', JSON.stringify(this.notifications));
      this.updateUnreadCount();
    });

    this.reclamationSubscription = this.reclamationService.reclamations$.subscribe(notification => {
      this.notifications.unshift(notification);
      this.notifications = this.notifications.slice(0, 3);
      localStorage.setItem('notifications', JSON.stringify(this.notifications));
      this.updateUnreadCount();
    });

    // 💡 Récupération des infos utilisateur connecté
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.role = user.role || 'utilisateur'; // ou 'userRole', selon ta structure
      },
      error: (err) => {
        console.error('Erreur récupération utilisateur :', err);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.reclamationSubscription) this.reclamationSubscription.unsubscribe();
  }

  toggleDropdown(event?: MouseEvent) {
    if (event) event.stopPropagation();
    this.showDropdown = !this.showDropdown;

    if (this.showDropdown) {
      this.notifications.forEach(n => n.isRead = true);
      localStorage.setItem('notifications', JSON.stringify(this.notifications));
      this.updateUnreadCount();
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.notification-popup') && !target.closest('.notification-wrapper')) {
      this.showDropdown = false;
    }
  }

  markAsRead(index: number): void {
    this.notifications[index].isRead = true;
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
    this.updateUnreadCount();
  }

  updateUnreadCount() {
    this.unreadCount = this.notifications.filter(n => !n.isRead).length;
  }

  getBodyClass(): string {
    if (!this.collapsed) return '';
    const config = this.SCREEN_BREAKPOINTS.find(config => this.screenWidth > config.width);
    return config?.class || '';
  }


  //logout
  showUserMenu = false;

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  logout() {
    this.authService.logout();
    // redirection manuelle
    this.router.navigate(['/auth/login']);
  }
  getDisplayRole(): string {
    switch (this.role) {
      case 'ADMIN':
        return 'administrateur';
      case 'CUSTOMER':
        return 'client';
      default:
        return this.role.toLowerCase(); // ou une valeur par défaut comme 'utilisateur'
    }
  }
}
