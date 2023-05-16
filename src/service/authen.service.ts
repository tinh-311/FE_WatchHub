import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  private baseUrl = 'https://localhost:44350';

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    const url = `${this.baseUrl}/Users/register`;
    return this.http.post<any>(url, userData);
  }

  registerWithGoogle(userData: any): Observable<any> {
    const url = `${this.baseUrl}/Users/register`;
    return this.http.post<any>(url, userData);
  }
}
