import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClaimService} from "../../../../core/services/claim.service";
import {Claim} from "../../../../shared/models/claim";
import {Table, TableModule} from "primeng/table";
import {Button, ButtonDirective} from "primeng/button";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {CommonModule} from "@angular/common";
import {Tag} from "primeng/tag";
import {Transaction} from "../../../../shared/models/transaction";
import {ClaimDetailsComponent} from "../claim-details/claim-details.component";

@Component({
  selector: 'app-list-claim',
  standalone: true,
  imports: [
    TableModule,
    Button,
    IconField,
    InputIcon,
    InputText,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    Tag,
    ButtonDirective,
    ClaimDetailsComponent
  ],
  templateUrl: './list-claim.component.html',
  styleUrl: './list-claim.component.css'
})
export class ListClaimComponent implements OnInit {
  claims : Claim[]=[]
  selectedClaim : any;
  searchValue: string = '';  // Valeur de la recherche

  //view claim
  showDetailsPopup : boolean=false;
  selectedClaimDetails!:Claim;
  constructor(private claimService: ClaimService,) {
  }

  ngOnInit() {
    this.getMyClaim();
  }


  getMyClaim(): void {
    this.claimService.getClaimForCurrentUser().subscribe((data)=>
    { this.claims =data})
  }

  viewDetails(id: number) {
    this.claimService.getClaimById(id).subscribe({
      next: (data) => {
        this.selectedClaimDetails = data;
        this.showDetailsPopup = true;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des détails", err);
      }
    });
  }

  deleteClaim(transaction: Transaction) {
    console.log('Supprimer :', transaction);

  }
  clear(dt: Table) {
    this.searchValue = '';  // Réinitialiser la valeur de recherche
    dt.clear();  // Réinitialise tous les filtres
  }

  /******tag******////
  getSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined {

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

  getIcon(status: string): string {

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
  /******tag******////

}
