import { Component, OnInit } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import {
  ORDER_STATUS,
  PAYMENT_METHOD,
  convertToDisPlayName,
} from 'src/app/constant/order-status.constant';
import { getKeyByValue, parseJSON } from 'src/app/constant/util.constant';
import { ImgReviewComponent } from 'src/app/img-review/img-review.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { OrderService } from 'src/app/service/order.service';
import { ToastService } from 'src/service/toast.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';

@Component({
  selector: 'app-manage-order-detail',
  templateUrl: './manage-order-detail.component.html',
  styleUrls: ['./manage-order-detail.component.scss'],
})
export class ManageOrderDetailComponent implements OnInit {
  order: any;
  orderInfo: any;
  orderDetailById: any;
  isLoading: boolean = false;
  btnMessage: string = 'Xác nhận đơn';
  paymentMethodDisplay: string = '';
  isPaid: boolean = false;

  constructor(
    private config: DynamicDialogConfig,
    private dialogService: DialogService,
    private orderService: OrderService,
    private toastService: ToastService,
    private ref: DynamicDialogRef
  ) {
    if (this.config.data) {
      this.order = this.config.data?.order;
      this.orderInfo = parseJSON(this.order?.order_info);
      this.isPaid = this.order?.isPaid;
    }
  }

  convertToDisPlayName(status: any) {
    return convertToDisPlayName(status);
  }

  ngOnInit(): void {
    // switch (this.order?.order_status) {
    //   case getKeyByValue(ORDER_STATUS, ORDER_STATUS.AWAITING_CONFIRMATION):
    //   case getKeyByValue(ORDER_STATUS, ORDER_STATUS.AWAITING_SHIPMENT): {
    //     break;
    //   }
    //   case getKeyByValue(ORDER_STATUS, ORDER_STATUS.AWAITING_COLLECTION): {
    //     this.btnMessage = ORDER_STATUS.IN_TRANSIT;
    //     break;
    //   }
    //   case getKeyByValue(ORDER_STATUS, ORDER_STATUS.IN_TRANSIT): {
    //     break;
    //   }
    // }
  }

  openImage(imageUrl: string) {
    const ref = this.dialogService.open(ImgReviewComponent, {
      header: 'Image Review',
      dismissableMask: true,
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: { imageUrl: imageUrl },
    });
  }

  continue() {
    const ref = this.dialogService.open(ConfirmationComponent, {
      header: `Xác nhận đơn hàng`,
      width: '40%',
      dismissableMask: true,
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        message: `Bạn có chắc chắn muốn xác nhận đơn hàng?`,
      },
    });
    ref.onClose.subscribe((res) => {
      if (res) {
        switch (this.order?.order_status) {
          case getKeyByValue(
            ORDER_STATUS,
            ORDER_STATUS.AWAITING_CONFIRMATION
          ): {
            this.awaitingConfirmation();
            break;
          }
        }
      }
    });
  }

  awaitingConfirmation() {
    this.isLoading = true;
    this.orderService.ConfirmationChecking(this.order?.id).subscribe(
      (data) => {
        // inventory checking
        this.toastService.showMessage(
          ToasSumary.Info,
          data?.message,
          ToastType.Info
        );
        this.isLoading = false;
        this.ref.close(true);
      },
      (err) => {
        this.toastService.showMessage(
          ToasSumary.Error,
          err?.error?.message,
          ToastType.Error
        );
        this.isLoading = false;
      }
    );
  }
  cancelOrder() {
    this.orderService
      .updateStatus(
        this.order?.id,
        getKeyByValue(ORDER_STATUS, ORDER_STATUS.CANCELLED)
      )
      .subscribe(
        (orderRes: any) => {
          this.ref.close(true);
        },
        (err) => {}
      );
  }
  isHiddenVerifyBtn(): boolean {
    if (
      convertToDisPlayName(this.order?.order_status) !=
      ORDER_STATUS.AWAITING_CONFIRMATION
    ) {
      return false;
    }
    return true;
  }
  isHiddenCancelBtn(): boolean {
    if (
      [
        ORDER_STATUS.IN_TRANSIT,
        ORDER_STATUS.DELIVERED,
        ORDER_STATUS.CANCELLED,
      ].includes(convertToDisPlayName(this.order?.order_status))
    ) {
      return false;
    }
    return true;
  }
  isShowCancelReason(): boolean {
    if (
      convertToDisPlayName(this.order?.order_status) == ORDER_STATUS.CANCELLED
    ) {
      return true;
    }
    return false;
  }
  isShowOrderDetail(): boolean {
    if (
      convertToDisPlayName(this.order?.order_status) ==
      ORDER_STATUS.AWAITING_COLLECTION
    ) {
      return true;
    }
    return false;
  }
  paymentMethodConvert(): any {
    if (this.order?.payment_method_id == 2) {
      this.paymentMethodDisplay = PAYMENT_METHOD.VNPAY;
      return true;
    }
    if (this.order?.payment_method_id == 3) {
      this.paymentMethodDisplay = PAYMENT_METHOD.COD;
      return true;
    }
    return false;
  }
}
