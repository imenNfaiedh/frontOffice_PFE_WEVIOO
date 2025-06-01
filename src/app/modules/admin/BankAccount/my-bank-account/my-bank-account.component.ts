import {Component, OnInit} from '@angular/core';
import {BankAccount} from "../../../../shared/models/bankAccount";
import {BankAccountService} from "../../../../core/services/bank-account.service";
import { CardModule } from 'primeng/card';
import {CommonModule, DatePipe} from "@angular/common";


@Component({
  selector: 'app-my-bank-account',
  standalone: true,
  imports: [CardModule, DatePipe, CommonModule],
  templateUrl: './my-bank-account.component.html',
  styleUrl: './my-bank-account.component.css'
})
export class MyBankAccountComponent implements OnInit{

  accounts : BankAccount[] =[]
  loading : boolean = false
  constructor(private bankAccountService: BankAccountService) {}

  ngOnInit(): void {
    this.loading = true;
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
}

