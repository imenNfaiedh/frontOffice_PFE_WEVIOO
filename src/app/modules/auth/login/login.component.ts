import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../../core/services/auth.service";
import { CardModule } from "primeng/card";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { PasswordModule } from "primeng/password";
import { InputTextModule } from "primeng/inputtext";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CommonModule,
    CardModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Réinitialise le message d'erreur quand l'utilisateur modifie un champ
    this.loginForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    const loginData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.authService.login(loginData.username, loginData.password).subscribe(
      (response) => {
        if (response && response.access_token) {
          this.authService.storeToken(response.access_token);
          this.errorMessage = ''; // Nettoyer l'erreur

          this.authService.getCurrentUser().subscribe(
            (user) => {
              console.log('Utilisateur enregistré:', user);
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/', 'admin', 'dashboard']);
              });
            },
            (error) => {
              console.error('Erreur lors de la récupération de l’utilisateur:', error);
              this.errorMessage = 'Erreur lors du chargement de l’utilisateur.';
            }
          );
        } else {
          this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect.';
        }
      },
      (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect.';
      }
    );
  }
}
