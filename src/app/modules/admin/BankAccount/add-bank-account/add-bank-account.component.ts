import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {InputText} from "primeng/inputtext";
import {User} from "../../../../shared/models/user";
import {BankAccountService} from "../../../../core/services/bank-account.service";
import {UserService} from "../../../../core/services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-bank-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, DropdownModule, ButtonModule, InputText],
  templateUrl: './add-bank-account.component.html',
  styleUrl: './add-bank-account.component.css'
})
export class AddBankAccountComponent implements OnInit{

  @Output() formSubmitted = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  bankAccountForm: FormGroup;
  users: User[] = [];

  constructor(private fb: FormBuilder,
              private bankAccountService: BankAccountService,
              private userService: UserService) {
    this.bankAccountForm = this.fb.group({
      balance: ['', Validators.required],
      typeBankAccount: ['', Validators.required],
      userId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data.map(user => ({
        ...user,
        fullName: user.firstName + ' ' + user.lastName // pour afficher dans le dropdown
      }));
    });
  }

  get f() {
    return this.bankAccountForm.controls;
  }

  onSubmit(): void {
    if (this.bankAccountForm.invalid) {
      this.bankAccountForm.markAllAsTouched();
      return;
    }
    console.log("Payload envoyé :", this.bankAccountForm.value);

    this.bankAccountService.createAccount(this.bankAccountForm.value).subscribe({
      next: (createdAccount) => {
        Swal.fire({
          icon: 'success',
          title: 'Compte créé avec succès',
          text: `Le numéro du compte est ${createdAccount.accountNumber}`,
          confirmButtonText: 'OK'
        });
        this.formSubmitted.emit();
      },
      error: (err) => {
        console.error('Erreur lors de la création du compte', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de créer le compte bancaire'
        });
      }
    });
  }

  onCancel(): void {
    this.cancel.emit();
  }

}
