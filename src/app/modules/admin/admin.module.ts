import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {AddClaimComponent} from "./claim/add-claim/add-claim.component";




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ToastModule,


  ]


})
export class AdminModule { }
