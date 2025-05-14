import {Component, EventEmitter, OnChanges, Output} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import {Button} from "primeng/button";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TypeTransaction} from "../../../shared/models/typeTransaction.enum";
import {TransactionStatus} from "../../../shared/models/transactionStatus.enum";
import {TransactionService} from "../../../core/services/transaction.service";
import {InputText} from "primeng/inputtext";
import {CommonModule} from "@angular/common";
import { DropdownModule } from 'primeng/dropdown';
import { StyleClassModule } from 'primeng/styleclass';
import {CardModule} from "primeng/card";


@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [DialogModule, Button, ReactiveFormsModule,
    InputText, CommonModule, DropdownModule,
    StyleClassModule,CardModule],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css'
})
export class AddTransactionComponent  {
  transactionForm:FormGroup;
  @Output() formSubmitted = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();


  //transactionStatuses: TransactionStatus[]| undefined;
  constructor(private fb : FormBuilder,
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




  onSubmit() {
    if (this.transactionForm.valid) {
      this.transactionService.createTransaction(this.transactionForm.value).subscribe({

        next: () => {
          this.formSubmitted.emit();
          console.log("add trasaction success");//  Ferme la popup une fois soumission réussie
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


  // onClose() {
  //   this.onCloseModel.emit(false);
  // }

}
