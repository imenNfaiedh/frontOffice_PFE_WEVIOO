import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Transaction} from "../../shared/models/transaction";
import {User} from "../../shared/models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = "http://localhost:8085/userss"

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getFullName(user: User): string {
    return `${user.firstName} ${user.lastName}`;
  }

  getBankAccountsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}/bank-accounts`);
  }
}
