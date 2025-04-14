import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {catchError, Observable, throwError} from 'rxjs';



export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Injection des services nécessaires
  const authService = inject(AuthService);
  const router = inject(Router);


  const token = authService.getToken();
  console.log('Requête interceptée :', req);

  if (req.url.includes('/users')) {
    console.log("Requête pour '/users' : Pas de token ajouté.");
    return next(req);
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
