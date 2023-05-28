import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { BE, isProduction_BE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = isProduction_BE ? BE.productionUrl : BE.devUrl;
  token: any = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  verify(email: string, code: string): Observable<any> {
    return this.http.get<any>(`
      ${this.baseUrl}/Users/Verify?code=${code}&email=${email}
    `);
  }

  getUsers(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const url = `${this.baseUrl}/Users/GetAll`;
    return this.http.get<any>(url, { headers });
  }

  updateUser(user: User): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const url = `${this.baseUrl}/Users/Update${user.id}`;
    return this.http.put<any>(url, user, { headers });
  }
}
