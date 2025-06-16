import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Claim} from "../../../../shared/models/claim";
import {User} from "../../../../shared/models/user";
import {DatePipe} from "@angular/common";
import {Tag} from "primeng/tag";

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    DatePipe,
    Tag
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  @Input() user!: User;
  @Output() close = new EventEmitter<void>();

  closePopup(){
    this.close.emit()
  }

  /******tag******////
  getSeverity(status?: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined {

    switch (status) {
      case 'ADMIN':
        return 'info';

      case 'BANKER':
        return 'info';

      case 'CUSTOMER':
        return 'warn';

      default:
        return undefined;

    }
  }



  formatStatus(status?: string): string {
    switch (status) {
      case 'ADMIN':
        return 'Admin';
      case 'BANKER':
        return ' Banquier';
      case 'CUSTOMER':
        return 'Client';

      default:
        return 'Inconnu';
    }
  }
  /******tag******////

}
