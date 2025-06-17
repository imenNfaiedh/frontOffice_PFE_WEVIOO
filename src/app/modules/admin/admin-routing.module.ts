import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListTransactionComponent} from "./list-transaction/list-transaction.component";
import {AdminLayoutComponent} from "../../layouts/admin-layout/admin-layout.component";
import {DashboardComponent} from "../dashboard/dashboard/dashboard.component";
//import {ListBankAccountComponent} from "./BankAccount/list-bank-account/list-bank-account.component";
import {MyBankAccountComponent} from "./BankAccount/my-bank-account/my-bank-account.component";
import {ListClaimComponent} from "./claim/list-claim/list-claim.component";
import {ConvertisseurComponent} from "./convertisseur/convertisseur.component";
import {ListUserComponent} from "./users/list-user/list-user.component";
import {RegisterComponent} from "../auth/register/register.component";
import {EditProfileComponent} from "./profile/edit-profile/edit-profile.component";


const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'list-transaction' , component: ListTransactionComponent},
      { path: 'dashboard', component: DashboardComponent },
      //{ path: 'list-bankAccount', component: ListBankAccountComponent },
      { path: 'information-compteBancaire', component: MyBankAccountComponent },


      { path: 'list-reclamation' , component: ListClaimComponent},

      { path: 'convertisseur' , component: ConvertisseurComponent},
      { path: 'list-user' , component: ListUserComponent},
      { path : 'register' , component: RegisterComponent},
      { path: 'profile', component: EditProfileComponent }






    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
