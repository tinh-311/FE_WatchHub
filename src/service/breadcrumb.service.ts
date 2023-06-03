import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private itemsSource = new Subject<any[]>();
  items$ = this.itemsSource.asObservable();

  constructor() {}

  onChange(item: any) {
    this.itemsSource.next(item);
  }
}
