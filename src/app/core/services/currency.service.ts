import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {


  constructor(private http: HttpClient) {}

  convert(from: string, to: string, amount: number): Observable<any> {
    const url = `http://localhost:8085/exchange/convert?from=${from}&to=${to}&amount=${amount}`;
    return this.http.get(url);
  }

  // currency.service.ts
  // getHistoricalRates(base: string, target: string) {
  //   const endDate = new Date();
  //   const startDate = new Date();
  //   startDate.setDate(endDate.getDate() - 4); // sur 5 jours
  //
  //   const format = (d: Date) => d.toISOString().split('T')[0];
  //   const params = {
  //     base,
  //     symbols: target,
  //     start_date: format(startDate),
  //     end_date: format(endDate)
  //   };
  //
  //   return this.http.get('/timeseries', { params });
  // }



}
