import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  ORDER_STATUS,
  ORDER_STATUS_DISPLAY,
} from '../constant/order-status.constant';
import { MenuItem } from 'primeng/api';
import { OrderService } from '../service/order.service';
import jwt_decode from 'jwt-decode';
import { getKeyByValue } from '../constant/util.constant';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss'],
})
export class MyOrderComponent implements OnInit, AfterViewInit {
  tabMenuModel: MenuItem[] = [];
  orders: any;
  activeTab: any;
  orderStatusValues: any;
  currentUser: any;

  constructor(private orderService: OrderService) {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    this.currentUser = jwt_decode(token);
  }
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    this.orderService
      .getAllOrderById(this.currentUser?.id)
      .subscribe((data: any) => {
        this.orders = data?.res;
        this.orderStatusValues = Object.entries(ORDER_STATUS_DISPLAY).map(
          ([key, value]) => ({ key, value })
        );
        this.orderStatusValues.forEach((status: any) => {
          this.tabMenuModel.push({ id: status.key, label: status.value });
        });
        this.activeTab = this.tabMenuModel[0];
      });
  }

  getStatus(status: any) {
    this.orderService.getAllOrderById(this.currentUser?.id).subscribe(
      (data: any) => {
        this.orders = data?.res;
      },
      (err) => {}
    );
  }

  getOrdersByStatus(status: any): any[] {
    switch (status) {
      case getKeyByValue(
        ORDER_STATUS_DISPLAY,
        ORDER_STATUS_DISPLAY.AWAITING_CONFIRMATION
      ): {
        return this.orders.filter(
          (order: any) =>
            order.order_status ===
            getKeyByValue(
              ORDER_STATUS_DISPLAY,
              ORDER_STATUS_DISPLAY.AWAITING_CONFIRMATION
            )
        );
      }
      case getKeyByValue(
        ORDER_STATUS_DISPLAY,
        ORDER_STATUS_DISPLAY.CANCELLED
      ): {
        return this.orders.filter(
          (order: any) =>
            order.order_status ===
            getKeyByValue(ORDER_STATUS_DISPLAY, ORDER_STATUS_DISPLAY.CANCELLED)
        );
      }
      case getKeyByValue(ORDER_STATUS, ORDER_STATUS.AWAITING_SHIPMENT): {
        console.log('🏍️ ~ this.orders: ', this.orders);
        const f = this.orders.filter(
          (order: any) =>
            order.order_status ===
            getKeyByValue(ORDER_STATUS, ORDER_STATUS.AWAITING_COLLECTION)
        );
        console.log('🏍️ ~ f: ', f)

        return f;
      }
      case getKeyByValue(
        ORDER_STATUS_DISPLAY,
        ORDER_STATUS_DISPLAY.DELIVERED
      ): {
        return this.orders.filter(
          (order: any) =>
            order.order_status ===
            getKeyByValue(ORDER_STATUS_DISPLAY, ORDER_STATUS_DISPLAY.DELIVERED)
        );
      }
      case getKeyByValue(
        ORDER_STATUS_DISPLAY,
        ORDER_STATUS_DISPLAY.IN_TRANSIT
      ): {
        return this.orders.filter(
          (order: any) =>
            order.order_status ===
            getKeyByValue(ORDER_STATUS_DISPLAY, ORDER_STATUS_DISPLAY.IN_TRANSIT)
        );
      }
    }

    return this.orders;
  }

  getStatusName(data: any) {
    return this.orderStatusValues.find((o: any) => o.key === data).value;
  }

  onActiveItemChange(event: any) {
    const x: any = this.tabMenuModel.find((t) => t.id === event.id);
    this.activeTab = x;
  }
}
