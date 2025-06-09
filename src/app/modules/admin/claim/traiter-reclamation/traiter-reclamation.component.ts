import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {NgIf} from "@angular/common";
import {ClaimService} from "../../../../core/services/claim.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-traiter-reclamation',
  standalone: true,
  imports: [ReactiveFormsModule,
    InputText,
    NgIf],
  templateUrl: './traiter-reclamation.component.html',
  styleUrl: './traiter-reclamation.component.css'
})
export class TraiterReclamationComponent {
  @Output() formSubmitted = new EventEmitter<void>();//événement envoyé quand on valide le formulaire.
  @Output() cancel = new EventEmitter<void>()

  respondClaimForm : FormGroup;
  @Input() claimId!: number;

  constructor(private fb : FormBuilder,
              private claimService: ClaimService,
              private router : Router){
    this.respondClaimForm=this.fb.group({
      responseAdmin:['',Validators.required],
    })
  }

  onSubmit(): void {
    if (this.respondClaimForm.invalid) {
      this.respondClaimForm.markAllAsTouched();
      return;
    }

    this.claimService.respondToClaim(this.claimId, this.respondClaimForm.value.responseAdmin).subscribe({

      next: () => {
        this.formSubmitted.emit();
        console.log('repondre  ajoutée avec succès');

        // Redirection avec "refresh" de la page
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/admin/list-reclamation']);
        });
      },
      error: (err) => {
        console.log('Erreur lors de la repondre de la réclamation');
      }
    });
  }

  get f() {return this.respondClaimForm.controls;}
  onCancel(): void {
    this.cancel.emit();
    this.respondClaimForm.markAsPristine();
    this.respondClaimForm.markAsUntouched();}

}
