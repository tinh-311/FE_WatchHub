import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isProduction_BE, BE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductCoreService {
  private baseUrl = isProduction_BE ? BE.productionUrl : BE.devUrl;
  token: any = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number, pageSize?: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    let isPaging = pageNumber && pageSize;
    let url = `${this.baseUrl}/ProductCore/GetAll`;

    if (isPaging) {
      url = `${this.baseUrl}/ProductCore/GetAll?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    }

    return this.http.get<any>(url, { headers });
  }

  create(name: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const url = `${this.baseUrl}/ProductCore/Create`;
    return this.http.post<any>(
      url,
      {
        core_name: name,
      },
      { headers }
    );
  }

  delete(productAlbertId: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const url = `${this.baseUrl}/ProductCore/SoftDelete${productAlbertId}`;
    return this.http.delete<any>(url);
  }

  update(id: any, name: string) {
    const url = `${this.baseUrl}/ProductCore/Update${id}`;
    return this.http.put<any>(url, {
      core_name: name,
    });
  }
}
