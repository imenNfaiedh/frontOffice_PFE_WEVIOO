import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {providePrimeNG} from "primeng/config";
import Aura from '@primeng/themes/aura';
import {authInterceptor} from "./core/interceptors/auth.interceptor";
import {HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import { LOCALE_ID } from '@angular/core';
import {MessageService} from "primeng/api";
import { ToastModule } from 'primeng/toast';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),


    importProvidersFrom(HttpClientModule, ToastModule),
    MessageService,


    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ]
};

