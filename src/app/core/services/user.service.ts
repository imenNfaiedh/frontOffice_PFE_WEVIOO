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
  deleteUser(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
  getUserById(id:number): Observable<any>{
    return  this.http.get<any>(this.apiUrl+'/' + id);

  }
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }
  uploadProfileImage(userId: number, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload/${userId}`, formData, { responseType: 'text' });
  }


  updateCurrentUser(userDto: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/me`, userDto);
  }
}
