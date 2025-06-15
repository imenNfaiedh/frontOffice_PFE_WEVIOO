import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./shared/components/header/header.component";
import {SidebarComponent} from "./shared/components/sidebar/sidebar.component";
import {CommonModule} from "@angular/common";
import {Toast, ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {Button, ButtonModule} from "primeng/button";
import {Ripple} from "primeng/ripple";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    HeaderComponent,
    SidebarComponent, CommonModule, Button, Toast,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontOffice_pfeV1';
  constructor(private messageService: MessageService) {}

  show() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
  }

}
