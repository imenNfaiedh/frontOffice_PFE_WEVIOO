import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Claim} from "../../shared/models/claim";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  apiUrl ="http://localhost:8085/claims";

  constructor(private http: HttpClient) { }

  createClaim (claim:Claim ) : Observable<Claim>{
    return this.http.post<Claim>(this.apiUrl, Claim ,{
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });
}
}
