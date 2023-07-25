import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isProduction_BE, BE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseUrl = isProduction_BE ? BE.productionUrl : BE.devUrl;
  token: any = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  getById(pageNumber?: number, pageSize?: number, id?: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    let isPaging = pageNumber && pageSize;
    let url = `${this.baseUrl}/ProductFeedback/GetByProductTypeId${id}'`;

    if (isPaging) {
      url = `${this.baseUrl}/ProductFeedback/GetByProductTypeId${id}?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    }

    return this.http.get<any>(url, { headers });
  }

  create(data: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const url = `${this.baseUrl}/ProductFeedback/Create`;
    return this.http.post<any>(url, data, { headers });
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
