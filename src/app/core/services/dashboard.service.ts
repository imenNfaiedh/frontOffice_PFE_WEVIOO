import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl = "http://localhost:8085"
  apiUrl = 'http://localhost:8085/api/dashboard';

  constructor(private http: HttpClient) {}
  getStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats`);
  }

  getUserCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/userss/count`);
  }

  getBankCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/banks/count`);
  }

  getAccountCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/accounts/count`);
  }

  getTransactionCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/transactions/count`);
  }

  getClaimStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/claimStatus`);
  }
}
