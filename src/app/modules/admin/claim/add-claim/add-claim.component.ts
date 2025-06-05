import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClaimService} from "../../../../core/services/claim.service";
import {InputText} from "primeng/inputtext";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-add-claim',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputText,
    NgIf
  ],
  templateUrl: './add-claim.component.html',
  styleUrl: './add-claim.component.css'
})
export class AddClaimComponent implements OnInit {

  claimForm: FormGroup;
  @Output() formSubmitted = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();


  constructor(private fb : FormBuilder,
              private claimService: ClaimService,) {
    this.claimForm=this.fb.group({
      subject:['',Validators.required],
      message:['',Validators.required],
    })
  }

  ngOnInit() {
  }

  get f() {return this.claimForm.controls;}

  onSubmit():void {
    if (this.claimForm.invalid){
      this.claimForm.markAllAsTouched();
      return;
    }

    this.claimService.createClaim(this.claimForm.value).subscribe({
      next:()=> {
        this.formSubmitted.emit();
        console.log('reclamation ajoute avec success');
      },
      error:(err)=> {
        console.log('erreur lors du creation du reclamation ')
      }
    });
  }

  onCancel(): void {
    this.cancel.emit();
    this.claimForm.markAsPristine();
    this.claimForm.markAsUntouched();}



}
