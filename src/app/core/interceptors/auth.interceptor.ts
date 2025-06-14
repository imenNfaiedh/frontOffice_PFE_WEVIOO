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
//import { ToastService } from '../services/toast.service';



export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  //const toastService = inject(ToastService);
  const token = authService.getToken();


  console.log('Requête interceptée :', req);
  // On garde la requête inchangée au début
  let modifiedReq = req;
  // Si l'URL n'est pas '/users', on ajoute le token (si disponible)

  if (!req.url.endsWith('/users')) {

    if (token) {
      modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Requête clonée avec token :", modifiedReq);
    }
  } else {
    console.log("Requête pour '/users' : Pas de token ajouté.");
  }

  // Ensuite, on continue la requête ET on gère les erreurs
  return next(modifiedReq).pipe(
   catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Une erreur est survenue.';
      if (typeof error.error === 'string' && error.error.trim() !== '') {
        errorMessage = error.error;
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      }

      // ✅ Appelle du service centralisé — plus sûr
      //toastService.showError(errorMessage);

      if (error.status === 401) {
        router.navigate(['auth/login']);
      }

      return throwError(() => error);
    })
  );
};
