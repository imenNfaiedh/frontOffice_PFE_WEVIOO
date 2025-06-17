import {Component, OnInit} from '@angular/core';
import {User} from "../../../../shared/models/user";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../../core/services/user.service";
import {MessageService} from "primeng/api";
import {CommonModule} from "@angular/common";
import {InputText} from "primeng/inputtext";
import {Router} from "@angular/router";


@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputText
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {

  editForm!: FormGroup;
  userImageUrl: string = 'assets/default-profile.png';  // image par défaut
  currentUserId?: string
  user!: User;
  readonly backendUrl = 'http://localhost:8085/userss';

  formSubmitAttempt = false;


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    // Initialisation du formulaire
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ\s'-]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ\s'-]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      cin: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      tel: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      address: ['', Validators.required]
    });

    // Charger les données actuelles une seule fois
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        this.currentUserId = user.keycloakId;
        if (user.profileImageUrl) {
          this.userImageUrl = user.profileImageUrl;
        }
        this.editForm.patchValue(user);
      },
      error: (err) => {
        console.error('Erreur chargement user', err);
      }
    });
  }


  onSubmit() {

    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
    const updatedUser: User = {
      ...this.user,
      ...this.editForm.value
    };

    this.userService.updateCurrentUser(updatedUser).subscribe({
      next: (res) => {
        // Redirection avec "refresh" de la page
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/admin/profile']);
        });
      },
    });
  }
  onCancel() {
    // Redirection ou réinitialisation du formulaire, selon ton besoin :
    this.editForm.patchValue(this.user!); // remet les anciennes valeurs
  }
 onImageSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    this.userService.uploadProfileImage(this.user.userId!, file).subscribe({
      next: (res) => {
        // Met à jour l’URL de l’image si besoin
        this.userImageUrl = res; // ou traite la réponse selon ton backend
      },
      error: (err) => {
        // Affiche une erreur si besoin
      }
    });
  }
}


}
