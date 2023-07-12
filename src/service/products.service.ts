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
    console.log('🏍️ ~ url: ', url);
  }

  deleteProductType(id: any): Observable<any> {
    const url = `${this.baseUrl}/ProductType/SoftDelete${id}`;
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

  getProductByProductTypeId(
    pageNumber?: number,
    pageSize?: number,
    id: any = 0
  ): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    let isPaging = pageNumber && pageSize;
    let url = `${this.baseUrl}/Product/GetByProductTypeId${id}`;

    if (isPaging) {
      url = `${this.baseUrl}/Product/GetByProductTypeId${id}?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    }

    return this.http.get<any>(url, { headers });
  }

  createProduct(data: any): Observable<any> {
    const url = `${this.baseUrl}/Product/Create?product_type_id=${data?.product_type_id}&product_code=${data?.product_code}`;
    return this.http.post<any>(url, data);
  }

  deleteProduct(id: any): Observable<any> {
    const url = `${this.baseUrl}/Product/SoftDelete${id}`;
    return this.http.delete<any>(url);
  }

  softDeleteProduct(id: any): Observable<any> {
    const url = `${this.baseUrl}/Product/SoftDelete${id}`;
    return this.http.delete<any>(url);
  }

  filterBySubCategoryId(
    subCategoryId: any,
    pageNumber: number,
    pageSize: number,
    data: any
  ): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    let isPaging = pageNumber && pageSize;
    let url = `${this.baseUrl}/ProductType/FilterBySubCategoryId${subCategoryId}`;

    if (isPaging) {
      url = `${this.baseUrl}/ProductType/FilterBySubCategoryId${subCategoryId}?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    }

    return this.http.post<any>(url, data, {headers});
  }
}
