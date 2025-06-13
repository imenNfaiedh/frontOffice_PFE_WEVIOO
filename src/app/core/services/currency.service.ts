import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private API_URL = 'https://api.exchangerate.host';

  constructor(private http: HttpClient) {}

  convert(from: string, to: string, amount: number): Observable<any> {
    const url = `${this.API_URL}/convert?from=${from}&to=${to}&amount=${amount}`;
    return this.http.get<any>(url);
  }}
