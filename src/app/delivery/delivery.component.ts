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
  orderId: any;
  cancelReason: any;
  constructor(
    private orderService: OrderService,
    private toastService: ToastService
  ) {

  }

  DeliveryIntransit(){
    this.orderService.T3PDeliveryIntransit(this.orderId).subscribe(
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
          err?.message,
          ToastType.Error
        );
      }
    );
  }
  DeliverySuccessful(){
    this.orderService.T3PDeliverySuccessful(this.orderId).subscribe(
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
          err?.message,
          ToastType.Error
        );
      }
    );
  }
  DeliveryFail(){
    this.orderService.T3PDeliveryFail(this.orderId, this.cancelReason).subscribe(
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
          err?.message,
          ToastType.Error
        );
      }
    );
  }
  
}