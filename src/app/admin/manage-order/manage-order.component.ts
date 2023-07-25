import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import {
  ORDER_STATUS,
  ORDER_STATUS_DISPLAY,
  PAYMENT_METHOD,
  convertToDisPlayName,
} from 'src/app/constant/order-status.constant';
import { OrderService } from 'src/app/service/order.service';
import { ToastService } from 'src/service/toast.service';
import { EditProductAlbertComponent } from '../modals/edit-product-albert/edit-product-albert.component';
import { ManageOrderDetailComponent } from 'src/app/modals/manage-order-detail/manage-order-detail.component';
import { UserService } from 'src/service/user.service';
import { getKeyByValue } from 'src/app/constant/util.constant';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { AdminUserComponent } from '../admin-user/admin-user.component';
import { AdminUserByIdComponent } from 'src/app/admin-user-by-id/admin-user-by-id.component';
import { ProductsService } from 'src/service/products.service';
import moment from 'moment';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss'],
})
export class ManageOrderComponent implements OnInit {
  order: any;
  orders: any[] = [];
  currentPage: any = 1;
  rowsPerPage: any = 10;
  totalCount: number = 0;
  isLoading: boolean = false;
  paymentMethodDisplay: string = '';
  filter: any;
  orderStatusValues: any;
  selectedFilterStatus: any;

  constructor(
    private orderService: OrderService,
    private dialogService: DialogService,
    private toastService: ToastService,
    private userService: UserService,
    private productsService: ProductsService,
    private cdRef: ChangeDetectorRef
  ) {
    this.orderStatusValues = Object.entries(ORDER_STATUS).map(
      ([key, value]) => ({ key, value })
    );
  }

  ngOnInit(): void {
    this.getAllOrders();
  }

  onDropdownChange(event: any) {
    this.filterByStatus(event?.value?.key);
  }

  filterByStatus(status: any) {
    this.clearSearch(false);
    this.isLoading = true;
    this.orderService
      .getAllOrdersByStatus(this.currentPage, this.rowsPerPage, status)
      .subscribe(
        (data: any) => {
          this.orders = data?.res || [];
          console.log('🏍️ ~ this.orders: ', this.orders);
          this.totalCount = data?.totalCount || 0;
          this.isLoading = false;
        },
        (err) => {
          this.isLoading = false;
        }
      );
  }

  getAllOrders() {
    this.isLoading = true;
    this.orderService
      .getAllOrders(this.currentPage, this.rowsPerPage)
      .subscribe(
        (data) => {
          this.orders = data?.res;
          console.log("🚀 ~ file: manage-order.component.ts:83 ~ ManageOrderComponent ~ getAllOrders ~ this.orders:", this.orders)
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

    if (this.filter) {
      console.log('🏍️ ~ this.filter: ', this.filter)
      this.search(false);
    } else if (this.selectedFilterStatus) {
      console.log('🏍️ ~ this.selectedFilterStatus: ', this.selectedFilterStatus)
      this.filterByStatus(this.selectedFilterStatus?.key);
    } else {
      this.getAllOrders();
    }
  }

  getOrderStatus(status: any) {
    return convertToDisPlayName(status);
  }

  async getUserById(id: any) {
    await this.userService.getUserByID(id).subscribe((user: any) => {
      return '';
    });
  }

  manageOrder(order: any) {
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
  viewUserDetail(order: any) {
    const ref = this.dialogService.open(AdminUserByIdComponent, {
      header: `Chi tiết khách hàng - ${order?.user_id}`,
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

          this.getAllOrders();
        },
        (err) => {}
      );
  }
  paymentMethodConvert(paymentMethodId: any): any {
    if (paymentMethodId == 2) {
      this.paymentMethodDisplay = PAYMENT_METHOD.COD;
      return true;
    }
    if (paymentMethodId == 3) {
      this.paymentMethodDisplay = PAYMENT_METHOD.VNPAY;
      return true;
    }
    console.log('paymentMethodDisplay', this.paymentMethodDisplay);
    return false;
  }

  clearSearch(isReloadAllData: boolean = true) {
    this.filter = '';
    if (isReloadAllData) {
      this.selectedFilterStatus = null;
      this.currentPage = 1;
      this.getAllOrders();
    }
  }

  search(isClearCurrentPage: boolean = true) {
    this.selectedFilterStatus = null;

    if (this.filter === '') {
      this.clearSearch();
      return;
    }

    if (isClearCurrentPage) {
      this.currentPage = 1;
    }

    this.isLoading = true;
    this.orderService.getById(this.filter).subscribe(
      (data: any) => {
        console.log('🏍️ ~ data: ', data);
        // this.productTypes = data?.res;
        this.orders = [data];
        this.isLoading = false;
        this.selectedFilterStatus = null;
      },
      (err) => {
        this.isLoading = false;
        this.selectedFilterStatus = null;
      }
    );
  }
  convertToUtcPlus7(dateString: string): string {
    const utcDate = moment.utc(dateString);
    const utcPlus7Date = utcDate.utcOffset(7 * 60);
    return utcPlus7Date.format('DD/MM/YYYY HH:mm:ss');
  }
  reloadComponent(): void {
    this.getAllOrders();
  }
}
