import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiOpencageKey } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}

  getAddressByGeolocation(latitude: string, longitude: string) {
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiOpencageKey}`;
    return this.http.get(apiUrl);
  }
}
