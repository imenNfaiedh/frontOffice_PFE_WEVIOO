import {Component, OnInit} from '@angular/core';
import {User} from "../../../../shared/models/user";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../../core/services/user.service";
import {MessageService} from "primeng/api";
import {CommonModule} from "@angular/common";
import {InputText} from "primeng/inputtext";

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

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    // Initialisation du formulaire
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      cin: [''],
      address: ['']
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
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Profil mis à jour.' });
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de mettre à jour.' });
        console.error(err);
      }
    });
  }
  onCancel() {
    // Redirection ou réinitialisation du formulaire, selon ton besoin :
    this.editForm.patchValue(this.user!); // remet les anciennes valeurs
  }
  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Preview immédiat
      const reader = new FileReader();
      reader.onload = () => {
        this.userImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);

      // Upload vers backend
      this.userService.uploadProfileImage(this.user.userId!, file).subscribe({
        next: (imageUrl: string) => {
          this.userImageUrl = this.backendUrl + imageUrl;
          this.user.profileImageUrl = imageUrl;

          // Met à jour l'utilisateur avec la nouvelle URL image
          this.userService.updateCurrentUser(this.user).subscribe();
        },
        error: (err) => {
          console.error('Erreur upload image:', err);
        }
      });
    }
  }


}
