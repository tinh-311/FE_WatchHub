import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationComponent } from 'src/app/modals/confirmation/confirmation.component';
import { ProductGlassService } from 'src/app/service/product-glass.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { LoadingService } from 'src/service/loading.service';
import { ToastService } from 'src/service/toast.service';
import { AddNewProductCoreComponent } from '../modals/add-new-product-core/add-new-product-core.component';
import { EditProductCoreComponent } from '../modals/edit-product-core/edit-product-core.component';
import { AddNewProductGlassComponent } from '../modals/add-new-product-glass/add-new-product-glass.component';
import { EditProductGlassComponent } from '../modals/edit-product-glass/edit-product-glass.component';

@Component({
  selector: 'app-product-glass',
  templateUrl: './product-glass.component.html',
  styleUrls: ['./product-glass.component.scss']
})
export class ProductGlassComponent implements OnInit {
  productGlass: any[] = [];
  currentPage: any = 1;
  rowsPerPage: any = 5;
  totalCount: number = 0;
  isLoading: boolean = false;

  constructor(
    private productGlassService: ProductGlassService,
    private loadingService: LoadingService,
    private dialogService: DialogService,
    private toastService: ToastService
  ) {
    this.getData();
  }

  ngOnInit(): void {}

  getData() {
    this.productGlassService.getAll(this.currentPage, this.rowsPerPage).subscribe(
      (data) => {
        this.productGlass = data?.res;
        console.log('🏍️ ~ this.productGlass: ', this.productGlass)
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
    this.getData();
  }

  showModalAddNew() {
    const ref = this.dialogService.open(AddNewProductGlassComponent, {
      header: 'Thêm Loại Khính',
      width: '70%',
      dismissableMask: true,
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    ref.onClose.subscribe((data) => {
      if (data) {
        this.getData();
      }
    });
  }

  edit(data: any) {
    const ref = this.dialogService.open(EditProductGlassComponent, {
      header: 'Cập Nhật Loại Kính',
      width: '70%',
      dismissableMask: true,
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      data: { data: data },
    });
    ref.onClose.subscribe((data) => {
      if (data) {
        this.getData();
      }
    });
  }

  deleteItem(data: any) {
    const ref = this.dialogService.open(ConfirmationComponent, {
      header: `Xác nhận xóa loại máy "${data?.glass_name}"`,
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
        this.productGlassService.delete(data?.id).subscribe(
          (res) => {
            if (res?.message) {
              this.currentPage = 1;
              this.isLoading = false;
              this.getData();
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
