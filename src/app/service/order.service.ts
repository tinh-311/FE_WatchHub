import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { isProduction_BE, BE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = isProduction_BE ? BE.productionUrl : BE.devUrl;
  token: any = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  create(data: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const url = `${this.baseUrl}/Order/Create`;
    return this.http.post<any>(url, data, { headers });
  }

  getById(id: any): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    let url = `${this.baseUrl}/Order/GetById${id}`;

    return this.http.get<any>(url, { headers });
  }

  getOrderById(status: any, id: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    let url = `${this.baseUrl}/Order/FilterByOrderStatus${id}?orderStatus=${status}`;

    return this.http.get<any>(url, { headers });
  }

  getAllOrderById(id: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    let url = `${this.baseUrl}/Order/FilterByUserId${id}`;

    return this.http.get<any>(url, { headers });
  }
}
