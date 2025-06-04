import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {Claim} from "../../../../shared/models/claim";

@Component({
  selector: 'app-claim-details',
  standalone: true,
  imports: [
    NgIf,
    DatePipe
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
}
