import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-manage-order-detail',
  templateUrl: './manage-order-detail.component.html',
  styleUrls: ['./manage-order-detail.component.scss'],
})
export class ManageOrderDetailComponent implements OnInit {
  order: any;

  constructor(private config: DynamicDialogConfig) {
    if (this.config.data) {
      this.order = this.config.data?.order;
      console.log('🏍️ ~ this.order: ', this.order)
    }
  }

  ngOnInit(): void {}
}
