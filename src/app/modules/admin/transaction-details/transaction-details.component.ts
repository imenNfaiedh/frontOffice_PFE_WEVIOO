import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Transaction} from "../../../shared/models/transaction";
import {CommonModule} from "@angular/common";
import {Tag} from "primeng/tag";

@Component({
  selector: 'app-transaction-details',
  standalone: true,
  imports: [CommonModule, Tag],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.css'
})
export class TransactionDetailsComponent {

  @Input() transaction!: Transaction; //  Propriété pour recevoir les données
  @Output() close = new EventEmitter<void>();

  closePopup() {
    this.close.emit();
  }

  /******tag******////
  getSeverity(status?: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined {

    switch (status) {
      case 'VALID':
        return 'success';

      case 'SUSPICIOUS':
        return 'warn';

      case 'BLOCKED':
        return 'danger';

      default:
        return undefined;

    }
  }

  getIcon(status?: string): string {

    switch (status) {
      case 'VALID':
        return 'pi pi-check';
      case 'SUSPICIOUS':
        return 'pi pi-exclamation-triangle';
      case 'BLOCKED':
        return 'pi pi-ban';
      default:
        return '';
    }}

  formatStatus(status?: string): string {
    switch (status) {
      case 'VALID':
        return 'Validée';
      case 'SUSPICIOUS':
        return ' Suspecte';
      case 'BLOCKED':
        return 'Bloquée';

      default:
        return 'Inconnu';
    }
  }
  /******tag******////


}


