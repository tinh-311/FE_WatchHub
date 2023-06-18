import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ProductAlbertService } from 'src/app/service/product-albert.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { LoadingService } from 'src/service/loading.service';
import { ToastService } from 'src/service/toast.service';

@Component({
  selector: 'app-edit-product-albert',
  templateUrl: './edit-product-albert.component.html',
  styleUrls: ['./edit-product-albert.component.scss'],
})
export class EditProductAlbertComponent implements OnInit {
  productAlbertName: string = '';
  productAlbertId: any = '';

  constructor(
    private ref: DynamicDialogRef,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private config: DynamicDialogConfig,
    private productAlbertService: ProductAlbertService
  ) {}
  ngOnInit(): void {
    if (this.config.data) {
      const data = this.config.data.productAlbert;
      this.productAlbertName = data?.albert_name;
      this.productAlbertId = data?.id;
    }
  }

  cancel() {
    this.ref.close(false);
  }

  update() {
    if (!this.productAlbertName) {
      return;
    }

    this.productAlbertService
      .update(this.productAlbertId, this.productAlbertName)
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
