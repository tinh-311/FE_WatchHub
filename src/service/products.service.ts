import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { isProduction_BE, BE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = isProduction_BE ? BE.productionUrl : BE.devUrl;
  token: any = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  getProductTypes(
    subCategoryId: any,
    pageNumber: number,
    pageSize: number
  ): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const url = `${this.baseUrl}/ProductType/GetAllBySubCategoryId${subCategoryId}?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    return this.http.get<any>(url, { headers });
  }

  getAllProductTypes(pageNumber?: number, pageSize?: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    let isPaging = pageNumber && pageSize;
    let url = `${this.baseUrl}/ProductType/GetAll`;

    if (isPaging) {
      url = `${this.baseUrl}/ProductType/GetAll?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    }

    return this.http.get<any>(url, { headers });
  }

  getProductTypesById(id: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    let url = `${this.baseUrl}/ProductType/GetById${id}`;

    return this.http.get<any>(url, { headers });
  }

  getTotalProductType(subCategoryId: any): Observable<any> {
    const url = `${this.baseUrl}/ProductType/GetTotalBySubCategoryId${subCategoryId}`;
    return this.http.get<any>(url);
  }

  createProductType(data: any): Observable<any> {
    const url = `${this.baseUrl}/ProductType/Create`;
    return this.http.post<any>(url, data);
  }

  updateProductType(data: any): Observable<any> {
    const url = `${this.baseUrl}/ProductType/Update${data?.id}`;
    return this.http.put<any>(url, data);
  }

  deleteProductType(id: any): Observable<any> {
    const url = `${this.baseUrl}/ProductType/Delete${id}`;
    return this.http.delete<any>(url);
  }

  search(searchTerm: string) {
    const url = `${this.baseUrl}/ProductType/Search?searchTerm=${searchTerm}`;
    return this.http.post<any>(url, {});
  }

  getAllProduct(pageNumber?: number, pageSize?: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    let isPaging = pageNumber && pageSize;
    let url = `${this.baseUrl}/Product/GetAll`;

    if (isPaging) {
      url = `${this.baseUrl}/Product/GetAll?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    }

    return this.http.get<any>(url, { headers });
  }

  createProduct(data: any): Observable<any> {
    const url = `${this.baseUrl}/ProductType/Create`;
    return this.http.post<any>(url, data);
  }
}
