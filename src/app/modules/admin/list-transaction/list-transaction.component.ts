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

@Component({
  selector: 'app-list-transaction',
  standalone: true,
  imports: [TableModule, CommonModule, IconField, InputIcon, FormsModule, Button, InputText],
  templateUrl: './list-transaction.component.html',
  styleUrls: ['./list-transaction.component.css'],

})
export class ListTransactionComponent implements OnInit {
  transactions: Transaction[] = [];
  selectedTransaction!: Transaction;
  searchValue: string = '';  // Valeur de la recherche
  @ViewChild('dt') table!: Table; // Référence au tableau PrimeNG

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
}
