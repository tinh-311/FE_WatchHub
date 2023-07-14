import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import {
  ORDER_STATUS,
  convertToDisPlayName,
} from 'src/app/constant/order-status.constant';
import { OrderService } from 'src/app/service/order.service';
import { ToastService } from 'src/service/toast.service';
import { EditProductAlbertComponent } from '../modals/edit-product-albert/edit-product-albert.component';
import { ManageOrderDetailComponent } from 'src/app/modals/manage-order-detail/manage-order-detail.component';
import { UserService } from 'src/service/user.service';
import { getKeyByValue } from 'src/app/constant/util.constant';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss'],
})
export class ManageOrderComponent implements OnInit {
  orders: any[] = [];
  currentPage: any = 1;
  rowsPerPage: any = 10;
  totalCount: number = 0;
  isLoading: boolean = false;

  constructor(
    private orderService: OrderService,
    private dialogService: DialogService,
    private toastService: ToastService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.isLoading = true;
    this.orderService
      .getAllOrders(this.currentPage, this.rowsPerPage)
      .subscribe(
        (data) => {
          this.orders = data?.res;
          console.log('🏍️ ~ this.orders: ', this.orders);
          this.totalCount = data?.totalCount;
          this.isLoading = false;
        },
        (err) => {
          this.isLoading = false;
        }
      );
  }

  getAddress(data: any) {
    return (
      data?.street +
      ', ' +
      data?.ward +
      ', ' +
      data?.district +
      ', ' +
      data?.province
    );
  }

  onPageChanged(event: any) {
    this.currentPage = event.page + 1;
    this.rowsPerPage = event.rows;
    this.getAllOrders();
  }

  getOerderStatus(status: any) {
    return convertToDisPlayName(status);
  }

  async getUserById(id: any) {
    await this.userService.getUserByID(id).subscribe((user: any) => {
      console.log('🏍️ ~ user: ', user);

      return '';
    });
  }

  manageOrder(order: any) {
    console.log('🏍️ ~ order: ', order);
    const ref = this.dialogService.open(ManageOrderDetailComponent, {
      header: `Quản lý đơn hàng - ${order?.id}`,
      width: '70%',
      dismissableMask: true,
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      data: { order: order },
    });
    ref.onClose.subscribe((data) => {
      if (data) {
        this.getAllOrders();
      }
    });
  }

  cancelOrder(order: any) {
    console.log('🏍️ ~ order: ', order);
    this.orderService
      .updateStatus(
        order?.id,
        getKeyByValue(ORDER_STATUS, ORDER_STATUS.CANCELLED)
      )
      .subscribe(
        (orderRes: any) => {
          console.log('🏍️ ~ orderRes: ', orderRes);
          this.toastService.showMessage(
            ToasSumary.Success,
            orderRes?.message,
            ToastType.Success
          );

          this.getAllOrders();
        },
        (err) => {}
      );
  }
}
