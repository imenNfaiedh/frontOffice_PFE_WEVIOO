import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { TransactionService } from "../../../core/services/transaction.service";
import { CommonModule } from "@angular/common";
import { Table, TableModule } from "primeng/table";
import { Transaction } from "../../../shared/models/transaction";
import { IconField } from "primeng/iconfield";
import { InputIcon } from "primeng/inputicon";
import { FormsModule } from "@angular/forms";
import {Button, ButtonModule} from "primeng/button";
import { InputText } from "primeng/inputtext";
import {PopupComponent} from "../../../shared/popup/popup.component";
import {AddTransactionComponent} from "../add-transaction/add-transaction.component";
import {StyleClassModule} from "primeng/styleclass";
import {SplitButtonModule} from "primeng/splitbutton";
import {TransactionDetailsComponent} from "../transaction-details/transaction-details.component";
import {Tag} from "primeng/tag";
import Swal from "sweetalert2";
import { CapitalizePipe } from "../../../shared/pipe/capitalize.pipe";
import { AuthService } from '../../../core/services/auth.service';
 import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { saveAs } from 'file-saver';
import {Dialog} from "primeng/dialog";



@Component({
  selector: 'app-list-transaction',
  standalone: true,
  imports: [TableModule, CommonModule, IconField, InputIcon,
    FormsModule, Button, InputText, PopupComponent,
    AddTransactionComponent, StyleClassModule, ToastModule,
    SplitButtonModule, ButtonModule, TransactionDetailsComponent, Tag, CapitalizePipe,
    DropdownModule, Dialog
  ],
  templateUrl: './list-transaction.component.html',
  styleUrls: ['./list-transaction.component.css'],

})
export class ListTransactionComponent implements OnInit {
  transactions: Transaction[] = [];
  selectedTransaction: any;
  searchValue: string = '';  // Valeur de la recherche
  @ViewChild('dt') table!: Table; // Référence au tableau PrimeNG
  isModelOpen = false;

  //view transaction
  showDetailsPopup: boolean = false;
  selectedTransactionDetails!: Transaction;

  //export
  showMonthExportDialog = false;
  customMonth: any = null;

  constructor(private transactionService: TransactionService,
     public authService: AuthService,

  ) {}

  ngOnInit(): void {
    this.getAllTransaction();
  }



  getAllTransaction(): void {
    this.transactionService.getMyTransaction().subscribe((data) => {
      this.transactions = data;
      console.log("transaction By userr");
    });
  }

  clear(dt: Table) {
    this.searchValue = '';  // Réinitialiser la valeur de recherche
    dt.clear();  // Réinitialise tous les filtres
  }

  //ouvrir popup
  openModel() {
    this.isModelOpen = true;
  }
//fermer popup
  closeModel() {
    this.isModelOpen = false;
    this.getAllTransaction();
  }
  viewDetails(id: number) {
      this.transactionService.getTransactionById(id).subscribe({
        next: (data) => {
          this.selectedTransactionDetails = data;
          this.showDetailsPopup = true;
        },
        error: (err) => {
          console.error("Erreur lors du chargement des détails", err);
        }
      });
    }


  editTransaction(transaction: Transaction) {
    console.log('Modifier :', transaction);

  }

  deleteTransaction(id: number) {
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
        this.transactionService.deleteTransaction(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Supprimé !',
              text: 'La transaction a été supprimée avec succès.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
            });
            this.getAllTransaction(); // Recharge la liste
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

  /*****ex^port******/////
  months = [
    { label: 'Janvier', value: 1 },
    { label: 'Février', value: 2 },
    { label: 'Mars', value: 3 },
    { label: 'Avril', value: 4 },
    { label: 'Mai', value: 5 },
    { label: 'Juin', value: 6 },
    { label: 'Juillet', value: 7 },
    { label: 'Août', value: 8 },
    { label: 'Septembre', value: 9 },
    { label: 'Octobre', value: 10 },
    { label: 'Novembre', value: 11 },
    { label: 'Décembre', value: 12 }
  ];

  exportCSVByMonth() {
    const month = this.customMonth?.value;

    const filtered = this.transactions.filter(t => {
      if (!t.transactionDate) return false;
      const tMonth = new Date(t.transactionDate).getMonth() + 1;
      return tMonth === month;
    });

    if (!filtered.length) {
      alert('Aucune transaction pour ce mois.');
      return;
    }

    const header = ['Réf transaction', 'Montant', 'Devise', 'Pays', 'Date', 'Type', 'Statut'];

    const csv = [
      header.join(','),
      ...filtered.map(t =>
        [
          `#00TN${t.transactionId}`,
          t.amount,
          t.currency,
          t.country,
          t.transactionDate ? new Date(t.transactionDate).toLocaleDateString('fr-FR') : '',
          t.typeTransaction || '',
          t.transactionStatus || ''
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `transactions-mois-${month}.csv`);

    this.showMonthExportDialog = false;
  }
}
