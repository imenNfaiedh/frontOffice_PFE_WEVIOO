import {Component, EventEmitter, OnChanges, Output} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import {Button} from "primeng/button";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TypeTransaction} from "../../../shared/models/typeTransaction.enum";
import {TransactionStatus} from "../../../shared/models/transactionStatus.enum";
import {TransactionService} from "../../../core/services/transaction.service";

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [DialogModule, Button, ReactiveFormsModule],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css'
})
export class AddTransactionComponent  {
  transactionForm:FormGroup;
  @Output() formSubmitted = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  constructor(private fb : FormBuilder,
              private transactionService : TransactionService) {
    this.transactionForm = this.fb.group(
      {
        devise : new  FormControl('',[Validators.required]),
        amount: new  FormControl('',[Validators.required]),
        currency: new  FormControl('',[Validators.required ,Validators.email],),
        country: new  FormControl('',[Validators.required]),
        transactionDate: new  FormControl('',[Validators.required]),
        typeTransaction: new  FormControl('',[Validators.required]),
        transactionStatus: new  FormControl('',[Validators.required]),
      })
  }


  onSubmit() {
    if (this.transactionForm.valid) {
      this.transactionService.createTransaction(this.transactionForm.value).subscribe({
        next: () => {
          this.formSubmitted.emit();  //  Ferme la popup une fois soumission réussie
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout :", err);
        }
      });
    } else {
      this.transactionForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.cancel.emit();
  }


  // onClose() {
  //   this.onCloseModel.emit(false);
  // }

}
