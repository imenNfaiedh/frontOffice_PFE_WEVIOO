import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Transaction} from "../../../shared/models/transaction";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-transaction-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.css'
})
export class TransactionDetailsComponent {

  @Input() transaction!: Transaction; //  Propriété pour recevoir les données
  @Output() close = new EventEmitter<void>();

  closePopup() {
    this.close.emit();
  }
}


