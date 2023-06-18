import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductCoreService } from 'src/app/service/product-core.service';
import { LoadingService } from 'src/service/loading.service';
import { ToastService } from 'src/service/toast.service';
import { AddNewProductCoreComponent } from '../modals/add-new-product-core/add-new-product-core.component';
import { EditProductCoreComponent } from '../modals/edit-product-core/edit-product-core.component';
import { ConfirmationComponent } from 'src/app/modals/confirmation/confirmation.component';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';

@Component({
  selector: 'app-product-cores',
  templateUrl: './product-cores.component.html',
  styleUrls: ['./product-cores.component.scss']
})
export class ProductCoresComponent {
  productCores: any[] = [];
  currentPage: any = 1;
  rowsPerPage: any = 5;
  totalCount: number = 0;
  isLoading: boolean = false;

  constructor(
    private productCoreService: ProductCoreService,
    private loadingService: LoadingService,
    private dialogService: DialogService,
    private toastService: ToastService
  ) {
    this.getData();
  }

  ngOnInit(): void {}

  getData() {
    this.productCoreService.getAll(this.currentPage, this.rowsPerPage).subscribe(
      (data) => {
        this.productCores = data?.res;
        console.log('🏍️ ~ this.productCores: ', this.productCores)
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
    const ref = this.dialogService.open(AddNewProductCoreComponent, {
      header: 'Thêm Loại Máy',
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
    const ref = this.dialogService.open(EditProductCoreComponent, {
      header: 'Cập Nhật Loại Máy',
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
      header: `Xác nhận xóa loại máy "${data?.albert_name}"`,
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
        this.productCoreService.delete(data?.id).subscribe(
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
