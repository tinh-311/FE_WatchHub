import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoadingService } from 'src/service/loading.service';
import { ToastService } from 'src/service/toast.service';
import * as LR from '@uploadcare/blocks';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { BrandsService } from 'src/app/brands.service';

LR.registerBlocks(LR);

@Component({
  selector: 'app-add-new-brand',
  templateUrl: './add-new-brand.component.html',
  styleUrls: ['./add-new-brand.component.scss'],
})
export class AddNewBrandComponent implements OnInit {
  brandName: string = '';
  logo: string = '';

  constructor(
    private ref: DynamicDialogRef,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private brandsService: BrandsService
  ) {}
  ngOnInit(): void {
    window.addEventListener('LR_DATA_OUTPUT', (e: any) => {
      const uploadedUrl = e.detail?.data[0]?.cdnUrl + e.detail?.data[0]?.name;
      this.logo = uploadedUrl;
    });
  }

  cancel() {
    this.ref.close(false);
  }

  create() {
    console.log('🏍️ ~ this.brandName: ', this.brandName);

    if (!this.brandName) {
      return;
    }
    this.brandsService.create(this.brandName, this.logo).subscribe(
      (res) => {
        if (res?.message) {
          this.toastService.showMessage(
            ToasSumary.Success,
            res?.message,
            ToastType.Success
          );
          let uploaderElement: any = document.querySelector(
            'lr-file-uploader-regular'
          );
          uploaderElement.clear();
          this.ref.close(true);
        }
      },
      (err) => {
        if (err?.error?.message) {
          this.toastService.showMessage(
            ToasSumary.Error,
            err?.error?.message,
            ToastType.Error
          );
        }
        this.ref.close(false);
      }
    );
  }
}
