import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoadingService } from 'src/service/loading.service';
import { ToastService } from 'src/service/toast.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { BrandsService } from 'src/app/brands.service';
import { FileUploaderRegular } from '@uploadcare/blocks';
import * as LR from '@uploadcare/blocks';
LR.registerBlocks(LR);

@Component({
  selector: 'app-add-new-brand',
  templateUrl: './add-new-brand.component.html',
  styleUrls: ['./add-new-brand.component.scss'],
})
export class AddNewBrandComponent implements OnInit, AfterViewInit {
  brandName: string = '';
  logo: string = '';
  @ViewChild('myUploader') myUploader!: ElementRef;

  constructor(
    private ref: DynamicDialogRef,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private brandsService: BrandsService,
    private renderer: Renderer2
  ) {}
  ngOnInit(): void {
    window.addEventListener('LR_DATA_OUTPUT', (e: any) => {
      console.log('🏍️ ~ e: ', e);
      if (e.detail.ctx === 'new-brand') {
        const uploadedUrl = e.detail?.data[0]?.cdnUrl + e.detail?.data[0]?.name;
        this.logo = uploadedUrl;
      }
    });
  }

  ngAfterViewInit() {}

  cancel() {
    this.ref.close(false);
  }

  create() {
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
