import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { isProduction_BE, BE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = isProduction_BE ? BE.productionUrl : BE.devUrl;
  token: any = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  create(data: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const url = `${this.baseUrl}/Order/Create`;
    return this.http.post<any>(url, data, { headers });
  }

  getById(id: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    let url = `${this.baseUrl}/Order/GetById${id}`;

    return this.http.get<any>(url, { headers });
  }

  getOrderById(status: any, id: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    let url = `${this.baseUrl}/Order/FilterByOrderStatus${id}?orderStatus=${status}`;

    return this.http.get<any>(url, { headers });
  }
  
  getAllOrderById(id: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    let url = `${this.baseUrl}/Order/FilterByUserId${id}`;

    return this.http.get<any>(url, { headers });
  }

  getAllOrders(pageNumber?: number, pageSize?: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    let isPaging = pageNumber && pageSize;
    let url = `${this.baseUrl}/Order/GetAll`;

    if(isPaging) {
      url = `${this.baseUrl}/Order/GetAll?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    }

    return this.http.get<any>(url, { headers });
  }

  updateStatus(id: any, status: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    let url = `${this.baseUrl}/Order/Update${id}?orderStatus=${status}`;

    return this.http.put<any>(url, { headers });
  }
  InventoryChecking(id: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    let url = `${this.baseUrl}/Warehouse/InventoryChecking${id}`;
    return this.http.post<any>(url, { headers });
  }
  T3PDeliveryIntransit(id: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    let url = `${this.baseUrl}/Delivery/T3PDeliveryInTransit${id}`;
    return this.http.post<any>(url, { headers });
  }
  T3PDeliverySuccessful(id: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    let url = `${this.baseUrl}/Delivery/T3PDeliverySuccess${id}`;
    return this.http.post<any>(url, { headers });
  }
  T3PDeliveryFail(id: any, cancelReason: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    let url = `${this.baseUrl}/Delivery/T3PDeliveryFail${id}cancelReason=${cancelReason}`;
    return this.http.post<any>(url, { headers });
  }
  
}
