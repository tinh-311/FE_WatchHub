import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressVNService {
  baseUrl: string = 'https://vn-public-apis.fpo.vn/';

  constructor(private http: HttpClient) { }

  getProvinces() {
    return this.http.get(`${this.baseUrl}/provinces/getAll?limit=-1`);
  }

  getDistricts(provinceCode: string) {
    return this.http.get(`${this.baseUrl}/districts/getByProvince?provinceCode=${provinceCode}&limit=-1`);
  }

  getWards(districtCode: string) {
    return this.http.get(`${this.baseUrl}/wards/getByDistrict?districtCode=${districtCode}&limit=-1`);
  }
}
