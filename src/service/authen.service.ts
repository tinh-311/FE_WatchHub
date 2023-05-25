import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BE, isProduction_BE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  private baseUrl = isProduction_BE ? BE.productionUrl : BE.devUrl;

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    const url = `${this.baseUrl}/Users/authenticate`;
    return this.http.post<any>(url, data);
  }

  registerUser(userData: any): Observable<any> {
    const url = `${this.baseUrl}/Users/register`;
    return this.http.post<any>(url, userData);
  }

  registerWithGoogle(userData: any): Observable<any> {
    const url = `${this.baseUrl}/Users/LoginWithGoogle`;
    return this.http.post<any>(url, userData);
  }
}
