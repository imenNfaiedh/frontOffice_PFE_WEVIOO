import {Component, OnInit, ViewChild} from '@angular/core';
import {NgIf} from "@angular/common";
import {AuthService} from "../../../../core/services/auth.service";
import {Table, TableModule} from "primeng/table";
import {User} from "../../../../shared/models/user";
import {Button, ButtonDirective} from "primeng/button";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Tag} from "primeng/tag";
import Swal from "sweetalert2";
import {UserService} from "../../../../core/services/user.service";
import {AddTransactionComponent} from "../../add-transaction/add-transaction.component";
import {PopupComponent} from "../../../../shared/popup/popup.component";
import {Router} from "@angular/router";
import {ClaimDetailsComponent} from "../../claim/claim-details/claim-details.component";
import {UserDetailsComponent} from "../user-details/user-details.component";

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [
    NgIf,
    TableModule,
    Button,
    IconField,
    InputIcon,
    InputText,
    ReactiveFormsModule,
    FormsModule,
    Tag,
    ButtonDirective,
    AddTransactionComponent,
    PopupComponent,
    ClaimDetailsComponent,
    UserDetailsComponent
  ],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent implements OnInit{
  users : User []=[];
  selectedUser: any;
  isModelOpen = false;
  searchValue: string = '';  // Valeur de la recherche
  @ViewChild('dt') table!: Table; // Référence au tableau PrimeNG

  //view user
  showDetailsPopup : boolean=false;
  selectedUserDetails!:User;
  constructor(public authService: AuthService,
              private  userService:UserService,
              private router : Router) {
  }

  ngOnInit(): void {
    this.getAllUser();
  }
  getAllUser(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
      console.log(" userr is heeere");
    });
  }

  clear(dt: Table) {
    this.searchValue = '';  // Réinitialiser la valeur de recherche
    dt.clear();  // Réinitialise tous les filtres
  }
  deleteUser(id: number) {
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
        this.userService.deleteUser(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Supprimé !',
              text: 'La transaction a été supprimée avec succès.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
            });
            this.getAllUser(); // Recharge la liste
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
  viewDetails(id: number) {
    this.userService.getUserById(id).subscribe({
      next: (data) => {
        this.selectedUserDetails = data;
        this.showDetailsPopup = true;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des détails", err);
      }
    });
  }

  addUser(): void {
    this.router.navigate(['/admin/register']);
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
