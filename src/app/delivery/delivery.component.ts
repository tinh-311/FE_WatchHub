import { Component } from '@angular/core';
import { OrderService } from '../service/order.service';
import { ToastService } from 'src/service/toast.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent {
  orderIdTransit: any;
  orderIdSuccess: any;
  orderIdFail: any;
  cancelReason: any;
  constructor(
    private orderService: OrderService,
    private toastService: ToastService
  ) {}

  DeliveryIntransit() {
    this.orderService.T3PDeliveryIntransit(this.orderIdTransit).subscribe(
      (data) => {
        this.toastService.showMessage(
          ToasSumary.Info,
          data?.message,
          ToastType.Info
        );
      },
      (err) => {
        this.toastService.showMessage(
          ToasSumary.Error,
          err?.error?.message,
          ToastType.Error
        );
      }
    );
  }
  DeliverySuccessful() {
    this.orderService.T3PDeliverySuccessful(this.orderIdSuccess).subscribe(
      (data) => {
        this.toastService.showMessage(
          ToasSumary.Info,
          data?.message,
          ToastType.Info
        );
      },
      (err) => {
        this.toastService.showMessage(
          ToasSumary.Error,
          err?.error?.message,
          ToastType.Error
        );
      }
    );
  }
  DeliveryFail() {
    this.orderService
      .T3PDeliveryFail(this.orderIdFail, this.cancelReason)
      .subscribe(
        (data) => {
          this.toastService.showMessage(
            ToasSumary.Info,
            data?.message,
            ToastType.Info
          );
        },
        (err) => {
          console.log("🚀 ~ file: delivery.component.ts:69 ~ DeliveryComponent ~ DeliveryFail ~ err:", err)
          this.toastService.showMessage(
            ToasSumary.Error,
            err?.error?.message,
            ToastType.Error
          );
        }
      );
  }
}
