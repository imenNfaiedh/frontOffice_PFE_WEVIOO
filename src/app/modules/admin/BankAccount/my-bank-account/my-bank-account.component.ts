import {Component, OnInit} from '@angular/core';
import {BankAccount} from "../../../../shared/models/bankAccount";
import {BankAccountService} from "../../../../core/services/bank-account.service";
import { CardModule } from 'primeng/card';
import {CommonModule, DatePipe} from "@angular/common";
import {FormatAccountNumberPipe} from "../../../../shared/pipe/format-account-number.pipe";
import {TransactionService} from "../../../../core/services/transaction.service";
import {Transaction} from "../../../../shared/models/transaction";
import {Tag} from "primeng/tag";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Button, ButtonModule} from "primeng/button";
import {InputText} from "primeng/inputtext";
import {PopupComponent} from "../../../../shared/popup/popup.component";
import {AddTransactionComponent} from "../../add-transaction/add-transaction.component";
import {StyleClassModule} from "primeng/styleclass";
import {SplitButtonModule} from "primeng/splitbutton";
import {TransactionDetailsComponent} from "../../transaction-details/transaction-details.component";
import {Table, TableModule} from "primeng/table";


@Component({
  selector: 'app-my-bank-account',
  standalone: true,
  imports: [CardModule, DatePipe, CommonModule, FormatAccountNumberPipe, Tag,
    IconField, InputIcon,FormsModule,

    StyleClassModule,
    SplitButtonModule, ButtonModule, TransactionDetailsComponent, InputText, ReactiveFormsModule, TableModule,],
  templateUrl: './my-bank-account.component.html',
  styleUrl: './my-bank-account.component.css'
})
export class MyBankAccountComponent implements OnInit{

  accounts : BankAccount[] =[]
  loading : boolean = false
  recentTransactions: Transaction[] = [];
  transactions: Transaction[] = [];



  constructor(private bankAccountService: BankAccountService,
              private  transactionService : TransactionService) {}

  ngOnInit(): void {
    this.loading = true;
    this.loadTransactions();
    this.bankAccountService.getMyAccount().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading accounts', err);
        this.loading = false;
      }
    });
  }

  loadTransactions(): void {
    this.transactionService.getMyTransaction().subscribe((data: Transaction[]) => {
      this.transactions = data;


      this.recentTransactions = [...this.transactions]
        .filter(tx => tx.transactionDate) // Évite les undefined
        .sort((a, b) =>
          new Date(b.transactionDate as string | Date).getTime() -
          new Date(a.transactionDate as string | Date).getTime()
        )
        .slice(0, 4);
    });
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

