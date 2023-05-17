import { Injectable } from '@angular/core';
import screenfull from 'screenfull';

@Injectable({
  providedIn: 'root',
})
export class FullScreenService {
  constructor() {}

  toggleFullscreen() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }
}
