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
import {AddTransactionComponent} from "../../add-transaction/add-transaction.component";
import {PopupComponent} from "../../../../shared/popup/popup.component";
import {AddClaimComponent} from "../add-claim/add-claim.component";
import Swal from 'sweetalert2';
import {AuthService} from "../../../../core/services/auth.service";
import {TraiterReclamationComponent} from "../traiter-reclamation/traiter-reclamation.component";


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
    ClaimDetailsComponent,
    AddTransactionComponent,
    PopupComponent,
    AddClaimComponent,
    TraiterReclamationComponent
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

  //add
  isModelOpen = false;

  isTreatMode = false;

  constructor(private claimService: ClaimService,
              public authService: AuthService) {
  }

  ngOnInit() {
    const roles = this.authService.getRoleFromToken();

    if (roles?.includes('CUSTOMER')) {
      this.getMyClaim();
    } else if (roles?.includes('ADMIN') || roles?.includes('BANKER')) {
      this.getPendingClaim();
    }
  }

  getMyClaim(): void {
    this.claimService.getClaimForCurrentUser().subscribe((data)=>
    { this.claims =data})
  }

  getPendingClaim(): void{
    this.claimService.getPendingClaim().subscribe((data)=>
    {this.claims=data})
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

  openModel() {
    this.isModelOpen = true;
  }
//fermer popup
  closeModel() {
    this.isModelOpen = false;

  }

  deleteClaim(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.claimService.deleteClaim(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Supprimé !',
              text: 'La réclamation a été supprimée avec succès.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
            });
            this.getMyClaim(); // Recharge la liste
          },
          error: (err) => {
            Swal.fire({
              title: 'Erreur !',
              text: "Une erreur s'est produite lors de la suppression.",
              icon: 'error',
            });
          },
        });
      }
    });
  }

  editClaim(id: number) {
    this.selectedClaim = id;
    this.isTreatMode = true;
    this.isModelOpen = true;
  }
  clear(dt: Table) {
    this.searchValue = '';  // Réinitialiser la valeur de recherche
    dt.clear();  // Réinitialise tous les filtres
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
