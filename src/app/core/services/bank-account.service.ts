import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BankAccount} from "../../shared/models/bankAccount";

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {
  apiUrl = "http://localhost:8085/accounts"

  constructor(private http: HttpClient) { }

  getMyAccount():Observable<BankAccount[]>
  {
    return this.http.get<BankAccount[]>(this.apiUrl+'/myBankAccounts');
  }
  getAccountById(id: number): Observable<BankAccount> {
  return this.http.get<BankAccount>(`${this.apiUrl}/${id}`);
}
  getAllAccount():Observable<BankAccount[]>
  {
    return this.http.get<BankAccount[]>(this.apiUrl)
  }

  toggleBlockStatus(accountId: number) {
  return this.http.put<string>(`${this.apiUrl}/toggle-block/${accountId}`, {});
}
 deleteAccount(id:number) {
   return  this.http.delete(`${this.apiUrl}/${id}`)
  }

  // getAccountsByUserId(userId: number): Observable<any[]> {
  //   return this.http.get<any[]>(`/api/bank-accounts/by-user/${userId}`);
  // }
}
