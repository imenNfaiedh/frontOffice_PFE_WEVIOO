import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { TransactionService } from "../../../core/services/transaction.service";
import { CommonModule } from "@angular/common";
import { Table, TableModule } from "primeng/table";
import { Transaction } from "../../../shared/models/transaction";
import { IconField } from "primeng/iconfield";
import { InputIcon } from "primeng/inputicon";
import { FormsModule } from "@angular/forms";
import { Button } from "primeng/button";
import { InputText } from "primeng/inputtext";
import {PopupComponent} from "../../../shared/popup/popup.component";
import {AddTransactionComponent} from "../add-transaction/add-transaction.component";
import {StyleClassModule} from "primeng/styleclass";

@Component({
  selector: 'app-list-transaction',
  standalone: true,
  imports: [TableModule, CommonModule, IconField, InputIcon, FormsModule, Button, InputText
  , PopupComponent, AddTransactionComponent,StyleClassModule],
  templateUrl: './list-transaction.component.html',
  styleUrls: ['./list-transaction.component.css'],

})
export class ListTransactionComponent implements OnInit {
  transactions: Transaction[] = [];
  selectedTransaction: any;
  searchValue: string = '';  // Valeur de la recherche
  @ViewChild('dt') table!: Table; // Référence au tableau PrimeNG

  isModelOpen = false;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.getAllTransaction();
  }

  getAllTransaction(): void {
    this.transactionService.getAllTransaction().subscribe((data) => {
      this.transactions = data;
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

}
