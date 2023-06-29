import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isProduction_BE, BE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  private baseUrl = isProduction_BE ? BE.productionUrl : BE.devUrl;
  token: any = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number, pageSize?: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    let isPaging = pageNumber && pageSize;
    let url = `${this.baseUrl}/Brand/GetAll`;

    if (isPaging) {
      url = `${this.baseUrl}/Brand/GetAll?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    }

    return this.http.get<any>(url, { headers });
  }

  create(brandName: string, logo: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const url = `${this.baseUrl}/Brand/Create`;
    return this.http.post<any>(
      url,
      {
        brand_name: brandName,
        brand_logo: logo,
      },
      { headers }
    );
  }

  delete(brandId: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const url = `${this.baseUrl}/Brand/SoftDelete${brandId}`;
    return this.http.delete<any>(url);
  }

  update(brandId: any, brandName: string, logo: string) {
    const url = `${this.baseUrl}/Brand/Update${brandId}`;
    return this.http.put<any>(url, {
      brand_name: brandName,
      brand_logo: logo
    });
  }
}
