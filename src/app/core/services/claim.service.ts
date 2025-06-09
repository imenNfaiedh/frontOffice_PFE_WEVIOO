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
    return this.http.post<Claim>(this.apiUrl, claim ,{
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });
}

 getClaimForCurrentUser() : Observable<Claim[]>{
    return this.http.get<Claim[]>(this.apiUrl+'/myClaim')
}

  getClaimById(id:number) : Observable<Claim>{
    return this.http.get<Claim>(`${this.apiUrl}/${id}`)
  }

  getPendingClaim(): Observable<Claim[]>{
    return this.http.get<Claim[]>(this.apiUrl+'/pending')
  }

  deleteClaim(id:number) {
   return  this.http.delete(`${this.apiUrl}/${id}`)
  }


  // claim.service.ts
  respondToClaim(claimId: number, responseAdmin: string): Observable<Claim> {
    return this.http.put<Claim>(`${this.apiUrl}/respond/${claimId}`, {
      responseAdmin
    });
  }


}
