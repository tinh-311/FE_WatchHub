import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { convertToDisPlayName } from 'src/app/constant/order-status.constant';
import { parseJSON } from 'src/app/constant/util.constant';
import { ImgReviewComponent } from 'src/app/img-review/img-review.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-manage-order-detail',
  templateUrl: './manage-order-detail.component.html',
  styleUrls: ['./manage-order-detail.component.scss'],
})
export class ManageOrderDetailComponent implements OnInit {
  orders: any;
  orderInfo: any;
  orderDetailById: any;

  constructor(
    private config: DynamicDialogConfig,
    private dialogService: DialogService,
    private orderService: OrderService,

  ) {
    if (this.config.data) {
      this.orders = this.config.data?.order;
      this.orderInfo = parseJSON(this.orders?.order_info);
      console.log('🏍️ ~ this.orderInfo : ', this.orderInfo);
      console.log('🏍️ ~ this.order: ', this.orders);
    }
  }

  convertToDisPlayName(status: any) {
    return convertToDisPlayName(status);
  }

  ngOnInit(): void {}

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
        this.orderService
        .getOrderDetailById(this.orders?.id)
        .subscribe(
          (data) => {
            this.orderDetailById = data;
            if(!this.orderDetailById || this.orderDetailById?.length){

            }
            console.log('🏍️ ~ this.orderDetailById: ', this.orderDetailById); 
          },
          (err) => {
            console.log('🏍️ ~ err: ', err);
          }
        );
      }
    });
  }
}
