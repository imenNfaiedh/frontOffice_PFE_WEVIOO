import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {CardModule} from "primeng/card";
import {CommonModule} from "@angular/common";

import {DashboardService} from "../../../core/services/dashboard.service";
import {AuthService} from "../../../core/services/auth.service";
import {ButtonDirective} from "primeng/button";
import {Carousel} from "primeng/carousel";
import {FormatAccountNumberPipe} from "../../../shared/pipe/format-account-number.pipe";
import {Tag} from "primeng/tag";
import {BankAccount} from "../../../shared/models/bankAccount";
import {Transaction} from "../../../shared/models/transaction";
import {BankAccountService} from "../../../core/services/bank-account.service";
import {TransactionService} from "../../../core/services/transaction.service";
import {TableModule} from "primeng/table";
import {StyleClassModule} from "primeng/styleclass";
import {TransactionStatus} from "../../../shared/models/transactionStatus.enum";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ChartModule,
    CardModule,
    CommonModule,
    ButtonDirective,
    Carousel,
    FormatAccountNumberPipe,
    Tag,
    TableModule,
    StyleClassModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent  implements OnInit {

  counts: any = {};
  chartData: any;
  chartOptions: any;

  //dashboard customer
  accounts : BankAccount[] =[]
  recentTransactions: Transaction[] = [];
  transactions: Transaction[] = [];

  totalTransactions = 0;
  validTransactions = 0;
  failedTransactions = 0;

  chartLineData: any;  // données pour le line chart
  transactionsCountPerMonth: { [key: string]: number } = {};



  constructor(private dashboardService : DashboardService,
              public authService :AuthService,
              private bankAccountService: BankAccountService,
              private  transactionService : TransactionService,) {
  }

  ngOnInit() {
    const roles = this.authService.getRoleFromToken();
    if (roles?.includes('ADMIN') || roles?.includes('BANKER')) {
      this.loadCounts();
      this.loadDashboardStats();
      this.chartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          },
          tooltip: {
            enabled: true
          }
        }
      };
    }
    else if (roles?.includes('CUSTOMER'))
    {
      this.loadCustomerAccounts();
      this.getStatusTransaction();
      this.loadTransactionsCountPerMonth();
    }
  }



  // pour les card
  loadCounts() {
    this.dashboardService.getUserCount().subscribe(data => this.counts.users = data);
    this.dashboardService.getBankCount().subscribe(data => this.counts.banks = data);
    this.dashboardService.getAccountCount().subscribe(data => this.counts.accounts = data);
    this.dashboardService.getTransactionCount().subscribe(data => this.counts.transactions = data);
  }

  loadDashboardStats() {
    this.dashboardService.getStats().subscribe(data => {
      this.counts = data;


      this.chartData = {
        labels: ['Users', 'Banks', 'Accounts', 'Transactions'],
        datasets: [
          {
            data: [
              data.users,
              data.banks,
              data.accounts,
              data.transactions,

            ],
            backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#9c27b0', '#f44336'],
            hoverBackgroundColor: ['#66bb6a', '#42a5f5', '#ffb74d', '#ba68c8', '#ef5350']
          }
        ]
      };
    });
  }

//dashboard customer
  loadCustomerAccounts(): void {
    this.loadTransactions();
    this.bankAccountService.getMyAccount().subscribe({
      next: (accounts) => {
        this.accounts = accounts;

      },
      error: (err) => {
        console.error('Error loading accounts', err);

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

  getStatusTransaction(): void {
    this.transactionService.getMyTransaction().subscribe((data: Transaction[]) => {
      this.transactions = data;
      this.totalTransactions = data.length;
      this.validTransactions = data.filter( t => t.transactionStatus === TransactionStatus.VALID).length;
      this.failedTransactions = data.filter(
        t => t.transactionStatus === TransactionStatus.SUSPICIOUS
      ).length;
    });
  }

  loadTransactionsCountPerMonth() {
    this.dashboardService.getTransactionsCountPerMonth().subscribe(data => {
      // data est un objet { "January": 15, "February": 22, ... }
      const labels = Object.keys(data);
      const values = Object.values(data);

      this.chartLineData = {
        labels: labels,
        datasets: [
          {
            label: 'Transactions par mois',
            data: values,
            fill: false,
            borderColor: '#42A5F5',
            tension: 0.4
          }
        ]
      };
    });
  }


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




}
