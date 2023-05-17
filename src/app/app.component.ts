import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LoadingService } from 'src/service/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoading: boolean = false;

  constructor(private loadingService: LoadingService) {
    this.loadingService.isLoadingChanged.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }
}
