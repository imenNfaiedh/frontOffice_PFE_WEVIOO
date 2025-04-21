import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path :'auth',
  loadChildren:() => import('./modules/auth/auth.module').then (m=> m.AuthModule)},

  { path :'admin',
    loadChildren:() => import('./modules/admin/admin.module').then (m=> m.AdminModule)}
];
