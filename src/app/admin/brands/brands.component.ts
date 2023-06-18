import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { BrandsService } from 'src/app/brands.service';
import { LoadingService } from 'src/service/loading.service';
import { ToastService } from 'src/service/toast.service';
import { AddNewBrandComponent } from '../modals/add-new-brand/add-new-brand.component';
import { EditBrandComponent } from '../modals/edit-brand/edit-brand.component';
import { ConfirmationComponent } from 'src/app/modals/confirmation/confirmation.component';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnInit {
  brands: any[] = [];
  currentPage: any = 1;
  rowsPerPage: any = 5;
  totalCount: number = 0;
  isLoading: boolean = false;

  constructor(
    private brandsService: BrandsService,
    private loadingService: LoadingService,
    private dialogService: DialogService,
    private toastService: ToastService
  ) {
    this.getBrands();
  }

  ngOnInit(): void {}

  getBrands() {
    this.brandsService.getAll(this.currentPage, this.rowsPerPage).subscribe(
      (data) => {
        this.brands = data?.res;
        console.log('🏍️ ~ this.brands: ', this.brands);
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
    this.getBrands();
  }

  showModalAddNew() {
    const ref = this.dialogService.open(AddNewBrandComponent, {
      header: 'Thêm Thương Hiệu',
      width: '70%',
      dismissableMask: true,
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    ref.onClose.subscribe((data) => {
      if (data) {
        this.getBrands();
      }
    });
  }

  editBrands(brand: any) {
    const ref = this.dialogService.open(EditBrandComponent, {
      header: 'Cập Nhật Thương Hiệu',
      width: '70%',
      dismissableMask: true,
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      data: { brand: brand },
    });
    ref.onClose.subscribe((data) => {
      if (data) {
        this.getBrands();
      }
    });
  }

  deleteBrands(brand: any) {
    const ref = this.dialogService.open(ConfirmationComponent, {
      header: `Xác nhận xóa thương hiệu ${brand?.brand_name}`,
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
        this.brandsService.delete(brand?.id).subscribe(
          (res) => {
            if (res?.message) {
              this.currentPage = 1;
              this.isLoading = false;
              this.getBrands();
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
