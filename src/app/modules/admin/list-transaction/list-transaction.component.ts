import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../../../core/services/transaction.service";
import {CommonModule} from "@angular/common";
import {TableModule} from "primeng/table";
import {Transaction} from "../../../shared/models/transaction";

@Component({
  selector: 'app-list-transaction',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './list-transaction.component.html',
  styleUrl: './list-transaction.component.css'
})
export class ListTransactionComponent implements OnInit{

  transactions : Transaction[] =[];
  constructor(private transactionService : TransactionService,) {
  }
  ngOnInit() {
    this.getAllTransaction();

  }

  getAllTransaction(){
    this.transactionService.getAllTransaction().subscribe((data)=> {
      this.transactions = data;
    });
  }


}
