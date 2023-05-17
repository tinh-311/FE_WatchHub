import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  @Output() isLoadingChanged: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor() {}

  showLoading() {
    this.isLoadingChanged.emit(true);
  }

  hideLoading() {
    this.isLoadingChanged.emit(false);
  }
}
