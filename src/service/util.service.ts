import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private userSource = new Subject<any>();
  user$ = this.userSource.asObservable();

  constructor() {}

  onChange(item: any) {
    this.userSource.next(item);
  }
}
