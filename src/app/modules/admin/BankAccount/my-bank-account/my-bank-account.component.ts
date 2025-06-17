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
import {MessageService} from "primeng/api";
import {ClaimService} from "../../../../core/services/claim.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../core/services/auth.service";
import { CarouselModule } from 'primeng/carousel';
import { ViewAccountComponent } from "../view-account/view-account.component";
import Swal from 'sweetalert2';
import {CapitalizePipe} from "../../../../shared/pipe/capitalize.pipe";


@Component({
  selector: 'app-my-bank-account',
  standalone: true,
  imports: [CardModule, DatePipe, CommonModule, FormatAccountNumberPipe, Tag,
    IconField, InputIcon, FormsModule, CarouselModule,
    StyleClassModule,
    SplitButtonModule, ButtonModule, InputText, ReactiveFormsModule, TableModule, ViewAccountComponent, CapitalizePipe],
  templateUrl: './my-bank-account.component.html',
  styleUrl: './my-bank-account.component.css'
})
export class MyBankAccountComponent implements OnInit{

  accounts : BankAccount[] =[]
  selectedAccount : any;
  searchValue: string = '';  // Valeur de la recherche
  loading : boolean = false
  recentTransactions: Transaction[] = [];
  transactions: Transaction[] = [];

  //view account
  showDetailAccount: boolean = false;
  selectedAccountForDetail: BankAccount | null = null;




  constructor(private bankAccountService: BankAccountService,
              private  transactionService : TransactionService,
              public authService: AuthService,
              private router: Router,
            ) {}

  ngOnInit(): void {
    const roles = this.authService.getRoleFromToken();

    if (roles?.includes('CUSTOMER')) {
      this.loadCustomerAccounts();
    } else if (roles?.includes('ADMIN') || roles?.includes('BANKER')) {
      this.getAllAccount();
    }
  }

  loadCustomerAccounts(): void {
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
  getAllAccount(): void {
    this.bankAccountService.getAllAccount().subscribe((data: BankAccount[])=>
    this.accounts=data)
  }
  // les 4 dernier transactions
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
  viewDetails(id: number) {
    this.bankAccountService.getAccountById(id).subscribe({
      next: (data) => {
        this.selectedAccountForDetail = data;
        this.showDetailAccount = true;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des détails", err);
      }
    });
  }



  openReclamation(): void {
    this.router.navigate(['/admin/list-reclamation']);
  }
  clear(dt: Table) {
    this.searchValue = '';  // Réinitialiser la valeur de recherche
    dt.clear();  // Réinitialise tous les filtres
  }

  //bloque débloque un compte bancaire
  toggleBlock(account: BankAccount) {
  if (account.bankAccountId == null) {
    console.error('ID du compte bancaire manquant');
    return;
  }
  this.bankAccountService.toggleBlockStatus(account.bankAccountId).subscribe({
    next: (msg) => {
      account.isBlocked = !account.isBlocked; // Met à jour l’état local
    },
    error: (err) => {
      console.error('Erreur lors du changement de statut', err);
    }
  });
}

  /******tag******////
  // Pour les comptes bancaires
  formatAccountStatus(isBlocked?: boolean): string {
    return isBlocked ? 'Bloqué' : 'Actif';
  }

  getAccountSeverity(isBlocked?: boolean): 'success' | 'danger' {
    return isBlocked ? 'danger' : 'success';
  }

  getAccountIcon(isBlocked?: boolean): string {
    return isBlocked ? 'pi pi-ban' : 'pi pi-check';
  }

// Pour les transactions
  formatStatus(status?: string): string {
    switch (status) {
      case 'VALID': return 'Validée';
      case 'SUSPICIOUS': return 'Suspecte';
      case 'BLOCKED': return 'Bloquée';
      default: return 'Inconnu';
    }
  }

  getSeverity(status?: string): 'success' | 'info' | 'warn' | 'danger' | undefined {
    switch (status) {
      case 'VALID': return 'success';
      case 'SUSPICIOUS': return 'warn';
      case 'BLOCKED': return 'danger';
      default: return undefined;
    }
  }

  getIcon(status?: string): string {
    switch (status) {
      case 'VALID': return 'pi pi-check';
      case 'SUSPICIOUS': return 'pi pi-exclamation-triangle';
      case 'BLOCKED': return 'pi pi-ban';
      default: return '';
    }
  }
  /******tag******////

  ///tag pour typ compte bancaire///

  getTypeBankAccountLabel(type?: string): string {
  switch (type) {
    case 'COURANT': return 'Courant';
    case 'EPARGNE': return 'Épargne';
    case 'JOIN': return 'Joint';
    case 'DEVISE': return 'Devise';
    default: return type ?? '';
  }
}

getTypeBankAccountSeverity(type?: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined {
  switch (type) {
    case 'COURANT': return 'info';
    case 'EPARGNE': return 'success';
    case 'JOIN': return 'warn';
    case 'DEVISE': return 'danger';
    default: return 'secondary';
  }
}
}

