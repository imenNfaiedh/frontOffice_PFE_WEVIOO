import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClaimService} from "../../../../core/services/claim.service";
import {InputText} from "primeng/inputtext";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

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
  @Output() formSubmitted = new EventEmitter<void>();//événement envoyé quand on valide le formulaire.
  @Output() cancel = new EventEmitter<void>();


  constructor(private fb : FormBuilder,
              private claimService: ClaimService,
              private router : Router) {
    this.claimForm=this.fb.group({
      subject:['',Validators.required],
      message:['',Validators.required],
    })
  }

  ngOnInit() {
  }

  get f() {return this.claimForm.controls;}

  onSubmit(): void {
    if (this.claimForm.invalid) {
      this.claimForm.markAllAsTouched();
      return;
    }

    this.claimService.createClaim(this.claimForm.value).subscribe({
      next: () => {
        this.formSubmitted.emit();
        console.log('Réclamation ajoutée avec succès');

        // Redirection avec "refresh" de la page
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/admin/list-reclamation']);
        });
      },
      error: (err) => {
        console.log('Erreur lors de la création de la réclamation');
      }
    });
  }


  onCancel(): void {
    this.cancel.emit();
    this.claimForm.markAsPristine();
    this.claimForm.markAsUntouched();}



}
