import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BankAccount } from '../../../../shared/models/bankAccount';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Tag} from "primeng/tag";
import { FormatAccountNumberPipe } from "../../../../shared/pipe/format-account-number.pipe";


@Component({
  selector: 'app-view-account',
  standalone: true,
  imports: [FormsModule, CommonModule,
    Tag, FormatAccountNumberPipe],
  templateUrl: './view-account.component.html',
  styleUrl: './view-account.component.css'
})
export class ViewAccountComponent {

  @Input() account!: BankAccount; // Propriété pour recevoir les données du compte 
  @Output() close = new EventEmitter<void>();
  
    closePopup() {
      this.close.emit();
    }

    ///tag////

    // Pour les comptes bancaires
  formatAccountStatus(isBlocked?: boolean): string {
    return isBlocked ? 'Bloqué' : 'Actif';
  }

  getAccountSeverity(isBlocked?: boolean): 'success' | 'danger' {
    return isBlocked ? 'danger' : 'success';
  }

  getAccountIcon(isBlocked?: boolean): string {
    return isBlocked ? 'pi pi-ban' : 'pi pi-check';


  }
  getTypeBankAccountLabel(type?: string): string {
  switch (type) {
    case 'COURANT': return 'Courant';
    case 'EPARGNE': return 'Épargne';
    case 'JOIN': return 'Joint';
    case 'DEVISE': return 'Devise';
    default: return type ?? '';
  }
}

getTypeBankAccountSeverity(type?: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined {
  switch (type) {
    case 'COURANT': return 'info';
    case 'EPARGNE': return 'success';
    case 'JOIN': return 'warn';
    case 'DEVISE': return 'danger';
    default: return 'secondary';
  }
}
    /////tag////

}
