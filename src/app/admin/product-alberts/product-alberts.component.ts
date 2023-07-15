import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationComponent } from 'src/app/modals/confirmation/confirmation.component';
import { ProductAlbertService } from 'src/app/service/product-albert.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { LoadingService } from 'src/service/loading.service';
import { ToastService } from 'src/service/toast.service';
import { AddNewProductAlbertComponent } from '../modals/add-new-product-albert/add-new-product-albert.component';
import { EditProductAlbertComponent } from '../modals/edit-product-albert/edit-product-albert.component';

@Component({
  selector: 'app-product-alberts',
  templateUrl: './product-alberts.component.html',
  styleUrls: ['./product-alberts.component.scss']
})
export class ProductAlbertsComponent implements OnInit {
  productAlberts: any[] = [];
  currentPage: any = 1;
  rowsPerPage: any = 5;
  totalCount: number = 0;
  isLoading: boolean = false;

  constructor(
    private productAlbertService: ProductAlbertService,
    private loadingService: LoadingService,
    private dialogService: DialogService,
    private toastService: ToastService
  ) {
    this.getProductAlberts();
  }

  ngOnInit(): void {}

  getProductAlberts() {
    this.productAlbertService.getAll(this.currentPage, this.rowsPerPage).subscribe(
      (data) => {
        this.productAlberts = data?.res;
        this.totalCount = data?.totalCount;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  onPageChanged(event: any) {
    this.currentPage = event.page + 1;
    this.rowsPerPage = event.rows;
    this.getProductAlberts();
  }

  showModalAddNew() {
    const ref = this.dialogService.open(AddNewProductAlbertComponent, {
      header: 'Thêm Loại Dây',
      width: '70%',
      dismissableMask: true,
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    ref.onClose.subscribe((data) => {
      if (data) {
        this.getProductAlberts();
      }
    });
  }

  editProductAlberts(productAlbert: any) {
    const ref = this.dialogService.open(EditProductAlbertComponent, {
      header: 'Cập Nhật Dây',
      width: '70%',
      dismissableMask: true,
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      data: { productAlbert: productAlbert },
    });
    ref.onClose.subscribe((data) => {
      if (data) {
        this.getProductAlberts();
      }
    });
  }

  deleteProductAlberts(productAlbert: any) {
    const ref = this.dialogService.open(ConfirmationComponent, {
      header: `Xác nhận xóa dây "${productAlbert?.albert_name}"`,
      width: '70%',
      dismissableMask: true,
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        message: `Bạn có chắc chắn muốn xóa?`,
      },
    });
    ref.onClose.subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.productAlbertService.delete(productAlbert?.id).subscribe(
          (res) => {
            if (res?.message) {
              this.currentPage = 1;
              this.isLoading = false;
              this.getProductAlberts();
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
}
