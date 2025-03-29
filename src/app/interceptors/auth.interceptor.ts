import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';

import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {catchError, throwError} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";

export const authInterceptor: HttpInterceptorFn = (req ,next) => {
  const authService=inject(AuthService);
  const token = authService.getToken();
  const router = inject(Router);

  if (token)
  {
    req = req.clone({
      setHeaders :{
        Authorization: `Bearer ${token}`
      }
      });
  }
  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        router.navigate(['auth/login']);
      }
      return throwError(() => error);
    })
  );
};
