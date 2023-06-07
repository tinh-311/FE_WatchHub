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

  createCategory(categoryName: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const url = `${this.baseUrl}/Category/Create`;
    return this.http.post<any>(
      url,
      {
        category_name: categoryName,
      },
      { headers }
    );
  }

  deleteCategory(categoryId: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const url = `${this.baseUrl}/Category/Delete${categoryId}`;
    return this.http.delete<any>(url);
  }

  updateCategory(categoryId: any, categoryName: string) {
    const url = `${this.baseUrl}/Category/Update${categoryId}`;
    return this.http.put<any>(url, {
      category_name: categoryName
    });
  }

  getAll(pageNumber?: number, pageSize?: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    let isPaging = pageNumber && pageSize;
    let url = `${this.baseUrl}/Category/GetAll`;

    if (isPaging) {
      url = `${this.baseUrl}/Category/GetAll?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    }

    return this.http.get<any>(url, { headers });
  }

  getAllSubCategories(categoryId: any) {
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
