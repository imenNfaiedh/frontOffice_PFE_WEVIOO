import { Component } from '@angular/core';
import {Toolbar} from "primeng/toolbar";
import {AvatarModule} from "primeng/avatar";
import {ButtonModule} from "primeng/button";
import {InputIcon} from "primeng/inputicon";
import {IconField} from "primeng/iconfield";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Toolbar, AvatarModule, ButtonModule, InputTextModule, IconField, InputIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
