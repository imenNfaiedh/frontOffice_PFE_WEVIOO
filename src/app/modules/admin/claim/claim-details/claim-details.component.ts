import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {Claim} from "../../../../shared/models/claim";
import {Tag} from "primeng/tag";

@Component({
  selector: 'app-claim-details',
  standalone: true,
  imports: [
    NgIf,
    DatePipe,
    Tag
  ],
  templateUrl: './claim-details.component.html',
  styleUrl: './claim-details.component.css'
})
export class ClaimDetailsComponent {
@Input() claim!: Claim;
@Output() close = new EventEmitter<void>();


closePopup(){
  this.close.emit()
 }

  /******tag******////
  getSeverity(status?: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined {

    switch (status) {
      case 'TRAITEE':
        return 'success';

      case 'EN_ATTENTE':
        return 'warn';

      default:
        return undefined;

    }
  }

  getIcon(status?: string): string {

    switch (status) {
      case 'TRAITEE':
        return 'pi pi-check';
      case 'EN_ATTENTE':
        return 'pi pi-exclamation-triangle';

      default:
        return '';
    }}

  formatStatus(status?: string): string {
    switch (status) {
      case 'TRAITEE':
        return 'Traitée';
      case 'EN_ATTENTE':
        return 'En attente';
      default:
        return 'Inconnu';
    }
  }
  /******tag******////
}
