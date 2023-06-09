import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { LoadingService } from 'src/service/loading.service';
import { ToastService } from 'src/service/toast.service';
import * as LR from '@uploadcare/blocks';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { BrandsService } from 'src/app/brands.service';

LR.registerBlocks(LR);

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss'],
})
export class EditBrandComponent implements OnInit {
  brandName: string = '';
  logo: string = '';
  brandId: any;

  constructor(
    private ref: DynamicDialogRef,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private config: DynamicDialogConfig,
    private brandsService: BrandsService
  ) {}
  ngOnInit(): void {
    if (this.config.data) {
      const data = this.config.data.brand;
      this.brandName = data?.brand_name;
      this.brandId = data?.id;
      this.logo = data?.brand_logo;
    }

    window.addEventListener('LR_DATA_OUTPUT', (e: any) => {
      const uploadedUrl = e.detail?.data[0]?.cdnUrl + e.detail?.data[0]?.name;
      this.logo = uploadedUrl;
    });
  }

  cancel() {
    this.ref.close(false);
  }

  update() {
    if (!this.brandName) {
      return;
    }
    console.log('🏍️ ~ this.logo: ', this.logo);

    this.brandsService
      .update(this.brandId, this.brandName, this.logo || '')
      .subscribe(
        (res) => {
          if (res?.message) {
            this.toastService.showMessage(
              ToasSumary.Success,
              res?.message,
              ToastType.Success
            );
            this.ref.close(true);
          }
        },
        (err) => {
          this.toastService.showMessage(
            ToasSumary.Error,
            err?.error?.message,
            ToastType.Error
          );
          this.ref.close(false);
        }
      );
  }
}
