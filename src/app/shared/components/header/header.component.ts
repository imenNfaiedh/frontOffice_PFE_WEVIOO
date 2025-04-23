import { Component } from '@angular/core';
import {Toolbar} from "primeng/toolbar";
import {AvatarModule} from "primeng/avatar";
import {ButtonModule} from "primeng/button";
import {InputIcon} from "primeng/inputicon";
import {IconField} from "primeng/iconfield";
import {InputTextModule} from "primeng/inputtext";
import {WebSocketServiceService} from "../../../core/services/web-socket-service.service";
import {CommonModule} from "@angular/common";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Toolbar, AvatarModule, ButtonModule, InputTextModule, IconField, InputIcon,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  notifications: any[] = [];
  showDropdown = false;

  constructor(private webSocketService: WebSocketServiceService) {
  }

  ngOnInit() {
    this.webSocketService.fraudAlerts$.subscribe(alert => {
      this.notifications.unshift(alert);
    });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
