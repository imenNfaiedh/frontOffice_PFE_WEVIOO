import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../shared/components/header/header.component";
import {SidebarComponent} from "../../shared/components/sidebar/sidebar.component";
import {SideNavToggle} from "../../core/utils/type";
import {BodyComponent} from "../../shared/components/body/body.component";
import { ToastModule } from 'primeng/toast';
import {RouterOutlet} from "@angular/router";
//import {ToastService} from "../../core/services/toast.service";

@Component({
  selector: 'app-admin-layout',
  standalone: true,
    imports: [
        HeaderComponent,
        SidebarComponent,

        BodyComponent,
        ToastModule,
        RouterOutlet
    ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit{
  title = 'sidenav';

  isSideNavCollapsed = false;
  screenWidth = 0;
  constructor( ) {}

  ngOnInit() {
    //this.toastService.showSuccess('Interface admin chargée');
    console.log("toast afficher ")
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
