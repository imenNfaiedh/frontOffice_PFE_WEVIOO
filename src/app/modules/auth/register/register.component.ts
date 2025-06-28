import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {InputText} from "primeng/inputtext";
import {PasswordDirective} from "primeng/password";
import {Select, SelectModule} from "primeng/select";
import {DropdownModule} from "primeng/dropdown";
import {AuthService} from "../../../core/services/auth.service";
import {RoleUser} from "../../../shared/models/roleUser.enum";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ToastModule,
    ButtonModule,
    Ripple,
    ReactiveFormsModule,
    CommonModule,
    InputText,
    PasswordDirective,
    SelectModule,
    DropdownModule,
    Select
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [ ]
})
export class RegisterComponent implements OnInit{

  public registerForm!: FormGroup;
  public submitted = false;

  @Output() formSubmitted= new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  roles = [
    { label: 'Administrateur', value: RoleUser.ADMIN },
    { label: 'Client', value: RoleUser.CUSTOMER },
    { label: 'Banquier', value: RoleUser.BANKER }
  ];

  // alerte formulaire
  public formSubmitAttempt = false;

  constructor(
      private formBuilder: FormBuilder,
      private authService : AuthService,
      private messageService: MessageService,
      private router: Router,
  ) {}
  ngOnInit(): void {


    this.registerForm = this.formBuilder.group({
      firstName: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-zÀ-ÿ\s'-]+$/)  // Lettres, accents, espaces, tirets
      ]],
      lastName: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-zÀ-ÿ\s'-]+$/)
      ]],
      username: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._-]{4,20}$/)  // Lettres, chiffres, . _ -
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)  // Au moins 8 caractères, 1 maj, 1 min, 1 chiffre
      ]],
      roleName: ['', Validators.required]
    });
  }

    get f(){ return this.registerForm.controls;}

  onCancel(): void {
    this.registerForm.reset();

}

  onSubmit(): void {
    this.submitted = true;
    this.formSubmitAttempt = true; // 👉 active l'alerte globale si nécessaire

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched(); // 👉 pour afficher les erreurs de chaque champ
      return;
    }

    const user = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      roleName: this.registerForm.value.roleName
    };

    this.authService.createUser(user).subscribe({
      next: (response) => {
        console.log('User created successfully:', response);
        this.formSubmitAttempt = false; // ✅ remet à zéro l’alerte après succès

        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/admin/list-user']);
        });
      },
      error: (error) => {
        console.error('Error creating user:', error);
        if (error.status === 403) {
          Swal.fire({
            icon: 'error',
            title: 'Utilisateur existant',
            text: 'Un utilisateur avec cet email ou ce nom existe déjà.'
          }).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la création de l\'utilisateur.'
          });
        }
      }
    });
  }
}
