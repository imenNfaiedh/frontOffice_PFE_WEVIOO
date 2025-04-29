import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListTransactionComponent} from "./list-transaction/list-transaction.component";
import {AdminLayoutComponent} from "../../layouts/admin-layout/admin-layout.component";
import {DashboardComponent} from "../dashboard/dashboard/dashboard.component";


const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'list-transaction' , component: ListTransactionComponent},
      { path: 'dashboard', component: DashboardComponent },


      ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
