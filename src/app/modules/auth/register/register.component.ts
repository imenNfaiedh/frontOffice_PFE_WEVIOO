import {Component, OnInit} from '@angular/core';
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


  roles: string[] = ['Administrateur', 'Chef Agent', 'Client'];


  constructor(
      private formBuilder: FormBuilder,
      private authService : AuthService,
      private messageService: MessageService,
      private router: Router,
  ) {}
  ngOnInit(): void{


    this.registerForm = this.formBuilder.group({
      firstName:['', [Validators.required]],
      lastName:['', [Validators.required]],
      username:['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      roleName: ['', Validators.required]

    });
  }

  get f(){ return this.registerForm.controls;}

  onSubmit(): void {
    this.submitted =true;
    if (this.registerForm.invalid){
      return;
    }
    console.log("jfjfj")
    const user = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      roleName: this.registerForm.value.roleName
    };
    console.log(user)

    this.authService.createUser(user).subscribe(
        response=>{
          console.log('User created successfully:', response);
          this.messageService.add({ severity:'success', summary:'Success', detail:'Utilisateur créé avec succes!!'});

          this.router.navigate(['/auth/login']);
          // },
          // error => {
          //   console.error('Error creating user:', error);
          //   this.messageService.add({
          //     severity: 'error',
          //     summary: 'Erreur',
          //     detail: 'Une erreur est survenue lors de la création de l\'utilisateur.'
          //   });
        }
    );
  }}
