import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'src/service/breadcrumb.service';
import { LoadingService } from 'src/service/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoading: boolean = false;

  constructor(
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService
  ) {
    this.loadingService.isLoadingChanged.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }
}
