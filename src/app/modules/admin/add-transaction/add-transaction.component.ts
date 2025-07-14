import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { StyleClassModule } from 'primeng/styleclass';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TransactionService } from '../../../core/services/transaction.service';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../shared/models/user';
import { BankAccount } from '../../../shared/models/bankAccount';
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [
    DialogModule, Button, ReactiveFormsModule, InputText, CommonModule,
    DropdownModule, StyleClassModule, CardModule, FormsModule
  ],
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {

  @Output() formSubmitted = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();


  transactionForm: FormGroup;
  users: User[] = [];
  bankAccounts: BankAccount[] = [];


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private transactionService: TransactionService,
    private router: Router,

    // private messageService : MessageService


  )
  {
    this.transactionForm = this.fb.group({
      amount: ['', Validators.required],
      currency: ['', Validators.required],
      country: ['', Validators.required],
      transactionDate: [ { value: '', disabled: true }, Validators.required ,],
      bankAccountId: ['', Validators.required],
      beneficiary: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0]; // format 'yyyy-MM-dd'
    this.transactionForm.get("transactionDate")?.setValue(formattedDate);
    this.loadUsers();
  }

  get f() {
    return this.transactionForm.controls;
  }

  private loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users.map(u => ({ ...u, fullName: `${u.firstName} ${u.lastName}` }));
      },
      error: (err) => {
        console.error('Erreur lors du chargement des utilisateurs :', err);
      }
    });
  }

  onUserSelected(): void {
    const selectedUserId = this.f['beneficiary'].value;
    this.bankAccounts = [];
    this.transactionForm.patchValue({ bankAccountId: null });

    if (selectedUserId) {
      this.userService.getBankAccountsByUser(selectedUserId).subscribe({
        next: (accounts) => {
          this.bankAccounts = accounts.map(account => ({
            ...account,
            display: `Compte n° ${account.accountNumber}`
          }));
        },
        error: (err) => {
          console.error('Erreur lors du chargement des comptes bancaires :', err);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      return;
    }

    this.transactionService.createTransaction(this.transactionForm.value).subscribe({
      next: () => {
        this.formSubmitted.emit();
        console.log('Transaction ajoutée avec succès');
        // Redirection avec "refresh" de la page
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/admin/list-transaction']);
        });
      },
      error: (err) => {
        console.error('Erreur lors de la création de la transaction :', err);

        // ✅ ALERTE D'ÉCHEC
        let errorMsg = 'Une erreur est survenue.';

        // Vérifier si le backend a renvoyé un message explicite
        if (typeof err.error === 'string') {
          errorMsg = err.error;
        } else if (err?.error?.message) {
          errorMsg = err.error.message;
        }

        Swal.fire({
          icon: 'error',
          title: 'Échec de la transaction',
          text: errorMsg,
          confirmButtonText: 'OK',
          confirmButtonColor: '#d33'
        });
      }
    });
  }

  onCancel(): void {
    this.cancel.emit();
    this.transactionForm.markAsPristine();
    this.transactionForm.markAsUntouched();}

}


