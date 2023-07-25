import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { OrderService } from '../service/order.service';
import { ActivatedRoute } from '@angular/router';
import { formatDate, getKeyByValue, parseJSON } from '../constant/util.constant';
import {
  ORDER_STATUS,
  convertToDisPlayName,
} from '../constant/order-status.constant';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  items: any;
  orderData: any;
  currentStep: number = 0;
  orderInfo: any;

  constructor(
    private orderSrvice: OrderService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(
      (params) => {
        const id: any = params['id'];
        this.orderSrvice.getById(id).subscribe(
          (data: any) => {
            this.orderData = data;
            this.orderInfo = parseJSON(this.orderData?.order_info);
            this.items = [
              { label: ORDER_STATUS.ON_HOLD },
              {
                label: ORDER_STATUS.AWAITING_CONFIRMATION,
              },
              {
                label: ORDER_STATUS.CONFIRMED,
              },
              {
                label: ORDER_STATUS.AWAITING_COLLECTION,
              },
              {
                label: ORDER_STATUS.AWAITING_SHIPMENT,
              },
              { label: ORDER_STATUS.IN_TRANSIT },

              { label: ORDER_STATUS.CANCELLED },
              { label: ORDER_STATUS.DELIVERED },
            ];

            const step = convertToDisPlayName(this.orderData?.order_status);
            this.currentStep = this.items.findIndex(
              (item: any) => item.label === step
            );
          },
          (err) => {}
        );
      },
      (err) => {}
    );
  }
  ngOnInit(): void {}

  convertToDisPlayName(data: any) {
    return convertToDisPlayName(data);
  }

  formatDate(date: string) {
    return formatDate(date);
  }
}
