import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from 'src/service/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  items: MenuItem[] = [];
  home: any;

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit() {
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    if (!Array.isArray(this.items)) {
      this.items = [];
    }

    this.breadcrumbService.items$.subscribe((item: any) => {
      console.log('🏍️ ~ item: ', item)
      this.items = [item];
    })

  }
}
