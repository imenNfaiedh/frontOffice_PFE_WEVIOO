import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenUrl = "http://localhost:8080/realms/spring-micro-main/protocol/openid-connect/token";
  private userUrl = "http://localhost:8090/users"

  constructor( private http: HttpClient) { }

  getToken(): string | null{
    return localStorage.getItem('accessToken')
  }


  //stocker le token dans local storage
  storeToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = `grant_type=password&client_id=spring-micro-gateway&client_secret=siT3jx502YejZ5ANkFEE85I1DSs2FyHh&username=${username}&password=${password}`;
    //const body = `grant_type=password&client_id=spring-micro-gateway&client_secret=r4EsUp1M8iHFvEOg1Da5MZ6RgaLdlzKZ&username=${username}&password=${password}`;

    return this.http.post(this.tokenUrl, body, { headers });
  }

  createUser( user: any): Observable<any> {
    const token = localStorage.getItem('accessToken'); // Récupérer le token JWT
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Ajouter le token dans l'en-tête Authorization
    });

    return this.http.post(this.userUrl, user, { headers });
}
 //pour sauvegarder user du keyclaok en BD
   getCurrentUser(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get("http://localhost:8085/userss/me", { headers });
  }
}
