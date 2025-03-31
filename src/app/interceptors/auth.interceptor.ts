import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Injection des services nécessaires
  const authService = inject(AuthService);
  const router = inject(Router);

  // Récupérer le token d'authentification
  const token = authService.getToken();

  console.log('Requête interceptée :', req);

  // Ignorer l'ajout du token pour les requêtes vers '/users'
  if (req.url.includes('/users')) {
    console.log("Requête pour '/users' : Pas de token ajouté.");
    return next(req); // Transmettre la requête sans modification
  }

  // Si un token existe, l'ajouter à l'en-tête Authorization
  if (token) {
    console.log("Token récupéré :", token);
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("Requête clonée avec token :", req);
  }

  // Continuer avec la requête et gérer les erreurs
  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          console.error('Accès non autorisé détecté. Redirection vers la page de connexion...');
          router.navigate(['auth/login']); // Redirection vers la page de connexion
        } else {
          console.error('Erreur HTTP :', error.message);
        }
      }
      return throwError(() => error); // Propager l'erreur
    })
  );
};
