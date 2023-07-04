import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BE, isProduction_BE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private baseUrl = isProduction_BE ? BE.productionUrl : BE.devUrl;
  token: any = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  // {
  //   "amount": 50000000,
  //   "callbackUrl": "https://zenttt.bsite.net/payment/payment_response"
  // }
  vnPay(data: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const url = `${this.baseUrl}/payment/create_payment`;
    console.log('🏍️ ~ url: ', url)
    return this.http.post<any>(url, {...data}, { headers });
  }

  storeTransaction(data: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const url = `${this.baseUrl}/payment/store_transaction`;
    return this.http.post<any>(url, data, { headers });
  }
}
