import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  getCurrentLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: any) => {
            resolve(position);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }
}
