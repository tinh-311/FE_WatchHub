import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  ORDER_STATUS,
  ORDER_STATUS_DISPLAY,
} from '../constant/order-status.constant';
import { MenuItem } from 'primeng/api';
import { OrderService } from '../service/order.service';
import jwt_decode from 'jwt-decode';
import { formatDate, getKeyByValue, parseJSON } from '../constant/util.constant';
import { NavigationExtras, Router } from '@angular/router';
import { ToastService } from 'src/service/toast.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';

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
  orderInfo: any;
  totalByStatus: any;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private toastService: ToastService
  ) {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    this.currentUser = jwt_decode(token);
  }
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    this.orderService
      .getAllOrderById(this.currentUser?.id)
      .subscribe((data: any) => {
        this.orderStatusValues = Object.entries(ORDER_STATUS_DISPLAY).map(
          ([key, value]) => ({ key, value })
        );
        this.orderStatusValues.forEach((status: any) => {
          this.tabMenuModel.push({ id: status.key, label: status.value });
        });
        this.orders = data?.res;
        this.orders = this.orders.reverse();
        // if (this.orders?.length) {
        //   this.orderInfo = parseJSON(this.orders[1]?.order_info);
        // }

        this.activeTab = this.tabMenuModel[0];
      });
  }

  onClickOrder(order: any) {
    this.router.navigate(['/order-details'], {
      queryParams: { id: order?.id },
    });
  }

  cancelOrder(order: any) {
    this.orderService
      .updateStatus(
        order?.id,
        getKeyByValue(ORDER_STATUS, ORDER_STATUS.CANCELLED)
      )
      .subscribe(
        (orderRes: any) => {
          this.toastService.showMessage(
            ToasSumary.Success,
            orderRes?.message,
            ToastType.Success
          );

          this.orderService
            .getAllOrderById(this.currentUser?.id)
            .subscribe((data: any) => {
              this.orders = data?.res;
              this.orders = this.orders.reverse();
            });
        },
        (err) => {}
      );
  }

  formatDate(date: string) {
    return formatDate(date);
  }

  getTotalByStatus(id: any) {
    switch (id) {
      case getKeyByValue(
        ORDER_STATUS_DISPLAY,
        ORDER_STATUS_DISPLAY.AWAITING_CONFIRMATION
      ): {
        this.totalByStatus = this.orders.filter(
          (order: any) =>
            order.order_status ===
            getKeyByValue(
              ORDER_STATUS_DISPLAY,
              ORDER_STATUS_DISPLAY.AWAITING_CONFIRMATION
            )
        );
        break;
      }
      case getKeyByValue(
        ORDER_STATUS_DISPLAY,
        ORDER_STATUS_DISPLAY.CONFIRMED
      ): {
        this.totalByStatus = this.orders.filter(
          (order: any) =>
            order.order_status ===
            getKeyByValue(
              ORDER_STATUS_DISPLAY,
              ORDER_STATUS_DISPLAY.CONFIRMED
            )
        );
        break;
      }
      case getKeyByValue(
        ORDER_STATUS_DISPLAY,
        ORDER_STATUS_DISPLAY.CANCELLED
      ): {
        this.totalByStatus = this.orders.filter(
          (order: any) =>
            order.order_status ===
            getKeyByValue(ORDER_STATUS_DISPLAY, ORDER_STATUS_DISPLAY.CANCELLED)
        );
        break;
      }
      // case getKeyByValue(ORDER_STATUS, ORDER_STATUS.AWAITING_SHIPMENT): {
      //   this.totalByStatus = this.orders.filter(
      //     (order: any) =>
      //       order.order_status ===
      //       getKeyByValue(ORDER_STATUS, ORDER_STATUS.AWAITING_SHIPMENT)
      //   );
      //   break;
      // }
      case getKeyByValue(ORDER_STATUS, ORDER_STATUS.AWAITING_COLLECTION): {
        this.totalByStatus = this.orders.filter(
          (order: any) =>
            order.order_status ===
            getKeyByValue(ORDER_STATUS, ORDER_STATUS.AWAITING_COLLECTION)
        );
        break;
      }
      case getKeyByValue(
        ORDER_STATUS_DISPLAY,
        ORDER_STATUS_DISPLAY.DELIVERED
      ): {
        this.totalByStatus = this.orders.filter(
          (order: any) =>
            order.order_status ===
            getKeyByValue(ORDER_STATUS_DISPLAY, ORDER_STATUS_DISPLAY.DELIVERED)
        );

        break;
      }
      case getKeyByValue(
        ORDER_STATUS_DISPLAY,
        ORDER_STATUS_DISPLAY.IN_TRANSIT
      ): {
        this.totalByStatus = this.orders.filter(
          (order: any) =>
            order.order_status ===
            getKeyByValue(ORDER_STATUS_DISPLAY, ORDER_STATUS_DISPLAY.IN_TRANSIT)
        );
        break;
      }
    }

    return this.totalByStatus.length;
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
        ORDER_STATUS_DISPLAY.CONFIRMED
      ): {
        return this.orders.filter(
          (order: any) =>
            order.order_status ===
            getKeyByValue(
              ORDER_STATUS_DISPLAY,
              ORDER_STATUS_DISPLAY.CONFIRMED
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
      // case getKeyByValue(ORDER_STATUS, ORDER_STATUS.AWAITING_SHIPMENT): {
      //   const f = this.orders.filter(
      //     (order: any) =>
      //       order.order_status ===
      //       getKeyByValue(ORDER_STATUS, ORDER_STATUS.AWAITING_SHIPMENT)
      //   );

      //   return f;
      // }
      case getKeyByValue(
        ORDER_STATUS_DISPLAY,
        ORDER_STATUS_DISPLAY.AWAITING_COLLECTION
      ): {
        return this.orders.filter(
          (order: any) =>
            order.order_status ===
            getKeyByValue(
              ORDER_STATUS_DISPLAY,
              ORDER_STATUS_DISPLAY.AWAITING_COLLECTION
            )
        );
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

  isShowCancel(id: any) {
    return ['AWAITING_CONFIRMATION', 'AWAITING_SHIPMENT', 'CONFIRMED'].includes(id);
  }

  getStatusName(data: any) {
    return this.orderStatusValues.find((o: any) => o.key === data).value;
  }

  onActiveItemChange(event: any) {
    const x: any = this.tabMenuModel.find((t) => t.id === event.id);
    this.activeTab = x;
  }
}
