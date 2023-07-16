import { Component, OnInit } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import {
  ORDER_STATUS,
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
      console.log('🏍️ ~ this.orderInfo : ', this.orderInfo);
      console.log('🏍️ ~ this.order: ', this.order);
    }
  }

  convertToDisPlayName(status: any) {
    return convertToDisPlayName(status);
  }

  ngOnInit(): void {
    switch (this.order?.order_status) {
      case getKeyByValue(ORDER_STATUS, ORDER_STATUS.AWAITING_CONFIRMATION):
      case getKeyByValue(ORDER_STATUS, ORDER_STATUS.AWAITING_SHIPMENT): {
        break;
      }
      case getKeyByValue(ORDER_STATUS, ORDER_STATUS.AWAITING_COLLECTION): {
        this.btnMessage = ORDER_STATUS.IN_TRANSIT;
        break;
      }
      case getKeyByValue(ORDER_STATUS, ORDER_STATUS.IN_TRANSIT): {
        break;
      }
    }
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
      header: `Xác nhận chuyển trạng thái đơn đặt hàng`,
      width: '40%',
      dismissableMask: true,
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        message: `Bạn có chắc chắn muốn chuyển trạng thái của đơn hàng?`,
      },
    });
    ref.onClose.subscribe((res) => {
      if (res) {
        console.log(
          '🏍️ ~ this.order?.order_status: ',
          this.order?.order_status
        );
        switch (this.order?.order_status) {
          case getKeyByValue(ORDER_STATUS, ORDER_STATUS.AWAITING_SHIPMENT):
          case getKeyByValue(
            ORDER_STATUS,
            ORDER_STATUS.AWAITING_CONFIRMATION
          ): {
            this.awaitingConfirmation();
            break;
          }
          case getKeyByValue(ORDER_STATUS, ORDER_STATUS.AWAITING_CONFIRMATION):
          case getKeyByValue(ORDER_STATUS, ORDER_STATUS.AWAITING_SHIPMENT): {
            console.log('🏍️ ~ this.order?.id: ', this.order?.id);

            this.orderService
              .updateStatus(
                this.order?.id,
                getKeyByValue(ORDER_STATUS, ORDER_STATUS.AWAITING_COLLECTION)
              )
              .subscribe(
                (res) => {
                  console.log('res: ', res);
                  this.ref.close(true);
                },
                (err) => {
                  console.log('err', err);
                }
              );

            break;
          }
          case getKeyByValue(ORDER_STATUS, ORDER_STATUS.AWAITING_COLLECTION): {
            this.orderService
              .updateStatus(
                this.order?.id,
                getKeyByValue(ORDER_STATUS, ORDER_STATUS.IN_TRANSIT)
              )
              .subscribe(
                (res) => {
                  console.log('res: ', res);
                  this.ref.close(true);
                },
                (err) => {
                  console.log('err', err);
                }
              );
            break;
          }
        }
      }
    });
  }

  awaitingConfirmation() {
    this.isLoading = true;
    this.orderService.getOrderDetailById(this.order?.id).subscribe(
      (data) => {
        console.log('🏍️ ~ data: ', data);
        if (!data || data.length == 0) {
          // inventory checking fail
          this.toastService.showMessage(
            ToasSumary.Error,
            'Số lượng hàng tồn kho không đủ, hãy nhập thêm!!!',
            ToastType.Error
          );
          this.orderService
            .updateStatus(
              this.order?.id,
              getKeyByValue(ORDER_STATUS, ORDER_STATUS.AWAITING_SHIPMENT)
            )
            .subscribe(
              (res) => {
                this.ref.close(true);
              },
              (err) => {}
            );
        } else {
          // inventory checking successful
          this.orderDetailById = data;
          this.btnMessage = ORDER_STATUS.AWAITING_COLLECTION;
          console.log('orderDetailById: ', this.orderDetailById);
          this.orderService
            .updateStatus(
              this.order?.id,
              getKeyByValue(ORDER_STATUS, ORDER_STATUS.AWAITING_COLLECTION)
            )
            .subscribe(
              (res) => {
                this.ref.close(true);
              },
              (err) => {}
            );
        }
        this.isLoading = false;
      },
      (err) => {
        console.log('🏍️ ~ err: ', err);
        this.toastService.showMessage(
          ToasSumary.Error,
          err?.message,
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
  isHiddenBtn(): boolean {
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
}
