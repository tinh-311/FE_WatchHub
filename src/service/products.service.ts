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

  getTotalProductType(subCategoryId: any): Observable<any> {
    const url = `${this.baseUrl}/ProductType/GetTotalBySubCategoryId${subCategoryId}`;
    return this.http.get<any>(url);
  }
}
