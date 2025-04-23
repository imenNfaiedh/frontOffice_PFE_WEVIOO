import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {CardModule} from "primeng/card";
import {CommonModule} from "@angular/common";
import {MessageModule} from "primeng/message";
import {ButtonModule} from "primeng/button";
import {PasswordModule} from "primeng/password";
import {InputTextModule} from "primeng/inputtext";
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessageModule,
    CommonModule,
    CardModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  public loginForm! : FormGroup;
  public errorMessage: string = '';
  //const router = inject(Router);
  constructor( private formBuilder : FormBuilder,
               private authService : AuthService,
               private router : Router
  ) {}

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group( {
      username : ['', Validators.required],
      password : ['',Validators.required]
    });
  }

  onSubmit() : void{
    if (this.loginForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }
    const loginData ={
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    this.authService.login(loginData.username, loginData.password).subscribe(
        (response) => {
          if (response && response.access_token) {
            this.authService.storeToken(response.access_token);
            console.log('Login successful, token stored.');
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate(['/', 'admin', 'list-transaction']);
           });
           console.log("vers list transaction")



          } else {
            this.errorMessage = 'Identifiants incorrects.';
          }
        },
        error => {
          console.error('Login failed:', error);
        }
    );
  }



}
