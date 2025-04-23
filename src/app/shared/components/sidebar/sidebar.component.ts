import {Component, ViewChild} from '@angular/core';
import {Drawer, DrawerModule} from "primeng/drawer";
import {ButtonModule} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {AvatarModule} from "primeng/avatar";
import {StyleClass} from "primeng/styleclass";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [DrawerModule, ButtonModule, Ripple, AvatarModule, StyleClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @ViewChild('drawerRef') drawerRef!: Drawer;

  visible = false;




}
