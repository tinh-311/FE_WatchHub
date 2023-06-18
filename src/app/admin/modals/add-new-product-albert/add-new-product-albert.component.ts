import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductAlbertService } from 'src/app/service/product-albert.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { LoadingService } from 'src/service/loading.service';
import { ToastService } from 'src/service/toast.service';

@Component({
  selector: 'app-add-new-product-albert',
  templateUrl: './add-new-product-albert.component.html',
  styleUrls: ['./add-new-product-albert.component.scss']
})
export class AddNewProductAlbertComponent implements OnInit {
  productAlbertName: string = '';

  constructor(
    private ref: DynamicDialogRef,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private productAlbertService: ProductAlbertService
  ) {}

  ngOnInit(): void {

  }

  cancel() {
    this.ref.close(false);
  }

  create() {
    if (!this.productAlbertName) {
      return;
    }
    this.productAlbertService.create(this.productAlbertName).subscribe(
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
