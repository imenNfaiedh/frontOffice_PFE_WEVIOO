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

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Toolbar, AvatarModule, ButtonModule, InputTextModule, IconField, InputIcon, CommonModule, BadgeDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy  {
  notifications: any[] = [];
  showDropdown = false;
  subscription!: Subscription;
  protected readonly APP_CONSTANTS = APP_CONSTANTS;
  private readonly SCREEN_BREAKPOINTS: ScreenConfig[] = [
    { width: 768, class: 'header-trimmed' },
    { width: 0, class: 'header-md-screen' },
  ];
  @Input() collapsed: boolean = false;
  @Input() screenWidth: number = 0;


  constructor(private webSocketService: WebSocketServiceService) {
  }

  getBodyClass(): string {
    if (!this.collapsed) return '';

    const config = this.SCREEN_BREAKPOINTS.find(
      (config) => this.screenWidth > config.width,
    );

    return config?.class || '';
  }

  ngOnInit() {
    this.subscription = this.webSocketService.fraudAlerts$.subscribe(alert => {
      this.notifications.unshift(alert);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // On se désabonne proprement
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;

  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Vérifie que le clic est en dehors de l'icône de notification ou du dropdown
    if (!target.closest('.notification-dropdown') && !target.closest('.bell-wrapper')) {
      this.showDropdown = false;
    }
  }
}
