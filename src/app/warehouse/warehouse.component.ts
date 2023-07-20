import { Component, OnInit } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { OrderService } from '../service/order.service';
import { ToastService } from 'src/service/toast.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss'],
})
export class WarehouseComponent implements OnInit {
  orderId: any;  
  constructor(
    private orderService: OrderService,
    private toastService: ToastService
  ){

  }
  ngOnInit(): void {
    console.log(this.orderId);
  }
  inventoryChecking() {
    this.orderService.InventoryChecking(this.orderId).subscribe(
      (data) => {
        this.toastService.showMessage(
          ToasSumary.Info,
          data?.message,
          ToastType.Info
        );
      },
      (err) => {
        console.log('🏍️ ~ err: ', err);
        this.toastService.showMessage(
          ToasSumary.Error,
          err?.message,
          ToastType.Error
        );
      }
    );
  }
}