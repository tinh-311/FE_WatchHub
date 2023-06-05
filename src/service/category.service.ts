import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BE, isProduction_BE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = isProduction_BE ? BE.productionUrl : BE.devUrl;
  token: any = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  getAll() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const url = `${this.baseUrl}/Category/GetAll`;
    return this.http.get<any>(url, { headers });
  }

  getAllSubCategories(categoryId: any, ) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const url = `${this.baseUrl}/SubCategory/GetAllById${categoryId}`;
    return this.http.get<any>(url, { headers });
  }

  getSubCategoryById(id: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const url = `${this.baseUrl}/SubCategory/GetById${id}`;
    return this.http.get<any>(url, { headers });
  }
}
