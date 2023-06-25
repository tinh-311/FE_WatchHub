import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ProductsService } from 'src/service/products.service';
import { ToastService } from 'src/service/toast.service';
import { AddNewProductTypesComponent } from '../admin/modals/add-new-product-types/add-new-product-types.component';
import { AddNewProductComponent } from './../admin/modals/add-new-product/add-new-product.component';
import { ConfirmationComponent } from '../modals/confirmation/confirmation.component';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productType: any;
  products: any;

  currentPage: any = 1;
  rowsPerPage: any = 5;
  totalCount: number = 0;
  isLoading: boolean = false;

  constructor(
    private config: DynamicDialogConfig,
    private productsService: ProductsService,
    private dialogService: DialogService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    if (this.config.data) {
      const data = this.config.data;
      this.productType = data?.productType;
      this.getProduct();
    }
  }

  getProduct() {
    this.productsService
      .getProductByProductTypeId(
        this.currentPage,
        this.rowsPerPage,
        this.productType?.id
      )
      .subscribe(
        (data: any) => {
          this.products = data?.res;
          console.log('🏍️ ~ this.products: ', this.products);
          this.totalCount = data?.totalCount;
        },
        (err) => {}
      );
  }

  onPageChanged(event: any) {
    this.currentPage = event.page + 1;
    this.rowsPerPage = event.rows;
    this.getProduct();
  }

  deleteProduct(data: any) {
    const ref = this.dialogService.open(ConfirmationComponent, {
      header: `Xác nhận xóa sản phẩm`,
      width: '50%',
      dismissableMask: true,
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        message: `Bạn có chắc chắn muốn xóa?`,
      },
    });
    ref.onClose.subscribe((res) => {
      if (res) {
        this.isLoading = true;
        this.productsService.deleteProduct(data?.id).subscribe(
          (res) => {
            if (res?.message) {
              this.currentPage = 1;
              this.isLoading = false;
              this.getProduct();
              this.toastService.showMessage(
                ToasSumary.Success,
                res?.message,
                ToastType.Success
              );
            }
          },
          () => {
            this.isLoading = false;
          }
        );
      }
    });
  }

  showModalAddNew() {
    const ref = this.dialogService.open(AddNewProductComponent, {
      header: 'Thêm Sản Phẩm',
      footer: '',
      width: '50%',
      dismissableMask: true,
      rtl: true,
      keepInViewport: true,
      maximizable: true,
      modal: true,
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        productTypeId: this.productType?.id,
      },
    });
    ref.onClose.subscribe((data) => {
      if (data) {
        this.getProduct();
      }
    });
  }
}
