import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Transaction} from "../../shared/models/transaction";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  apiUrl = "http://localhost:8085/transactions"

  constructor(private http: HttpClient) {
  }

  getAllTransaction(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }
}
