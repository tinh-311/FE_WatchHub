import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isProduction_BE, BE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentMenthodService {
  private baseUrl = isProduction_BE ? BE.productionUrl : BE.devUrl;
  token: any = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number, pageSize?: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    let isPaging = pageNumber && pageSize;
    let url = `${this.baseUrl}/PaymentMethod/GetAll`;

    if (isPaging) {
      url = `${this.baseUrl}/PaymentMethod/GetAll?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    }

    return this.http.get<any>(url, { headers });
  }
}
