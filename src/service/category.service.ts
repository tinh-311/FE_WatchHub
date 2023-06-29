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

    const url = `${this.baseUrl}/Category/SoftDelete${categoryId}`;
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

  getAllSubCategories(categoryId: any, pageNumber?: number, pageSize?: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    let isPaging = pageNumber && pageSize;
    let url = `${this.baseUrl}/SubCategory/GetAllById${categoryId}`;

    if (isPaging) {
      url = `${this.baseUrl}/SubCategory/GetAllById${categoryId}?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    }

    return this.http.get<any>(url, { headers });
  }

  createSubCategory(categoryId: any, subCategoryName: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const url = `${this.baseUrl}/SubCategory/Create`;
    return this.http.post<any>(
      url,
      {
        sub_category_name: subCategoryName,
        category_id: categoryId
      },
      { headers }
    );
  }

  deleteSubCategory(subCategoryId: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const url = `${this.baseUrl}/SubCategory/SoftDelete${subCategoryId}`;
    return this.http.delete<any>(url);
  }

  updateSubCategory(subCategoryId: any, subCategoryName: string) {
    const url = `${this.baseUrl}/SubCategory/Update${subCategoryId}`;
    return this.http.put<any>(url, {
      sub_category_name: subCategoryName
    });
  }
}
