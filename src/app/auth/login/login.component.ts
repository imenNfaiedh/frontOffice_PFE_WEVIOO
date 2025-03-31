import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {MessageModule} from "primeng/message";
import {CardModule} from "primeng/card";

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
  constructor( private formBuilder : FormBuilder,
               private authService : AuthService,
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
