import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {
  apiUrl = "http://localhost:8085/accounts"

  constructor(private http: HttpClient) { }

  // getAccountsByUserId(userId: number): Observable<any[]> {
  //   return this.http.get<any[]>(`/api/bank-accounts/by-user/${userId}`);
  // }
}
