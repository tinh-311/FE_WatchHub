import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isProduction_BE, BE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductAlbertService {
  private baseUrl = isProduction_BE ? BE.productionUrl : BE.devUrl;
  token: any = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number, pageSize?: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    let isPaging = pageNumber && pageSize;
    let url = `${this.baseUrl}/ProductAlbert/GetAll`;

    if (isPaging) {
      url = `${this.baseUrl}/ProductAlbert/GetAll?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    }

    return this.http.get<any>(url, { headers });
  }

  create(alberNname: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const url = `${this.baseUrl}/ProductAlbert/Create`;
    return this.http.post<any>(
      url,
      {
        albert_name: alberNname,
      },
      { headers }
    );
  }

  delete(productAlbertId: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const url = `${this.baseUrl}/ProductAlbert/SoftDelete${productAlbertId}`;
    return this.http.delete<any>(url);
  }

  update(productAlbertId: any, productAlbertName: string) {
    const url = `${this.baseUrl}/ProductAlbert/Update${productAlbertId}`;
    return this.http.put<any>(url, {
      albert_name: productAlbertName,
    });
  }
}
