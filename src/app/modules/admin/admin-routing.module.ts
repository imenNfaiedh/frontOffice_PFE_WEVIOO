import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListTransactionComponent} from "./list-transaction/list-transaction.component";
import {AdminLayoutComponent} from "../../layouts/admin-layout/admin-layout.component";


const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent, // <-- layout commun pour les routes enfants
    children: [
      { path: 'list-transaction' , component: ListTransactionComponent}

      ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
