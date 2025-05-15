import {Component, EventEmitter, OnChanges, OnInit, Output} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import {Button} from "primeng/button";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TypeTransaction} from "../../../shared/models/typeTransaction.enum";
import {TransactionStatus} from "../../../shared/models/transactionStatus.enum";
import {TransactionService} from "../../../core/services/transaction.service";
import {InputText} from "primeng/inputtext";
import {CommonModule} from "@angular/common";
import { DropdownModule } from 'primeng/dropdown';
import { StyleClassModule } from 'primeng/styleclass';
import {CardModule} from "primeng/card";
import {User} from "../../../shared/models/user";
import {BankAccount} from "../../../shared/models/bankAccount";
import {UserService} from "../../../core/services/user.service";


@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [DialogModule, Button, ReactiveFormsModule,
    InputText, CommonModule, DropdownModule,
    StyleClassModule, CardModule, FormsModule],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css'
})
export class AddTransactionComponent implements OnInit{

  transactionForm:FormGroup;
  @Output() formSubmitted = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  users: any[] = [];
  selectedUserId?: number;
  bankAccounts: BankAccount[] = [];


  //transactionStatuses: TransactionStatus[]| undefined;
  constructor(private fb : FormBuilder,
              private userService : UserService,
              private transactionService : TransactionService) {
    this.transactionForm = this.fb.group(
      {
        amount: new  FormControl('',[Validators.required]),
        currency: new  FormControl('',[Validators.required ]),
        country: new  FormControl('',[Validators.required]),
        transactionDate: new  FormControl('',[Validators.required]),
        typeTransaction: new  FormControl('',[Validators.required]),
        transactionStatus: new  FormControl('',[Validators.required]),
        bankAccountId: new  FormControl('',[Validators.required]),
        beneficiary: new FormControl('', Validators.required),
      })

  }
  typeTransactions = [
    { name: "PAYMENT", label: "Payment" },
    { name: "WITHDRAWAL", label: "Retrait" },
    { name: "TRANSFER", label: "Transférer" }
  ];

  transactionStatuss = [
    { name: "VALID", label: "Validée" },
    { name: "SUSPICIOUS", label: "Suspectée" }
  ];

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => {
      // Ajout du fullName pour affichage
      this.users = users.map(u => ({ ...u, fullName: `${u.firstName} ${u.lastName}` }));
    });
  }


  onSubmit() {
    if (this.transactionForm.valid) {
      this.transactionService.createTransaction(this.transactionForm.value).subscribe({

        next: () => {
          this.formSubmitted.emit();//  Ferme la popup une fois soumission réussie
          console.log("add trasaction success");
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout :", err);
        }
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }


  onUserSelected() {
    const selectedUserId = this.transactionForm.get('beneficiary')?.value;
    this.transactionForm.get('bankAccountId')?.reset(); // reset previous selection
    this.bankAccounts = []; // vider les anciens comptes
    if (selectedUserId) {
      this.userService.getBankAccountsByUser(selectedUserId).subscribe(accounts => {
        this.bankAccounts = accounts.map(account => ({
          ...account,
          display: `Compte n°${account.bankAccountId} - ${account.accountNumber}`
        }));
      });

    }}
}
