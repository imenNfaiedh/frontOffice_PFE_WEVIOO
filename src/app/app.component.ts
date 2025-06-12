import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./shared/components/header/header.component";
import {SidebarComponent} from "./shared/components/sidebar/sidebar.component";
import {CommonModule} from "@angular/common";
import {Toast, ToastModule} from "primeng/toast";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    HeaderComponent,
    SidebarComponent, CommonModule, ToastModule,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontOffice_pfeV1';
}
