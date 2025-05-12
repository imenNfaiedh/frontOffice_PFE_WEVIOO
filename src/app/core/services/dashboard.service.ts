import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl = "http://localhost:8085"

  constructor(private http: HttpClient) {}

  getUserCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/users/count`);
  }

  getBankCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/banks/count`);
  }

  getAccountCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/accounts/count`);
  }

  getTransactionCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/transactions/count`);
  }}
